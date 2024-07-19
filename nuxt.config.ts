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
				{rel: 'preconnect', href: 'https://fonts.gstatic.com'},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
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
		API_BASE_URL: process.env.NUXT_API_BASE_URL
	},
	typescript: {
		strict: true,
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/icon',
		'@nuxt/eslint',
	],
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
})
