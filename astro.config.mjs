// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import svelte from "@astrojs/svelte";
import react from '@astrojs/react'
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';

const production = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  site: 'https://localhost:4321',
  integrations: [svelte(), react(), markdoc(), ...(production ? [] : [keystatic()])],
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