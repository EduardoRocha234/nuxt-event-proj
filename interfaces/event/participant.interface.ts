import type {IUser} from '../user'

export type ParticipantStatus = 'confirmed' | 'waiting_list'

export const ParticipantStatusEnum = {
	CONFIRMED: 'confirmed' as ParticipantStatus,
	WATING_LIST: 'waiting_list' as ParticipantStatus,
} as const

export interface IParticipant {
	id: number
	userId: string
	user?: IUser
	status: ParticipantStatus
	participantName: string
	createdAt: Date
}
