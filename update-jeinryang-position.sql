-- 제인량 소속팀을 "목사"로 변경
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 제인량 데이터 확인
SELECT 
  id, 
  name, 
  name_zh,
  team_category,
  position,
  updated_at
FROM participants 
WHERE name = '제인량';

-- 2단계: 제인량의 team_category(소속팀)을 "목사"로 변경
UPDATE participants
SET 
  team_category = '목사',
  updated_at = NOW()
WHERE name = '제인량';

-- 3단계: 업데이트 결과 확인
SELECT 
  id, 
  name, 
  name_zh,
  team_category,
  position,
  updated_at
FROM participants 
WHERE name = '제인량';

