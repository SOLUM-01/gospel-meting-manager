-- 물품팀 사역 데이터 추가
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 물품팀 사역 추가
INSERT INTO tasks (
  title, 
  title_zh, 
  description, 
  description_zh,
  image_url,
  images,
  category, 
  priority, 
  status,
  due_date, 
  is_public,
  created_by,
  tags
) VALUES (
  '물품팀',
  '物品队',
  '복음 집회에 필요한 물품을 준비하고 관리하는 팀입니다. 사탕, 전도지, 선물 가방 등을 준비하고 포장하여 전도 현장에 전달합니다.',
  '为福音聚会准备和管理所需物品的团队。准备糖果、传单、礼物袋等，并包装后送到传道现场。',
  '/images/supplies-team.jpg',
  ARRAY[
    '/images/supplies-team-1.jpg',
    '/images/supplies-team-2.jpg',
    '/images/supplies-team-3.jpg',
    '/images/supplies-team-4.jpg',
    '/images/supplies-team-5.jpg',
    '/images/supplies-team-6.jpg'
  ],
  'logistics',
  'high',
  'in_progress',
  '2025-12-01 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['물품', '준비', '포장', '전도용품']
);

-- 확인용 쿼리
SELECT title, title_zh, image_url, array_length(images, 1) as image_count
FROM tasks 
WHERE title = '물품팀';

