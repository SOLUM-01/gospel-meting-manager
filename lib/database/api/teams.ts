import { supabase } from '../supabase'
import type { Team, CreateTeamDto, UpdateTeamDto } from '@/types/team'

// 모든 팀 조회
export async function getAllTeams() {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data as Team[]
}

// 특정 팀 조회
export async function getTeamById(id: string) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Team
}

// 팀 생성
export async function createTeam(team: CreateTeamDto) {
  const { data, error } = await supabase
    .from('teams')
    .insert({
      name: team.name,
      name_zh: team.nameZh,
      description: team.description,
      leader_id: team.leaderId,
      color: team.color,
      member_count: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data as Team
}

// 팀 업데이트
export async function updateTeam(id: string, updates: UpdateTeamDto) {
  const updateData: any = {}
  
  if (updates.name) updateData.name = updates.name
  if (updates.nameZh) updateData.name_zh = updates.nameZh
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.leaderId !== undefined) updateData.leader_id = updates.leaderId
  if (updates.color !== undefined) updateData.color = updates.color
  if (updates.memberCount !== undefined) updateData.member_count = updates.memberCount

  const { data, error } = await supabase
    .from('teams')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Team
}

// 팀 삭제
export async function deleteTeam(id: string) {
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// 팀 멤버 수 업데이트
export async function updateTeamMemberCount(teamId: string) {
  // 팀의 활성 멤버 수 계산
  const { count, error: countError } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true })
    .eq('team_id', teamId)
    .eq('is_active', true)

  if (countError) throw countError

  // 팀 멤버 수 업데이트
  const { data, error } = await supabase
    .from('teams')
    .update({ member_count: count || 0 })
    .eq('id', teamId)
    .select()
    .single()

  if (error) throw error
  return data as Team
}

