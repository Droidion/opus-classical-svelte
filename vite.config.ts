import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      srcDir: "./src",
      mode: "development",
      strategies: "generateSW",
      scope: "/",
      base: "/",
      manifest: {
        name: "Opus Classical",
        short_name: "OpusClassical",
        description: "Catalogue for streaming classical music.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/",
      },
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
