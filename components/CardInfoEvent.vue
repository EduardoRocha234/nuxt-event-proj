<template>
	<div class="flex flex-col h-full rounded-lg p-4 mt-5 shadow-xl">
		<div class="w-full">
			<img
				class="rounded-lg h-48 w-full object-cover"
				:src="imageSrc"
			/>
		</div>
		<span class="text-3xl font-semibold mt-2 w-full"> {{ title }}</span>
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps<{imageSrc: string; title: string}>()
</script>

<style scoped></style>
