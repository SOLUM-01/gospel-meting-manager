import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Supabase URL이 유효한지 확인
const isValidUrl = (url: string) => {
  try {
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

const isSupabaseConfigured = isValidUrl(supabaseUrl) && supabaseAnonKey.length > 0

// Supabase 설정 상태 확인
export const isSupabaseReady = isSupabaseConfigured

// 클라이언트 사이드용 Supabase 클라이언트
// RLS 정책을 따름, 브라우저에서 안전하게 사용 가능
// 타입을 non-null로 정의하여 TypeScript 에러 방지
export const supabase: SupabaseClient<Database> = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key')

// 서버 컴포넌트용 Supabase 클라이언트 (anon key 사용)
// RLS 정책을 따름
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// 관리자용 Supabase 클라이언트 (service role key 사용)
// ⚠️ 서버 사이드에서만 사용! RLS 정책을 우회할 수 있음
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

