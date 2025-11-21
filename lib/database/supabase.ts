import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 클라이언트 사이드용 Supabase 클라이언트
// RLS 정책을 따름, 브라우저에서 안전하게 사용 가능
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

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

