import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/database/supabase'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // 입력 검증
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Supabase 클라이언트 생성
    const supabase = createServerClient()

    // Supabase Auth를 사용한 로그인
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // 디버깅: user_metadata 전체 출력
    console.log('=== 로그인 디버그 ===')
    console.log('Email:', authData.user.email)
    console.log('User Metadata:', authData.user.user_metadata)
    console.log('Role:', authData.user.user_metadata?.role)
    console.log('==================')

    // 사용자 정보 반환 (raw_user_meta_data에서 role 가져오기)
    const user = {
      id: authData.user.id,
      email: authData.user.email,
      name: authData.user.user_metadata?.name || '',
      phone: authData.user.user_metadata?.phone || '',
      role: authData.user.user_metadata?.role || 'user', // raw_user_meta_data의 role 사용
    }

    // 세션 토큰 (Supabase가 자동으로 관리)
    const token = authData.session?.access_token || ''

    return NextResponse.json(
      {
        user,
        token,
        message: '로그인에 성공했습니다.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('로그인 에러:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

