-- 어린이 사역팀 메인 이미지 업데이트
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 어린이 사역팀의 메인 이미지 변경
UPDATE tasks 
SET image_url = '/images/children-ministry-main.jpg'
WHERE title = '어린이 사역팀';

-- 확인용 쿼리
SELECT title, image_url
FROM tasks 
WHERE title = '어린이 사역팀';

