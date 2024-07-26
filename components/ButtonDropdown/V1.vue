<template>
	<div class="relative">
		<button
			@click="handleToggleDropdown"
			class="h-10 w-10 border flex justify-center items-center rounded-full cursor-pointer pr-[0.20rem]"
		>
			<Icon
				name="material-symbols:share"
				:size="24"
				class="text-slate-500"
			/>
		</button>
		<Transition name="fade">
			<div
				ref="dropdownRef"
				v-if="dropdownIsVisible"
			>
				<slot name="content" />
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownIsVisible = ref<boolean>(false)

const handleToggleDropdown = () =>
	(dropdownIsVisible.value = !dropdownIsVisible.value)

onClickOutside(dropdownRef, () => {
	dropdownIsVisible.value = false
})
</script>

<style scoped></style>
