import { defineConfig } from 'astro/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// https://astro.build/config
import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  server: {
    host: true,
    port: 80
  },

  integrations: [react()]
});