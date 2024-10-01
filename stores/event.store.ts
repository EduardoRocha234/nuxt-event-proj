export type NavBarStoreType = {
	filterBarVisible: boolean
	filters: {
		sportId?: number
	}
}

export const useEventStore = defineStore('eventStore', {
	state: () =>
		({
			filterBarVisible: false,
			filters: {
				sportId: undefined,
			},
		} as NavBarStoreType),
	getters: {
		sportIdFilter(): number | undefined {
			return this.filters.sportId
		},
		filterBarIsVisible(): boolean {
            return this.filterBarVisible
        },
	},
	actions: {
		setSportIdFilter(sportId?: number): void {
			this.filters.sportId = sportId
		},
		setFilterBarVisible(visible: boolean): void {
			this.filterBarVisible = visible
		},
	},
	persist: true,
})
