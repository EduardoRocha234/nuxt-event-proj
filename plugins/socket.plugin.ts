import {io} from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
	const {API_BASE_URL} = useRuntimeConfig().public

	const socket = io(API_BASE_URL)

	socket.on('connection', (data) => {
		console.log('Connection', data)
	})

	return {
		provide: {
			socket,
		},
	}
})
