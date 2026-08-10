import { defineConfig } from "@solidjs/start/config";
import { plugin as ViteMdPlugin, Mode } from "vite-plugin-markdown";

export default defineConfig({
  vite: {
    plugins: [
      ViteMdPlugin({
        mode: [Mode.HTML, Mode.MARKDOWN],
      }),
    ],
  },
  ssr: true,
  server: {
    static: true,
    prerender: {
      routes: ["/404.html"],
      crawlLinks: true,
    },
    compatibilityDate: "2026-07-22",
    // How to do redirects without workers:
    // routeRules: {
    //   "/download": { redirect: { to: "#download", statusCode: 301 } },
    // },
  },
});
