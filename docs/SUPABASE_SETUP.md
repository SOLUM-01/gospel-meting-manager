# Supabase 연동 가이드

이 문서는 Gospel Meeting 프로젝트에 Supabase를 연동하는 전체 과정을 설명합니다.

## 📋 목차

1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 테이블 생성](#2-데이터베이스-테이블-생성)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [API 사용 방법](#4-api-사용-방법)
5. [테스트](#5-테스트)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성

1. [Supabase 웹사이트](https://supabase.com) 방문
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 1.2 새 프로젝트 생성

1. Dashboard에서 "New Project" 클릭
2. 다음 정보 입력:
   - **Name**: gospel-meeting (또는 원하는 이름)
   - **Database Password**: 안전한 비밀번호 생성 (저장해두기!)
   - **Region**: Northeast Asia (Seoul) - 한국에서 가장 가까운 지역
   - **Pricing Plan**: Free (무료 티어로 시작)
3. "Create new project" 클릭
4. 프로젝트 생성까지 2-3분 대기

---

## 2. 데이터베이스 테이블 생성

### 2.1 SQL Editor 접속

1. Supabase Dashboard에서 왼쪽 메뉴 "SQL Editor" 클릭
2. "New query" 클릭

### 2.2 테이블 생성 SQL 실행

1. `lib/database/migrations/create_tables.sql` 파일 열기
2. 전체 내용을 복사
3. SQL Editor에 붙여넣기
4. "Run" 버튼 클릭 (또는 Ctrl/Cmd + Enter)
5. 성공 메시지 확인: "Success. No rows returned"

### 2.3 테이블 확인

1. 왼쪽 메뉴 "Table Editor" 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - `teams` (팀)
   - `admins` (관리자)
   - `participants` (참가자)
   - `schedules` (일정)
   - `tasks` (할일)
   - `worship_songs` (찬양)

---

## 3. 환경 변수 설정

### 3.1 API 키 가져오기

1. Supabase Dashboard 왼쪽 메뉴에서 "Settings" 클릭
2. "API" 탭 선택
3. 다음 값들을 복사:
   - **Project URL**: `https://xxxxx.supabase.co` 형태
   - **anon public key**: `eyJhbG...` 형태의 긴 문자열

### 3.2 환경 변수 파일 수정

1. 프로젝트 루트의 `.env.local` 파일 열기
2. 복사한 값들을 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. 파일 저장

### 3.3 개발 서버 재시작

```bash
npm run dev
```

---

## 4. API 사용 방법

### 4.1 데이터베이스 직접 접근

프론트엔드에서 Supabase 클라이언트를 직접 사용:

```typescript
import { supabase } from '@/lib/database/supabase'

// 참가자 조회
const { data, error } = await supabase
  .from('participants')
  .select('*')
  .eq('is_active', true)
```

### 4.2 API 함수 사용 (권장)

준비된 API 함수 사용:

```typescript
import { getAllParticipants, createParticipant } from '@/lib/database/api/participants'

// 모든 참가자 조회
const participants = await getAllParticipants()

// 새 참가자 생성
const newParticipant = await createParticipant({
  name: '홍길동',
  nameZh: '洪吉童',
  phone: '010-1234-5678',
  email: 'hong@example.com',
  role: 'member',
  nationality: 'KR',
})
```

### 4.3 REST API 엔드포인트

Next.js API 라우트를 통한 접근:

```typescript
// GET /api/participants - 모든 참가자 조회
const response = await fetch('/api/participants')
const participants = await response.json()

// POST /api/participants - 참가자 생성
const response = await fetch('/api/participants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '홍길동',
    phone: '010-1234-5678',
    role: 'member',
    nationality: 'KR',
  }),
})

// GET /api/participants/[id] - 특정 참가자 조회
const response = await fetch(`/api/participants/${id}`)

// PATCH /api/participants/[id] - 참가자 수정
const response = await fetch(`/api/participants/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '홍길동2' }),
})

// DELETE /api/participants/[id] - 참가자 삭제
const response = await fetch(`/api/participants/${id}`, {
  method: 'DELETE',
})
```

### 4.4 사용 가능한 API 모듈

- **참가자**: `@/lib/database/api/participants`
- **일정**: `@/lib/database/api/schedules`
- **할일**: `@/lib/database/api/tasks`
- **팀**: `@/lib/database/api/teams`
- **찬양**: `@/lib/database/api/worship-songs`
- **관리자**: `@/lib/database/api/admins`

---

## 5. 테스트

### 5.1 Supabase Dashboard에서 테스트

1. Table Editor에서 "Insert row" 클릭
2. 수동으로 테스트 데이터 입력
3. 데이터가 정상적으로 저장되는지 확인

### 5.2 애플리케이션에서 테스트

#### 참가자 생성 테스트

```typescript
// components/test-supabase.tsx
'use client'

