# Supabase 회원가입 기능 설정 가이드

## 🎉 완료된 작업

✅ Supabase Auth를 사용한 회원가입 API 구현  
✅ 회원가입 UI 페이지 (`/signup`)  
✅ 폼 검증 및 에러 처리  

## 📝 구현 내용

### 1. API 엔드포인트
- **경로**: `/api/auth/signup`
- **기능**: 
  - Supabase Auth의 `signUp()` 메서드 사용
  - 이메일, 비밀번호 검증
  - 사용자 메타데이터(이름, 전화번호) 저장

### 2. 회원가입 페이지
- **경로**: `/signup`
- **기능**:
  - 이름, 이메일, 전화번호, 비밀번호 입력
  - 실시간 폼 검증
  - 비밀번호 확인
  - 로딩 상태 표시

## ⚙️ Supabase 대시보드 설정

### 이메일 확인 비활성화 (선택사항)
기본적으로 Supabase는 이메일 확인을 요구합니다. 테스트를 쉽게 하려면:

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Authentication** > **Providers** > **Email**
4. **Confirm email** 토글을 OFF로 설정
5. 저장

### 이메일 템플릿 커스터마이징 (선택사항)
1. **Authentication** > **Email Templates**
2. 각 템플릿을 한글로 수정 가능

## 🚀 사용 방법

### 회원가입 테스트

1. 개발 서버 실행:
```bash
npm run dev
```

2. 브라우저에서 접속:
```
http://localhost:3000/signup
```

3. 회원가입 정보 입력:
   - 이름: 홍길동
   - 이메일: test@example.com
   - 전화번호: 010-1234-5678
   - 비밀번호: 최소 8자 이상

4. "회원가입" 버튼 클릭

### 회원가입 후

- **이메일 확인 활성화된 경우**: 이메일로 발송된 확인 링크 클릭 필요
- **이메일 확인 비활성화된 경우**: 바로 회원가입 완료

## 📊 Supabase에서 사용자 확인

1. Supabase 대시보드 접속
2. **Authentication** > **Users** 클릭
3. 생성된 사용자 목록 확인

## 🔐 저장되는 정보

### Supabase Auth 테이블 (auth.users)
- `id`: UUID (자동 생성)
- `email`: 이메일 주소
- `encrypted_password`: 암호화된 비밀번호 (자동 처리)
- `raw_user_meta_data`: 
  - `name`: 사용자 이름
  - `phone`: 전화번호

## 🛠️ 다음 단계

로그인 기능 구현 시 필요한 파일:
- `/app/api/auth/login/route.ts` (이미 존재)
- `/app/login/page.tsx` (이미 존재)

Supabase의 `signInWithPassword()` 메서드를 사용하여 구현 가능합니다.

## 💡 팁

- 비밀번호는 Supabase가 자동으로 암호화하므로 별도 해싱 불필요
- 세션 관리도 Supabase가 자동으로 처리
- `auth.users` 테이블은 직접 수정하지 말고 Supabase Auth API 사용 권장

