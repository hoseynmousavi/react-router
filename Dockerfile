FROM registry.pinsvc.net/mirror/node:24.18.0-alpine
WORKDIR /app

COPY package.json ./

RUN yarn install --prefer-offline --frozen-lockfile --ignore-scripts --non-interactive --production

COPY . .
RUN yarn run build

ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE $PORT

# CMD ["yarn","run","start"]

CMD ["node", "./node_modules/@react-router/serve/bin.cjs", "./build/server/index.js"]
