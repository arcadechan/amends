// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import svelte from "@astrojs/svelte";
import react from '@astrojs/react'
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [svelte(), react(), markdoc(), keystatic()],
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