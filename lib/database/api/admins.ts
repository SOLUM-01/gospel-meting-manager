import { supabase } from '../supabase'
import type { Admin, CreateAdminDto, UpdateAdminDto, LoginDto } from '@/types/admin'

// 모든 관리자 조회
export async function getAllAdmins() {
  const { data, error } = await supabase
    .from('admins')
    .select('id, email, name, role, permissions, is_active, last_login_at, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Omit<Admin, 'password'>[]
}

// 특정 관리자 조회
export async function getAdminById(id: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('id, email, name, role, permissions, is_active, last_login_at, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Omit<Admin, 'password'>
}

// 이메일로 관리자 조회 (비밀번호 포함 - 내부 사용)
export async function getAdminByEmail(email: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data as Admin
}

// 관리자 생성
export async function createAdmin(admin: CreateAdminDto) {
  // 비밀번호 해싱은 실제로는 bcrypt 등을 사용해야 합니다
  const { data, error } = await supabase
    .from('admins')
    .insert({
      email: admin.email,
      password: admin.password, // TODO: bcrypt로 해싱 필요
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions || [],
      is_active: true,
    })
    .select('id, email, name, role, permissions, is_active, last_login_at, created_at, updated_at')
    .single()

  if (error) throw error
  return data as Omit<Admin, 'password'>
}

// 관리자 업데이트
export async function updateAdmin(id: string, updates: UpdateAdminDto) {
  const updateData: any = {}
  
  if (updates.email) updateData.email = updates.email
  if (updates.name) updateData.name = updates.name
  if (updates.role) updateData.role = updates.role
  if (updates.permissions !== undefined) updateData.permissions = updates.permissions
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive

  const { data, error } = await supabase
    .from('admins')
    .update(updateData)
    .eq('id', id)
    .select('id, email, name, role, permissions, is_active, last_login_at, created_at, updated_at')
    .single()

  if (error) throw error
  return data as Omit<Admin, 'password'>
}

// 관리자 삭제
export async function deleteAdmin(id: string) {
  const { error } = await supabase
    .from('admins')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// 관리자 로그인 (간단 버전)
export async function loginAdmin(credentials: LoginDto) {
  try {
    const admin = await getAdminByEmail(credentials.email)
    
    // 실제로는 bcrypt.compare를 사용해야 합니다
    if (admin.password !== credentials.password) {
      throw new Error('Invalid credentials')
    }

    if (!admin.is_active) {
      throw new Error('Account is inactive')
    }

    // 마지막 로그인 시간 업데이트
    await supabase
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', admin.id)

    // 비밀번호 제외하고 반환
    const { password, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  } catch (error) {
    throw error
  }
}

// 비밀번호 변경
export async function changePassword(id: string, newPassword: string) {
  // TODO: bcrypt로 해싱 필요
  const { error } = await supabase
    .from('admins')
    .update({ password: newPassword })
    .eq('id', id)

  if (error) throw error
  return true
}

