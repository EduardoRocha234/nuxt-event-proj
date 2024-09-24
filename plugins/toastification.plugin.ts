import * as vt from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	const options: vt.PluginOptions = {
		timeout: 3000,
		position: vt.POSITION.TOP_RIGHT,
		transition: 'Vue-Toastification__bounce',
		draggable: true,
		hideProgressBar: true,
		maxToasts: 2,
	}

	nuxtApp.vueApp.use(vt.default, options)

	return {
		provide: {
			toast: vt.useToast(),
		},
	}
})