import { useState } from 'react'
import { createParticipant } from '@/lib/database/api/participants'

export function TestSupabase() {
  const [result, setResult] = useState<any>(null)

  const testCreate = async () => {
    try {
      const participant = await createParticipant({
        name: '테스트 사용자',
        nameZh: '测试用户',
        phone: '010-0000-0000',
        role: 'member',
        nationality: 'KR',
      })
      setResult(participant)
      alert('참가자 생성 성공!')
    } catch (error: any) {
      alert('에러: ' + error.message)
    }
  }

  return (
    <div className="p-4">
      <button 
        onClick={testCreate}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        참가자 생성 테스트
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
```

### 5.3 브라우저 콘솔에서 테스트

개발자 도구 콘솔에서:

```javascript
// 참가자 조회
fetch('/api/participants')
  .then(res => res.json())
  .then(console.log)

// 일정 조회
fetch('/api/schedules')
  .then(res => res.json())
  .then(console.log)
```

---

## 6. 데이터 모델 구조

### 6.1 참가자 (Participants)

```typescript
{
  id: string                 // UUID
  name: string              // 이름
  nameZh?: string           // 중국어 이름
  gender?: 'M' | 'F'        // 성별
  phone: string             // 전화번호
  email?: string            // 이메일
  teamId?: string           // 팀 ID
  role: 'leader' | 'member' | 'volunteer'
  nationality: string       // 국적
  isActive: boolean         // 활성 상태
  createdAt: Date
  updatedAt: Date
}
```

### 6.2 일정 (Schedules)

```typescript
{
  id: string
  title: string             // 제목
  titleZh: string           // 중국어 제목
  eventType: 'press' | 'rally' | 'concert' | 'outreach' | 'meeting' | 'other'
  location: string          // 장소
  locationZh: string        // 중국어 장소
  startTime: Date
  endTime: Date
  isMainEvent: boolean      // 메인 이벤트 여부
  isPublic: boolean         // 공개 여부
  createdAt: Date
  updatedAt: Date
}
```

### 6.3 할일 (Tasks)

```typescript
{
  id: string
  title: string
  titleZh: string
  category: 'preparation' | 'event' | 'followup' | 'logistics' | 'program'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  assignedTo?: string[]     // 담당자 ID 배열
  teamId?: string
  dueDate?: Date
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

### 6.4 팀 (Teams)

```typescript
{
  id: string
  name: string
  nameZh: string
  leaderId?: string         // 리더 ID
  memberCount: number       // 멤버 수
  color?: string           // 팀 색상
  createdAt: Date
  updatedAt: Date
}
```

### 6.5 찬양 (Worship Songs)

```typescript
{
  id: string
  title: string
  titleZh?: string
  artist?: string
  type: 'hymn' | 'praise' | 'ccm' | 'worship'
  lyrics?: string
  youtubeUrl?: string
  pdfUrl?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

---

## 7. 보안 설정 (Row Level Security)

현재 RLS가 활성화되어 있으며, 공개 데이터(`is_public = true`)만 조회 가능합니다.

### 7.1 인증 추가 시 (향후 작업)

Supabase Auth를 사용하여 사용자 인증을 추가할 수 있습니다:

```typescript
// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})

// 현재 사용자
const { data: { user } } = await supabase.auth.getUser()
```

---

## 8. 문제 해결

### 8.1 연결 오류

**증상**: "Invalid API key" 에러

**해결방법**:
1. `.env.local` 파일의 API 키 확인
2. 개발 서버 재시작 (`npm run dev`)
3. 브라우저 캐시 삭제 후 새로고침

### 8.2 테이블이 없음

**증상**: "relation does not exist" 에러

**해결방법**:
1. SQL Editor에서 `create_tables.sql` 재실행
2. Table Editor에서 테이블 존재 확인

### 8.3 RLS 정책 문제

**증상**: 데이터를 생성/수정할 수 없음

**해결방법**:
1. Supabase Dashboard > Authentication > Policies
2. 임시로 정책 비활성화 (개발 중)
3. 또는 SQL Editor에서 실행:

```sql
-- 임시로 모든 작업 허용 (개발용)
ALTER TABLE participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

---

## 9. 다음 단계

- [ ] Supabase Auth 통합
- [ ] 실시간 구독 (Realtime) 추가
- [ ] 파일 업로드 (Storage) 연동
- [ ] 이메일 알림 설정
- [ ] 백업 자동화

---

## 10. 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript)
- [Next.js와 Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

---

## 문의

문제가 발생하면 다음을 확인하세요:
1. Supabase Dashboard의 Logs
2. 브라우저 개발자 도구 콘솔
3. Next.js 터미널 로그

