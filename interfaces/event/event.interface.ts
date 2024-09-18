import type { IParticipant } from "./participant.interface"

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
    maxOfParticipantsWaitingList?: number
    adminId?: string
    participants?: IParticipant[]
  }