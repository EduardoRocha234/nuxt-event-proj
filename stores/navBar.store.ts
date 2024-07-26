export const useNavBarStore = defineStore('navBarStore', {
	state: () => ({
		isNavbarVisible: true,
		searchBarIsVisible: true,
	}),
	getters: {
		navBarVisible(): boolean {
			return this.isNavbarVisible
		},
		searchBarVisible(): boolean {
			return this.searchBarIsVisible
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
