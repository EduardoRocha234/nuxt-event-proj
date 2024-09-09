<template>
	<div class="flex flex-col h-full rounded-lg p-4 mt-5 shadow-xl">
		<div class="w-full">
			<img
				class="rounded-lg h-48 w-full object-cover"
				:src="imageSrc"
			>
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
		<div class="px-2 w-full h-full flex items-center justify-center">
			<Stepper
				v-model:value="activeStep"
				linear
				class="basis-[40rem]"
			>
				<StepList>
					<Step
						v-slot="{activateCallback, value, a11yAttrs}"
						as-child
						:value="1"
					>
						<div
							class="flex flex-row flex-auto gap-2 ml-7"
							v-bind="a11yAttrs.root"
						>
							<button
								class="bg-transparent border-0 inline-flex flex-col gap-2"
								v-bind="a11yAttrs.header"
								@click="activateCallback"
							>
								<span
									:class="[
										'rounded-full border-2 w-10 h-10 inline-flex items-center justify-center transition-colors',
										{'border-blue-200': value === activeStep},
									]"
								>
									<Icon
										name="mdi:form-outline"
										size="20"
										class="transition-colors"
										:class="{
											'text-slate-400': value !== activeStep,
											'text-blue-400': value === activeStep,
										}"
									/>
								</span>
							</button>
							<Divider />
						</div>
					</Step>
					<Step
						v-slot="{value}"
						as-child
						:value="2"
					>
						<Divider />
						<div class="flex flex-row justify-end flex-auto gap-2 mr-7">
							<button
								class="bg-transparent border-0 inline-flex flex-col gap-2"
							>
								<span
									:class="[
										'rounded-full border-2 w-10 h-10 inline-flex items-center justify-center transition-colors',
										{'border-blue-200': value === activeStep},
									]"
								>
									<Icon
										name="fa6-solid:people-group"
										size="20"
										class="transition-colors"
										:class="{
											'text-slate-400': value !== activeStep,
											'text-blue-400': value === activeStep,
										}"
									/>
								</span>
							</button>
						</div>
					</Step>
				</StepList>
				<StepPanels>
					<StepPanel :value="1">
						<div class="flex flex-col gap-4 w-full">
							<div class="flex-auto">
								<label
									for="withoutgrouping"
									class="font-semibold block mb-1"
								>
									Quantidade de times
								</label>
								<InputNumber
									v-model="teamCount"
									input-id="withoutgrouping"
									show-buttons
									:use-grouping="false"
									fluid
								/>
							</div>
							<div class="flex-auto mb-5">
								<label
									for="withoutgrouping"
									class="font-semibold block mb-1"
								>
									Quantidade de pessoas por time
								</label>
								<InputNumber
									v-model="teamSize"
									input-id="withoutgrouping"
									show-buttons
									:use-grouping="false"
									fluid
								/>
							</div>
							<Button
								label="Embaralhar"
								class="!rounded-xl"
								@click="shuffleTeams"
							/>
						</div>
					</StepPanel>
					<StepPanel :value="2">
						<div class="flex w-full justify-between items-center">
							<Icon
								name="gg:arrow-left"
								size="30"
								class="text-slate-400 hover:text-slate-600 transition-colors mb-0"
								@click="activeStep = 1"
							/>
							<span>
								<b>
									{{ teamCount }}
								</b>
								times de
								<b>
									{{ teamSize }}
								</b>
								Jogadores
							</span>
						</div>
						<div class="w-full">
							<div
								v-for="(team, index) in test.teams"
								:key="index"
							>
								<Divider
									type="solid"
									align="left"
									class="font-bold text-lg"
								>
									<b>Time {{ index + 1 }}</b>
								</Divider>
								<ul>
									<li
										v-for="player in team"
										:key="player.id"
										class="text-lg text-slate-600"
									>
										{{ player.participantName }}
									</li>
								</ul>
							</div>
							<Divider
								layout="horizontal"
								class="font-bold"
								align="center"
								><b>De fora</b></Divider
							>
							<ul>
								<li
									v-for="player in test.remainingParticipants"
									:key="player.id"
									class="text-lg text-slate-600"
								>
									{{ player.participantName }}
								</li>
							</ul>
						</div>
					</StepPanel>
				</StepPanels>
			</Stepper>
		</div>
		<template
			v-if="activeStep === 2"
			#footer
		>
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
						@click="visibleBottom = true"
					/>
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
import type {IEvent, IParticipant} from '~/interfaces'

const props = defineProps<{imageSrc: string; event: IEvent}>()

const {event} = toRefs(props)

const {$toast} = useNuxtApp()

// const {user} = useUserStore()
const teamCount = ref<number>(2)
const teamSize = ref<number>(5)
const activeStep = ref(1)
const test = ref<{
	teams: IParticipant[][]
	remainingParticipants: IParticipant[]
}>({teams: [], remainingParticipants: []})

const modal = ref<boolean>(false)
const visibleBottom = ref<boolean>(false)

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

const share = () => {
	// Define the content you want to share
	const shareText = 'Check out this awesome content!'
	const shareUrl = 'https://yourwebsite.com/awesome-content'
	// Create the WhatsApp share URL
	const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
		shareText
	)}%20${encodeURIComponent(shareUrl)}`
	// Open WhatsApp with the share URL
	window.location.href = whatsappUrl
}

const formatTeamsForClipboard = () => {
	let formattedTeams = ''
	test.value.teams.forEach((team, index) => {
		formattedTeams += `Time ${index + 1}:\n`
		team.forEach((participant) => {
			formattedTeams += `- ${participant.participantName}\n`
		})
		formattedTeams += '\n'
	})
	formattedTeams += `De Fora:`
	formattedTeams += '\n'
	test.value.remainingParticipants.forEach((team) => {
		formattedTeams += `- ${team.participantName}\n`
	})
	return formattedTeams
}

const copyTeamsToClipboard = async () => {
	const teamsText = formatTeamsForClipboard()

	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(teamsText)
		} else {
			const textarea = document.createElement('textarea')
			textarea.value = teamsText
			textarea.style.position = 'fixed'
			textarea.style.opacity = '0'
			document.body.appendChild(textarea)
			textarea.focus()
			textarea.select()

			document.execCommand('copy')
			document.body.removeChild(textarea)
		}
		// Fallback manual

		$toast.success('Copiado para área de transferência')
	} catch (err) {
		$toast.error('Ocorreu um erro copiar para área de transferência')
	}
}

const shuffleTeams = () => {
	// teams = this.divideTeams(this.confirmedParticipants, 2) // 2 times
	test.value = divideTeams(
		participantsConfirmed.value,
		teamCount.value,
		teamSize.value
	)
	activeStep.value = 2
	console.log(divideTeams(participantsConfirmed.value, 2, 6))
}

const openModal = () => {
	modal.value = true
}
</script>

<style scoped></style>
