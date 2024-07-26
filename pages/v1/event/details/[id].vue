<template>
	<div class="w-full h-full px-4 relative mb-20">
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
		<AppCardInfoEvent
			image-src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
			:title="data?.name || ''"
		>
			<div class="flex mt-4 gap-2 bg-slate-100 rounded-xl px-2 py-2">
				<div
					class="flex items-center justify-center bg-blue-100 p-2 rounded-2xl"
				>
					<Icon
						name="solar:calendar-bold"
						:size="26"
						class="text-blue-600"
					/>
				</div>
				<div class="flex flex-col">
					<span class="font-semibold uppercase">22 JULHO, 2024 </span>
					<span class="text-xs text-slate-600"
						>Quinta feira, 18:00PM ás 19:00PM</span
					>
				</div>
			</div>
			<div
				class="flex items-center mt-2 gap-2 bg-slate-100 rounded-xl px-2 py-2"
			>
				<div
					class="flex items-center justify-center h-10 w-10 bg-blue-100 px-2 rounded-2xl"
				>
					<Icon
						name="mdi:location"
						:size="25"
						class="text-blue-600"
					/>
				</div>
				<span class="text-md text-slate-600">{{ data?.location }}</span>
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
						{{ data?.participants.length }}/{{ data?.maxParticipants }}
					</div>
				</div>
				<ol
					class="relative mt-2 w-full bg-slate-100 border-t-4 border-slate-300 rounded-xl h-72 overflow-y-auto px-6 py-4"
				>
					<li
						v-for="(participant, index) in data?.participants"
						:class="{
							'font-bold text-blue-600': participant.userId === user?.userId,
							'font-semibold text-slate-600':
								participant.userId !== user?.userId,
						}"
						class="flex justify-between w-full items-center gap-2 text-md mb-2"
					>
						<span>{{ index + 1 }} - {{ participant.participantName }}</span>
						<div
							class="p-1 text-xs rounded-xl"
							:class="{
								'bg-green-300 text-green-800':
									participant.status === 'confirmed',
								'bg-orange-300 text-orange-800':
									participant.status === 'waiting_list',
							}"
						>
							{{
								participant.status === 'confirmed' ? 'Confirmado' : 'Suplente'
							}}
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
			<!-- {{ data }} -->
		</AppCardInfoEvent>
	</div>
	<AppFooterBarEmpty>
		<AppButton
			@on-click="joinInEvent"
			v-if="!userIsInParticipantsList"
		>
			<Icon
				name="mdi:plus"
				:size="25"
			/>
			Entrar na Lista
		</AppButton>
		<AppButton
			@on-click="exitEvent"
			variant="orange"
			v-else
		>
			Sair da Lista
		</AppButton>
	</AppFooterBarEmpty>
</template>

<script setup lang="ts">
import {useFooterBarStore} from '~/stores/footerBar.store'
import {useNavBarStore} from '~/stores/navBar.store'
import {useUserStore} from '~/stores/user.store'

const {$api, $toast, $socket} = useNuxtApp()

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()
const {user} = useUserStore()
const route = useRoute()
const eventId = route.params.id

const userIsInParticipantsList = computed(
	() => !!data?.value?.participants.some((p) => p.userId === user?.userId)
)

const {data, refresh} = await useFetch(`/api/v1/events/${eventId}`)

const joinInEvent = async () => {
	console.log(user)
	const req = await $api.raw(
		`/api/v1/events/${data.value?.id}/join/${user?.userId}`,
		{
			method: 'POST',
		}
	)

	if (req.status === 201) {
		await refresh()
		console.log('Participante adicionado com sucesso!')
	} else {
		$toast.error('Ocorreu um erro ao adicionar o participante.')
	}
}

const exitEvent = async () => {
	console.log(user)
	const req = await $api.raw(
		`/api/v1/events/${data.value?.id}/remove/${user?.userId}`,
		{
			method: 'DELETE',
		}
	)

	if (req.status === 200) {
		await refresh()
		console.log('Participante removido com sucesso!')
	} else {
		$toast.error('Ocorreu um erro ao se remover da lista.')
	}
}

$socket.on('insertParticipant', async () => {
	await refresh()
})

$socket.on('removeParticipant', async () => {
	await refresh()
})

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
	footerbarStore.setFooterBarVisible(false)
})
</script>

<style scoped></style>
