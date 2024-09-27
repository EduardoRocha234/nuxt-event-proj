export type NavBarStoreType = {
	filters: {
		sportId?: number
	}
}

export const useEventStore = defineStore('eventStore', {
	state: () => ({
        filters: {
            sportId: undefined,
        }
    } as NavBarStoreType),
	getters: {
		sportIdFilter(): number | undefined {
			return this.filters.sportId
		},
	},
	actions: {
		setSportIdFilter(sportId?: number): void {
			this.filters.sportId = sportId
		},
	},
	persist: true,
})
