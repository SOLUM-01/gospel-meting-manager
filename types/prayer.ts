export interface Prayer {
  id: string
  userId: string
  userName: string
  content: string
  type: 'prayer' | 'devotion' // 기도 또는 말씀
  createdAt: string
  updatedAt: string
}

export interface CreatePrayerInput {
  userId: string
  userName: string
  content: string
  type: 'prayer' | 'devotion'
}

