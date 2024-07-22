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
			<!-- <AppCardEvent
				title="Basquete no Mariano"
				datetime="18:30 PM"
				location="Ginásio de Esportes António sei lá das quantos, DM"
			/>
			<AppCardEvent
				title="Basquete no Mariano"
				datetime="18:30 PM"
				location="Ginásio de Esportes António sei lá das quantos, DM"
			/> -->
			<AppCardEvent
				v-if="data"
				v-for="event in data.events"
				:key="event.id"
				:title="event.name"
				:datetime="event.datetime"
				:location="event.location"
				:participants="event.participants"
			/>
		</div>
		<!-- {{ status }} -->
		<!-- {{ data }} -->
	</div>
</template>

<script setup lang="ts">
const {data} = await useFetch('/api/v1/events')
</script>

<style scoped></style>
