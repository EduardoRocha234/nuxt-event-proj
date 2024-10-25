export default defineEventHandler(async (event) => {
	const body = await readBody<{token: string; userId: string}>(event)
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/save-push-token`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		console.log(res)

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Erro ao setar token de notificação',
			})
		}

		return new Response(null, {status: 200})
	} catch (err) {
		console.log('aq', err)
		throw createError({
			status: 500,
			message: 'Erro ao setar token de notificação',
		})
	}
})
