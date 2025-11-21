# 2025 雲林城市耶誕慶典 歡迎光臨 (HI LIGHT CHRISTMAS)

대만 윈린현 도우료우시 제3회 성탄절 복음집회 아웃리치 플랫폼

## 프로젝트 개요

2025년 12월 20일(토)에 열리는 윈린현 도우료우시 성탄절 복음집회 "歡迎光臨(환영광림)" 행사를 위한 관리 플랫폼입니다.

### 주요 이벤트

- **耶誕市集 (크리스마스 마켓)**: 斗六郡公園, 13:00-16:00
- **耶誕慶典 (크리스마스 축제)**: 雲科大 雲秀廳, 19:00-21:30

### 주요 프로그램

- 韓國表演 (한국 공연): Kim Soo, Solnamoo, Kpop 팀
- 韓國美食 (한국 음식)
- 詩歌敲我拜 (시 낭송 대회)
- 國際美食 (국제 미식)
- 經典卡解密 (클래식 카드 해석)

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui + Radix UI
- **상태 관리**: Zustand
- **데이터베이스**: Supabase (PostgreSQL)
- **아이콘**: Lucide React
- **날짜 처리**: date-fns
- **다국어**: 한국어(주), 대만어(번체 중국어)

## 프로젝트 구조

```
init-nextjs-project/
├── app/
│   ├── (public)/              # 공개 페이지
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── participants/      # 참가자 명단
│   │   ├── tasks/             # 할일 리스트
│   │   └── schedule/          # 일정 (캘린더)
│   ├── (admin)/               # 관리자 페이지
│   │   ├── dashboard/         # 대시보드
│   │   ├── tasks/             # 할일 관리
│   │   ├── participants/      # 참가자 관리
│   │   └── schedule/          # 일정 관리
│   ├── admin/login/           # 관리자 로그인
│   ├── api/                   # API 라우트
│   └── store/                 # Zustand 스토어
├── components/
│   ├── public/                # 공개 페이지 컴포넌트
│   ├── admin/                 # 관리자 컴포넌트
│   ├── shared/                # 공통 컴포넌트
│   └── ui/                    # shadcn/ui 컴포넌트
├── lib/
│   ├── database/              # Supabase 데이터베이스
│   │   ├── api/               # API 함수
│   │   ├── migrations/        # SQL 마이그레이션
│   │   ├── types/             # 데이터베이스 타입
│   │   └── supabase.ts        # Supabase 클라이언트
│   └── i18n/                  # 다국어 지원
├── types/                     # TypeScript 타입 정의
├── actions/                   # 서버 액션
└── hooks/                     # 커스텀 훅
```

## 주요 기능

### 공개 페이지

1. **메인 페이지** (`/`)
   - 이벤트 소개 및 주요 정보
   - 히어로 섹션
   - 일정 요약
   - 프로그램 소개

2. **참가자 명단** (`/participants`)
   - 참가자 목록 조회
   - 팀별 그룹화
   - 검색 및 필터링
   - 역할별 필터 (리더, 멤버, 자원봉사자)

3. **할일 리스트** (`/tasks`)
   - 공개 할일 목록
   - 카테고리별 필터
   - 우선순위별 필터
   - 상태별 탭 (전체, 할일, 진행중, 완료)

4. **일정** (`/schedule`)
   - 달력 뷰
   - 리스트 뷰
   - 일정 상세 페이지
   - 이벤트 타임라인

### 관리자 페이지

1. **대시보드** (`/admin/dashboard`)
   - 통계 요약
   - 할일 현황
   - 빠른 작업 버튼

2. **할일 관리** (`/admin/tasks`)
   - 할일 목록 관리
   - 할일 등록/수정/삭제
   - 상태 관리

3. **참가자 관리** (`/admin/participants`)
   - 참가자 등록/수정/삭제
   - 팀 관리

4. **일정 관리** (`/admin/schedule`)
   - 이벤트 등록/수정/삭제
   - 일정 관리

## 데이터 모델

### Participant (참가자)
- 이름 (한국어/대만어)
- 연락처 (전화, 이메일)
- 팀 소속
- 역할 (리더, 멤버, 자원봉사자)
- 국적

