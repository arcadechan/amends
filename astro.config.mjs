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
    },
    resolve: {
      alias: {
        '@public': path.resolve('./public'),
        "@components": path.resolve('./src/components'),
        "@layouts": path.resolve('./src/layouts'),
        "@pages": path.resolve('./src/pages'),
        "@scripts": path.resolve('./src/scripts'),
        "@stores": path.resolve('./src/stores'),
        "@styles": path.resolve('./src/styles'),
        "@type": path.resolve('./src/types'),
      }
    }
  }
});