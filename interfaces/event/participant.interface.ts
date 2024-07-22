import type {IUser} from '../user'

export interface IParticipant {
	id: number
	userId: string
	user?: IUser
	status: string
	participantName: string
	createdAt: string
}
