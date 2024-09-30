<template>
	<AppSectionCard>
		<AppHeadPage>
			<template #content-right>
				<div class="flex justify-center items-center gap-4">
					<button
						class="h-10 w-10 border flex justify-center items-center rounded-full cursor-pointer"
					>
						<Icon
							name="material-symbols:bookmark-outline"
							:size="24"
							class="text-slate-500/80"
						/>
					</button>
					<AppButtonDropdownV1>
						<template #content>
							<div
								class="absolute right-0 -bottom-[11rem] border rounded-md bg-white shadow-lg z-50 w-48 p-3 flex flex-col gap-2"
							>
								<div
									class="w-full h-10 flex items-center gap-1 hover:bg-slate-100 p-2 rounded-md text-sm text-slate-600 font-semibold"
								>
									<Icon
										name="mdi:share"
										:size="20"
									/>
									<span> Compartilhar Racha </span>
								</div>
								<div
									class="w-full h-10 flex items-center gap-1 hover:bg-slate-100 p-1 rounded-md text-sm text-slate-600 font-semibold"
								>
									<Icon
										name="mdi:share"
										:size="20"
										class="w-10 h-10"
									/>
									<span> Compartilhar lista de participantes </span>
								</div>
								<div
									class="w-full h-10 flex items-center gap-1 hover:bg-slate-100 p-1 rounded-md text-sm text-slate-600 font-semibold"
								>
									<Icon
										name="mdi:share"
										:size="22"
									/>
									<span>Enviar Convite</span>
								</div>
							</div>
						</template>
					</AppButtonDropdownV1>
				</div>
			</template>
		</AppHeadPage>
		<PartialEventDetails
			v-if="event"
			image-src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
			:event="event"
			:event-participant-list="eventParticipantList"
		/>
	</AppSectionCard>
	<ClientOnly>
		<Teleport to="#footer-content">
			<template v-if="event?.openParticipantsListDate && timeRemaining > 0">
				<span class="text-lg"> Lista abre em: </span>
				<span class="text-lg font-semibold">
					{{ formattedTime }}
				</span>
			</template>
			<template v-else>
				<AppButton
					v-if="!userIsInParticipantsList"
					:disabled="event?.participants?.length === event?.maxParticipants"
					@on-click="joinInEvent"
				>
					<Icon
						name="mdi:plus"
						:size="25"
					/>
					Entrar na Lista
				</AppButton>
				<AppButton
					v-else
					variant="orange"
					@on-click="exitTheEvent"
				>
					Sair da Lista
				</AppButton>
			</template>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {
	IEvent,
	IInsertParticipantWSEvent,
	IParticipant,
	IRemoveParticipantWSEvent,
	ParticipantInEventList,
} from '~/interfaces'

const {$api, $toast, $socket} = useNuxtApp()
const {user} = useUserStore()

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()
const route = useRoute()
const eventId = ref<number | undefined>(Number(route.params.id))
const timeRemaining = ref<number>(0)
const timerInterval = ref<NodeJS.Timeout>()
const eventParticipantList = ref<IParticipant[]>([])

const formattedTime = computed(() => {
	const seconds = Math.floor((timeRemaining.value / 1000) % 60)
	const minutes = Math.floor((timeRemaining.value / 1000 / 60) % 60)
	const hours = Math.floor((timeRemaining.value / (1000 * 60 * 60)) % 24)
	const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
	return `${days}d ${hours}h ${minutes}m ${seconds}s`
})

const userIsInParticipantsList = computed(
	() => !!event?.value?.participants?.some((p) => p.userId === user?.userId)
)

const updateTimeRemaining = () => {
	if (!event.value?.openParticipantsListDate) return

	const now = new Date().getTime()
	const targetTime = new Date(
		convertToLocalTime(event.value?.openParticipantsListDate)
	).getTime()

	timeRemaining.value = targetTime - now

	if (timeRemaining.value <= 0) {
		timeRemaining.value = 0
		clearInterval(timerInterval.value)
	}
}

const {data: event} = await useFetch<IEvent>(
	`/api/v1/events/${eventId.value}`,
	{
		retry: false,
		server: false,
		onResponse: ({response}) => {
			if (response.status === 200) {
				eventParticipantList.value = response._data.participants ?? []
				return
			}

			$toast.error('Ocorreu um erro ao buscar o evento')
		},
	}
)

const joinInEvent = async () => {
	const req = await $api.raw(
		`/api/v1/events/${eventId.value}/join/${user?.userId}`,
		{
			method: 'POST',
		}
	)

	if (req.status === 201) {
		$toast.success('Participante adicionado com sucesso!')
		return
	}

	$toast.error('Ocorreu um erro ao adicionar o participante.')
}

const exitTheEvent = async () => {
	const req = await $api.raw(
		`/api/v1/events/${eventId.value}/remove/${user?.userId}`,
		{
			method: 'DELETE',
		}
	)

	if (req.status === 200) {
		$toast.success('Participante removido com sucesso!')
		return
	}

	$toast.error('Ocorreu um erro ao se remover da lista.')
}

$socket.on('insertParticipant', async (event: IInsertParticipantWSEvent) => {
	// essa abordagem usei para testar se melhora (diminui) a quantidade de chamadas ao servidor, pois não precisa buscar as informações do evento sempre que 
	// alguem entrar na lista
	if (event.eventId === eventId.value) {
		eventParticipantList.value.push(event.participant)
	}
})

$socket.on('removeParticipant', async (event: IRemoveParticipantWSEvent) => {
	if (event.eventId === eventId.value) {
		const index = eventParticipantList.value.findIndex(
			(participant) => participant.id === event.participant.id
		)
		eventParticipantList.value.splice(index, 1)
	}
})

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
	footerbarStore.setFooterBarVisible(false)

	updateTimeRemaining()

	timerInterval.value = setInterval(() => {
		updateTimeRemaining()
	}, 500)
})

onBeforeUnmount(() => {
	clearInterval(timerInterval.value)
	eventId.value = undefined
})
</script>

<style scoped></style>
