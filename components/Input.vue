<template>
	<div
		class="w-full py-1 px-1 rounded-md border transition-all ease-in-out duration-200"
		:class="{
			'border-blue-800': inputIsFocused,
		}"
	>
		<input
			ref="inputRef"
			v-model="value"
			:type="type"
			:name="name"
			:placeholder="placeholder"
			class="w-full placeholder-gray-400 rounded-md px-2 text-sm py-1 bg-transparent reset outline-none transition-colors"
			@focus="onFocusHandler"
			@blur="onFocusHandler"
		/>
	</div>
</template>

<script setup lang="ts">
import type {InputTypeHTMLAttribute} from 'vue'

const props = withDefaults(
	defineProps<{
		type?: InputTypeHTMLAttribute
		placeholder?: string
		name?: string
		id?: string
	}>(),
	{
		modelValue: '',
		type: 'text',
		placeholder: undefined,
		name: undefined,
		id: undefined,
	}
)

const {type, placeholder} = toRefs(props)

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const value = defineModel<string>()

const inputRef = ref<HTMLInputElement | null>(null)

const inputIsFocused = ref(false)

const onFocusHandler = (event: FocusEvent) => {
	if (event?.type === 'focus') inputIsFocused.value = true
	else if (event?.type === 'blur') inputIsFocused.value = false
}
</script>

<style scoped>
input.reset:-webkit-autofill,
input.reset:-webkit-autofill:focus {
	-webkit-box-shadow: 0 0 0 30px #f3f4f6 inset !important;
	-webkit-text-fill-color: #4b5563 !important;
}
</style>
