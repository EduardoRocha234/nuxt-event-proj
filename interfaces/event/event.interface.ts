import type { IParticipant } from "./participant.interface"

export interface IEvent {
    id: number
    name: string
    sportId: number
    maxParticipants: number
    createdAt: string
    location: string
    datetime: string
    participants: IParticipant[]
  }