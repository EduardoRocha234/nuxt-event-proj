import {IUserCrendetials} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event).public

	const body = await readBody<IUserCrendetials>(event)

	try {
		const req = await fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		})

		if (req.status !== 200 && req.status !== 401) {
			return createError({
				status: req.status,
				message: 'Erro ao autenticar',
			})
		}

		if (req.status === 401) {
			return createError({
				statusCode: 401,
				message: 'Credenciais Inválidas',
			})
		}

		const {token} = await req.json()

		setCookie(event, 'token', token)

		return {token} as {token: string}
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao autenticar',
		})
	}
})
