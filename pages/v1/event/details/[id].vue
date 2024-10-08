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
	<AppFooterBarEmpty>
		<AppButton
			v-if="!userIsInParticipantsList"
			:disabled="event?.participants.length === event?.maxParticipants"
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
	</AppFooterBarEmpty>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const {$api, $toast, $socket} = useNuxtApp()
const {user} = useUserStore()

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()
const route = useRoute()
const eventId = route.params.id

const userIsInParticipantsList = computed(
	() => !!event?.value?.participants.some((p) => p.userId === user?.userId)
)

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

$socket.on('insertParticipant', async () => await refresh())

$socket.on('removeParticipant', async () => await refresh())

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
	footerbarStore.setFooterBarVisible(false)
})
</script>

<style scoped></style>
