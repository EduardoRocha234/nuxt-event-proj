<template>
	<div class="flex justify-between items-center gap-2 text-lg text-slate-600">
		<div class="flex items-center gap-2">
			<Icon
				name="grommet-icons:list"
				:size="21"
			/>
			<span class="font-semibold">Lista de Participantes</span>
		</div>
		<div class="flex">{{ parcipantsList.length }}/{{ maxParticipants }}</div>
	</div>
	<div class="mt-2 relative h-80 rounded-xl px-5 pt-4 pb-9 bg-slate-100">
		<div
			v-if="parcipantsList.length === 0"
			class="flex justify-center items-center"
		>
			<span class="text-slate-600 font-semibold"
				>Ainda não tem participantes</span
			>
		</div>
		<ol
			v-else
			class="w-full h-full overflow-scroll px-2"
		>
			<li
				v-for="(participant, index) in parcipantsList"
				:key="index"
				:class="{
					'font-bold text-blue-600': participant.userId === user?.userId,
					'font-semibold text-slate-600': participant.userId !== user?.userId,
				}"
				class="flex justify-between w-full items-center gap-2 text-md mb-2"
			>
				<span>{{ index + 1 }} - {{ participant.participantName }}</span>
				<div
					class="p-1 w-20 flex justify-center items-center text-xs rounded-xl"
					:class="{
						'bg-green-300 text-green-800': participant.status === 'confirmed',
						'bg-orange-300 text-orange-800':
							participant.status === 'waiting_list',
					}"
				>
					{{ participant.status === 'confirmed' ? 'Confirmado' : 'Suplente' }}
				</div>
			</li>
		</ol>
		<!-- v-if="event.adminId === user?.userId" -->
		<div
			class="absolute bottom-0 right-0 px-4 py-2 mt-3 w-full flex items-center justify-between"
			title="Formar times"
		>
			<div class="flex gap-2">
				<div
					class="px-2 py-1 w-full h-full bg-green-300 rounded-full text-xs"
					v-if="participantsConfirmed.length"
				>
					{{ participantsConfirmed.length }}
				</div>
				<div
					class="px-2 py-1 w-full h-full bg-orange-300 rounded-full text-xs"
					v-if="participantsWaitingList.length"
				>
					{{ participantsWaitingList.length }}
				</div>
			</div>
			<Icon
				v-if="participantsConfirmed.length"
				name="fa6-solid:people-group"
				:size="20"
				class="text-slate-500"
				@click.stop="emits('openShuffleTeamModal')"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IParticipant} from '~/interfaces'

const props = defineProps<{
	parcipantsList: IParticipant[]
	maxParticipants: number
}>()

const {parcipantsList, maxParticipants} = toRefs(props)

const emits = defineEmits<{
	(event: 'openShuffleTeamModal'): void
}>()

const {user} = useUserStore()

const participantsConfirmed = computed(() =>
	parcipantsList.value.filter((p) => p.status === 'confirmed')
)
const participantsWaitingList = computed(() =>
	parcipantsList.value.filter((p) => p.status === 'waiting_list')
)
</script>

<style scoped></style>
