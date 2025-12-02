-- 중보기도팀 메인 이미지 업데이트
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 중보기도팀 데이터 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images
FROM tasks 
WHERE id = 'e7f6a749-f907-4556-a43b-9fa248ec6730';

-- 2단계: 중보기도팀 메인 이미지 업데이트 (ID로 정확하게 지정)
UPDATE tasks
SET 
  image_url = '/images/prayer-team-1.jpg.jpg',
  updated_at = NOW()
WHERE id = 'e7f6a749-f907-4556-a43b-9fa248ec6730';

-- 3단계: 업데이트 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  updated_at
FROM tasks 
WHERE id = 'e7f6a749-f907-4556-a43b-9fa248ec6730';

