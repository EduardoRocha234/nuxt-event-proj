<template>
	<div class="w-full h-full px-4 relative">
		<div class="w-full flex justify-between mt-5">
			<button
				@click="$router.back()"
				class="h-10 w-10 border flex justify-center items-center rounded-full cursor-pointer"
			>
				<Icon
					name="octicon:arrow-left-16"
					:size="25"
					class="text-slate-500"
				/>
			</button>
			<button
				class="h-10 w-10 border flex justify-center items-center rounded-full cursor-pointer"
			>
				<Icon
					name="mdi:bookmark-outline"
					:size="25"
					class="text-slate-500"
				/>
			</button>
		</div>
		<div class="flex flex-col h-full rounded-lg p-4 mt-5 shadow-2xl">
			<div class="w-full">
				<img
					class="rounded-lg h-48 w-full object-cover"
					src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
				/>
			</div>
			<span class="text-3xl font-semibold mt-2 w-full">
				Basquete no Mariano</span
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
			<div class="flex mt-2 gap-2 bg-slate-100 rounded-xl px-2 py-2">
				<div
					class="flex items-center justify-center bg-blue-100 px-2 rounded-2xl"
				>
					<Icon
						name="mdi:location"
						:size="25"
						class="text-blue-600"
					/>
				</div>
				<span class="text-md text-slate-600"
					>Rua fulano dital, Ginásio tant tatanm asd</span
				>
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
					<div class="flex">3/15</div>
				</div>
				<ol
					class="mt-2 w-full bg-slate-100 border-t-4 border-slate-300 rounded-xl h-72 overflow-y-auto px-8 py-4"
				>
					<li
						class="flex justify-between w-full items-center gap-2 text-md font-semibold text-slate-600 mb-2"
					>
						<span>1 - Eduardo Rocha Aleixo</span>
						<div class="bg-green-300 text-green-800 p-1 text-xs rounded-xl">
							Confirmado
						</div>
					</li>
					<li
						class="flex justify-between w-full items-center gap-2 text-md font-semibold text-slate-600 mb-2"
					>
						<span>2 - Eduardo Rocha Aleixo</span>
						<div class="bg-green-300 text-green-800 p-1 text-xs rounded-xl">
							Confirmado
						</div>
					</li>
					<li
						class="flex justify-between w-full items-center gap-2 text-md font-semibold text-slate-600 mb-2"
					>
						<span>3 - Eduardo Rocha Aleixo</span>
						<div class="bg-green-300 text-green-800 p-1 text-xs rounded-xl">
							Confirmado
						</div>
					</li>
				</ol>
			</div>
		</div>
	</div>
	<div class="fixed bottom-0 w-full flex items-center justify-center py-3 bg-white">
		<button
			class="flex items-center gap-2 justify-center shadow-2xl w-52 px-2 py-2 bg-blue-600 rounded-xl text-lg text-white font-semibold"
		>
		<Icon name="mdi:plus" :size="25"/>
			Entrar na Lista
		</button>
	</div>
</template>

<script setup lang="ts">
import {useFooterBarStore} from '~/stores/footerBar.store'
import {useNavBarStore} from '~/stores/navBar.store'

const navbarStore = useNavBarStore()
const footerbarStore = useFooterBarStore()

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
	footerbarStore.setFooterBarVisible(false)
})
</script>

<style scoped></style>
