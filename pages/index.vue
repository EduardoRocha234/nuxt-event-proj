<template>
	<div
		class="grid grid-cols-1 mt-12 px-4"
		ref="el"
	>
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
		<div
			v-if="data"
			class="mt-5 flex flex-col gap-4 mb-8"
		>
			<AppCardEvent
				v-for="event in data.events"
				:key="event.id"
				:event="event"
			/>
		</div>
		<div
			v-if="status === 'pending'"
			class="flex flex-col gap-4"
		>
			<LazyAppCardSkeleton />
			<LazyAppCardSkeleton />
			<LazyAppCardSkeleton />
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IEvent, MetaData, PaginationParams} from '~/interfaces'
import {useFooterBarStore} from '~/stores/footerBar.store'
import {useNavBarStore} from '~/stores/navBar.store'

const el = ref<HTMLElement | null>(null)

const pagination = reactive<PaginationParams>({
	page: 1,
	pageSize: 5,
})

const {data, status} = await useFetch<{events: IEvent[]; metadata: MetaData}>(
	'/api/v1/events',
	{
		params: pagination,
		watch: [pagination],
	}
)

const {arrivedState} = useScroll(document)

watch(arrivedState, (nv) => {
	if (
		nv.bottom &&
		!data.value?.metadata.isLastPage &&
		status.value !== 'pending'
	) {
		pagination.pageSize += 5
	}
})

const navbarStore = useNavBarStore()
const footerStore = useFooterBarStore()

onMounted(() => {
	navbarStore.setSearchBarIsVisible(true)
	footerStore.setFooterBarVisible(true)
})
</script>

<style scoped></style>
