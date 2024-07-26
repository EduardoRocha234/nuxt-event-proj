<template>
	<button
		@click="emits('onClick', $event)"
		class="flex items-center gap-2 justify-center shadow-2xl w-52 px-2 py-2 rounded-xl text-lg text-white font-semibold"
		:class="
			!disabled
				? buttonVariants[variant].default
				: buttonVariants[variant].disabled
		"
		:disabled="disabled"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
const buttonVariants = {
	blue: {default: 'bg-blue-600', disabled: 'pointer-events-none bg-blue-400'},
	orange: {
		default: 'bg-orange-500',
		disabled: 'pointer-events-none bg-orange-300',
	},
	red: {default: 'bg-red-600', disabled: 'pointer-events-none bg-red-400'},
	green: {
		default: 'bg-green-600',
		disabled: 'pointer-events-none bg-green-400',
	},
}

withDefaults(
	defineProps<{disabled?: boolean; variant?: keyof typeof buttonVariants}>(),
	{
		disabled: false,
		variant: 'blue',
	}
)

const emits = defineEmits<{
	(event: 'onClick', payload: MouseEvent): void
}>()
</script>

<style scoped></style>
