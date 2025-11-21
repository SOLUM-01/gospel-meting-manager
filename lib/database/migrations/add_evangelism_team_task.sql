-- 전도팀 사역 데이터 추가
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 전도팀 사역 추가
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
  '전도팀',
  '传道队',
  '복음을 전하는 전도 사역팀입니다.',
  '传福音的传道事工团队。进行户外传道、传道训练、传道资料准备等活动。',
  '/images/evangelism-team.jpg',
  ARRAY[
    '/images/evangelism-team-1.jpg',
    '/images/evangelism-team-2.jpg',
    '/images/evangelism-team-3.jpg',
    '/images/evangelism-team-4.jpg',
    '/images/evangelism-team-5.jpg',
    '/images/evangelism-team-6.jpg'
  ],
  'program',
  'high',
  'in_progress',
  '2025-12-20 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['전도', '복음', '아웃리치', '전도훈련']
);

-- 확인용 쿼리
SELECT title, title_zh, image_url, array_length(images, 1) as image_count
FROM tasks 
WHERE title = '전도팀';

