import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    plugins: [],
  },
  ssr: true,
  server: {
    static: true,
    prerender: {
      routes: ["/404.html"],
      crawlLinks: true,
    },
    // How to do redirects without workers:
    // routeRules: {
    //   "/download": { redirect: { to: "#download", statusCode: 301 } },
    // },
  },
});
