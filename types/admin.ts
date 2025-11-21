// 관리자 타입 정의
export type AdminRole = 'super_admin' | 'admin' | 'moderator'

export interface Admin {
  id: string
  email: string
  password: string
  name: string
  role: AdminRole
  permissions: string[]
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateAdminDto {
  email: string
  password: string
  name: string
  role: AdminRole
  permissions?: string[]
}

export interface UpdateAdminDto extends Partial<Omit<CreateAdminDto, 'password'>> {
  isActive?: boolean
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  admin: Omit<Admin, 'password'>
}

