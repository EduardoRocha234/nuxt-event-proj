import type {IUser} from '../user'

export interface IParticipant {
	id: number
	userId: string
	user?: IUser
	status: string
	createdAt: string
}
