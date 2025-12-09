import { supabase } from '../supabase'
import type { Prayer, CreatePrayerInput } from '@/types/prayer'

// 데이터베이스 행 타입
interface PrayerRow {
  id: string
  user_id: string
  user_name: string
  content: string
  type: 'prayer' | 'devotion'
  created_at: string
  updated_at: string
}

// 기도/말씀 목록 가져오기
export async function getPrayers(): Promise<Prayer[]> {
  const { data, error } = await supabase
    .from('prayers' as never)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('기도/말씀 목록 조회 실패:', error)
    throw error
  }

  return ((data as PrayerRow[]) || []).map((item) => ({
    id: item.id,
    userId: item.user_id,
    userName: item.user_name,
    content: item.content,
    type: item.type,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))
}

// 기도/말씀 추가하기
export async function createPrayer(input: CreatePrayerInput): Promise<Prayer> {
  const { data, error } = await (supabase
    .from('prayers' as never) as ReturnType<typeof supabase.from>)
    .insert({
      user_id: input.userId,
      user_name: input.userName,
      content: input.content,
      type: input.type,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('기도/말씀 추가 실패:', error)
    throw error
  }

  const row = data as unknown as PrayerRow

  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    content: row.content,
    type: row.type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// 기도/말씀 삭제하기
export async function deletePrayer(id: string): Promise<void> {
  const { error } = await supabase
    .from('prayers' as never)
    .delete()
    .eq('id', id)

  if (error) {
    console.error('기도/말씀 삭제 실패:', error)
    throw error
  }
}
