-- =====================================================
-- 전도팀 사진 갤러리를 중보기도팀으로 이동
-- Supabase Dashboard > SQL Editor에서 실행하세요
-- =====================================================

-- 1. 중보기도팀에 사진 갤러리 추가
UPDATE tasks
SET images = ARRAY[
  '/images/evangelism-team-1.jpg',
  '/images/evangelism-team-2.jpg',
  '/images/evangelism-team-3.jpg',
  '/images/evangelism-team-4.jpg',
  '/images/evangelism-team-6.jpg'
]
WHERE id = 'e7f6a749-f907-4556-a43b-9fa248ec6730';

-- 2. 전도팀에서 사진 갤러리 제거
UPDATE tasks
SET images = NULL
WHERE id = '85100067-e709-4e3e-8e50-243a784a8a1e';

-- 3. 확인용 쿼리
SELECT 
  title, 
  array_length(images, 1) as image_count,
  images
FROM tasks 
WHERE id IN (
  'e7f6a749-f907-4556-a43b-9fa248ec6730',
  '85100067-e709-4e3e-8e50-243a784a8a1e'
);

