export interface PaginationParams {
	page: number
	pageSize: number
}

export interface MetaData {
	totalPages: number
	currentPage: number
	nextPage?: number
	previousPage?: number
	isLastPage: boolean
}
