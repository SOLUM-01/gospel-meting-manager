-- 미용팀 사역 데이터 추가
-- Supabase SQL Editor에서 실행하세요!

-- 미용팀 사역 추가
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
  '미용팀',
  '美容队',
  '복음 집회를 위해 헤어와 메이크업으로 섬기는 미용팀입니다.',
  '为福音聚会提供发型和化妆服务的美容团队。',
  NULL,
  'preparation',
  'medium',
  'in_progress',
  '2025-12-20 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['미용', '헤어', '메이크업', '스타일링']
);

-- 확인용 쿼리
SELECT title, title_zh, array_length(tags, 1) as tag_count
FROM tasks 
WHERE title = '미용팀';

