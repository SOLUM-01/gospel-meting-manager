// 할일 타입 정의
export type TaskCategory = 'preparation' | 'event' | 'followup' | 'logistics' | 'program'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled'

export interface Task {
  id: string
  title: string
  titleZh: string
  description?: string
  descriptionZh?: string
  imageUrl?: string
  images?: string[]
  videoUrl?: string
  pptUrl?: string
  category: TaskCategory
  priority: TaskPriority
  status: TaskStatus
  assignedTo?: string[]
  teamId?: string
  dueDate?: Date
  startDate?: Date
  isPublic: boolean
  tags?: string[]
  createdBy: string
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskDto {
  title: string
  titleZh: string
  description?: string
  descriptionZh?: string
  imageUrl?: string
  category: TaskCategory
  priority: TaskPriority
  assignedTo?: string[]
  teamId?: string
  dueDate?: Date
  startDate?: Date
  isPublic: boolean
  tags?: string[]
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: TaskStatus
  completedAt?: Date
}

