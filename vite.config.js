import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  build: {
    outDir: "static/landing-assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "landing.js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith(".css") ? "landing.css" : "[name][extname]",
      },
    },
  },
});
