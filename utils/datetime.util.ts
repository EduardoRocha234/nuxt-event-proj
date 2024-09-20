export const convertToLocalTime = (utcDate: string | Date) => {
	const date = new Date(utcDate)

	// Extrai os componentes da data e hora
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() é 0-indexed
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = '00'

	// Retorna no formato 'YYYY-MM-DDTHH:MM:SS'
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
