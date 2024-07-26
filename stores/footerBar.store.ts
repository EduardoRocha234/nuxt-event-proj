export const useFooterBarStore = defineStore('footerBarStore', {
	state: () => ({
		isFooterBarVisible: true,
	}),
	getters: {
		footerBarVisible(): boolean {
			return this.isFooterBarVisible
		},
	},
	actions: {
		setFooterBarVisible(visible: boolean): void {
			this.isFooterBarVisible = visible
		},
	},
	persist: true,
})
