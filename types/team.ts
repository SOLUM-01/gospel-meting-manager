// 팀/구역 타입 정의
export interface Team {
  id: string
  name: string
  nameZh: string
  description?: string
  leaderId?: string
  memberCount: number
  color?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTeamDto {
  name: string
  nameZh: string
  description?: string
  leaderId?: string
  color?: string
}

export interface UpdateTeamDto extends Partial<CreateTeamDto> {
  memberCount?: number
}

