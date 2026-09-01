import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("plp", "routes/plp.tsx"),
  route("pdp/:slug", "routes/pdp.tsx"),
] satisfies RouteConfig;
