<template>
	<div class="grid grid-cols-1 mt-12 px-4">
		<div class="flex items-center justify-between">
			<span class="text-xl font-semibold">Próximos Rachas</span>

			<button class="flex items-center text-sm text-slate-400">
				Ver Todos
				<Icon
					name="ic:sharp-arrow-left"
					:size="20"
					class="transform rotate-180"
				/>
			</button>
		</div>
		<div class="mt-5 flex flex-col gap-4 mb-4">
			<AppCardEvent
				title="Basquete no Mariano"
				hours="18:30 PM"
                location="Ginásio de Esportes António sei lá das quantos, DM"
			/>
			<AppCardEvent
				title="Basquete no Mariano"
				hours="18:30 PM"
                location="Ginásio de Esportes António sei lá das quantos, DM"
			/>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
