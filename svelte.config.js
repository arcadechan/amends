import { vitePreprocess } from '@astrojs/svelte';
import path from 'node:path';

export default {
	preprocess: vitePreprocess({
		style: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: `@use "${path.resolve('src/styles/index')}" as *;`
					}
				}
			}
		}
	}),
}
