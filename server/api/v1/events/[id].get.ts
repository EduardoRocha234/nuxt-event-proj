import {IEvent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event)
	const token = getCookie(event, 'token')
	const id = getRouterParam(event, 'id')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/event/${id}`, {
			headers: {Authorization: `Bearer ${token}`},
		})

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Erro ao buscar os detalhes do evento',
			})
		}

		return (await res.json()) as IEvent
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao buscar os detalhes do evento',
		})
	}
})
