# 🎉 Supabase 데이터베이스에 데이터 추가하기

> **초등학생도 따라할 수 있는 쉬운 가이드!** 🌟

---

## 📖 목차
1. [Supabase란?](#1-supabase란)
2. [데이터베이스 접속하기](#2-데이터베이스-접속하기)
3. [참가자 추가하기](#3-참가자-추가하기)
4. [일정 추가하기](#4-일정-추가하기)
5. [사역 추가하기](#5-사역-추가하기)
6. [데이터 확인하기](#6-데이터-확인하기)

---

## 1. Supabase란?

**Supabase**는 온라인 데이터 저장소예요! 📦

마치 **구글 시트**(엑셀)처럼 데이터를 표로 저장할 수 있는데,
웹사이트에서 자동으로 이 데이터를 가져와서 보여줄 수 있어요!

---

## 2. 데이터베이스 접속하기

### 🔑 1단계: Supabase 로그인
1. 웹브라우저에서 [https://supabase.com](https://supabase.com) 접속
2. 로그인 버튼 클릭
3. 이메일과 비밀번호로 로그인

### 📂 2단계: 프로젝트 선택
1. 로그인하면 프로젝트 목록이 보여요
2. 우리가 만든 프로젝트를 클릭해요

### 🗂️ 3단계: 테이블 에디터 열기
1. 왼쪽 메뉴에서 **"Table Editor"** (테이블 편집기) 클릭
2. 여기서 데이터를 추가하고 수정할 수 있어요!

---

## 3. 참가자 추가하기 👥

### 🎯 참가자 데이터란?
복음 집회에 참여하는 사람들의 정보예요!
- 이름, 전화번호, 팀, 역할 등을 저장해요

### ✏️ 추가 방법

#### 방법 1: 화면에서 직접 추가하기 (쉬운 방법!) ⭐

1. **Table Editor** 화면에서 **"participants"** 테이블을 클릭해요
2. 오른쪽 위에 **"Insert row"** (행 추가) 버튼을 클릭해요
3. 각 항목에 정보를 입력해요:

```
필수 항목 (꼭 입력해야 해요!):
✅ name: 한국어 이름 (예: 홍길동)
✅ phone: 전화번호 (예: 010-1234-5678)
✅ role: 역할 (선택: leader, member, volunteer 중 하나)
✅ nationality: 국적 (예: 한국)

선택 항목 (입력하면 좋아요):
📝 name_zh: 중국어 이름 (예: 洪吉洞)
📝 gender: 성별 (M 또는 F)
📝 english_first_name: 영어 이름 (예: GILDONG)
📝 english_last_name: 영어 성 (예: HONG)
📝 email: 이메일
📝 team_category: 팀 (예: 전도팀, 찬양팀, 중보기도, 푸드, 차량물품, 부채춤, 미용)
📝 position: 직책 (예: 팀장, 총괄팀장)
📝 image_url: 사진 링크
📝 notes: 메모

자동 입력 (건드리지 마세요!):
🤖 id: 자동 생성됨
🤖 is_active: true (자동으로 체크됨)
🤖 created_at: 생성 시간 (자동)
🤖 updated_at: 수정 시간 (자동)
```

4. 모든 정보를 입력했으면 **"Save"** (저장) 버튼을 클릭해요!

#### 방법 2: SQL로 추가하기 (고급 방법)

1. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
2. **"New query"** (새 쿼리) 버튼 클릭
3. 아래 코드를 복사해서 붙여넣기:

```sql
-- 참가자 1명 추가하기
INSERT INTO participants (
  name,           -- 이름
  name_zh,        -- 중국어 이름
  phone,          -- 전화번호
  email,          -- 이메일
  gender,         -- 성별
  team_category,  -- 팀
  role,           -- 역할
  nationality,    -- 국적
  position,       -- 직책
  is_active       -- 활성화
) VALUES (
  '홍길동',                    -- 이름
  '洪吉洞',                    -- 중국어 이름
  '010-1234-5678',            -- 전화번호
  'hong@example.com',         -- 이메일
  'M',                        -- 성별 (M=남자, F=여자)
  '전도팀',                    -- 팀
  'member',                   -- 역할 (leader=팀장, member=팀원, volunteer=자원봉사자)
  '한국',                      -- 국적
  '전도팀원',                  -- 직책
  true                        -- 활성화 (true=보임, false=숨김)
);
```

4. **"RUN"** (실행) 버튼을 클릭하면 데이터가 추가돼요!

### 💡 참가자 여러 명 한꺼번에 추가하기

```sql
-- 여러 명 한꺼번에 추가하기
INSERT INTO participants (name, name_zh, phone, role, nationality, team_category, is_active) VALUES
('김철수', '金哲洙', '010-1111-2222', 'leader', '한국', '전도팀', true),
('이영희', '李英姬', '010-2222-3333', 'member', '한국', '찬양팀', true),
('박민수', '朴民秀', '010-3333-4444', 'member', '한국', '중보기도', true),
('최지은', '崔智恩', '010-4444-5555', 'member', '한국', '푸드', true);
```

---

## 4. 일정 추가하기 📅

### 🎯 일정 데이터란?
집회 일정, 리허설, 회의 등의 스케줄 정보예요!

### ✏️ 추가 방법

#### 방법 1: 화면에서 직접 추가하기 ⭐

1. **"schedules"** 테이블을 클릭해요
2. **"Insert row"** 버튼 클릭
3. 정보를 입력해요:

```
필수 항목:
✅ title: 일정 제목 (예: 크리스마스 축제)
✅ title_zh: 중국어 제목 (예: 耶誕慶典)
✅ event_type: 일정 타입
   - press: 기자회견
   - rally: 집회
   - concert: 음악회
   - outreach: 전도
   - meeting: 회의
   - other: 기타
✅ location: 장소 (예: 중앙교회)
✅ location_zh: 중국어 장소 (예: 中央教會)
✅ start_time: 시작 시간
✅ end_time: 종료 시간

선택 항목:
📝 description: 설명
📝 description_zh: 중국어 설명
📝 image_url: 이미지 링크
📝 address: 주소
📝 performers: 출연자 목록 (배열)
📝 is_main_event: 메인 이벤트 여부 (true/false)
📝 color: 색상 코드 (예: #FF6B6B)
📝 max_participants: 최대 참가자 수
📝 tags: 태그들 (배열)
📝 is_public: 공개 여부 (true=공개, false=비공개)
```

#### 방법 2: SQL로 추가하기

```sql
-- 일정 추가하기
INSERT INTO schedules (
  title,
  title_zh,
  description,
  description_zh,
  event_type,
  location,
  location_zh,
  address,
  start_time,
  end_time,
  is_main_event,
  is_public,
  color
) VALUES (
  '크리스마스 축제',                           -- 제목
  '耶誕慶典',                                   -- 중국어 제목
  '크리스마스 특별 찬양 집회',                 -- 설명
  '耶誕特別讚美聚會',                          -- 중국어 설명
  'concert',                                   -- 일정 타입
  '중앙교회 본당',                              -- 장소
  '中央教會禮堂',                              -- 중국어 장소
  '서울시 강남구 테헤란로 123',                -- 주소
  '2025-12-25 19:00:00+09',                   -- 시작 시간
  '2025-12-25 21:00:00+09',                   -- 종료 시간
  true,                                        -- 메인 이벤트
  true,                                        -- 공개
  '#FF6B6B'                                    -- 색상 (빨간색)
);
```

### 💡 출연자와 태그를 포함한 일정 추가하기

```sql
INSERT INTO schedules (
  title, title_zh, event_type, location, location_zh,
  start_time, end_time,
  performers,                    -- 출연자 배열
  tags,                          -- 태그 배열
  is_main_event, is_public
) VALUES (
  '찬양 콘서트', '讚美音樂會', 'concert', '대강당', '大禮堂',
  '2025-12-20 19:00:00+09', '2025-12-20 21:00:00+09',
  ARRAY['김수', '솔나무', 'K-pop팀'],    -- 출연자들
  ARRAY['찬양', '음악회', '콘서트'],      -- 태그들
  true, true
);
```

---

## 5. 사역 추가하기 📋

### 🎯 사역(Tasks) 데이터란?
집회를 준비하고 진행하기 위한 할 일 목록이에요!

### ✏️ 추가 방법

#### 방법 1: 화면에서 직접 추가하기 ⭐

1. **"tasks"** 테이블을 클릭해요
2. **"Insert row"** 버튼 클릭
3. 정보를 입력해요:

```
필수 항목:
✅ title: 사역 제목 (예: 무대 설치)
✅ title_zh: 중국어 제목 (예: 舞台搭建)
✅ category: 카테고리
   - preparation: 준비
   - event: 행사
   - followup: 사후관리
   - logistics: 물류
   - program: 프로그램
✅ priority: 우선순위
   - low: 낮음
   - medium: 보통
   - high: 높음
   - urgent: 긴급
✅ status: 상태
   - todo: 할 일
   - in_progress: 진행 중
   - completed: 완료
   - cancelled: 취소

선택 항목:
📝 description: 설명
📝 description_zh: 중국어 설명
📝 image_url: 이미지 링크
📝 due_date: 마감일
📝 start_date: 시작일
📝 assigned_to: 담당자 목록 (배열)
📝 tags: 태그들 (배열)
📝 is_public: 공개 여부 (true/false)
```

#### 방법 2: SQL로 추가하기

```sql
-- 사역 추가하기
INSERT INTO tasks (
  title,
  title_zh,
  description,
  description_zh,
  category,
  priority,
  status,
  due_date,
  is_public
) VALUES (
  '무대 설치',                              -- 제목
  '舞台搭建',                                -- 중국어 제목
  '메인 무대를 설치하고 조명을 세팅합니다',  -- 설명
  '搭建主舞台並設置燈光',                    -- 중국어 설명
  'preparation',                            -- 카테고리: 준비
  'high',                                   -- 우선순위: 높음
  'todo',                                   -- 상태: 할 일
  '2025-12-18 18:00:00+09',                -- 마감일
  true                                      -- 공개
);
```

### 💡 담당자와 태그를 포함한 사역 추가하기

```sql
INSERT INTO tasks (
  title, title_zh, category, priority, status,
  assigned_to,                    -- 담당자 배열
  tags,                           -- 태그 배열
  due_date, is_public
) VALUES (
  '찬양 연습', '讚美練習', 'preparation', 'high', 'in_progress',
  ARRAY['김철수', '이영희', '박민수'],     -- 담당자들
  ARRAY['찬양', '리허설', '연습'],         -- 태그들
  '2025-12-15 20:00:00+09', true
);
```

---

## 6. 데이터 확인하기 ✅

### 🔍 방법 1: Table Editor에서 확인

1. **Table Editor** 클릭
2. 보고 싶은 테이블 선택 (participants, schedules, tasks)
3. 추가한 데이터가 표에 나타나요!

### 🔍 방법 2: SQL로 확인

```sql
-- 참가자 전체 보기
SELECT * FROM participants WHERE is_active = true;

-- 일정 전체 보기
SELECT * FROM schedules WHERE is_public = true;

-- 사역 전체 보기
SELECT * FROM tasks WHERE is_public = true;

-- 데이터 개수 세기
SELECT 
  '참가자 수:' as 항목, COUNT(*) as 개수 FROM participants WHERE is_active = true
UNION ALL
SELECT '일정 수:', COUNT(*) FROM schedules WHERE is_public = true
UNION ALL
SELECT '사역 수:', COUNT(*) FROM tasks WHERE is_public = true;
```

---

## 🎓 꿀팁!

### 💡 Tip 1: 시간 형식
시간을 입력할 때는 이런 형식으로 써요:
```
2025-12-25 19:00:00+09
    ↓
연도-월-일 시:분:초+시간대
```

**예시:**
- `2025-12-25 19:00:00+09` → 2025년 12월 25일 저녁 7시 (한국시간)
- `2025-01-01 10:30:00+09` → 2025년 1월 1일 오전 10시 30분

### 💡 Tip 2: 배열 데이터 입력
여러 개를 입력할 때는 `ARRAY['항목1', '항목2']` 형식으로 써요!

**예시:**
```sql
-- 출연자 여러 명
performers = ARRAY['김수', '이민', '박준']

-- 태그 여러 개
tags = ARRAY['찬양', '집회', '특별']
```

### 💡 Tip 3: True/False
- `true` = 예, 참, 켜짐, 보임
- `false` = 아니오, 거짓, 꺼짐, 숨김

---

## ⚠️ 주의사항

1. **필수 항목**은 꼭 입력해야 해요! 안 그러면 에러가 나요.
2. **역할(role)**은 `leader`, `member`, `volunteer` 중 하나만 써야 해요.
3. **일정 타입(event_type)**은 정해진 값 중 하나만 써야 해요.
4. **시간**은 끝나는 시간이 시작 시간보다 늦어야 해요!

---

## 🎉 완성!

이제 웹사이트를 새로고침하면 추가한 데이터가 자동으로 나타나요!

- **참가자 페이지**: `/participants`
- **일정 페이지**: `/schedule`
- **사역 페이지**: `/tasks`

---

## 🆘 문제가 생겼나요?

### 에러 메시지가 나올 때:
1. **"null value in column"** → 필수 항목을 입력 안 했어요!
2. **"invalid input value"** → 정해진 값이 아닌 걸 입력했어요!
3. **"violates check constraint"** → 규칙에 맞지 않는 값을 입력했어요!

### 해결 방법:
- 입력한 값들을 다시 확인해보세요
- 필수 항목을 빠뜨리지 않았나 확인하세요
- 이 가이드의 예시를 참고해서 똑같이 해보세요

---

## 📚 더 알아보기

더 자세한 내용은 다음 파일들을 참고하세요:
- `lib/database/migrations/create_tables.sql` - 테이블 구조
- `lib/database/migrations/sample_data.sql` - 샘플 데이터 예시

---

**만든 날짜:** 2025-11-19  
**수정 날짜:** 2025-11-19  
**버전:** 1.0

끝! 🎊

