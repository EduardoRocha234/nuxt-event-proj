import {IEvent, MetaData, PaginationParams} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')
	const userId = getRouterParam(event, 'userId')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/events-by-user/${userId}`, {
			headers: {Authorization: `Bearer ${token}`},
		})


		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Erro ao buscar os eventos por usuário',
			})
		}

		return (await res.json()) as {events: IEvent[]; metadata: MetaData}
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao buscar os eventos por usuário',
		})
	}
})
