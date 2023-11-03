import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';

const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {
			fontFamily: {
				geist: ['Geist Mono'],
			},
		},
	},
	plugins: [
		typography,
		forms,
		aspectRatio,
		containerQueries,
		skeleton({
			themes: { preset: [{ name: 'skeleton', enhancements: true }] },
		}),
	],
} satisfies Config;

export default config;
