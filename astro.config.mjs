import { defineConfig } from 'astro/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    resolve: {
      alias: {
        fs: require.resolve('rollup-plugin-node-builtins'),
      }
    }
  }
});