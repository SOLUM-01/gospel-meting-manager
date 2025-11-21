-- 전도팀 팀장 정보 수정
-- Supabase SQL Editor에서 실행하세요!

-- 문유선 - 한복팀장 배지 삭제
UPDATE participants
SET position = '한복/전도'
WHERE name = '문유선';

-- 박혜성 - 중보기도팀장 배지 삭제
UPDATE participants
SET position = '중보기도/전도'
WHERE name = '박혜성';

-- 오경자 - 찬양팀장 배지 삭제
UPDATE participants
SET position = '찬양/통역/전도'
WHERE name = '오경자';

