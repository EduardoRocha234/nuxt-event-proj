import type {PaginationParams} from '../system'
import type {IParticipant} from './participant.interface'

export enum EdaysOfWeek {
	Segunda = 'Monday',
	Terça = 'Tuesday',
	Quarta = 'Wednesday',
	Quinta = 'Thursday',
	Sexta = 'Friday',
	Sábado = 'Saturday',
	Domingo = 'Sunday',
}

export interface IEvent {
	id: number
	name?: string
	sportId?: number
	maxParticipants?: number
	createdAt?: Date
	location?: string
	datetime?: Date
	startTime?: Date
	endTime?: Date
	openParticipantsListDate?: Date
	maxOfParticipantsWaitingList?: number
	adminId?: string
	recurringDay?: EdaysOfWeek
	description?: string
	daysBeforeOpeningList?: number
	participants?: IParticipant[]
}

export interface IInsertParticipantWSEvent {
	eventId: number
	participant: IParticipant
	status: string
}

export interface IRemoveParticipantWSEvent {
	eventId: number
	participant: IParticipant
}

export interface IEventFilterParams extends PaginationParams {
	sportId?: number
	initialPeriod?: Date | string
	finalPeriod?: Date | string
	locale?: string
	name?: string
}
