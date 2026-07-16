import { defineConfig } from "@solidjs/start/config";
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

export default defineConfig({
  vite: {
    plugins: [
      mdPlugin({
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
    // How to do redirects without workers:
    // routeRules: {
    //   "/download": { redirect: { to: "#download", statusCode: 301 } },
    // },
  },
});
