import {reactRouter} from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import {defineConfig} from "vite"
import {VitePWA} from "vite-plugin-pwa"

export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),
        VitePWA({
            injectRegister: "inline",
            manifest: false,
            outDir: "build/client",
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["assets/**/*.{js,css}"],
                navigateFallback: null,
                runtimeCaching: [],
            },
        }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
})
