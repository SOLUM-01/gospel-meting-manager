# Supabase Storage 설정 가이드

## 1. Supabase Storage 버킷 생성

### 단계별 설정

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Storage 메뉴로 이동**
   - 왼쪽 메뉴에서 "Storage" 클릭

3. **새 버킷 생성**
   - "New Bucket" 버튼 클릭
   - 버킷 이름: `gospel-meeting`
   - Public bucket: ✅ 체크 (공개 접근 허용)
   - "Create bucket" 클릭

4. **버킷 정책 설정 (중요!)**
   
   Supabase 대시보드 → SQL Editor → New Query에서 다음 SQL 실행:

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

   또는 프로젝트의 `supabase/migrations/create_storage_policies.sql` 파일의 내용을 복사하여 실행하세요.

   **참고**: 위 정책은 개발 환경용입니다. 프로덕션에서는 인증된 사용자만 업로드/삭제할 수 있도록 정책을 변경하세요.

## 2. 폴더 구조

버킷 내부에 자동으로 다음 폴더가 생성됩니다:
```
gospel-meeting/
└── tasks/
    ├── [timestamp]-[random].jpg
    ├── [timestamp]-[random].png
    └── ...
```

## 3. 사용 방법

### 사역 이미지 업로드

1. 관리자 페이지 접속: `/admin/tasks/new`
2. "사역 이미지" 섹션에서 이미지 업로드
3. 자동으로 Supabase Storage에 업로드됨
4. 업로드된 이미지 URL이 자동으로 폼에 저장됨

### 지원 파일 형식
- JPG, JPEG
- PNG
- GIF
- WebP

### 파일 크기 제한
- 최대: 5MB

## 4. 환경 변수 확인

`.env.local` 파일에 다음 변수가 설정되어 있는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 5. 트러블슈팅

### 업로드 실패 시
1. Supabase 대시보드에서 버킷이 생성되었는지 확인
2. 버킷 이름이 `gospel-meeting`인지 확인
3. Public bucket으로 설정되었는지 확인
4. 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러 발생 시
Supabase 대시보드 → Project Settings → API → CORS에서 도메인 추가:
- `http://localhost:3000`
- `http://localhost:3001`
- 프로덕션 도메인

## 6. 이미지 최적화 권장사항

1. **이미지 크기 최적화**
   - 업로드 전에 이미지 압축 도구 사용
   - 권장 해상도: 1920x1080 이하

2. **파일 형식**
   - WebP 형식 권장 (용량이 작음)
   - JPEG는 품질 80-90% 권장

3. **썸네일 생성**
   - Supabase Storage는 자동 썸네일 생성을 지원하지 않음
   - 필요시 업로드 시 리사이징 로직 추가

## 7. 백업 및 관리

### 이미지 백업
Supabase 대시보드에서 Storage 전체를 내보낼 수 있습니다:
1. Storage → Settings
2. Export bucket

### 미사용 이미지 정리
주기적으로 데이터베이스에 연결되지 않은 이미지를 삭제하세요.

## 완료! 🎉

이제 사역 등록 시 이미지를 업로드할 수 있습니다.

