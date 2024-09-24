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
	createdAt?: string
	location?: string
	datetime?: string
	startTime?: string
	endTime?: string
	openParticipantsListDate?: Date
	maxOfParticipantsWaitingList?: number
	adminId?: string
	recurringDay?: EdaysOfWeek
	participants?: IParticipant[]
}
