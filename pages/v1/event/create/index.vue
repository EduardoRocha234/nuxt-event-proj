<template>
	<AppSectionCard>
		<AppHeadPage />
		<LazyPartialEventForm />
	</AppSectionCard>
	
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

// import type {IEvent} from '~/interfaces'

const {$api, $toast, $socket} = useNuxtApp()
const {user} = useUserStore()

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()

// const route = useRoute()
// const eventId = route.params.id

// const userIsInParticipantsList = computed(
// 	() => !!event?.value?.participants.some((p) => p.userId === user?.userId)
// )

// const {data: event, refresh} = await useFetch<IEvent>(
// 	`/api/v1/events/${eventId}`
// )

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
	footerbarStore.setFooterBarVisible(false)
})
</script>

<style scoped></style>
