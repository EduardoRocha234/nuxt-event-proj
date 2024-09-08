<template>
	<div class="flex items-center gap-2 bg-slate-100 rounded-xl px-2 py-2">
		<div
			class="flex items-center justify-center h-10 w-10 bg-blue-100 px-2 rounded-2xl"
		>
			<Icon
				name="mdi:location"
				:size="25"
				class="text-blue-600"
			/>
		</div>
		<span class="text-md text-slate-600">{{ location }}</span>
	</div>
</template>

<script setup lang="ts">
const {location} = defineProps<{location: string}>()
</script>

<style scoped></style>
