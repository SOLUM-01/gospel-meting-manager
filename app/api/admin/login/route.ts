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

    // admins 테이블에서 관리자 찾기
    const { data: admin, error: dbError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    console.log('=== 관리자 로그인 디버그 ===')
    console.log('Email:', email)
    console.log('Admin found:', admin)
    console.log('DB Error:', dbError)
    console.log('=========================')

    // 관리자를 찾지 못했거나 에러가 발생한 경우
    if (dbError || !admin) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // 타입 안정성을 위한 명시적 체크
    const adminData = admin as any

    // 비밀번호 확인 (실제로는 bcrypt 등을 사용해야 하지만, 현재는 평문)
    if (adminData.password !== password) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // 마지막 로그인 시간 업데이트
    await supabase
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', adminData.id)

    // 관리자 정보 반환 (비밀번호 제외)
    const user = {
      id: adminData.id,
      email: adminData.email,
      name: adminData.name,
      role: adminData.role,
      permissions: adminData.permissions,
      isActive: adminData.is_active,
    }

    // 간단한 토큰 생성 (실제로는 JWT 등을 사용해야 함)
    const token = Buffer.from(JSON.stringify({
      id: adminData.id,
      email: adminData.email,
      role: adminData.role,
      timestamp: Date.now()
    })).toString('base64')

    return NextResponse.json(
      {
        user,
        token,
        message: '관리자 로그인에 성공했습니다.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('관리자 로그인 에러:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

