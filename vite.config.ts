import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouterRSC(), react(), rsc()],
  resolve: {
    tsconfigPaths: true,
  },
});
