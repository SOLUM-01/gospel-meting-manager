-- 전폭특강 사진 갤러리 추가
-- Supabase SQL Editor에서 실행하세요!

-- 전폭특강 task에 포스터 이미지 3장 추가
UPDATE tasks
SET 
  images = ARRAY[
    '/images/gospel-training-poster-1.jpg',
    '/images/gospel-training-poster-2.jpg',
    '/images/gospel-training-poster-3.jpg'
  ]
WHERE title = '전폭특강';

-- 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as image_count
FROM tasks 
WHERE title = '전폭특강';

