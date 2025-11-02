import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: false,
      },
      manifest: {
        name: "cozy•camera",
        short_name: "cozy•camera",
        display: "fullscreen",
        background_color: "#f5f5f4",
        theme_color: "#f5f5f4",
        icons: [
          {
            src: "/icon.png",
            type: "image/png",
            sizes: "900x900",
          },
        ],
      },
      /**
       * Enabling this in dev is nice for testing installing this as a PWA
       * but the "[workbox] No route found for ..." debug logs are very noisy.
       */
      devOptions: {
        enabled: !!process.env.DEV_PWA,
      },
    }),
  ],
  server: {
    allowedHosts: ["vite.tunnel.offchain.dev"],
  },
});
