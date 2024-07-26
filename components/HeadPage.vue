<template>
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
		<slot name="content-right" />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
