import type {IUser} from '~/interfaces'

type UserStore = {
	user: IUser | null
}

export const useUserStore = defineStore('userStore', {
	state: () =>
		({
			user: null,
		} as UserStore),
	actions: {
		setUser(user: IUser) {
			this.user = user
		},
		async signOut() {
			const token = useCookie('token')
			token.value = null
			await navigateTo('/v1/auth/login', {
				replace: true,
			})
		},
	},
	persist: true,
})
