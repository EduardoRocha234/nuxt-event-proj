<template>
	<footer
		class="fixed bottom-0 h-16 bg-slate-50 w-full z-40 border-t"
		v-if="footerBarStore.footerBarVisible"
	>
		<div class="relative flex justify-between px-10 w-full h-full">
			<div class="flex flex-col items-center justify-center text-blue-600">
				<Icon
					name="material-symbols:explore"
					:size="25"
					class=""
				/>
				<span class="text-sm"> Explorar </span>
			</div>
			<div
				class="-mt-5 flex items-center justify-center h-12 w-12 p-2 bg-blue-800 rounded-full shadow-2xl z-50"
			>
				<Icon
					name="mdi:plus-box"
					:size="22"
					class="text-white"
				/>
			</div>
			<div class="flex flex-col items-center justify-center text-blue-600">
				<Icon
					name="fluent:person-48-filled"
					:size="25"
					class=""
				/>
				<span class="text-sm"> Perfil </span>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import {useFooterBarStore} from '~/stores/footerBar.store'

const footerBarStore = useFooterBarStore()
</script>

<style scoped></style>
