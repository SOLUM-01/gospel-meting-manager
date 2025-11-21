// 일정/이벤트 타입 정의
export type EventType = 'press' | 'rally' | 'concert' | 'outreach' | 'meeting' | 'other'

export interface Schedule {
  id: string
  title: string
  titleZh: string
  description?: string
  descriptionZh?: string
  imageUrl?: string
  eventType: EventType
  location: string
  locationZh: string
  address?: string
  startTime: Date
  endTime: Date
  performers?: string[]
  isMainEvent: boolean
  color?: string
  maxParticipants?: number
  currentParticipants?: number
  tags?: string[]
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateScheduleDto {
  title: string
  titleZh: string
  description?: string
  descriptionZh?: string
  eventType: EventType
  location: string
  locationZh: string
  address?: string
  startTime: Date
  endTime: Date
  performers?: string[]
  isMainEvent?: boolean
  color?: string
  maxParticipants?: number
  tags?: string[]
  isPublic: boolean
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {
  currentParticipants?: number
}

