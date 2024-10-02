<template>
	<div class="flex flex-col justify-center items-center gap-2 w-full h-full">
		<div class="relative bg-slate-100/80 rounded-full p-9 overflow-hidden mb-4">
			<Icon
				name="twemoji:spiral-calendar"
				size="10rem"
				class=""
			/>
			<Icon
				name="flat-color-icons:clock"
				size="6rem"
				class="absolute bottom-1 right-1"
			/>
		</div>
		<span class="font-bold text-2xl">Não há eventos futuros</span>
		<span class="text-center font- text-slate-500"
			>Tente novamente mais tarde, ou escolha outras opções de filtros</span
		>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
