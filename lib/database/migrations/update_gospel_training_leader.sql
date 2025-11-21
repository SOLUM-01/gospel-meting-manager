-- 전폭특강 담당자 수정
-- Supabase SQL Editor에서 실행하세요!

-- 1단계: 현재 상태 확인
SELECT name, name_zh, gender, position, team_category
FROM participants 
WHERE name IN ('제인량', '윤정현')
ORDER BY name;

-- 2단계: 제인량의 position은 교육목사로 유지
-- (전폭특강 필터링을 위해 team_category 사용)
UPDATE participants
SET 
  position = '교육목사',
  team_category = '전폭특강'
WHERE name = '제인량';

-- 3단계: 윤정현의 1차팀 제거
UPDATE participants
SET position = '미용/영상'
WHERE name = '윤정현';

-- 4단계: 변경 결과 확인
SELECT name, name_zh, gender, position, team_category
FROM participants 
WHERE name IN ('제인량', '윤정현')
ORDER BY name;

-- 5단계: 전폭특강(1차팀) 담당자 확인
SELECT name, name_zh, gender, position, team_category
FROM participants 
WHERE position LIKE '%1차팀%'
ORDER BY name;

