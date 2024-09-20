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
				:invalid="!!getError('name')"
				fluid
			/>
			<span
				v-if="!!getError('name')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('name') }}
			</span>
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
				:invalid="!!getError('location')"
			/>
			<span
				v-if="!!getError('location')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('location') }}
			</span>
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
				:invalid="!!getError('sportId')"
				fluid
			/>
			<span
				v-if="!!getError('sportId')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('sportId') }}
			</span>
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
				:min="0"
				:use-grouping="false"
				:invalid="!!getError('maxParticipants')"
				fluid
			/>
			<span
				v-if="!!getError('maxParticipants')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('maxParticipants') }}
			</span>
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
				:min="0"
				:use-grouping="false"
				:invalid="!!getError('maxOfParticipantsWaitingList')"
				fluid
			/>
			<span
				v-if="!!getError('maxOfParticipantsWaitingList')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('maxOfParticipantsWaitingList') }}
			</span>
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
				:min-date="new Date()"
				date-format="dd/mm/yy"
				input-id="datetime"
				show-icon
				fluid
				icon-display="input"
				:invalid="!!getError('datetime')"
			/>
			<span
				v-if="!!getError('datetime')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('datetime') }}
			</span>
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
				:invalid="!!getError('startTime')"
			/>
			<span
				v-if="!!getError('startTime')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('startTime') }}
			</span>
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
				:invalid="!!getError('endTime')"
			/>
			<span
				v-if="!!getError('endTime')"
				class="text-red-500 text-sm px-1"
			>
				{{ getError('endTime') }}
			</span>
		</div>
		<div>
			<div class="flex items-center mb-4">
				<Checkbox
					inputId="partcipantsListAlwaysOpen"
					v-model="partcipantsListAlwaysOpen"
					:binary="true"
				/>
				<label
					for="partcipantsListAlwaysOpen"
					class="text-slate-600 text-lg block mb-1 ml-2"
				>
					Lista sempre aberta
				</label>
			</div>
			<Transition name="fade">
				<div
					v-if="!partcipantsListAlwaysOpen"
					class="mb-4"
				>
					<label
						for="openParticipantsListDate"
						class="text-slate-600 text-lg block mb-1"
					>
						Hora/Data de abertura da lista:
					</label>
					<DatePicker
						v-model="form.openParticipantsListDate"
						:max-date="form.datetime || new Date()"
						date-format="dd/mm/yy"
						id="openParticipantsListDate"
						show-time
						fluid
						:invalid="!!getError('openParticipantsListDate')"
					/>
					<span
						v-if="!!getError('openParticipantsListDate')"
						class="text-red-500 text-sm px-1"
					>
						{{ getError('openParticipantsListDate') }}
					</span>
				</div>
			</Transition>
		</div>
	</div>
	<ClientOnly>
		<Teleport to="#footer-content">
			<AppButton
				variant="blue"
				@on-click="onSubmitForm"
			>
				{{ loading ? 'Salvando...' : 'Salvar' }}
			</AppButton>
		</Teleport>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {IEvent} from '~/interfaces'
import * as zod from 'zod'

const {$toast, $api} = useNuxtApp()

const {user} = useUserStore()

const loading = ref<boolean>(false)

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
	adminId: user?.userId,
	openParticipantsListDate: undefined,
}

const partcipantsListAlwaysOpen = ref<boolean>(true)

const form = reactive<IEvent>({
	...initialValues,
})

const schema = zod.object({
	name: zod
		.string({
			required_error: 'Nome é obrigatório',
		})
		.min(1, {message: 'Nome é obrigatório'}),
	location: zod
		.string({
			required_error: 'Local é obrigatório',
		})
		.min(1, {message: 'Local é obrigatório'}),
	maxParticipants: zod.number({
		required_error: 'Número Máx. de Participantes: é obrigatório',
		invalid_type_error: 'Número Máx. de Participantes: é obrigatório',
	}),
	maxOfParticipantsWaitingList: zod.number({
		required_error: 'Número Máx. de Suplentes: é obrigatório',
		invalid_type_error: 'Número Máx. de Suplentes: é obrigatório',
	}),
	sportId: zod.number({
		required_error: 'Esporte é Obrigatório',
		invalid_type_error: 'Esporte é Obrigatório',
	}),
	datetime: zod.date({
		required_error: 'Data é Obrigatório',
		invalid_type_error: 'Data é Obrigatório',
	}),
	startTime: zod.date({
		required_error: 'Horário de Início é Obrigatório',
		invalid_type_error: 'Horário de Início é Obrigatório',
	}),
	endTime: zod.date({
		required_error: 'Horário de Término é Obrigatório',
		invalid_type_error: 'Horário de Término é Obrigatório',
	}),
	openParticipantsListDate: zod
		.date()
		.optional()
		.refine(
			(value: any) => {
				if (!partcipantsListAlwaysOpen.value) {
					return zod.date().safeParse(value).success
				}
				return true
			},
			{
				message: 'Hora/Data de abertura da lista é obrigatório.',
			}
		),
})

const {validate, isValid, getError} = useValidationForm(schema, form)

const {data: sports, status} = await useFetch('/api/v1/sport', {
	lazy: true,
})

const onSubmitForm = async () => {
	await validate()

	if (!isValid.value) return

	if (partcipantsListAlwaysOpen.value) form.openParticipantsListDate = undefined

	try {
		loading.value = true
		const response = await $api.raw('/api/v1/events', {
			method: 'POST',
			body: form,
		})

		if (response.status !== 200) {
			throw new Error('Ocorreu um erro ao criar o evento')
		}

		$toast.success('Evento criado com sucesso!')

		const {id} = response._data!

		await navigateTo(`/v1/event/details/${id}`)
	} catch (error) {
		$toast.error(error ?? 'Ocorreu um erro ao criar o evento')
	} finally {
		loading.value = false
	}
}
</script>

<style scoped></style>
