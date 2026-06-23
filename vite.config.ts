import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function studioDevRewrite(): Plugin {
  return {
    name: "studio-dev-rewrite",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = (req as { url?: string }).url?.split("?")[0] ?? "";
        if (url === "/studio" || url.startsWith("/studio/")) {
          (req as { url?: string }).url = "/studio.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), studioDevRewrite()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        studio: "studio.html",
      },
    },
  },
});
