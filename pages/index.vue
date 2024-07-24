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
				v-if="data"
				v-for="event in data.events"
				:key="event.id"
				:event="event"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useFooterBarStore} from '~/stores/footerBar.store'
import {useNavBarStore} from '~/stores/navBar.store'

const {data} = await useFetch('/api/v1/events')

const navbarStore = useNavBarStore()
const footerStore = useFooterBarStore()

onMounted(() => {
	navbarStore.setSearchBarIsVisible(true)
	footerStore.setFooterBarVisible(true)
})
</script>

<style scoped></style>
