import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [basicSsl(), tailwind()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});
