<template>
	<Drawer
		v-model:visible="filterBarVisible"
		header="Filtrar Eventos"
		position="bottom"
		block-scroll
		style="height: auto"
	>
		<div>
			<div class="flex gap-2 mb-5">
				<div
					v-for="sport in sports"
					class="flex flex-col text-center gap-1 cursor-pointer"
					@click="setSportIdSelected(sport.id)"
				>
					<div
						class="flex items-center justify-center w-16 h-16 text-md rounded-full transition-all ease-in duration-100 border"
						:class="{
							'bg-blue-500 text-white shadow-lg': sportIdSelected === sport.id,
							'text-slate-600': sportIdSelected !== sport.id,
						}"
					>
						<Icon
							:name="sport.displayIcon"
							size="36"
						/>
					</div>
					<span class="font-semibold text-sm mr-4">{{ sport.name }}</span>
				</div>
				<div
					class="flex flex-col text-center gap-1 cursor-pointer"
					@click="setSportIdSelected()"
				>
					<div
						class="flex items-center justify-center w-16 h-16 text-slate-600 text-md rounded-full transition-all ease-in duration-100 border"
						:class="{
							'bg-blue-500 text-white shadow-lg': sportIdSelected === undefined,
							'text-slate-600': sportIdSelected !== undefined,
						}"
					>
						<Icon
							name="la:infinity"
							size="36"
						/>
					</div>
					<span class="font-semibold text-sm">Todos</span>
				</div>
			</div>
			<div class="mb-5">
				<span class="font-bold text-lg">Período</span>
				<div class="py-2 flex gap-3 w-full mb-2">
					<div
						class="border py-2 px-5 text-center text-nowrap text-slate-500 rounded-lg cursor-pointer"
						:class="{
							'bg-blue-500 text-white': periodoParams.today,
						}"
						@click="selectPeriodo('today')"
					>
						Hoje
					</div>
					<div
						class="border py-2 px-5 text-center text-nowrap text-slate-500 rounded-lg cursor-pointer"
						:class="{
							'bg-blue-500 text-white': periodoParams.tomorrow,
						}"
						@click="selectPeriodo('tomorrow')"
					>
						Amanhã
					</div>
					<div
						class="border py-2 px-5 text-center text-nowrap text-slate-500 rounded-lg cursor-pointer"
						:class="{
							'bg-blue-500 text-white': periodoParams.thisWeek,
						}"
						@click="selectPeriodo('thisWeek')"
					>
						Esta semana
					</div>
				</div>
				<div
					id="selectOnCalendar"
					class="border py-2 px-3 max-w-64 rounded-lg flex justify-between items-center gap-1 cursor-pointer"
					@click="toggle"
				>
					<Icon
						name="solar:calendar-bold"
						size="20"
						class="text-blue-500"
					/>
					<span
						v-if="!dateSelected"
						class="text-slate-500"
						>Escolher no calendário</span
					>
					<span
						v-else
						class="text-slate-500"
					>
						{{ dayjs(dateSelected).format('DD/MM/YYYY') }}
					</span>
					<Icon
						name="weui:arrow-filled"
						size="26"
						class="text-blue-500"
					/>
				</div>
				<Popover ref="dateSelectPopover">
					<div class="mb-4">
						<label
							for="datetime"
							class="text-slate-600 text-lg block mb-1 required"
						>
							Selecione a Data:
						</label>
						<DatePicker
							v-model="dateSelected"
							date-format="dd/mm/yy"
							input-id="datetime"
							show-icon
							show-button-bar
							fluid
							icon-display="input"
						/>
					</div>
				</Popover>
			</div>
			<div>
				<span class="font-bold text-lg">Local</span>
				<InputGroup class="mt-2">
					<InputText
						v-model="filterParams.locale"
						placeholder="Digite o Local..."
					/>
					<InputGroupAddon>
						<Icon
							name="mdi:search"
							size="26"
							class="text-slate-500"
						/>
					</InputGroupAddon>
				</InputGroup>
			</div>
			<div class="mt-6 flex gap-2">
				<Button
					fluid
					severity="secondary"
					outlined
					@click="clearParams"
				>
					Limpar Filtros
				</Button>
				<Button
					fluid
					@click="setParameters"
				>
					Aplicar Filtros
				</Button>
			</div>
		</div>
	</Drawer>
</template>

<script setup lang="ts">
import type {IEventFilterParams} from '~/interfaces'

const dateSelectPopover = ref<any>(null)

const toggle = (event: any) => {
	dateSelectPopover.value?.toggle(event)
}

const dayjs = useDayjs()

const emits = defineEmits<{
	(
		event: 'applyFilters',
		filters: Omit<IEventFilterParams, 'page' | 'pageSize'>
	): void
}>()

const eventStore = useEventStore()

const {filterBarVisible} = storeToRefs(useEventStore())

const {data: sports} = await useFetch('/api/v1/sport', {
	lazy: true,
})

const initPerParamsValues = {
	today: false,
	tomorrow: false,
	thisWeek: false,
}

const periodoParams = reactive({
	...initPerParamsValues,
})

const dateSelected = ref<string>()
const sportIdSelected = ref<number | undefined>()

const filterParamsInitValues: Omit<IEventFilterParams, 'page' | 'pageSize'> =
	{
		sportId: undefined,
		initialPeriod: undefined,
		finalPeriod: undefined,
		locale: undefined,
	}

const filterParams = reactive<Omit<IEventFilterParams, 'page' | 'pageSize'>>({
	...filterParamsInitValues,
})

watch(dateSelected, (nv) => {
	if (nv) {
		Object.assign(periodoParams, initPerParamsValues)
		filterParams.initialPeriod = new Date(nv as string).toISOString()
		filterParams.finalPeriod = new Date(nv as string).toISOString()
	} else {
		filterParams.initialPeriod = undefined
		filterParams.finalPeriod = undefined
	}
})

const setSportIdSelected = (sportId?: number) => {
	sportIdSelected.value = sportId
}

const selectPeriodo = (period: 'today' | 'tomorrow' | 'thisWeek') => {
	dateSelected.value = undefined

	const periodSelectedValue = !periodoParams[period]

	Object.assign(periodoParams, initPerParamsValues)
	periodoParams[period] = periodSelectedValue

	if (!periodoParams[period]) {
		filterParams.initialPeriod = undefined
		filterParams.finalPeriod = undefined
		return
	}

	if (period === 'today') {
		filterParams.initialPeriod = new Date().toISOString()
		filterParams.finalPeriod = new Date().toISOString()
		return
	}

	if (period === 'tomorrow') {
		const tomorrow = dayjs().add(1, 'day').startOf('day').format()

		filterParams.initialPeriod = new Date(tomorrow).toISOString()
		filterParams.finalPeriod = new Date(tomorrow).toISOString()
		return
	}

	if (period === 'thisWeek') {
		const lastDayOfWeek = dayjs().endOf('week').format()

		filterParams.initialPeriod = new Date().toISOString()
		filterParams.finalPeriod = new Date(lastDayOfWeek).toISOString()
		return
	}
}

const clearParams = () => {
	Object.assign(filterParams, filterParamsInitValues)
	Object.assign(periodoParams, initPerParamsValues)
	eventStore.setFilterBarVisible(false)
	emits('applyFilters', filterParams)
}

const setParameters = () => {
	emits('applyFilters', filterParams)
	eventStore.setSportIdFilter(filterParams.sportId)
	eventStore.setFilterBarVisible(false)
}
</script>

<style scoped></style>
