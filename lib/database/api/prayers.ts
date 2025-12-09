import { supabase } from '../supabase'
import type { Prayer, CreatePrayerInput } from '@/types/prayer'

// 기도/말씀 목록 가져오기
export async function getPrayers(): Promise<Prayer[]> {
  const { data, error } = await supabase
    .from('prayers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('기도/말씀 목록 조회 실패:', error)
    throw error
  }

  return (data || []).map((item) => ({
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
  const { data, error } = await supabase
    .from('prayers')
    .insert({
      user_id: input.userId,
      user_name: input.userName,
      content: input.content,
      type: input.type,
    })
    .select()
    .single()

  if (error) {
    console.error('기도/말씀 추가 실패:', error)
    throw error
  }

  return {
    id: data.id,
    userId: data.user_id,
    userName: data.user_name,
    content: data.content,
    type: data.type,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// 기도/말씀 삭제하기
export async function deletePrayer(id: string): Promise<void> {
  const { error } = await supabase
    .from('prayers')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('기도/말씀 삭제 실패:', error)
    throw error
  }
}

