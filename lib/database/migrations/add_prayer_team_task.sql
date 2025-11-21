-- 중보기도팀 사역 데이터 추가
-- Supabase SQL Editor에서 실행하세요!

-- 중보기도팀 사역 추가
INSERT INTO tasks (
  title, 
  title_zh, 
  description, 
  description_zh,
  image_url,
  category, 
  priority, 
  status,
  due_date, 
  is_public,
  created_by,
  tags
) VALUES (
  '중보기도팀',
  '代祷队',
  '복음 집회를 위해 기도로 섬기는 중보기도팀입니다.',
  '为福音聚会祷告服事的代祷团队。',
  NULL,
  'program',
  'high',
  'in_progress',
  '2025-12-20 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['중보기도', '기도', '중보', '영적전쟁']
);

-- 확인용 쿼리
SELECT title, title_zh, array_length(tags, 1) as tag_count
FROM tasks 
WHERE title = '중보기도팀';

