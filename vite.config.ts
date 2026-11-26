import { defineConfig, PluginOption } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
// import devtools from 'solid-devtools/vite';

export function i18nHotReload(): PluginOption {
  return {
    name: "i18n-hot-reload",
    handleHotUpdate({ file, server }) {
      const formatedFile = path.relative(__dirname, file);
      if (formatedFile.startsWith("public") && formatedFile.endsWith(".ftl")) {
        const bundle = path.parse(file).name;
        console.log("Fluent bundle updated:", bundle);
        server.ws.send({
          type: "custom",
          event: "locales-update",
          data: {
            bundle,
          },
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    i18nHotReload(),
    solidPlugin(),
  ],
  assetsInclude: ["**/*.ftl"],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
