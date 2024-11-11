export default defineEventHandler(async (event) => {
	const body = await readBody<{userId: string; eventId: string}>(event)
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/save-user-event-notification`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (res.status !== 201) {
			throw createError({
				status: res.status,
				message: 'Erro ao configurar usuário para receber notificações',
			})
		}

		return new Response(null, {status: 201})
	} catch (err) {
		console.log('aq', err)
		throw createError({
			status: 500,
			message: 'Erro ao configurar usuário para receber notificações',
		})
	}
})
