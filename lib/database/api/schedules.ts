import { supabase } from '../supabase'
import type { Schedule, CreateScheduleDto, UpdateScheduleDto, EventType } from '@/types/schedule'

// 모든 일정 조회
export async function getAllSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .order('start_time', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Schedule[]
}

// 공개 일정만 조회
export async function getPublicSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_public', true)
    .order('start_time', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Schedule[]
}

// 특정 일정 조회
export async function getScheduleById(id: string) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  } as Schedule
}

// 메인 이벤트만 조회
export async function getMainEvents() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_main_event', true)
    .eq('is_public', true)
    .order('start_time', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Schedule[]
}

// 이벤트 타입별 조회
export async function getSchedulesByEventType(eventType: EventType) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('event_type', eventType)
    .eq('is_public', true)
    .order('start_time', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Schedule[]
}

// 날짜 범위로 조회
export async function getSchedulesByDateRange(startDate: Date, endDate: Date) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .gte('start_time', startDate.toISOString())
    .lte('start_time', endDate.toISOString())
    .eq('is_public', true)
    .order('start_time', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Schedule[]
}

// 일정 생성
export async function createSchedule(schedule: CreateScheduleDto) {
  const { data, error } = await supabase
    .from('schedules')
    .insert({
      title: schedule.title,
      title_zh: schedule.titleZh,
      description: schedule.description,
      description_zh: schedule.descriptionZh,
      event_type: schedule.eventType,
      location: schedule.location,
      location_zh: schedule.locationZh,
      address: schedule.address,
      start_time: schedule.startTime.toISOString(),
      end_time: schedule.endTime.toISOString(),
      performers: schedule.performers,
      is_main_event: schedule.isMainEvent || false,
      color: schedule.color,
      max_participants: schedule.maxParticipants,
      tags: schedule.tags,
      is_public: schedule.isPublic,
      created_by: 'temp-admin-id', // TODO: 실제 관리자 ID로 교체
    })
    .select()
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  } as Schedule
}

// 일정 업데이트
export async function updateSchedule(id: string, updates: UpdateScheduleDto) {
  const updateData: any = {}
  
  if (updates.title) updateData.title = updates.title
  if (updates.titleZh) updateData.title_zh = updates.titleZh
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.descriptionZh !== undefined) updateData.description_zh = updates.descriptionZh
  if (updates.eventType) updateData.event_type = updates.eventType
  if (updates.location) updateData.location = updates.location
  if (updates.locationZh) updateData.location_zh = updates.locationZh
  if (updates.address !== undefined) updateData.address = updates.address
  if (updates.startTime) updateData.start_time = updates.startTime.toISOString()
  if (updates.endTime) updateData.end_time = updates.endTime.toISOString()
  if (updates.performers !== undefined) updateData.performers = updates.performers
  if (updates.isMainEvent !== undefined) updateData.is_main_event = updates.isMainEvent
  if (updates.color !== undefined) updateData.color = updates.color
  if (updates.maxParticipants !== undefined) updateData.max_participants = updates.maxParticipants
  if (updates.currentParticipants !== undefined) updateData.current_participants = updates.currentParticipants
  if (updates.tags !== undefined) updateData.tags = updates.tags
  if (updates.isPublic !== undefined) updateData.is_public = updates.isPublic

  const { data, error } = await supabase
    .from('schedules')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  } as Schedule
}

// 일정 삭제
export async function deleteSchedule(id: string) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// 참가자 수 증가
export async function incrementParticipants(id: string) {
  const schedule = await getScheduleById(id)
  
  if (schedule.maxParticipants && schedule.currentParticipants! >= schedule.maxParticipants) {
    throw new Error('Maximum participants reached')
  }

  const { data, error } = await supabase
    .from('schedules')
    .update({ current_participants: (schedule.currentParticipants || 0) + 1 })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const item = data as any
  return {
    id: item.id,
    title: item.title,
    titleZh: item.title_zh,
    description: item.description,
    descriptionZh: item.description_zh,
    imageUrl: item.image_url,
    eventType: item.event_type,
    location: item.location,
    locationZh: item.location_zh,
    address: item.address,
    startTime: new Date(item.start_time),
    endTime: new Date(item.end_time),
    performers: item.performers,
    isMainEvent: item.is_main_event,
    color: item.color,
    maxParticipants: item.max_participants,
    currentParticipants: item.current_participants,
    tags: item.tags,
    isPublic: item.is_public,
    createdBy: item.created_by,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  } as Schedule
}

