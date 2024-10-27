import {initializeApp, getApps} from 'firebase/app'
// import { onMessage } from 'firebase/messaging'
import {getMessaging, type Messaging, onMessage} from 'firebase/messaging'

declare module '#app' {
	interface NuxtApp {
		$messaging: Messaging
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$hello: (msg: string) => string
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	const app =
		getApps()[0] ??
		initializeApp({
			apiKey: 'AIzaSyBfPp6TxFXzGNej00yHppGif8UVQKKg-WQ',
			authDomain: 'message-teste-7cc85.firebaseapp.com',
			projectId: 'message-teste-7cc85',
			storageBucket: 'message-teste-7cc85.appspot.com',
			messagingSenderId: '702029751259',
			appId: '1:702029751259:web:456a6fc512124b754c3dfe',
			measurementId: 'G-G4PV0YPFZB',
		})

	const messaging = getMessaging(app)

	// this runs whenever a message is received:
	// - When the page os open
	// - When the user cliled the bg notification
	onMessage(messaging, (payload) => {
		alert(JSON.stringify(payload, null, 2))
	})
	return {
		provide: {
			messaging,
		},
	}
})
