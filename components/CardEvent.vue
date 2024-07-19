<template>
	<div
		class="w-full flex flex-col gap-1 h-[16.5rem] shadow-lg rounded-2xl px-4 py-4 border-t"
	>
		<div class="relative">
			<div
				class="absolute flex flex-col items-center gap-0 top-2 left-2 px-3 py-1 rounded-lg bg-white"
			>
				<span class="text-lg font-bold text-red-400">10</span
				><span class="-mt-2 font-semibold text-red-400">JUL</span>
			</div>
			<img
				src="https://portalvidalivre.com/uploads/content/image/100624/Design_sem_nome_-_2022-01-31T233027.903__1_.jpg"
				class="w-full object-cover h-36 rounded-xl"
			/>
		</div>
		<div class="flex justify-between mt-1">
			<span class="font-bold text-lg">
				{{ title }}
			</span>
			<span class="text-red-400">{{ hours }}</span>
		</div>
		<div class="text-xs text-slate-500">
			Fulano, Sicrano, Silva... + 11 pessoas confirmadas
		</div>
		<div class="flex items-center -ml-1 w-8/12">
			<Icon
				name="mdi:location"
				class="text-slate-400"
				:size="35"
			/>
			<span class="text-slate-500 text-sm truncate font-semibold" :title="location">
				{{ location }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		title: string
		hours: string
		location: string
	}>(),
	{}
)
</script>

<style scoped></style>
