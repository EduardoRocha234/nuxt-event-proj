export type EventsStoreType = {
	filterBarVisible: boolean
	filters: {
		sportId?: number
		name?: string
	}
}

export const useEventStore = defineStore('eventStore', {
	state: () =>
		({
			filterBarVisible: false,
			filters: {
				sportId: undefined,
				name: undefined,
			},
		} as EventsStoreType),
	getters: {
		sportIdFilter(): number | undefined {
			return this.filters.sportId
		},
		filterBarIsVisible(): boolean {
			return this.filterBarVisible
		},
		nameFilter(): string | undefined {
			return this.filters.name
		},
	},
	actions: {
		setSportIdFilter(sportId?: number): void {
			this.filters.sportId = sportId
		},
		setFilterBarVisible(visible: boolean): void {
			this.filterBarVisible = visible
		},
		setNameFilter(name?: string): void {
			this.filters.name = name
		},
	},
	persist: true,
})
