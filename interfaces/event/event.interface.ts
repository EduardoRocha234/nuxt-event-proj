import type { IParticipant } from "./participant.interface"

export interface IEvent {
    id: number
    name: string
    sportId: number
    maxParticipants: number
    createdAt: Date
    location: string
    datetime: Date
    startTime: Date
    endTime: Date
    participants: IParticipant[]
  }