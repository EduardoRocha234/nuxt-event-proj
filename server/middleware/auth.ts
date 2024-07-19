export default defineEventHandler(async (event) => {
	if (event.path.includes('auth')) return

	let token = getCookie(event, 'token')

	if (!token) {
		const authHeader = getHeader(event, 'Authorization')
		token = authHeader?.split('Bearer ')[1]
	}

	if (!token) {
		return await sendRedirect(event, '/app/v1/auth/login')
	}
})
