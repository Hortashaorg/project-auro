import node from "@astrojs/node";
import tailwind from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [basicSsl(), tailwind()],
    server: {
      https: true,
      port: "localhost",
    },
  },
});
