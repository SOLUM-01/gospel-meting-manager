import { supabase } from '../supabase'
import type { Task, CreateTaskDto, UpdateTaskDto, TaskStatus, TaskPriority, TaskCategory } from '@/types/task'

// 모든 할일 조회
export async function getAllTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 공개 할일만 조회
export async function getPublicTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('is_public', true)
    .order('due_date', { ascending: true })

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  return ((data as any) || []).map((task: any) => ({
    id: task.id,
    title: task.title,
    titleZh: task.title_zh,
    description: task.description,
    descriptionZh: task.description_zh,
    imageUrl: task.image_url,
    images: task.images,
    videoUrl: task.video_url,
    pptUrl: task.ppt_url,
    category: task.category,
    priority: task.priority,
    status: task.status,
    assignedTo: task.assigned_to,
    teamId: task.team_id,
    dueDate: task.due_date ? new Date(task.due_date) : undefined,
    startDate: task.start_date ? new Date(task.start_date) : undefined,
    isPublic: task.is_public,
    tags: task.tags,
    createdBy: task.created_by,
    completedAt: task.completed_at ? new Date(task.completed_at) : undefined,
    createdAt: new Date(task.created_at),
    updatedAt: new Date(task.updated_at)
  })) as Task[]
}

// 특정 할일 조회
export async function getTaskById(id: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  
  // snake_case를 camelCase로 변환
  const task = data as any
  return {
    id: task.id,
    title: task.title,
    titleZh: task.title_zh,
    description: task.description,
    descriptionZh: task.description_zh,
    imageUrl: task.image_url,
    images: task.images,
    videoUrl: task.video_url,
    pptUrl: task.ppt_url,
    category: task.category,
    priority: task.priority,
    status: task.status,
    assignedTo: task.assigned_to,
    teamId: task.team_id,
    dueDate: task.due_date ? new Date(task.due_date) : undefined,
    startDate: task.start_date ? new Date(task.start_date) : undefined,
    isPublic: task.is_public,
    tags: task.tags,
    createdBy: task.created_by,
    completedAt: task.completed_at ? new Date(task.completed_at) : undefined,
    createdAt: new Date(task.created_at),
    updatedAt: new Date(task.updated_at)
  } as Task
}

// 상태별 할일 조회
export async function getTasksByStatus(status: TaskStatus) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', status)
    .eq('is_public', true)
    .order('priority', { ascending: false })
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 우선순위별 할일 조회
export async function getTasksByPriority(priority: TaskPriority) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('priority', priority)
    .eq('is_public', true)
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 카테고리별 할일 조회
export async function getTasksByCategory(category: TaskCategory) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('category', category)
    .eq('is_public', true)
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 팀별 할일 조회
export async function getTasksByTeam(teamId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('team_id', teamId)
    .eq('is_public', true)
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 할당된 할일 조회
export async function getTasksAssignedTo(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .contains('assigned_to', [userId])
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 할일 생성
export async function createTask(task: CreateTaskDto) {
  const { data, error } = await (supabase as any)
    .from('tasks')
    .insert({
      title: task.title,
      title_zh: task.titleZh,
      description: task.description,
      description_zh: task.descriptionZh,
      image_url: task.imageUrl,
      category: task.category,
      priority: task.priority,
      assigned_to: task.assignedTo,
      team_id: task.teamId,
      due_date: task.dueDate?.toISOString(),
      start_date: task.startDate?.toISOString(),
      is_public: task.isPublic,
      tags: task.tags,
      created_by: 'temp-admin-id', // TODO: 실제 관리자 ID로 교체
      status: 'todo',
    })
    .select()
    .single()

  if (error) throw error
  return data as Task
}

// 할일 업데이트
export async function updateTask(id: string, updates: UpdateTaskDto) {
  const updateData: any = {}
  
  if (updates.title) updateData.title = updates.title
  if (updates.titleZh) updateData.title_zh = updates.titleZh
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.descriptionZh !== undefined) updateData.description_zh = updates.descriptionZh
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl
  if (updates.category) updateData.category = updates.category
  if (updates.priority) updateData.priority = updates.priority
  if (updates.status) updateData.status = updates.status
  if (updates.assignedTo !== undefined) updateData.assigned_to = updates.assignedTo
  if (updates.teamId !== undefined) updateData.team_id = updates.teamId
  if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate?.toISOString()
  if (updates.startDate !== undefined) updateData.start_date = updates.startDate?.toISOString()
  if (updates.isPublic !== undefined) updateData.is_public = updates.isPublic
  if (updates.tags !== undefined) updateData.tags = updates.tags
  if (updates.completedAt !== undefined) updateData.completed_at = updates.completedAt?.toISOString()

  const { data, error } = await (supabase as any)
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Task
}

// 할일 상태 변경
export async function updateTaskStatus(id: string, status: TaskStatus) {
  const updateData: any = { status }
  
  if (status === 'completed') {
    updateData.completed_at = new Date().toISOString()
  }

  const { data, error } = await (supabase as any)
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Task
}

// 할일 삭제
export async function deleteTask(id: string) {
  const { error } = await (supabase as any)
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// 기한이 지난 할일 조회
export async function getOverdueTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .lt('due_date', new Date().toISOString())
    .neq('status', 'completed')
    .neq('status', 'cancelled')
    .order('due_date', { ascending: true })

  if (error) throw error
  return data as Task[]
}

// 오늘 기한인 할일 조회
export async function getTodayTasks() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .gte('due_date', today.toISOString())
    .lt('due_date', tomorrow.toISOString())
    .neq('status', 'completed')
    .neq('status', 'cancelled')
    .order('priority', { ascending: false })

  if (error) throw error
  return data as Task[]
}

