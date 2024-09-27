export type NavBarStoreType = {
	isNavbarVisible: boolean
	searchBarIsVisible: boolean
}

export const useNavBarStore = defineStore('navBarStore', {
	state: () =>
		({
			isNavbarVisible: true,
			searchBarIsVisible: true,
		} as NavBarStoreType),
	getters: {
		navBarVisible(): boolean {
			return this.isNavbarVisible
		},
		searchBarVisible(): boolean {
			return this.searchBarIsVisible
		},
		eventFilters() {
			return this.eventFilters
		},
	},
	actions: {
		setNavBarIsVisible(visible: boolean): void {
			this.isNavbarVisible = visible
		},
		setSearchBarIsVisible(visible: boolean): void {
			this.searchBarIsVisible = visible
		},
	},
	persist: true,
})
