<!-- eslint-disable vue/html-self-closing -->
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
	<Dialog
		v-model:visible="modal"
		header="Montar times"
		modal
		:style="{
			width: '85vw',
		}"
		:pt="{
			header:
				'border-b border-slate-200 bg-white !py-2 flex justify-between items-center rounded-t-xl',
			content: 'px-6 !py-5 bg-white h-auto rounded-md',
			footer: 'border-t border-slate-200 bg-white !p-3 rounded-b-xl',
		}"
	>
		<LazyPartialEventDetailsConteudoModalEmbaralharTimes
			v-model:active-step="activeStep"
			v-model:team-count="teamCount"
			v-model:team-size="teamSize"
			:shuffle-teams-array="
				elementConteudoRodapeEmbaralharTimes?.shuffleTeamsArray
			"
			@shuffle-teams="handleShuffleTeams"
		/>
		<template
			v-if="activeStep === 2"
			#footer
		>
			<LazyPartialEventDetailsConteudoRodapeEmbaralharTimes
				ref="elementConteudoRodapeEmbaralharTimes"
				:event="event"
				:team-count="teamCount"
				:team-size="teamSize"
			/>
		</template>
	</Dialog>
	<Drawer
		v-model:visible="visibleBottom"
		header="Compartilhar"
		position="bottom"
		style="height: auto"
	>
		<div class="flex w-full gap-4">
			<div
				class="border rounded-full h-16 w-16 flex items-center justify-center p-2"
			>
				<Icon
					name="mdi:whatsapp"
					size="40"
					class="text-green-500"
				/>
			</div>
			<div
				class="border rounded-full h-16 w-16 flex items-center justify-center p-2"
			>
				<Icon
					name="mdi:whatsapp"
					size="40"
					class="text-green-500"
				/>
			</div>
			<div
				class="border rounded-full h-16 w-16 flex items-center justify-center p-2"
			>
				<Icon
					name="mdi:whatsapp"
					size="40"
					class="text-green-500"
				/>
			</div>
			<div
				class="border rounded-full h-16 w-16 flex items-center justify-center p-2"
			>
				<Icon
					name="mdi:whatsapp"
					size="40"
					class="text-green-500"
				/>
			</div>
		</div>
	</Drawer>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'
import type PartialCounteudoRodapeModal from './ConteudoRodapeEmbaralharTimes.vue'

const props = defineProps<{imageSrc: string; event: IEvent}>()

const {event} = toRefs(props)

const teamCount = ref<number>(2)
const teamSize = ref<number>(5)
const activeStep = ref<number>(1)
const modal = ref<boolean>(false)
const visibleBottom = ref<boolean>(false)
const elementConteudoRodapeEmbaralharTimes = ref<InstanceType<
	typeof PartialCounteudoRodapeModal
> | null>(null)

const handleShuffleTeams = () => {
	elementConteudoRodapeEmbaralharTimes?.value?.shuffleTeams
	activeStep.value = 2
}

const openModal = () => {
	modal.value = true
}
</script>

<style scoped></style>
