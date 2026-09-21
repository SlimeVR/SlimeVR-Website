import { defineConfig } from "@solidjs/start/config";
import { plugin as ViteMdPlugin, Mode } from "vite-plugin-markdown";
import { prerenderDone, prerenderGenerate } from "./src/scripts/sitemapGenerationHooks";

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
      routes: ["/404.html", "/blog"],
      crawlLinks: true,
    },
    hooks: {
      "prerender:generate": prerenderGenerate,
      "prerender:done": prerenderDone,
    },
    esbuild: {
      options: {
        target: "es2024",
      },
    },
    // How to do redirects without workers:
    // routeRules: {
    //   "/download": { redirect: { to: "#download", statusCode: 301 } },
    // },
  },
});
