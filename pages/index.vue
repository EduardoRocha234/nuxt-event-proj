<template>
	<div class="grid grid-cols-1 mt-12 px-4">
		<div class="flex items-center justify-between">
			<span class="text-xl font-semibold">Próximos Eventos</span>
			<button class="flex items-center text-sm text-slate-400">
				Ver Todos
				<Icon
					name="ic:sharp-arrow-left"
					:size="20"
					class="transform rotate-180"
				/>
			</button>
		</div>
		{{ ole }}
		<button @click="requestPermission">Allow Notifications</button>
		<div
			v-if="data && data.events.length > 0"
			class="mt-5 flex flex-col gap-4 mb-8"
		>
			<LazyAppCardEvent
				v-for="event in data.events"
				:key="event.id"
				:event="event"
			/>
		</div>
		<div
			v-else
			class="h-full py-20"
		>
			<LazyAppNoEventsMessage
				description="Tente novamente mais tarde, ou escolha outras opções de filtros"
			/>
		</div>
		<TransitionGroup name="fade">
			<div
				v-if="status === 'pending'"
				class="flex flex-col gap-4"
			>
				<LazyAppCardSkeleton />
				<LazyAppCardSkeleton />
				<LazyAppCardSkeleton />
			</div>
		</TransitionGroup>
		<LazyAppFilterEventsParametersDrawer @apply-filters="setFilters" />
	</div>
</template>

<script setup lang="ts">
import {getToken} from 'firebase/messaging'
import type {IEvent, IEventFilterParams, MetaData} from '~/interfaces'
import {useEventStore} from '~/stores/event.store'
import {useFooterBarStore} from '~/stores/footerBar.store'

const {sportIdFilter, nameFilter} = storeToRefs(useEventStore())
const {user} = useUserStore()

const footerStore = useFooterBarStore()

const params = reactive<IEventFilterParams>({
	page: 1,
	pageSize: 5,
	sportId: sportIdFilter.value,
	name: undefined,
})

const setFilters = (event: Omit<IEventFilterParams, 'page' | 'pageSize'>) => {
	params.initialPeriod = event.initialPeriod
	params.finalPeriod = event.finalPeriod
	params.sportId = event.sportId
	params.locale = event.locale
}

watch(sportIdFilter, (nv) => {
	params.sportId = nv
})

watch(nameFilter, (nv) => {
	params.name = nv
})

const ole = ref()

const {data, status} = await useFetch<{events: IEvent[]; metadata: MetaData}>(
	'/api/v1/events',
	{
		params: params,
		watch: [params],
	}
)

const handleScroll = () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		if (!data.value?.metadata.isLastPage && status.value !== 'pending') {
			params.pageSize += 5
		}
	}
}

const setToken = async () => {
	console.log('Teste')
	// importar firebase/messaging

	const serviceWorkerRegistration = await navigator.serviceWorker.register(
		'/app/firebase-messaging-sw.js'
	)

	const {$messaging} = useNuxtApp()
	const token = await getToken($messaging, {
		serviceWorkerRegistration,
		vapidKey:
			'BCC-FLq6N1XXt4YejT4wT4q3JvVqfLRZ-kk0pcrltQnxh_wHPXacI9c6k1883jm5wf2y81ZIRiiDuIRFpK1vYw8',
	})
	ole.value = token
	console.log(token)
	console.log('asdad')

	// mandar token e user id par o servidor
	await $fetch.raw('/api/v1/notifications/set-user-token', {
		method: 'POST',
		body: {
			token,
			userId: user?.userId,
		},
		ignoreResponseError: true,
		retry: false,
	})
}

const requestPermission = async () => {
	if (!window.Notification) return

	if (window.Notification.permission === 'granted') {
		setToken()
	} else {
		window.Notification.requestPermission((value) => {
			if (value === 'granted') {
				setToken()
			}
		})
	}
}

onMounted(async () => {
	footerStore.setFooterBarVisible(true)
	window.addEventListener('scroll', handleScroll)

	await requestPermission()
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
