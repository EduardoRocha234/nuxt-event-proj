<template>
	<div class="grid grid-cols-1 xl:grid-cols-[80rem_1fr] h-screen">
		<div class="hidden lg:block w-full h-screen bg-blue-800"></div>
		<div class="bg-white h-screen flex justify-center items-center">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
