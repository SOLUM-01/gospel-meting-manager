# Database API 문서

Supabase를 사용한 데이터베이스 API 모듈입니다.

## 📁 구조

```
lib/database/
├── supabase.ts              # Supabase 클라이언트 설정
├── types/
│   └── database.ts          # Supabase 데이터베이스 타입
├── api/
│   ├── participants.ts      # 참가자 API
│   ├── schedules.ts         # 일정 API
│   ├── tasks.ts             # 할일 API
│   ├── teams.ts             # 팀 API
│   ├── worship-songs.ts     # 찬양 API
│   └── admins.ts            # 관리자 API
└── migrations/
    ├── create_tables.sql    # 테이블 생성 SQL
    └── sample_data.sql      # 샘플 데이터 SQL
```

## 🚀 빠른 시작

### 1. 환경 설정

`.env.local` 파일에 Supabase 정보 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. 기본 사용법

```typescript
import { getAllParticipants, createParticipant } from '@/lib/database/api/participants'

// 데이터 조회
const participants = await getAllParticipants()

// 데이터 생성
const newParticipant = await createParticipant({
  name: '홍길동',
  phone: '010-1234-5678',
  role: 'member',
  nationality: 'KR',
})
```

## 📚 API 모듈별 기능

### Participants (참가자)

```typescript
import * as ParticipantsAPI from '@/lib/database/api/participants'

// 조회
await ParticipantsAPI.getAllParticipants()
await ParticipantsAPI.getParticipantById(id)
await ParticipantsAPI.getParticipantsByTeam(teamId)
await ParticipantsAPI.getParticipantsByRole('leader')
await ParticipantsAPI.searchParticipants('김철수')

// 생성/수정/삭제
await ParticipantsAPI.createParticipant(data)
await ParticipantsAPI.updateParticipant(id, updates)
await ParticipantsAPI.deleteParticipant(id)
```

### Schedules (일정)

```typescript
import * as SchedulesAPI from '@/lib/database/api/schedules'

// 조회
await SchedulesAPI.getAllSchedules()
await SchedulesAPI.getPublicSchedules()
await SchedulesAPI.getScheduleById(id)
await SchedulesAPI.getMainEvents()
await SchedulesAPI.getSchedulesByEventType('rally')
await SchedulesAPI.getSchedulesByDateRange(startDate, endDate)

// 생성/수정/삭제
await SchedulesAPI.createSchedule(data)
await SchedulesAPI.updateSchedule(id, updates)
await SchedulesAPI.deleteSchedule(id)
await SchedulesAPI.incrementParticipants(id)
```

### Tasks (할일)

```typescript
import * as TasksAPI from '@/lib/database/api/tasks'

// 조회
await TasksAPI.getAllTasks()
await TasksAPI.getPublicTasks()
await TasksAPI.getTaskById(id)
await TasksAPI.getTasksByStatus('in_progress')
await TasksAPI.getTasksByPriority('high')
await TasksAPI.getTasksByCategory('preparation')
await TasksAPI.getTasksByTeam(teamId)
await TasksAPI.getTasksAssignedTo(userId)
await TasksAPI.getOverdueTasks()
await TasksAPI.getTodayTasks()

// 생성/수정/삭제
await TasksAPI.createTask(data)
await TasksAPI.updateTask(id, updates)
await TasksAPI.updateTaskStatus(id, 'completed')
await TasksAPI.deleteTask(id)
```

### Teams (팀)

```typescript
import * as TeamsAPI from '@/lib/database/api/teams'

// 조회
await TeamsAPI.getAllTeams()
await TeamsAPI.getTeamById(id)

// 생성/수정/삭제
await TeamsAPI.createTeam(data)
await TeamsAPI.updateTeam(id, updates)
await TeamsAPI.deleteTeam(id)
await TeamsAPI.updateTeamMemberCount(teamId)
```

### Worship Songs (찬양)

```typescript
import * as WorshipAPI from '@/lib/database/api/worship-songs'

// 조회
await WorshipAPI.getAllWorshipSongs()
await WorshipAPI.getPublicWorshipSongs()
await WorshipAPI.getWorshipSongById(id)
await WorshipAPI.getWorshipSongsByType('hymn')
await WorshipAPI.searchWorshipSongs('주님')
await WorshipAPI.getWorshipSongsByTags(['은혜', '찬양'])

// 생성/수정/삭제
await WorshipAPI.createWorshipSong(data)
await WorshipAPI.updateWorshipSong(id, updates)
await WorshipAPI.deleteWorshipSong(id)
```

### Admins (관리자)

```typescript
import * as AdminsAPI from '@/lib/database/api/admins'

// 조회
await AdminsAPI.getAllAdmins()
await AdminsAPI.getAdminById(id)
await AdminsAPI.getAdminByEmail(email)

// 생성/수정/삭제
await AdminsAPI.createAdmin(data)
await AdminsAPI.updateAdmin(id, updates)
await AdminsAPI.deleteAdmin(id)
await AdminsAPI.loginAdmin({ email, password })
await AdminsAPI.changePassword(id, newPassword)
```

## 🔒 에러 처리

모든 API 함수는 에러 발생 시 예외를 throw합니다. try-catch로 처리하세요:

```typescript
try {
  const participants = await getAllParticipants()
  console.log(participants)
} catch (error: any) {
  console.error('에러:', error.message)
  // 사용자에게 에러 메시지 표시
}
```

## 🎯 컴포넌트에서 사용 예제

### 클라이언트 컴포넌트

```typescript
'use client'

import { useState, useEffect } from 'react'
import { getAllParticipants } from '@/lib/database/api/participants'
import type { Participant } from '@/types/participant'

export function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllParticipants()
        setParticipants(data)
      } catch (error) {
        console.error('Failed to load participants:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div>로딩 중...</div>

  return (
    <div>
      {participants.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  )
}
```

### 서버 컴포넌트

```typescript
import { getAllSchedules } from '@/lib/database/api/schedules'

export default async function SchedulePage() {
  const schedules = await getAllSchedules()

  return (
    <div>
      {schedules.map(schedule => (
        <div key={schedule.id}>
          <h2>{schedule.title}</h2>
          <p>{schedule.location}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🔄 실시간 구독 (향후 추가)

```typescript
import { supabase } from '@/lib/database/supabase'

// 실시간 변경 구독
const subscription = supabase
  .channel('participants-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'participants' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// 구독 해제
subscription.unsubscribe()
```

## 📖 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [설정 가이드](../../docs/SUPABASE_SETUP.md)

