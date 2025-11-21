// 찬양 타입 정의
export type WorshipType = 'hymn' | 'praise' | 'ccm' | 'worship'

export interface WorshipSong {
  id: string
  title: string
  titleZh?: string
  artist?: string
  type: WorshipType
  lyrics?: string
  imageUrl?: string
  pdfUrl?: string
  youtubeUrl?: string
  sheetMusicUrl?: string
  tags?: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateWorshipSongDto {
  title: string
  titleZh?: string
  artist?: string
  type: WorshipType
  lyrics?: string
  imageUrl?: string
  pdfUrl?: string
  youtubeUrl?: string
  sheetMusicUrl?: string
  tags?: string[]
  isPublic: boolean
}

