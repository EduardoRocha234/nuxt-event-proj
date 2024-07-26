import {IEvent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event)
	const token = getCookie(event, 'token')
	const id = getRouterParam(event, 'id')
	const userId = getRouterParam(event, 'userId')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/event/${id}/join/${userId}`, {
            method: 'POST',
			headers: {Authorization: `Bearer ${token}`},
		})

		if (res.status !== 201) {
			throw createError({
				status: res.status,
				message: 'Ocorreu um erro ao entrar na lista do evento',
			})
		}

        return new Response(null, {status: 201})
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Ocorreu um erro ao entrar na lista do evento',
		})
	}
})
