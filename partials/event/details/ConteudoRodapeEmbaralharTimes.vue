<template>
	<div class="w-full h-full flex justify-between items-center px-3 py-2">
		<div
			class="border rounded-full h-10 w-10 flex items-center justify-center p-2"
		>
			<Icon
				name="iconamoon:copy"
				size="27"
				class="text-green-500"
				@click="copyTeamsToClipboard"
			/>
		</div>
		<div
			class="border rounded-full h-10 w-10 flex items-center justify-center p-2"
		>
			<Icon
				name="ic:round-share"
				size="27"
				class="text-blue-400"
			/>
			<!-- @click="visibleBottom = true" -->
		</div>
		<div
			class="border rounded-full h-10 w-10 flex items-center justify-center p-2"
		>
			<Icon
				name="mdi:reload"
				size="27"
				class="text-yellow-500"
				@click="shuffleTeams"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IEvent, IParticipant} from '~/interfaces'

export interface IShuffleTeams {
	teams: IParticipant[][]
	remainingParticipants: IParticipant[]
}

const props = defineProps<{
	event: IEvent
	teamCount: number
	teamSize: number
}>()

const {event, teamCount, teamSize} = toRefs(props)

const {$toast} = useNuxtApp()

const shuffleTeamsArray = ref<IShuffleTeams>({
	teams: [],
	remainingParticipants: [],
})

const participantsConfirmed = computed(() =>
	event.value.participants.filter((p) => p.status === 'confirmed')
)

const shuffleArray = (array: IParticipant[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

const divideTeams = (
	participants: IParticipant[],
	teamCount: number,
	teamSize: number
) => {
	const shuffledParticipants = shuffleArray([...participants])
	const totalParticipants = shuffledParticipants.length

	// Calcular o número total de participantes que cabem nos times
	const maxTeamCapacity = teamCount * teamSize

	// Inicializar os times
	const teams = Array.from({length: teamCount}, () => []) as IParticipant[][]

	// Preencher os times com base no número de pessoas por time
	let index = 0
	for (let i = 0; i < Math.min(maxTeamCapacity, totalParticipants); i++) {
		teams[index].push(shuffledParticipants[i])
		index = (index + 1) % teamCount
	}

	// Coletar os participantes que sobraram (se houver)
	const remainingParticipants = shuffledParticipants.slice(maxTeamCapacity)

	return {teams, remainingParticipants}
}

const formatTeamsForClipboard = () => {
	let formattedTeams = ''
	shuffleTeamsArray.value.teams.forEach((team, index) => {
		formattedTeams += `Time ${index + 1}:\n`
		team.forEach((participant) => {
			formattedTeams += `- ${participant.participantName}\n`
		})
		formattedTeams += '\n'
	})
	formattedTeams += `De Fora:`
	formattedTeams += '\n'
	shuffleTeamsArray.value.remainingParticipants.forEach((team) => {
		formattedTeams += `- ${team.participantName}\n`
	})
	return formattedTeams
}

const copyTeamsToClipboard = async () => {
	const teamsText = formatTeamsForClipboard()

	try {
		copyToClipboad(teamsText)
		$toast.success('Copiado para área de transferência')
	} catch (err) {
		$toast.error(err)
	}
}

const shuffleTeams = () => {
	shuffleTeamsArray.value = divideTeams(
		participantsConfirmed.value,
		teamCount.value,
		teamSize.value
	)
}

defineExpose({
	shuffleTeamsArray,
	shuffleTeams: shuffleTeams(),
})
</script>

<style scoped></style>
