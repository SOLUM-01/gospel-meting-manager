-- 중복된 물품팀 데이터 삭제
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 물품팀 데이터 확인
SELECT id, title, title_zh, created_at, image_url
FROM tasks 
WHERE title = '물품팀'
ORDER BY created_at ASC;

-- 2단계: 가장 오래된 물품팀 데이터 1개만 남기고 나머지 삭제
-- (created_at이 가장 이른 것을 제외하고 모두 삭제)
DELETE FROM tasks
WHERE title = '물품팀'
AND id NOT IN (
  SELECT id 
  FROM tasks 
  WHERE title = '물품팀'
  ORDER BY created_at ASC
  LIMIT 1
);

-- 3단계: 삭제 후 확인 (1개만 남아있어야 함)
SELECT id, title, title_zh, created_at, image_url
FROM tasks 
WHERE title = '물품팀';

-- 4단계: 남은 물품팀 데이터가 올바른 이미지 정보를 가지고 있는지 확인
SELECT 
  id, 
  title, 
  image_url, 
  array_length(images, 1) as image_count,
  images
FROM tasks 
WHERE title = '물품팀';

