# 빠른 시작 가이드 ⚡

5분 안에 Supabase 연동을 완료하세요!

## ✅ 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 데이터베이스 테이블 생성
- [ ] 연동 테스트
- [ ] 샘플 데이터 추가 (선택)

---

## 1단계: Supabase 프로젝트 생성 (2분)

1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인
4. "New Project" 클릭
5. 다음 정보 입력:
   - **Name**: `gospel-meeting`
   - **Database Password**: 안전한 비밀번호 (저장하기!)
   - **Region**: `Northeast Asia (Seoul)`
   - **Pricing**: `Free`
6. "Create new project" 클릭
7. 2-3분 대기 ☕

---

## 2단계: API 키 복사 (30초)

1. Supabase Dashboard 왼쪽 메뉴 → **Settings** → **API** 클릭
2. 다음 두 가지 복사:
   - **Project URL** 
   - **anon public key**

---

## 3단계: 환경 변수 설정 (30초)

프로젝트 루트의 `.env.local` 파일 열고 다음을 붙여넣기:

```env
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_key_붙여넣기
```

**예시:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

---

## 4단계: 테이블 생성 (1분)

1. Supabase Dashboard 왼쪽 메뉴 → **SQL Editor** 클릭
2. "New query" 클릭
3. `lib/database/migrations/create_tables.sql` 파일 전체 내용 복사
4. SQL Editor에 붙여넣기
5. **Run** 버튼 클릭 (또는 Ctrl/Cmd + Enter)
6. "Success. No rows returned" 메시지 확인 ✅

---

## 5단계: 개발 서버 실행 및 테스트 (1분)

### 서버 시작
```bash
npm run dev
```

### 테스트 페이지 접속
브라우저에서 http://localhost:3000/test/supabase 열기

### 테스트 실행
1. "참가자 조회" 버튼 클릭
2. 성공 메시지 확인 ✅
3. 다른 버튼들도 테스트

**에러가 발생하면?**
- 환경 변수가 올바른지 확인
- 개발 서버를 재시작 (터미널에서 Ctrl+C 후 `npm run dev`)
- 브라우저 캐시 삭제 후 새로고침

---

## 6단계: 샘플 데이터 추가 (선택사항, 30초)

테스트용 샘플 데이터를 추가하려면:

1. Supabase Dashboard → **SQL Editor**
2. "New query" 클릭
3. `lib/database/migrations/sample_data.sql` 파일 내용 복사 & 붙여넣기
4. **Run** 버튼 클릭
5. 테스트 페이지에서 다시 "참가자 조회" 클릭하면 샘플 데이터 확인 가능 🎉

---

## 🎉 완료!

이제 다음 작업을 할 수 있습니다:

### 📖 데이터 조회

```typescript
import { getAllParticipants } from '@/lib/database/api/participants'

const participants = await getAllParticipants()
console.log(participants)
```

### ➕ 데이터 생성

```typescript
import { createParticipant } from '@/lib/database/api/participants'

const newParticipant = await createParticipant({
  name: '홍길동',
  phone: '010-1234-5678',
  role: 'member',
  nationality: 'KR',
})
```

### 🔄 데이터 업데이트

```typescript
import { updateParticipant } from '@/lib/database/api/participants'

await updateParticipant('participant-id', {
  name: '홍길동2',
})
```

### 🗑️ 데이터 삭제

```typescript
import { deleteParticipant } from '@/lib/database/api/participants'

await deleteParticipant('participant-id')
```

---

## 📚 다음 단계

1. **컴포넌트에서 사용하기**
   - [lib/database/README.md](../lib/database/README.md) 참고

2. **상세 설정 가이드**
   - [docs/SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 참고

3. **실제 페이지에 통합하기**
   - 참가자 페이지, 일정 페이지 등에서 API 사용

4. **Supabase Auth 추가하기**
   - 사용자 인증 및 권한 관리

---

## 💡 팁

### Supabase Dashboard 활용
- **Table Editor**: 데이터를 GUI로 직접 편집
- **SQL Editor**: SQL 쿼리 실행
- **Database**: 테이블 구조 확인
- **Logs**: 에러 로그 확인

### 개발 중 유용한 명령어
```bash
# 개발 서버 시작
npm run dev

# 타입 체크
npx tsc --noEmit

# 빌드 테스트
npm run build
```

---

## ❓ 문제 해결

### "Invalid API key" 에러
→ `.env.local` 파일 확인 및 개발 서버 재시작

### "relation does not exist" 에러
→ SQL Editor에서 `create_tables.sql` 재실행

### 데이터가 조회되지 않음
→ Supabase Dashboard → Table Editor에서 데이터 확인

### 그 외 문제
→ [docs/SUPABASE_SETUP.md](./SUPABASE_SETUP.md)의 "문제 해결" 섹션 참고

---

**잘 안 되나요?** 
[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)의 자세한 가이드를 확인하세요!

