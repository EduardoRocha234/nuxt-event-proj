import Lara from '@primevue/themes/lara'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {enabled: true},
	ssr: true,
	sourcemap: true,
	serverDir: 'server',
	app: {
		baseURL: '/app',
		head: {
			htmlAttrs: {
				lang: 'pt-br',
			},
			charset: 'utf8',
			viewport: 'width=device-width, initial-scale=1',
			link: [
				{rel: 'preconnect', href: 'https://fonts.googleapis.com'},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: 'anonymous',
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
				},
			],
		},
	},
	$development: {
		app: {
			head: {
				title: 'VUE',
			},
		},
	},
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.NUXT_API_BASE_URL,
		},
	},
	typescript: {
		strict: true,
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'@nuxt/icon',
		'@nuxt/eslint',
		'dayjs-nuxt',
		'@primevue/nuxt-module',
		'@vite-pwa/nuxt',
	],
	pwa: {
		manifest: {
			name: 'Racha Connect',
			short_name: 'RachaConnect',
			theme_color: '#ffffff',
			start_url: '/app',
			lang: 'pt-br',
			description: 'descrição do seu APP',
			screenshots: [
				{
					src: 'app/manifest/home-screen.png',
					sizes: '320x320',
					type: 'image/png',
					form_factor: 'wide',
					label: 'RachaConnect',
				},
			],
			icons: [
				{
					src: 'app/manifest/android-launchericon-48-48.png',
					sizes: '48x48',
					type: 'image/png',
				},
				{
					src: 'app/manifest/android-launchericon-72-72.png',
					sizes: '72x72',
					type: 'image/png',
				},
				{
					src: 'app/manifest/android-launchericon-96-96.png',
					sizes: '96x96',
					type: 'image/png',
				},
				{
					src: 'app/manifest/android-launchericon-144-144.png',
					sizes: '144x144',
					type: 'image/png',
				},
				{
					src: 'app/manifest/android-launchericon-192-192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'app/manifest/android-launchericon-512-512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				// {
				// 	src: 'manifest/android-chrome-512x512.png',
				// 	sizes: '512x512',
				// 	type: 'image/png',
				// },
			],
		},
		injectManifest: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		client: {
			installPrompt: true,
			periodicSyncForUpdates: 20,
		},
		workbox: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
			navigateFallback: '/app',
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/app',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},
	primevue: {
		options: {
			theme: {
				preset: {
					...Lara,
					semantic: {
						...Lara.semantic,
						primary: {
							50: '{blue.50}',
							100: '{blue.100}',
							200: '{blue.200}',
							300: '{blue.300}',
							400: '{blue.400}',
							500: '{blue.500}',
							600: '{blue.600}',
							700: '{blue.700}',
							800: '{blue.800}',
							900: '{blue.900}',
							950: '{blue.950}',
						},
					},
				},
				options: {
					darkModeSelector: '.',
				},
			},
		},
	},
	dayjs: {
		locales: ['pt', 'br'],
		plugins: ['relativeTime', 'utc', 'timezone'],
		defaultLocale: 'pt',
		defaultTimezone: 'America/Sao_Paulo',
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	components: [
		{path: 'components/', prefix: 'App'},
		{path: 'partials/', prefix: 'Partial'},
	],
	vueuse: {
		autoImports: true,
	},
	css: ['~/assets/css/globals.css'],
})
