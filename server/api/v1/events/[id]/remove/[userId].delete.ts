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

    console.log(`${API_BASE_URL}/event/${id}/remove/${userId}`)

	try {
		const res = await fetch(`${API_BASE_URL}/event/${id}/remove/${userId}`, {
            method: 'DELETE',
			headers: {Authorization: `Bearer ${token}`},
		})

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Ocorreu um erro ao se remover da lista do evento',
			})
		}

        return new Response(null, {status: 200})
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Ocorreu um erro ao se remover da lista do evento',
		})
	}
})
