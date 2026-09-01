FROM node:24-alpine AS development-dependencies
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:24-alpine AS production-dependencies
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable
COPY . .
COPY --from=development-dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:24-alpine
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock server.js ./
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/build ./build
EXPOSE 3000 4000
CMD ["sh", "-c", "node server.js & exec yarn start"]
