import {IUserCrendetials} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {API_BASE_URL} = useRuntimeConfig(event)

	const body = await readBody<IUserCrendetials>(event)

	try {
		const req = await fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body),
		})

		if (req.status === 401) {
			throw createError({
				statusCode: 401,
				message: 'Credenciais Inválidas',
			})
		}

		if (req.status !== 200) {
			throw createError({
				status: req.status,
				message: 'Erro ao autenticar',
			})
		}

		const {token} = await req.json()

		setCookie(event, 'token', token)

		return new Response(null, {status: 200})
	} catch (err) {
		throw createError({
			status: 500,
			message: 'Erro ao autenticar',
		})
	}
})
