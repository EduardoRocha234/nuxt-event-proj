import { IEvent } from "~/interfaces"

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event)
	const token = getCookie(event, 'token')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/event`, {
			headers: {Authorization: `Bearer ${token}`},
		})

		console.log(res)

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Erro ao buscar os eventos',
			})
		}

		return (await res.json()) as {events: IEvent[]}
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao buscar os eventos',
		})
	}
})
