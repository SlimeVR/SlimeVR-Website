// vite.config.ts
import { defineConfig } from "file:///C:/Users/llelievr/Documents/SlimeVR/SlimeVR-Website/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/llelievr/Documents/SlimeVR/SlimeVR-Website/node_modules/.pnpm/vite-plugin-solid@2.11.0_solid-js@1.9.3_vite@5.4.11_@types+node@22.10.1_/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\llelievr\\Documents\\SlimeVR\\SlimeVR-Website";
function i18nHotReload() {
  return {
    name: "i18n-hot-reload",
    handleHotUpdate({ file, server }) {
      const formatedFile = path.relative(__vite_injected_original_dirname, file);
      if (formatedFile.startsWith("public") && formatedFile.endsWith(".ftl")) {
        const bundle = path.parse(file).name;
        console.log("Fluent bundle updated:", bundle);
        server.ws.send({
          type: "custom",
          event: "locales-update",
          data: {
            bundle
          }
        });
      }
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    i18nHotReload(),
    solidPlugin()
  ],
  assetsInclude: ["**/*.ftl"],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default,
  i18nHotReload
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsbGVsaWV2clxcXFxEb2N1bWVudHNcXFxcU2xpbWVWUlxcXFxTbGltZVZSLVdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxsZWxpZXZyXFxcXERvY3VtZW50c1xcXFxTbGltZVZSXFxcXFNsaW1lVlItV2Vic2l0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGxlbGlldnIvRG9jdW1lbnRzL1NsaW1lVlIvU2xpbWVWUi1XZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHNvbGlkUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1zb2xpZFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbi8vIGltcG9ydCBkZXZ0b29scyBmcm9tICdzb2xpZC1kZXZ0b29scy92aXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGkxOG5Ib3RSZWxvYWQoKTogUGx1Z2luT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImkxOG4taG90LXJlbG9hZFwiLFxuICAgIGhhbmRsZUhvdFVwZGF0ZSh7IGZpbGUsIHNlcnZlciB9KSB7XG4gICAgICBjb25zdCBmb3JtYXRlZEZpbGUgPSBwYXRoLnJlbGF0aXZlKF9fZGlybmFtZSwgZmlsZSk7XG4gICAgICBpZiAoZm9ybWF0ZWRGaWxlLnN0YXJ0c1dpdGgoXCJwdWJsaWNcIikgJiYgZm9ybWF0ZWRGaWxlLmVuZHNXaXRoKFwiLmZ0bFwiKSkge1xuICAgICAgICBjb25zdCBidW5kbGUgPSBwYXRoLnBhcnNlKGZpbGUpLm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmx1ZW50IGJ1bmRsZSB1cGRhdGVkOlwiLCBidW5kbGUpO1xuICAgICAgICBzZXJ2ZXIud3Muc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJjdXN0b21cIixcbiAgICAgICAgICBldmVudDogXCJsb2NhbGVzLXVwZGF0ZVwiLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGJ1bmRsZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgLyogXG4gICAgVW5jb21tZW50IHRoZSBmb2xsb3dpbmcgbGluZSB0byBlbmFibGUgc29saWQtZGV2dG9vbHMuXG4gICAgRm9yIG1vcmUgaW5mbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZXRhcm5hdi9zb2xpZC1kZXZ0b29scy90cmVlL21haW4vcGFja2FnZXMvZXh0ZW5zaW9uI3JlYWRtZVxuICAgICovXG4gICAgLy8gZGV2dG9vbHMoKSxcbiAgICBpMThuSG90UmVsb2FkKCksXG4gICAgc29saWRQbHVnaW4oKSxcbiAgXSxcbiAgYXNzZXRzSW5jbHVkZTogW1wiKiovKi5mdGxcIl0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsb0JBQWtDO0FBQ2xZLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUtsQyxTQUFTLGdCQUE4QjtBQUM1QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixnQkFBZ0IsRUFBRSxNQUFNLE9BQU8sR0FBRztBQUNoQyxZQUFNLGVBQWUsS0FBSyxTQUFTLGtDQUFXLElBQUk7QUFDbEQsVUFBSSxhQUFhLFdBQVcsUUFBUSxLQUFLLGFBQWEsU0FBUyxNQUFNLEdBQUc7QUFDdEUsY0FBTSxTQUFTLEtBQUssTUFBTSxJQUFJLEVBQUU7QUFDaEMsZ0JBQVEsSUFBSSwwQkFBMEIsTUFBTTtBQUM1QyxlQUFPLEdBQUcsS0FBSztBQUFBLFVBQ2IsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFlBQ0o7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTVAsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGVBQWUsQ0FBQyxVQUFVO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
