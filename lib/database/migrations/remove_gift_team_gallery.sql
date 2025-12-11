-- 선물팀 사진 갤러리 삭제
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 선물팀의 images 배열을 비움
UPDATE tasks 
SET images = ARRAY[]::text[]
WHERE title = '선물팀';

-- 확인용 쿼리
SELECT title, images
FROM tasks 
WHERE title = '선물팀';

