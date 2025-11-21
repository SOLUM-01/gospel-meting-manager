// 참가자 타입 정의
export type ParticipantRole = 'leader' | 'member' | 'volunteer'
export type Gender = 'M' | 'F'
export type TeamCategory = '목사' | '선교사' | '전폭특강' | '전도팀' | '중보기도팀' | '찬양팀' | '부채춤팀' | '푸드팀' | '미용팀' | '물품팀'

// 첨부파일 타입
export interface Attachment {
  id: string
  fileName: string
  fileUrl: string
  fileType: 'image' | 'video' | 'pdf' | 'other'
  fileSize: number
  uploadedAt: Date
}

export interface Participant {
  id: string
  name: string
  nameZh?: string
  gender?: Gender
  englishFirstName?: string
  englishLastName?: string
  phone: string
  email?: string
  imageUrl?: string
  teamId?: string
  teamCategory?: TeamCategory
  role: ParticipantRole
  nationality: string
  position?: string // 직임
  notes?: string
  attachments?: Attachment[] // 첨부파일 목록
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  displayNumber?: number // 화면 표시용 고정 번호
}

export interface CreateParticipantDto {
  name: string
  nameZh?: string
  gender?: Gender
  phone: string
  email?: string
  teamId?: string
  teamCategory?: TeamCategory
  role: ParticipantRole
  nationality: string
  notes?: string
}

export interface UpdateParticipantDto extends Partial<CreateParticipantDto> {
  isActive?: boolean
}

