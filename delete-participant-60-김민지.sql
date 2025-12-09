-- 60번 김민지 (金珉志) 삭제 SQL
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 방법 1: 소프트 삭제 (is_active를 false로 변경)
UPDATE participants 
SET is_active = false 
WHERE id = '2797e0b2-b128-400b-aeb5-541dff63dbc5';

-- 또는

-- 방법 2: 완전 삭제 (데이터베이스에서 완전히 제거)
-- DELETE FROM participants 
-- WHERE id = '2797e0b2-b128-400b-aeb5-541dff63dbc5';

-- 확인용 쿼리
SELECT id, name, name_zh, is_active 
FROM participants 
WHERE name = '김민지';

