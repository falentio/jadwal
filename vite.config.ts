import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import Icons from "unplugin-icons/vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({
			compiler: "svelte"
		})
	],
	resolve: {
		alias: {
		},
		conditions: ['workerd', 'worker', 'browser']
	},
	test: {
		env: loadEnv('test', process.cwd(), ""),
		fileParallelism: false,
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: [
						'src/**/*.svelte.{test,spec}.{js,ts}',
						'src/**/*.repository.test.ts',
					],
					maxConcurrency: 10,
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: "repository",
					environment: 'node',
					include: ['src/**/*.repository.test.ts'],
					maxConcurrency: 1,
					isolate: false,
				}
			}
		]
	}
});
