<!-- eslint-disable vue/html-self-closing -->
<template>
	<div
		class="w-full flex flex-col gap-1 min-h-[22.5rem] shadow-lg rounded-2xl px-4 py-4 border-t"
	>
		<div class="relative">
			<!-- <div
				class="absolute flex flex-col items-center gap-0 top-2 left-2 px-3 py-1 rounded-lg bg-white"
			>
				<span class="text-lg font-bold text-blue-400">10</span
				><span class="-mt-2 font-semibold text-blue-400">JUL</span>
			</div> -->
			<img
				src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
				class="w-full object-cover h-36 rounded-xl"
			/>
		</div>
		<div
			class="flex justify-between items-center px-2 py-1 bg-blue-50 rounded-md mt-2"
		>
			<div class="flex items-center gap-2 text-blue-600">
				<Icon
					name="mdi:calendar"
					:size="22"
				/>
				<span class="font-semibold uppercase"> {{ dateFormat }} </span>
			</div>
			<span class="text-blue-600 font-semibold">{{ hoursFormat }}</span>
		</div>
		<div class="flex justify-between mt-1">
			<span class="font-bold text-lg">
				{{ event.name }}
			</span>
		</div>
		<div class="text-xs text-slate-500">
			<!-- TODO: refatorar -->
			<template v-if="event.participants">
				<template v-if="event.participants.length > 3">
					{{ participantsFormat.split(', ').slice(0, 3).join(', ') }}... +
					{{ event.participants.length - 3 }} pessoas confirmadas
				</template>
				<template
					v-else-if="
						event.participants.length > 0 && event.participants.length <= 3
					"
				>
					{{ event.participants.length }} irão participar
				</template>
				<template v-else-if="event.participants.length === 0">
					0 pessoas confirmadas
				</template>
			</template>
		</div>
		<div class="flex items-center -ml-1 w-full">
			<Icon
				name="mdi:location"
				class="text-slate-400"
				:size="35"
			/>
			<span
				class="text-slate-500 text-sm truncate font-semibold"
				:title="event.location"
			>
				{{ event.location }}
			</span>
		</div>
		<button
			class="w-full py-2 px-4 bg-blue-600 rounded-xl hover:bg-blue-700 text-white transition-all ease-out duration-100 focus:outline-none"
			@click="navigateTo(`/v1/event/details/${event.id}`)"
		>
			Ver Detalhes
		</button>
	</div>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const {event} = defineProps<{
	event: IEvent
}>()

const dayjs = useDayjs()

const dateFormat = computed(() => dayjs(event.datetime).format('DD MMM YYYY'))
const hoursFormat = computed(
	() =>
		`${dayjs(event.startTime).format('HH:mm A')} - ${dayjs(
			event.endTime
		).format('HH:mm A')}`
)

const participantsFormat = computed(() => {
	if (!event.participants) return ''

	return event.participants
		.map((participant) => participant.participantName)
		.join(', ')
})
</script>

<style scoped></style>