### Task (할일)
- 제목 (한국어/대만어)
- 설명 (한국어/대만어)
- 카테고리 (준비, 이벤트, 사후관리, 운영, 프로그램)
- 우선순위 (낮음, 보통, 높음, 긴급)
- 상태 (할일, 진행중, 완료, 취소됨)
- 담당자, 마감일, 태그
- 공개 여부

### Schedule (일정)
- 제목 (한국어/대만어)
- 설명 (한국어/대만어)
- 이벤트 유형 (기자회견, 집회, 콘서트, 아웃리치, 모임)
- 장소 (한국어/대만어)
- 시작/종료 시간
- 출연자
- 참가자 정보

### Team (팀)
- 팀 이름 (한국어/대만어)
- 팀장
- 멤버 수

### Admin (관리자)
- 이메일, 비밀번호
- 이름
- 역할 (최고관리자, 관리자, 운영자)
- 권한

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 설정

Supabase 데이터베이스 연동이 필요합니다. 자세한 설정 방법은 [Supabase 설정 가이드](docs/SUPABASE_SETUP.md)를 참고하세요.

**빠른 시작:**

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. `.env.local` 파일 생성 및 환경 변수 설정:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Supabase SQL Editor에서 `lib/database/migrations/create_tables.sql` 실행
4. (선택) 샘플 데이터: `lib/database/migrations/sample_data.sql` 실행

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. Supabase 연동 테스트

[http://localhost:3000/test/supabase](http://localhost:3000/test/supabase)에서 데이터베이스 연동을 테스트할 수 있습니다.

### 5. 빌드

```bash
npm run build
npm start
```

## 관리자 계정

### 테스트 계정
- 이메일: `admin@gospel.com`
- 비밀번호: `admin123`

⚠️ **주의**: 프로덕션 환경에서는 반드시 계정 정보를 변경하세요!

## 다국어 지원

프로젝트는 한국어(주 언어)와 대만어(번체 중국어)를 지원합니다.

- 기본 언어: 한국어
- 우측 상단 언어 전환 버튼으로 변경 가능
- 모든 주요 텍스트 다국어 지원
- 날짜 형식 자동 변환

## 개발 가이드

### 새 페이지 추가

1. `app/(public)` 또는 `app/(admin)` 디렉토리에 페이지 생성
2. 필요한 컴포넌트를 `components` 디렉토리에 생성
3. 타입 정의를 `types` 디렉토리에 추가
4. 다국어 번역을 `lib/i18n/translations`에 추가

### 새 타입 추가

```typescript
// types/example.ts
export interface Example {
  id: string
  name: string
  nameZh: string
  // ...
}
```

### 다국어 텍스트 추가

```typescript
// lib/i18n/translations/ko.ts
export const ko = {
  // ...
  example: {
    title: '제목',
  },
}

// lib/i18n/translations/zh-TW.ts
export const zhTW = {
  // ...
  example: {
    title: '標題',
  },
}
```

### 다국어 사용

```tsx
'use client'

import { useTranslation } from '@/lib/i18n/use-translation'

export function Component() {
  const { t } = useTranslation()
  
  return <h1>{t('example.title')}</h1>
}
```

## TODO

### 백엔드 연동
- [x] Supabase 데이터베이스 연동
- [x] API 라우트 구현 (참가자, 일정, 할일)
- [x] 데이터베이스 테이블 생성
- [x] CRUD API 함수 구현
- [ ] 서버 액션 구현
- [ ] Supabase Auth 인증 시스템 구현
- [ ] 관리자 권한 관리

### 추가 기능
- [ ] 파일 업로드 (참가자 사진, 이벤트 사진)
- [ ] 실시간 알림
- [ ] 이메일 발송
- [ ] PDF 출력 (참가자 명단, 일정표)
- [ ] QR 코드 생성 (참가자 체크인)

### 개선 사항
- [ ] 반응형 디자인 최적화
- [ ] 접근성 개선
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 에러 핸들링 개선

## 라이선스

이 프로젝트는 교회/종교 단체의 복음 집회를 위한 내부 프로젝트입니다.

## 문의

프로젝트 관련 문의사항은 관리자에게 연락해 주세요.

---

**2025 雲林城市耶誕慶典 歡迎光臨 (HI LIGHT CHRISTMAS)**
© 2025 All rights reserved.
