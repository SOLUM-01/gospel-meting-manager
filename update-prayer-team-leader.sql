-- 중보기도팀 박혜성님을 팀장으로 설정
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 박혜성님의 데이터 확인
SELECT id, name, name_zh, position, team_category
FROM participants 
WHERE name = '박혜성';

-- 2단계: 박혜성님을 중보기도팀장으로 설정
UPDATE participants
SET position = '중보기도팀장'
WHERE name = '박혜성';

-- 3단계: 업데이트 결과 확인
SELECT id, name, name_zh, position, team_category
FROM participants 
WHERE name = '박혜성';

-- 4단계: 중보기도팀 전체 멤버 확인 (팀장이 맨 위에 있는지 확인)
SELECT name, name_zh, position, team_category
FROM participants 
WHERE team_category = '중보기도' OR position LIKE '%중보%'
ORDER BY 
  CASE WHEN position LIKE '%중보기도팀장%' THEN 0 ELSE 1 END,
  created_at;

