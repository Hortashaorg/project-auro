import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [basicSsl(), tailwind(), alpinejs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    }
  }
});