<template>
	<div
		class="flex flex-col max-h-screen w-full px-10 md:px-24 relative justify-center items-center"
	>
		<span class="text-2xl font-bold mb-8">Faça Login na sua conta</span>
		<div class="flex flex-col gap-4 w-full">
			<div>
				<AppInput
					id="email"
					v-model="credentials.email"
					placeholder="Seu Email"
					name="email"
				/>
			</div>
			<div>
				<AppInput
					id="password"
					v-model="credentials.password"
					placeholder="Sua Senha"
					name="password"
				/>
			</div>
			<button
				@click="handleSubmit"
				class="w-full py-2 px-4 bg-blue-500 rounded-xl hover:bg-blue-600 text-white mt-3 transition-all ease-out duration-100 focus:border focus:border-blue-700 focus:outline-none"
			>
				Entrar
			</button>
		</div>
		<div class="flex flex-col items-center justify-center mt-5">
			<span class="text-sm text-slate-500">ou Entre com</span>
			<div class="flex gap-2 mt-5">
				<div
					class="flex items-center justify-center p-2 rounded-xl shadow-2xl cursor-pointer hover:shadow-lg transition-all"
				>
					<Icon
						name="flowbite:google-solid"
						:size="50"
						class="text-red-500"
					/>
				</div>
				<div
					class="flex items-center justify-center p-4 rounded-xl shadow-2xl cursor-pointer hover:shadow-lg transition-all"
				>
					<Icon
						name="fa:facebook-square"
						:size="40"
						class="text-blue-500"
					/>
				</div>
			</div>
		</div>

		<div class="absolute -bottom-48 right-50">
			<span class="font-semibold">Ainda não tem conta? </span>
			<span class="font-semibold text-blue-500 hover:underline cursor-pointer"
				>Cadastre-se</span
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IUser, IUserCrendetials} from '~/interfaces'
import {useUserStore} from '~/stores/user.store'

const {$api} = useNuxtApp()
const userStore = useUserStore()

definePageMeta({
	layout: 'auth',
})

const credentials = reactive<IUserCrendetials>({
	email: '',
	password: '',
})

const handleSubmit = async () => {
	const req = await $api.raw('/api/v1/auth/login', {
		method: 'POST',
		body: credentials,
	})

	if (req.status === 200) {
		if (req?._data?.token) {
			const payloadJwt = extractPayloadJwt<IUser>(req?._data?.token)
			console.log(payloadJwt)
			userStore.setUser(payloadJwt.account)
		}

		await navigateTo('/', {
			replace: true,
		})
	}
}
</script>

<style scoped></style>
