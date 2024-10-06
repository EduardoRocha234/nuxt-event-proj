<template>
	<div class="grid grid-cols-1 mt-8 px-4">
		<div class="flex items-center justify-between">
			<span class="text-xl font-semibold"
				>Eventos em que você está na lista:</span
			>
		</div>
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
				description="Parece que você ainda não está na lista de nenhum evento"
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
	</div>
</template>

<script setup lang="ts">
import type {IEvent, MetaData} from '~/interfaces'
const footerStore = useFooterBarStore()

const {user} = useUserStore()

const {data, status} = await useFetch<{events: IEvent[]; metadata: MetaData}>(
	`/api/v1/events/user/${user?.userId}/events-by-user`
)

onBeforeMount(() => {
	footerStore.setFooterBarVisible(true)
})
</script>

<style scoped></style>
