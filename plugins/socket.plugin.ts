import {io} from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig()

	// console.log(config.app.)
	const socket = io('http://10.0.0.127:8000')

	socket.on('connection', (data) => {
		console.log('Evento', data)
	})

	return {
		provide: {
			socket,
		},
	}
})
