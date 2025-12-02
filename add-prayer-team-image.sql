-- 중보기도팀에 이미지 추가
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 중보기도팀 데이터 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as current_image_count
FROM tasks 
WHERE title = '중보기도팀' OR title = '중보기도';

-- 2단계: 중보기도팀에 메인 이미지 추가
UPDATE tasks
SET 
  image_url = '/images/prayer-team-1.jpg.jpg'
WHERE title = '중보기도팀' OR title = '중보기도';

-- 3단계: 업데이트 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as image_count
FROM tasks 
WHERE title = '중보기도팀' OR title = '중보기도';

-- 참고: 갤러리에 여러 사진을 추가하려면 images 배열을 사용하세요:
/*
UPDATE tasks
SET 
  image_url = '/images/prayer-team-1.jpg.jpg',
  images = ARRAY[
    '/images/prayer-team-1.jpg.jpg',
    '/images/prayer-team-2.jpg.jpg',
    '/images/prayer-team-3.jpg.jpg'
  ]
WHERE title = '중보기도팀' OR title = '중보기도';
*/

