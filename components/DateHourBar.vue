<template>
	<div class="flex gap-2 bg-slate-100 rounded-xl px-2 py-2">
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
				>{{ isRecurring ? 'Toda ' : '' }} {{ nameWeekDayFormat }},
				{{ startAndEndTimeFormat }}</span
			>
		</div>
	</div>
</template>

<script setup lang="ts">
const {datetime, endTime, startTime, isRecurring} = defineProps<{
	datetime: string
	startTime: string
	endTime: string
	isRecurring: boolean
}>()

const dayjs = useDayjs()

const dateFormat = computed(() => dayjs(datetime).format('DD MMMM, YYYY'))

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

	const day = dayjs(datetime).day()

	return weekDays[day]
})

const startAndEndTimeFormat = computed(
	() =>
		`${dayjs(startTime).format('HH:mm A')} ás ${dayjs(endTime).format(
			'HH:mm A'
		)}`
)
</script>

<style scoped></style>
