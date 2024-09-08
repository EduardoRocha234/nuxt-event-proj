<template>
	<div class="flex flex-col h-full rounded-lg p-4 mt-5 shadow-xl">
		<div class="w-full">
			<img
				class="rounded-lg h-48 w-full object-cover"
				:src="imageSrc"
			/>
		</div>
		<span class="text-3xl font-semibold mt-2 w-full mb-4">
			{{ event.name }}</span
		>
		<AppDateHourBar
			:datetime="event.datetime"
			:start-time="event.startTime"
			:end-time="event.endTime"
		/>
		<AppLocalizationBar
			:location="event.location"
			class="mt-2"
		/>
		<div class="mt-5">
			<AppEventParticipantList
				:parcipants-list="event.participants"
				:max-participants="event.maxParticipants"
				@open-modal="openModal"
			/>
		</div>
	</div>
	<AppModal
		v-model:visible="modal"
		header="Montar times"
		height="h-4/6"
	/>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const props = defineProps<{imageSrc: string; event: IEvent}>()

const {event} = toRefs(props)

// const {user} = useUserStore()

const modal = ref<boolean>(false)

const openModal = () => {
	modal.value = true
}
</script>

<style scoped></style>
