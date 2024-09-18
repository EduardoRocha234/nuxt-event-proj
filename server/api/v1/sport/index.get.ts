import {ISport} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event).public
	const token = getCookie(event, 'token')

	if (!token) {
		throw createError({
			status: 401,
			message: 'Usuário não autenticado',
		})
	}

	try {
		const res = await fetch(`${API_BASE_URL}/sport`, {
			headers: {Authorization: `Bearer ${token}`},
		})

		if (res.status !== 200) {
			throw createError({
				status: res.status,
				message: 'Erro ao buscar os esportes',
			})
		}

		const data = (await res.json()) as {sports: ISport[]}

		return data.sports
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao buscar os esportes',
		})
	}
})
