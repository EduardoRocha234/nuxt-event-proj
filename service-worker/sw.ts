/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

import {
	cleanupOutdatedCaches,
	createHandlerBoundToURL,
	precacheAndRoute,
} from 'workbox-precaching'
import {clientsClaim} from 'workbox-core'
import {NavigationRoute, registerRoute} from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]

if (import.meta.env.DEV) allowlist = [/^\/$/]

registerRoute(new NavigationRoute(createHandlerBoundToURL('/'), {allowlist}))

self.addEventListener('push', (event) => {
	const data = event?.data?.json()
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: '/icon.png',
	})
})

self.skipWaiting()
clientsClaim()
