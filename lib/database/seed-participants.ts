import { supabase } from './supabase'
import { participantsData } from '@/data/participants-data'

/**
 * Supabase 데이터베이스에 참가자 데이터를 초기화합니다.
 * 이 스크립트는 participants-data.ts의 데이터를 데이터베이스에 삽입합니다.
 */
export async function seedParticipants() {
  try {
    console.log('참가자 데이터 초기화 시작...')
    
    // 기존 데이터 삭제 (선택사항)
    // const { error: deleteError } = await supabase
    //   .from('participants')
    //   .delete()
    //   .neq('id', '00000000-0000-0000-0000-000000000000')
    
    // if (deleteError) {
    //   console.error('기존 데이터 삭제 실패:', deleteError)
    //   throw deleteError
    // }
    
    // 데이터 변환 (camelCase -> snake_case)
    const dbParticipants = participantsData.map(p => ({
      name: p.name,
      name_zh: p.nameZh,
      gender: p.gender,
      english_first_name: p.englishFirstName,
      english_last_name: p.englishLastName,
      phone: p.phone || '',
      email: p.email,
      image_url: p.imageUrl,
      team_id: p.teamId,
      team_category: p.teamCategory,
      role: p.role,
      nationality: p.nationality,
      position: p.position,
      notes: p.notes,
      is_active: p.isActive,
    }))
    
    // 데이터 삽입
    const { data, error } = await supabase
      .from('participants')
      .insert(dbParticipants as any)
      .select()
    
    if (error) {
      console.error('데이터 삽입 실패:', error)
      throw error
    }
    
    console.log(`✅ ${data?.length || 0}명의 참가자 데이터가 성공적으로 추가되었습니다.`)
    return data
  } catch (error) {
    console.error('참가자 데이터 초기화 실패:', error)
    throw error
  }
}

/**
 * 정웅규님만 추가하는 함수
 */
export async function addMissionaryPaul() {
  try {
    console.log('정웅규 선교사님 데이터 추가 시작...')
    
    const missionary = participantsData.find(p => p.name === '정웅규')
    
    if (!missionary) {
      throw new Error('정웅규님 데이터를 찾을 수 없습니다.')
    }
    
    const dbParticipant = {
      name: missionary.name,
      name_zh: missionary.nameZh,
      gender: missionary.gender,
      english_first_name: missionary.englishFirstName,
      english_last_name: missionary.englishLastName,
      phone: missionary.phone || '',
      email: missionary.email,
      image_url: missionary.imageUrl,
      team_id: missionary.teamId,
      team_category: missionary.teamCategory,
      role: missionary.role,
      nationality: missionary.nationality,
      position: missionary.position,
      notes: missionary.notes,
      is_active: missionary.isActive,
    }
    
    const { data, error } = await supabase
      .from('participants')
      .insert(dbParticipant as any)
      .select()
      .single()
    
    if (error) {
      console.error('데이터 삽입 실패:', error)
      throw error
    }
    
    console.log('✅ 정웅규 선교사님이 성공적으로 추가되었습니다:', data)
    return data
  } catch (error) {
    console.error('정웅규 선교사님 추가 실패:', error)
    throw error
  }
}

