// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import svelte, { vitePreprocess } from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [ svelte() ],
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${path.resolve('src/styles/index')}" as *;`,
        }
      }
    }
  }
});