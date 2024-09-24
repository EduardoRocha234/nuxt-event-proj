<template>
	<footer
		v-if="footerBarStore.footerBarVisible"
		class="fixed bottom-0 h-16 bg-slate-50 w-full z-40 border-t"
	>
		<SpeedDial
			:model="items"
			:radius="80"
			direction="up"
			style="position: absolute; left: calc(50% - 3rem); bottom: 40px"
		>
			<template #item="{item, toggleCallback}">
				<div
					class="p-2 rounded-full bg-blue-100 text-blue-600"
					@click="toggleCallback"
				>
					{{ item.label }}
				</div>
			</template>
		</SpeedDial>
		<div class="relative flex justify-between px-10 w-full h-full">
			<div class="flex flex-col items-center justify-center text-blue-600">
				<Icon
					name="material-symbols:explore"
					:size="25"
					class=""
				/>
				<span class="text-sm"> Explorar </span>
			</div>
			<div class="flex flex-col items-center justify-center text-blue-600">
				<Icon
					name="fluent:person-48-filled"
					:size="25"
				/>
				<span class="text-sm"> Perfil </span>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import {useFooterBarStore} from '~/stores/footerBar.store'

const footerBarStore = useFooterBarStore()

const items = ref<{label: string; command: () => void}[]>([
	{
		label: 'Criar Evento',
		command: async () => {
			await navigateTo(`/v1/event/create`)
		},
	},
])
</script>

<style scoped></style>
