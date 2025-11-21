-- 물품팀 담당자 연결
-- Supabase SQL Editor에서 실행하세요!

-- 물품팀 담당자들의 ID를 물품팀 task의 assigned_to에 추가
UPDATE tasks
SET assigned_to = ARRAY(
  SELECT id::text 
  FROM participants 
  WHERE position LIKE '%물품%'
  AND is_active = true
)
WHERE title = '물품팀';

-- 결과 확인: 물품팀과 담당자 정보
SELECT 
  t.id as task_id,
  t.title,
  t.title_zh,
  t.image_url,
  array_length(t.assigned_to, 1) as 담당자_수,
  (
    SELECT string_agg(p.name || ' (' || p.position || ')', ', ')
    FROM participants p
    WHERE p.id::text = ANY(t.assigned_to)
  ) as 담당자_목록
FROM tasks t
WHERE t.title = '물품팀';

-- 물품팀 담당자 상세 정보
SELECT 
  p.name as 이름,
  p.name_zh as 중국어명,
  p.position as 직분,
  p.team_category as 소속팀,
  p.phone as 연락처
FROM participants p
WHERE p.position LIKE '%물품%'
AND p.is_active = true
ORDER BY p.position;

