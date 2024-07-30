<template>
	<div class="flex flex-col h-full rounded-lg p-4 mt-5 shadow-xl">
		<div class="w-full">
			<img
				class="rounded-lg h-48 w-full object-cover"
				:src="imageSrc"
			/>
		</div>
		<span class="text-3xl font-semibold mt-2 w-full"> {{ event.name }}</span>
		<div class="flex mt-4 gap-2 bg-slate-100 rounded-xl px-2 py-2">
			<div class="flex items-center justify-center bg-blue-100 p-2 rounded-2xl">
				<Icon
					name="solar:calendar-bold"
					:size="26"
					class="text-blue-600"
				/>
			</div>
			<div class="flex flex-col">
				<span class="font-semibold uppercase">{{ dateFormat }} </span>
				<span class="text-xs text-slate-600"
					>{{ nameWeekDayFormat }}, {{startAndEndTimeFormat}}</span
				>
			</div>
		</div>
		<div class="flex items-center mt-2 gap-2 bg-slate-100 rounded-xl px-2 py-2">
			<div
				class="flex items-center justify-center h-10 w-10 bg-blue-100 px-2 rounded-2xl"
			>
				<Icon
					name="mdi:location"
					:size="25"
					class="text-blue-600"
				/>
			</div>
			<span class="text-md text-slate-600">{{ event?.location }}</span>
		</div>
		<div class="mt-5">
			<div
				class="flex justify-between items-center gap-2 text-lg text-slate-600"
			>
				<div class="flex items-center gap-2">
					<Icon
						name="grommet-icons:list"
						:size="21"
					/>
					<span class="font-semibold">Lista de Participantes</span>
				</div>
				<div class="flex">
					{{ event?.participants.length }}/{{ event?.maxParticipants }}
				</div>
			</div>
			<ol
				class="relative mt-2 w-full bg-slate-100 border-t-4 border-slate-300 rounded-xl h-72 overflow-y-auto px-6 py-4"
			>
				<li
					v-for="(participant, index) in event?.participants"
					:class="{
						'font-bold text-blue-600': participant.userId === user?.userId,
						'font-semibold text-slate-600': participant.userId !== user?.userId,
					}"
					class="flex justify-between w-full items-center gap-2 text-md mb-2"
				>
					<span>{{ index + 1 }} - {{ participant.participantName }}</span>
					<div
						class="p-1 text-xs rounded-xl"
						:class="{
							'bg-green-300 text-green-800': participant.status === 'confirmed',
							'bg-orange-300 text-orange-800':
								participant.status === 'waiting_list',
						}"
					>
						{{ participant.status === 'confirmed' ? 'Confirmado' : 'Suplente' }}
					</div>
				</li>
				<div
					class="absolute bottom-0 right-1 flex items-center justify-center p-2 cursor-pointer"
					title="Formar times"
				>
					<Icon
						name="fa6-solid:people-group"
						:size="20"
						class="text-slate-500"
					/>
				</div>
			</ol>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const {event} = defineProps<{imageSrc: string; event: IEvent}>()

const {user} = useUserStore()

const dayjs = useDayjs()

const dateFormat = computed(() => dayjs(event.datetime).format('DD MMMM, YYYY'))
const nameWeekDayFormat = computed(() => {
	const weekDays = {
		0: 'Domingo',
		1: 'Segunda feira',
		2: 'Terça feira',
		3: 'Quarta feira',
		4: 'Quinta feira',
		5: 'Sexta feira',
		6: 'Sábado',
	}

	const day = dayjs(event.datetime).day()

	return weekDays[day]
})
const startAndEndTimeFormat = computed(
	() =>
		`${dayjs(event.startTime).format('HH:mm A')} ás ${dayjs(
			event.endTime
		).format('HH:mm A')}`
)
</script>

<style scoped></style>
