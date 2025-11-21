-- 전도팀 이미지 갤러리 업데이트
-- Supabase SQL Editor에서 실행하세요!

-- 메인 이미지는 유지하고, 갤러리에서는 제외 (중복 제거)
UPDATE tasks
SET 
  image_url = '/images/evangelism-team.jpg',
  images = ARRAY[
    '/images/evangelism-team-1.jpg',
    '/images/evangelism-team-2.jpg',
    '/images/evangelism-team-3.jpg',
    '/images/evangelism-team-4.jpg',
    '/images/evangelism-team-6.jpg'
  ]
WHERE title = '전도팀';

-- 결과 확인
SELECT 
  id, 
  title, 
  image_url, 
  images,
  array_length(images, 1) as image_count
FROM tasks 
WHERE title = '전도팀';

