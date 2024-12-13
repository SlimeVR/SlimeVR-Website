import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    plugins: [],
  },
  ssr: true,
  server: {
    static: true,
    prerender: {
      crawlLinks: true,
    },
  },
});
