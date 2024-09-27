<template>
	<header
		ref="header"
		id="header"
		class="px-5 relative flex flex-col font-medium justify-between text-lg transition-all ease-in-out duration-300 bg-blue-500"
		:class="{
			'rounded-b-[3rem]': navbarStore.searchBarIsVisible,
			'py-9': navbarStore.searchBarIsVisible,
			'py-4': !navbarStore.searchBarIsVisible,
			'shadow-md': !navbarStore.searchBarIsVisible,
		}"
	>
		<nav
			class="flex justify-between items-center w-full text-white font-bold text-xl"
		>
			<Icon
				name="ri:menu-2-fill"
				:size="35"
				class="text-white cursor-pointer hover:text-slate-300 transition-colors"
				@click="sideBarVisible = true"
			/>
			<NuxtLink to="/">PgConnect</NuxtLink>
			<div
				class="flex justify-center items-center p-2 rounded-full bg-blue-400"
			>
				<Icon
					name="mi:notification"
					:size="25"
					class="text-white"
				/>
			</div>
		</nav>
		<div
			class="flex justify-between items-center mt-5 mb-3"
			v-if="navbarStore.searchBarIsVisible"
		>
			<div class="flex gap-2">
				<Icon
					name="ri:search-line"
					:size="25"
					class="text-white"
				/>
				<div class="px-2 border-l-2">
					<input
						class="w-full h-full bg-transparent placeholder:text-slate-100 placeholder:opacity-50 focus:outline-none text-white"
						placeholder="Pesquisar..."
					/>
				</div>
			</div>
			<div
				class="flex items-center px-2 py-1 gap-1 text-sm bg-blue-400 rounded-full text-white"
			>
				<div class="flex justify-center items-center p-1 border rounded-full">
					<Icon
						name="ion:filter"
						:size="15"
					/>
				</div>
				Filtros
			</div>
		</div>
		<div
			class="absolute -bottom-4 flex gap-2"
			v-if="navbarStore.searchBarIsVisible"
		>
			<template v-if="status === 'pending'">
				<Skeleton
					width="6rem"
					height="2.5rem"
					borderRadius="3rem"
				></Skeleton>
				<Skeleton
					width="6rem"
					height="2.5rem"
					borderRadius="3rem"
				></Skeleton>
				<Skeleton
					width="6rem"
					height="2.5rem"
					borderRadius="3rem"
				></Skeleton>
			</template>
			<template v-else>
				<div
					v-for="sport in sports"
					class="flex items-center gap-1 text-white text-md px-2 py-1 rounded-full transition-all ease-in duration-100 cursor-pointer"
					:class="[
						{
							'border-2 border-slate-300 shadow-sm': sportIdFilter === sport.id,
							'bg-blue-800': !sport.displayColor,
						},
						sport.displayColor,
					]"
					@click="eventStore.setSportIdFilter(sport.id)"
				>
					<Icon
						:name="sport.displayIcon"
						:size="20"
					/>
					{{ sport.name }}
				</div>
				<div
					class="flex items-center gap-1 bg-blue-300 text-white text-md px-2 py-1 rounded-full cursor-pointer"
					:class="{
						'border-2 border-slate-300 shadow-sm': sportIdFilter === undefined,
					}"
					@click="eventStore.setSportIdFilter()"
				>
					<Icon
						name="la:infinity"
						:size="20"
					/>
					Todos
				</div>
			</template>
		</div>
	</header>
</template>

<script setup lang="ts">
import {useEventStore} from '~/stores/event.store'
import {useNavBarStore} from '~/stores/navBar.store'

const navbarStore = useNavBarStore()
const eventStore = useEventStore()

const sideBarVisible = defineModel<boolean>('sidebarVisible', {default: false})

const {sportIdFilter} = storeToRefs(useEventStore())

const {data: sports, status} = await useFetch('/api/v1/sport', {
	lazy: true,
})
</script>

<style scoped></style>
