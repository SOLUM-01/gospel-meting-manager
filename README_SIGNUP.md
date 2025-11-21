# 🎯 Supabase 회원가입 & 로그인 기능 - 빠른 시작

## 1️⃣ 바로 사용하기

회원가입과 로그인 기능이 모두 준비되었습니다! 바로 테스트해보세요.

### 서버 실행
```bash
npm run dev
```

### 회원가입 & 로그인 페이지
```
회원가입: http://localhost:3000/signup
로그인:   http://localhost:3000/login
```

## 2️⃣ 회원가입 테스트

화면에서 다음 정보를 입력하세요:

| 필드 | 예시 | 검증 규칙 |
|------|------|----------|
| 이름 | 홍길동 | 필수 |
| 이메일 | test@example.com | 유효한 이메일 형식 |
| 전화번호 | 010-1234-5678 | 필수 |
| 비밀번호 | test1234 | 최소 8자 이상 |
| 비밀번호 확인 | test1234 | 비밀번호와 일치 |

## 3️⃣ 이메일 인증 끄기 (테스트용)

Supabase는 기본적으로 이메일 인증을 요구합니다. 테스트를 위해 끄려면:

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **Authentication** 클릭
4. **Providers** 탭 클릭
5. **Email** 클릭
6. **Confirm email** 스위치를 **OFF**로 변경
7. **Save** 클릭

이제 이메일 인증 없이 바로 회원가입되고 로그인할 수 있습니다!

## 4️⃣ 가입된 사용자 확인하기

### Supabase 대시보드에서 확인
1. Supabase 대시보드 접속
2. **Authentication** > **Users** 메뉴
3. 가입된 사용자 목록 확인

### 저장되는 정보
```javascript
{
  id: "uuid-형식-자동생성",
  email: "test@example.com",
  user_metadata: {
    name: "홍길동",
    phone: "010-1234-5678"
  },
  created_at: "2024-11-18T..."
}
```

## 5️⃣ 로그인 테스트

회원가입 후 바로 로그인할 수 있습니다!

1. `http://localhost:3000/login` 접속
2. 가입한 이메일과 비밀번호 입력
3. 로그인 버튼 클릭
4. 홈페이지로 자동 이동

## 6️⃣ 코드 구조

### API (서버)
```
app/api/auth/signup/route.ts  - 회원가입 API
app/api/auth/login/route.ts   - 로그인 API
```
- Supabase의 `auth.signUp()` 사용 (회원가입)
- Supabase의 `auth.signInWithPassword()` 사용 (로그인)
- 입력 검증
- 에러 처리

### UI (프론트엔드)
```
app/signup/page.tsx  - 회원가입 페이지
app/login/page.tsx   - 로그인 페이지
```
- 폼 UI
- 실시간 검증
- 로딩 상태

### Supabase 클라이언트
```
lib/database/supabase.ts
```
- Supabase 연결 설정

## 🎉 완료!

이제 회원가입과 로그인 기능을 모두 사용할 수 있습니다!

## ❓ 자주 묻는 질문

**Q: 같은 이메일로 다시 가입하면?**  
A: "이미 사용 중인 이메일입니다" 에러 메시지가 표시됩니다.

**Q: 비밀번호는 암호화되나요?**  
A: 네! Supabase가 자동으로 암호화해서 저장합니다.

**Q: 회원가입/로그인 후 어디로 이동하나요?**  
A: 현재는 홈페이지(`/`)로 이동합니다. 코드에서 변경 가능합니다.

**Q: 로그인이 안 돼요!**  
A: Supabase에서 이메일 인증이 활성화되어 있다면, 이메일 인증을 먼저 완료해야 합니다.

**Q: 이메일 인증이 필요한가요?**  
A: Supabase 설정에 따라 다릅니다. 위의 "3️⃣ 이메일 인증 끄기"를 참고하세요.

