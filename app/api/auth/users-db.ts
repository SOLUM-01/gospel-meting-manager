// 임시 사용자 데이터베이스 (실제로는 데이터베이스를 사용해야 함)
// 로그인과 회원가입 API에서 공유하는 데이터

export interface User {
  id: string
  email: string
  password: string // 실제로는 해시된 비밀번호를 사용해야 함
  name: string
  phone?: string
  role: string
}

// 초기 테스트 사용자
export const users: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: '테스트 사용자',
    role: 'user',
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: '관리자',
    role: 'admin',
  },
]

