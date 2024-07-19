// const extrairPayloadJwt = <T>(token: string) => {
// 	const [, payload] = token.split('.')
// 	const decoded = atob(payload)
// 	const parsed = JSON.parse(decoded)

// 	return parsed as T
// }

export default defineNuxtRouteMiddleware(({ name }) => {
	const routeName = String(name)
	const token = useCookie('token')
	const authRoute = routeName.includes('auth')

	
	if (token.value && authRoute) {
		return navigateTo({
			name: 'index',
			replace: true,
		})
	}

	if (!token.value  && !authRoute) {
		return navigateTo({
			name: 'v1-auth-login',
			replace: true,
		})
	}

	// if (token.value) {
	// 	const payload = extrairPayloadJwt<InovaJwtPayload>(token.value!)
	// 	const now = new Date()
	// 	const exp = new Date(payload.exp * 1000)
	// 	const tokenExpirado = exp.getTime() < now.getTime()

	// 	if (tokenExpirado) {
	// 		token.value = ''
	// 		return navigateTo({
	// 			name: 'v1-autenticacao-entrar',
	// 			replace: true,
	// 		})
	// 	}
	// }
})