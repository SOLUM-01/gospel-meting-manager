-- Supabase Storage 정책 설정
-- gospel-meeting 버킷에 대한 RLS 정책

-- 1. 모든 사용자가 이미지를 읽을 수 있도록 허용 (공개 접근)
CREATE POLICY "Public Access - Anyone can read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gospel-meeting');

-- 2. 모든 사용자가 업로드 가능 (개발 환경용)
-- 프로덕션에서는 인증된 사용자만 허용하도록 변경하세요
CREATE POLICY "Public Upload - Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gospel-meeting');

-- 3. 모든 사용자가 삭제 가능 (개발 환경용)
-- 프로덕션에서는 인증된 사용자만 허용하도록 변경하세요
CREATE POLICY "Public Delete - Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gospel-meeting');

-- 4. 모든 사용자가 업데이트 가능 (개발 환경용)
CREATE POLICY "Public Update - Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gospel-meeting')
WITH CHECK (bucket_id = 'gospel-meeting');

-- ============================================
-- 프로덕션 환경용 정책 (위 정책들을 삭제하고 아래 사용)
-- ============================================

-- 인증된 사용자만 업로드 가능
-- CREATE POLICY "Authenticated users can upload"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'gospel-meeting');

-- 인증된 사용자만 삭제 가능
-- CREATE POLICY "Authenticated users can delete"
-- ON storage.objects FOR DELETE
-- TO authenticated
-- USING (bucket_id = 'gospel-meeting');

-- 인증된 사용자만 업데이트 가능
-- CREATE POLICY "Authenticated users can update"
-- ON storage.objects FOR UPDATE
-- TO authenticated
-- USING (bucket_id = 'gospel-meeting')
-- WITH CHECK (bucket_id = 'gospel-meeting');

