# Storage RLS Policy 에러 해결 가이드

## 에러 메시지
```
new row violates row-level security policy
```

## 원인
Supabase Storage에 Row Level Security (RLS) 정책이 설정되지 않아서 발생하는 에러입니다.

## 해결 방법

### 방법 1: Supabase Dashboard에서 직접 설정

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **SQL Editor로 이동**
   - 왼쪽 메뉴에서 "SQL Editor" 클릭
   - "New query" 클릭

3. **다음 SQL 실행**

```sql
-- 모든 사용자가 읽기 가능
CREATE POLICY "Public Access - Anyone can read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gospel-meeting');

-- 모든 사용자가 업로드 가능 (개발 환경용)
CREATE POLICY "Public Upload - Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gospel-meeting');

-- 모든 사용자가 삭제 가능 (개발 환경용)
CREATE POLICY "Public Delete - Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gospel-meeting');

-- 모든 사용자가 업데이트 가능 (개발 환경용)
CREATE POLICY "Public Update - Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gospel-meeting')
WITH CHECK (bucket_id = 'gospel-meeting');
```

4. **"Run" 버튼 클릭**

### 방법 2: 기존 정책 확인 및 삭제

기존에 정책이 있는데 작동하지 않는 경우:

1. **기존 정책 확인**
```sql
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

2. **기존 정책 삭제** (필요한 경우)
```sql
DROP POLICY IF EXISTS "정책이름" ON storage.objects;
```

3. **위의 새 정책 실행**

### 방법 3: Storage 버킷 RLS 비활성화 (권장하지 않음)

⚠️ **보안상 권장하지 않습니다!**

```sql
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

## 정책 확인

정책이 올바르게 적용되었는지 확인:

```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage';
```

## 프로덕션 환경 보안 강화

개발이 완료되면 다음과 같이 인증된 사용자만 접근하도록 변경하세요:

```sql
-- 기존 public 정책 삭제
DROP POLICY IF EXISTS "Public Upload - Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete - Anyone can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public Update - Anyone can update images" ON storage.objects;

-- 인증된 사용자만 업로드 가능
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gospel-meeting');

-- 인증된 사용자만 삭제 가능
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gospel-meeting');

-- 인증된 사용자만 업데이트 가능
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gospel-meeting')
WITH CHECK (bucket_id = 'gospel-meeting');
```

## 테스트

정책 적용 후 다음을 테스트하세요:

1. 관리자 페이지에서 이미지 업로드
2. 브라우저 콘솔에서 에러 확인
3. Supabase Storage에서 파일 확인

## 완료! 🎉

이제 이미지 업로드가 정상적으로 작동할 것입니다.

