<template>
	<div class="px-2 w-full h-full flex items-center justify-center">
		<Stepper
			v-model:value="activeStep"
			linear
			class="basis-[40rem]"
		>
			<StepList>
				<Step
					v-slot="{activateCallback, value, a11yAttrs}"
					as-child
					:value="1"
				>
					<div
						class="flex flex-row flex-auto gap-2 ml-7"
						v-bind="a11yAttrs.root"
					>
						<button
							class="bg-transparent border-0 inline-flex flex-col gap-2"
							v-bind="a11yAttrs.header"
							@click="activateCallback"
						>
							<span
								:class="[
									'rounded-full border-2 w-10 h-10 inline-flex items-center justify-center transition-colors',
									{'border-blue-200': value === activeStep},
								]"
							>
								<Icon
									name="mdi:form-outline"
									size="20"
									class="transition-colors"
									:class="{
										'text-slate-400': value !== activeStep,
										'text-blue-400': value === activeStep,
									}"
								/>
							</span>
						</button>
						<Divider />
					</div>
				</Step>
				<Step
					v-slot="{value}"
					as-child
					:value="2"
				>
					<Divider />
					<div class="flex flex-row justify-end flex-auto gap-2 mr-7">
						<button class="bg-transparent border-0 inline-flex flex-col gap-2">
							<span
								:class="[
									'rounded-full border-2 w-10 h-10 inline-flex items-center justify-center transition-colors',
									{'border-blue-200': value === activeStep},
								]"
							>
								<Icon
									name="fa6-solid:people-group"
									size="20"
									class="transition-colors"
									:class="{
										'text-slate-400': value !== activeStep,
										'text-blue-400': value === activeStep,
									}"
								/>
							</span>
						</button>
					</div>
				</Step>
			</StepList>
			<StepPanels>
				<StepPanel :value="1">
					<div class="flex flex-col gap-4 w-full">
						<div class="flex-auto">
							<label
								for="withoutgrouping"
								class="font-semibold block mb-1"
							>
								Quantidade de times
							</label>
							<InputNumber
								v-model="teamCount"
								input-id="withoutgrouping"
								show-buttons
								:use-grouping="false"
								fluid
							/>
						</div>
						<div class="flex-auto mb-5">
							<label
								for="withoutgrouping"
								class="font-semibold block mb-1"
							>
								Quantidade de pessoas por time
							</label>
							<InputNumber
								v-model="teamSize"
								input-id="withoutgrouping"
								show-buttons
								:use-grouping="false"
								fluid
							/>
						</div>
						<Button
							label="Embaralhar"
							class="!rounded-xl"
							@click="emits('shuffleTeams')"
						/>
					</div>
				</StepPanel>
				<StepPanel :value="2">
					<div class="flex w-full justify-between items-center">
						<Icon
							name="gg:arrow-left"
							size="30"
							class="text-slate-400 hover:text-slate-600 transition-colors mb-0"
							@click="activeStep = 1"
						/>
						<span>
							<b>
								{{ teamCount }}
							</b>
							times de
							<b>
								{{ teamSize }}
							</b>
							Jogadores
						</span>
					</div>
					<div class="w-full">
						<div
							v-for="(team, index) in shuffleTeamsArray?.teams || []"
							:key="index"
						>
							<Divider
								type="solid"
								align="left"
								class="font-bold text-lg"
							>
								<b>Time {{ index + 1 }}</b>
							</Divider>
							<ul>
								<li
									v-for="player in team"
									:key="player.id"
									class="text-lg text-slate-600"
								>
									{{ player.participantName }}
								</li>
							</ul>
						</div>
						<Divider
							layout="horizontal"
							class="font-bold"
							align="center"
							><b>De fora</b></Divider
						>
						<ul>
							<li
								v-for="player in shuffleTeamsArray?.remainingParticipants || []"
								:key="player.id"
								class="text-lg text-slate-600"
							>
								{{ player.participantName }}
							</li>
						</ul>
					</div>
				</StepPanel>
			</StepPanels>
		</Stepper>
	</div>
</template>

<script setup lang="ts">
import type {IShuffleTeams} from './ConteudoRodapeEmbaralharTimes.vue'

const props = defineProps<{shuffleTeamsArray?: IShuffleTeams}>()

const {shuffleTeamsArray} = toRefs(props)

const emits = defineEmits<{
	(event: 'shuffleTeams'): void
}>()

const activeStep = defineModel<number>('activeStep', {default: 1})
const teamCount = defineModel<number>('teamCount', {default: 1})
const teamSize = defineModel<number>('teamSize', {default: 5})
</script>

<style scoped></style>
