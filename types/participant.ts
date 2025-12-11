// 참가자 타입 정의
export type ParticipantRole = 'leader' | 'member' | 'volunteer'
export type Gender = 'M' | 'F'
export type TeamCategory = '목사' | '선교사' | '장로' | '총괄팀장' | '전폭특강' | '전도팀' | '찬양팀' | '중보기도' | '부채춤' | '푸드' | '차량물품' | '미용' | '양재수요' | '광주' | '양재주일' | '주간반' | '저녁반' | '무소속'

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

