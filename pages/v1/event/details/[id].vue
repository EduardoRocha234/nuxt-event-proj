<template>
	<AppSectionCard>
		<AppHeadPage>
			<template #content-right>
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
			</template>
		</AppHeadPage>
		<PartialEventDetails
			v-if="event"
			image-src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
			:event="event"
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
					@on-click="exitEvent"
				>
					Sair da Lista
				</AppButton>
			</template>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const {$api, $toast, $socket} = useNuxtApp()
const {user} = useUserStore()

const dayjs = useDayjs()

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()
const route = useRoute()
const eventId = route.params.id
const timeRemaining = ref<number>(0)
const timerInterval = ref<NodeJS.Timeout>()

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

const {data: event, refresh} = await useFetch<IEvent>(
	`/api/v1/events/${eventId}`
)

const joinInEvent = async () => {
	const req = await $api.raw(`/api/v1/events/${eventId}/join/${user?.userId}`, {
		method: 'POST',
	})

	if (req.status === 201) {
		await refresh()
		$toast.success('Participante adicionado com sucesso!')
		return
	}

	$toast.error('Ocorreu um erro ao adicionar o participante.')
}

const exitEvent = async () => {
	const req = await $api.raw(
		`/api/v1/events/${eventId}/remove/${user?.userId}`,
		{
			method: 'DELETE',
		}
	)

	if (req.status === 200) {
		await refresh()
		$toast.success('Participante removido com sucesso!')
		return
	}

	$toast.error('Ocorreu um erro ao se remover da lista.')
}

$socket.on('insertParticipant', async () => {
	console.log('teste')
	await refresh()
})

$socket.on('removeParticipant', async () => {
	console.log('teste2')
	await refresh()
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
})
</script>

<style scoped></style>
