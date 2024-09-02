<template>
	<transition name="fade">
		<div
			v-if="visible"
			class="fixed inset-0 z-30 flex justify-center items-center overflow-hidden"
		>
			<div class="fixed inset-0 bg-black opacity-50 z-20"></div>
			<div
				class="z-30 mx-auto my-auto rounded-xl shadow-lg bg-white flex flex-col"
				:class="[width, height]"
			>
				<div class="w-full border-b py-3">
					<slot
						v-if="$slots.header"
						name="header"
					/>
					<div class="w-full h-full px-7 flex justify-between items-center">
						<span class="font-bold">{{ header }}</span>
						<div
							class="flex items-center justify-center p-1 rounded-full border hover:border-slate-400 transition-colors"
						>
							<Icon
								name="mdi:remove"
								size="15"
								class="text-slate-500 hover:text-slate-800 transition-colors"
								@click="closeModal"
							/>
						</div>
					</div>
				</div>
				<div class="w-full h-full">
					<slot />
				</div>
				<div
					v-if="$slots.footer"
					class="w-full border-t py-5"
				>
					<slot name="footer" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		header?: string
		width?: string
		height?: string
	}>(),
	{
		header: undefined,
		width: 'w-10/12',
		height: 'h-3/6',
	}
)

const visible = defineModel<boolean>('visible', {default: false})

const closeModal = () => {
	visible.value = false
}
</script>

<style scoped></style>
