export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')
	const userId = getRouterParam(event, 'userId')
	const eventId = getRouterParam(event, 'eventId')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(
			`${API_BASE_URL}/disable-event-notification/${userId}/${eventId}`,
			{
				method: 'DELETE',
				headers: {Authorization: `Bearer ${token}`},
			}
		)

		console.log(res)

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Ocorreu um erro desabilitar as notificações deste evento',
			})
		}

		return new Response(null, {status: 200})
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Ocorreu um erro desabilitar as notificações deste evento',
		})
	}
})
