import { supabase } from '../supabase'
import type { Participant, CreateParticipantDto, UpdateParticipantDto } from '@/types/participant'

// 모든 참가자 조회 (입력 순서대로 정렬)
export async function getAllParticipants() {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })  // 입력 순서대로 (김요성 -> 김민지)

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })) as Participant[]
}

// 특정 참가자 조회
export async function getParticipantById(id: string) {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  } as Participant
}

// 팀별 참가자 조회
export async function getParticipantsByTeam(teamId: string) {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('team_id', teamId)
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })) as Participant[]
}

// 역할별 참가자 조회
export async function getParticipantsByRole(role: 'leader' | 'member' | 'volunteer') {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('role', role)
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })) as Participant[]
}

// 참가자 생성
export async function createParticipant(participant: CreateParticipantDto) {
  const { data, error } = await supabase
    .from('participants')
    .insert({
      name: participant.name,
      name_zh: participant.nameZh,
      gender: participant.gender,
      phone: participant.phone,
      email: participant.email,
      team_id: participant.teamId,
      team_category: participant.teamCategory,
      role: participant.role,
      nationality: participant.nationality,
      notes: participant.notes,
      is_active: true,
    } as any)
    .select()
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  } as Participant
}

// 참가자 업데이트
export async function updateParticipant(id: string, updates: UpdateParticipantDto) {
  const updateData: any = {}
  
  if (updates.name) updateData.name = updates.name
  if (updates.nameZh !== undefined) updateData.name_zh = updates.nameZh
  if (updates.gender !== undefined) updateData.gender = updates.gender
  if (updates.phone) updateData.phone = updates.phone
  if (updates.email !== undefined) updateData.email = updates.email
  if (updates.teamId !== undefined) updateData.team_id = updates.teamId
  if (updates.teamCategory !== undefined) updateData.team_category = updates.teamCategory
  if (updates.role) updateData.role = updates.role
  if (updates.nationality) updateData.nationality = updates.nationality
  if (updates.notes !== undefined) updateData.notes = updates.notes
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive

  const { data, error } = await (supabase as any)
    .from('participants')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  } as Participant
}

// 참가자 삭제 (소프트 삭제)
export async function deleteParticipant(id: string) {
  const { error } = await (supabase as any)
    .from('participants')
    .update({ is_active: false })
    .eq('id', id)

  if (error) throw error
  return true
}

// 참가자 검색 (이름 또는 전화번호)
export async function searchParticipants(query: string) {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`)
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    nameZh: item.name_zh,
    gender: item.gender,
    englishFirstName: item.english_first_name,
    englishLastName: item.english_last_name,
    phone: item.phone,
    email: item.email,
    imageUrl: item.image_url,
    teamId: item.team_id,
    teamCategory: item.team_category,
    role: item.role,
    nationality: item.nationality,
    position: item.position,
    notes: item.notes,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })) as Participant[]
}

