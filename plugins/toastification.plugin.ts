import * as vt from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	const options: vt.PluginOptions = {
		timeout: 4500,
		position: vt.POSITION.TOP_RIGHT,
		transition: 'Vue-Toastification__fade',
        draggable: true,
        hideProgressBar: true,
	}

	nuxtApp.vueApp.use(vt.default, options)

	return {
		provide: {
			toast: vt.useToast(),
		},
	}
})
