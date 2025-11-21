import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/database/supabase'

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, role } = await request.json()

    // 입력 검증
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 비밀번호 길이 검증
    if (password.length < 8) {
      return NextResponse.json(
        { error: '비밀번호는 8자 이상이어야 합니다.' },
        { status: 400 }
      )
    }

    // role 기본값 설정 (전달되지 않으면 'user')
    const userRole = role || 'user'

    // Supabase 클라이언트 생성
    const supabase = createServerClient()

    // Supabase Auth를 사용한 회원가입
    // raw_user_meta_data에 role 정보도 함께 저장
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: userRole, // role을 raw_user_meta_data에 저장
        },
      },
    })

    if (authError) {
      // 이메일 중복 등의 에러 처리
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: '이미 사용 중인 이메일입니다.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: '회원가입에 실패했습니다.' },
        { status: 500 }
      )
    }

    // 사용자 정보 반환 (raw_user_meta_data에서 role 가져오기)
    const user = {
      id: authData.user.id,
      email: authData.user.email,
      name,
      phone,
      role: authData.user.user_metadata?.role || userRole,
    }

    // 세션 토큰 (Supabase가 자동으로 관리)
    const token = authData.session?.access_token || ''

    return NextResponse.json(
      {
        user,
        token,
        message: '회원가입에 성공했습니다. 이메일을 확인해주세요.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('회원가입 에러:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

