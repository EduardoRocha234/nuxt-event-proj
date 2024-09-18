<template>
	<div class="w-full h-full px-2">
		<div class="flex-auto mb-4">
			<label
				for="name"
				class="text-slate-600 text-lg block mb-1"
			>
				Nome do Evento / Racha:
			</label>
			<InputText
				v-model="form.name"
				input-id="name"
				fluid
			/>
		</div>
		<div class="flex-auto mb-4">
			<label
				for="location"
				class="text-slate-600 text-lg block mb-1"
			>
				Local:
			</label>
			<InputText
				v-model="form.location"
				input-id="location"
				fluid
			/>
		</div>
		<div class="flex-auto mb-4">
			<label
				for="location"
				class="text-slate-600 text-lg block mb-1"
			>
				Esporte:
			</label>
			<Select
				v-model="form.sportId"
				:options="sports || []"
				option-label="name"
				option-value="id"
				placeholder="Selecione"
				:loading="status === 'pending'"
				fluid
			/>
		</div>
		<div class="flex-auto mb-4">
			<label
				for="maxParticipants"
				class="text-slate-600 text-lg block mb-1"
			>
				Número Máx. de Participantes:
			</label>
			<InputNumber
				v-model="form.maxParticipants"
				input-id="maxParticipants"
				show-buttons
				:use-grouping="false"
				fluid
			/>
		</div>
		<div class="flex-auto mb-4">
			<label
				for="maxOfParticipantsWaitingList"
				class="text-slate-600 text-lg block mb-1"
			>
				Número Máx. de Suplentes:
			</label>
			<InputNumber
				v-model="form.maxOfParticipantsWaitingList"
				input-id="maxOfParticipantsWaitingList"
				show-buttons
				:use-grouping="false"
				fluid
			/>
		</div>
		<div class="mb-4">
			<label
				for="datetime"
				class="text-slate-600 text-lg block mb-1"
			>
				Data:
			</label>
			<DatePicker
				v-model="form.datetime"
				input-id="datetime"
				show-icon
				fluid
				icon-display="input"
			/>
		</div>
		<div class="mb-4">
			<label
				for="startTime"
				class="text-slate-600 text-lg block mb-1"
			>
				Horário de Início:
			</label>
			<DatePicker
				v-model="form.startTime"
				id="startTime"
				time-only
				fluid
			/>
		</div>
		<div class="mb-4">
			<label
				for="endTime"
				class="text-slate-600 text-lg block mb-1"
			>
				Horário de Término:
			</label>
			<DatePicker
				v-model="form.endTime"
				id="endTime"
				time-only
				fluid
			/>
		</div>
	</div>
	<ClientOnly>
		<Teleport to="#test">
			<AppButton
				variant="blue"
				@on-click=""
			>
				Salvar
			</AppButton>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'

const initialValues: IEvent = {
	id: 0,
	name: undefined,
	location: undefined,
	maxParticipants: undefined,
	maxOfParticipantsWaitingList: undefined,
	sportId: undefined,
	datetime: undefined,
	startTime: undefined,
	endTime: undefined,
	adminId: undefined,
}

const form = reactive<IEvent>({
	...initialValues,
})

const {data: sports, status} = await useFetch('/api/v1/sport', {
	lazy: true,
})
</script>

<style scoped></style>
