<template>
	<div
		class="flex items-center w-full py-1 px-1 rounded-md border transition-all ease-in-out duration-200"
		:class="{
			'border-blue-800': inputIsFocused && !errors,
			'border-red-800': !!errors,
		}"
	>
		<input
			:id="id"
			ref="inputRef"
			v-model="value"
			:type="typeOfInput"
			:name="name"
			:placeholder="placeholder"
			class="w-full placeholder-gray-400 rounded-md px-2 text-sm py-1 bg-transparent reset outline-none transition-colors"
			@focus="onFocusHandler"
			@blur="onFocusHandler"
		/>

		<Icon
			v-if="isPasswordInput"
			:name="typeOfInput === 'password' ? 'mdi:eye' : 'mdi:eye-off'"
			class="text-gray-400 mr-2 cursor-pointer"
			:size="20"
			@click="toggleTypeOfInputPassword"
		/>
	</div>
	<span
		v-if="!!errors"
		class="text-red-500 text-sm px-1"
	>
		{{ errors }}
	</span>
</template>

<script setup lang="ts">
import type {InputTypeHTMLAttribute} from 'vue'

const props = withDefaults(
	defineProps<{
		type?: InputTypeHTMLAttribute
		placeholder?: string
		name?: string
		id?: string
		isPasswordInput?: boolean
		errors?: string
	}>(),
	{
		modelValue: '',
		type: 'text',
		placeholder: undefined,
		name: undefined,
		id: undefined,
		isPasswordInput: false,
		errors: undefined,
	}
)

const {type, placeholder, errors} = toRefs(props)

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void
}>()

const value = defineModel<string>()

const inputRef = ref<HTMLInputElement | null>(null)

const inputIsFocused = ref<boolean>(false)
const typeOfInput = ref<InputTypeHTMLAttribute>(type.value)

const onFocusHandler = (event: FocusEvent) => {
	if (event?.type === 'focus') inputIsFocused.value = true
	else if (event?.type === 'blur') inputIsFocused.value = false
}

const toggleTypeOfInputPassword = () => {
	typeOfInput.value = typeOfInput.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
input.reset:-webkit-autofill,
input.reset:-webkit-autofill:focus {
	-webkit-box-shadow: 0 0 0 30px #f3f4f6 inset !important;
	-webkit-text-fill-color: #4b5563 !important;
}
</style>
