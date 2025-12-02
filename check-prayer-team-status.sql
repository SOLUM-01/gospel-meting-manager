-- 중보기도팀 현재 상태 확인
-- Supabase SQL Editor에서 실행하세요!

-- ============================================
-- 1단계: 중보기도팀 ID로 정확한 데이터 확인
-- ============================================
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  created_at,
  updated_at
FROM tasks 
WHERE id = 'e7f6a749-f907-4556-a43b-9fa248ec6730';

-- ============================================
-- 2단계: title로 중보기도 관련 모든 데이터 확인
-- ============================================
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images
FROM tasks 
WHERE title LIKE '%중보%' OR title LIKE '%기도%';

-- ============================================
-- 3단계: 다른 팀들의 이미지 설정 확인 (비교용)
-- ============================================
SELECT 
  title,
  image_url,
  CASE WHEN image_url IS NULL THEN '❌ NULL' ELSE '✅ 설정됨' END as status
FROM tasks 
WHERE is_public = true
ORDER BY title;

