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
	],
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
			locale: {
				today: 'Hoje',
				clear: 'Limpar',
				dayNames: [
					'Domingo',
					'Segunda-feira',
					'Terça-feira',
					'Quarta-feira',
					'Quinta-feira',
					'Sexta-feira',
					'Sábado',
				],
				dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
				dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
				fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				monthNames: [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro',
				],
				monthNamesShort: [
					'Jan',
					'Fev',
					'Mar',
					'Abr',
					'Mai',
					'Jun',
					'Jul',
					'Ago',
					'Set',
					'Out',
					'Nov',
					'Dez',
				],
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
