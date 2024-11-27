<template>
	<AppSectionCard>
		<AppHeadPage>
			<template #content-right>
				<div class="flex justify-center items-center gap-4">
					<AppButtonDropdownV1>
						<template #icon>
							<Icon
								name="ic:round-notifications-active"
								:size="24"
								:class="{
									'text-slate-600/90': !userNotificationConfig,
									'text-blue-600/90': userNotificationConfig,
								}"
							/>
						</template>
						<template #content="{hide}">
							<div
								class="flex flex-col items-center w-full gap-2 border-b border-surface-200 p-4 mb-2 pb-0"
							>
								<Icon
									:name="
										!userNotificationConfig
											? 'ic:round-notifications-active'
											: 'ic:round-notifications-off'
									"
									:size="24"
									class="text-slate-600/90"
								/>
								<p v-if="!userNotificationConfig">
									Deseja receber notificações sobre este evento?
								</p>
								<p v-else>Deseja desativar as notificações para este evento?</p>
							</div>
							<div class="flex justify-end items-center w-full gap-2 py-2 px-2">
								<Button
									size="small"
									outlined
									class="w-20"
									@click="hide"
									>Cancelar</Button
								>
								<Button
									size="small"
									class="w-20"
									@click="
										() => {
											accept()
											hide()
										}
									"
									>Sim</Button
								>
							</div>
						</template>
					</AppButtonDropdownV1>
					<AppButtonDropdownV1>
						<template #icon>
							<Icon
								name="material-symbols:share"
								:size="24"
								class="text-slate-500"
							/>
						</template>
						<template #content>
							<ul
								class="flex flex-col gap-1 w-60 *:flex *:w-full *:items-center *:gap-2 *:p-1 *:rounded-md *:transition-colors *:cursor-pointer"
							>
								<li
									class="hover:bg-slate-200"
									@click="startShare"
								>
									<Icon
										name="mdi:share"
										size="23"
									/>
									Compartilhar evento
								</li>
								<li class="hover:bg-slate-200">
									<Icon
										name="mdi:share"
										size="23"
									/>
									Compartilhar lista de participantes
								</li>
							</ul>
						</template>
					</AppButtonDropdownV1>
				</div>
			</template>
		</AppHeadPage>
		<PartialEventDetails
			v-if="event"
			image-src="~/assets/img/bask.png"
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
} from '~/interfaces'

const {$api, $toast, $socket} = useNuxtApp()
const {user} = useUserStore()

const {share, isSupported} = useShare()

const startShare = () => {
	if (!isSupported.value) return

	share({
		title: 'Compartinhar evento',
		text: 'Venha participar',
		url: route.fullPath,
	})
}

const footerbarStore = useFooterBarStore()
const route = useRoute()
const eventId = ref<number | undefined>(Number(route.params.id))
const timeRemaining = ref<number>(0)
const timerInterval = ref<NodeJS.Timeout>()
const eventParticipantList = ref<IParticipant[]>([])
const userNotificationConfig = ref<{
	eventId?: number
	userId?: string
	id?: number
}>()

const confirm = useConfirm()

const showTemplate = (event: any) => {
	confirm.require({
		target: event.currentTarget,
		group: 'templating',
		rejectProps: {
			label: 'Cancel',
			outlined: true,
		},
		acceptProps: {
			label: 'Confirm',
		},
		accept: async () => {
			if (userNotificationConfig.value) {
				await disableNotification()
				return
			}

			await applyNotification()
		},
		reject: () => {},
	})
}

const accept = async () => {
	if (userNotificationConfig.value) {
		await disableNotification()
		return
	}

	await applyNotification()
}

const applyNotification = async () => {
	const body = {
		userId: user?.userId,
		eventId: eventId.value,
	}

	const req = await $api.raw(
		`/api/v1/notifications/save-user-event-notification`,
		{
			method: 'POST',
			body,
		}
	)

	if (req.status === 201) {
		$toast.success('Você irá receber notificações sobre este evento!')
		userNotificationConfig.value = body
		return
	}

	$toast.error(
		'Ocorreu um erro ao configurar as notificações para este evento!'
	)
}

const disableNotification = async () => {
	const {eventId, userId} = userNotificationConfig.value!

	const req = await $api.raw(
		`/api/v1/notifications/disable/${userId}/${eventId}`,
		{
			method: 'DELETE',
		}
	)

	if (req.status === 200) {
		$toast.success('Você irá receber notificações sobre este evento!')
		userNotificationConfig.value = undefined
		return
	}

	$toast.error(
		'Ocorreu um erro ao configurar as notificações para este evento!'
	)
}

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

const userHasNotificationConfig = async () => {
	const req = await $api.raw(
		`/api/v1/notifications/user-has-nofification-config`,
		{
			retry: false,
			server: false,
			params: {
				userId: user?.userId,
				eventId: eventId.value,
			},
		}
	)

	if (req.status === 200) {
		userNotificationConfig.value = req._data
		return
	}

	if (req.status === 404) {
		console.log('oopes')
		return
	}

	// $toast.error('Ocorreu um erro ao verificar as configurações de notificações.')
}

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

onMounted(async () => {
	footerbarStore.setFooterBarVisible(false)

	await userHasNotificationConfig()

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
