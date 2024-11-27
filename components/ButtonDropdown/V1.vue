<template>
	<div class="relative">
		<button
			@click="handleToggleDropdown"
			class="h-10 w-10 border flex justify-center items-center rounded-full cursor-pointer"
		>
			<slot name="icon" />
		</button>
		<Popover ref="op">
			<slot
				name="content"
				:hide="op!.hide"
			/>
		</Popover>
	</div>
</template>

<script setup lang="ts">
import type Popover from 'primevue/popover'

const dropdownRef = ref<HTMLElement | null>(null)
const dropdownIsVisible = ref<boolean>(false)
const op = ref<InstanceType<typeof Popover> | null>(null)

const handleToggleDropdown = (event: Event) => {
	op.value?.toggle(event)
}

onClickOutside(dropdownRef, () => {
	dropdownIsVisible.value = false
})
</script>

<style scoped></style>
