import {IEvent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const body = await readBody<IEvent>(event)
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/event`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		console.log(res)

		if (res.status !== 201) {
			throw createError({
				status: res.status,
				message: 'Erro ao criar o evento',
			})
		}

		return (await res.json()) as IEvent
	} catch (err) {
		console.log(err)
		throw createError({
			status: 500,
			message: 'Erro ao criar o evento',
		})
	}
})
