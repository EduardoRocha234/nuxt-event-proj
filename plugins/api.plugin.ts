export default defineNuxtPlugin({
	name: 'api',
	setup() {
		const token = useCookie('token')

		const api = $fetch.create({
			ignoreResponseError: true,
			onRequest({options}) {
				options.headers = new Headers({
					...options.headers,
					Authorization: 'Bearer ' + token,
				})
			},
		})

		return {
			provide: {
				api,
			},
		}
	},
})
