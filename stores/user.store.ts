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
	},
	persist: true,
})
