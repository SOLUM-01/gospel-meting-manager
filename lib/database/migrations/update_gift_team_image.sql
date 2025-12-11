-- 선물팀 메인 이미지 업데이트
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 선물팀의 메인 이미지 변경
UPDATE tasks 
SET image_url = '/images/gift-team-main.jpg'
WHERE title = '선물팀';

-- 확인용 쿼리
SELECT title, image_url
FROM tasks 
WHERE title = '선물팀';

