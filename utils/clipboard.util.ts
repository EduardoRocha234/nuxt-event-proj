export const copyToClipboad = async (text: string) => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(text)
		} else {
			const textarea = document.createElement('textarea')
			textarea.value = text
			textarea.style.position = 'fixed'
			textarea.style.opacity = '0'
			document.body.appendChild(textarea)
			textarea.focus()
			textarea.select()

			document.execCommand('copy')
			document.body.removeChild(textarea)
		}
	} catch (err) {
		throw new Error('Ocorreu um erro ao copiar para área de transferência!')
	}
}
