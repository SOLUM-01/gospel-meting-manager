-- 선물팀 사역 데이터 추가
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 선물팀 사역 추가
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
  tags,
  assigned_members
) VALUES (
  '선물팀',
  '礼物队',
  '선물 준비 및 배포를 담당하는 팀입니다. 전도 활동 시 나눠줄 선물과 기념품을 준비하고 배포합니다.',
  '负责准备和分发礼物的团队。准备并分发传道活动中的礼物和纪念品。',
  '/images/gift-team.jpg',
  ARRAY[]::text[],
  'logistics',
  'medium',
  'in_progress',
  '2025-12-20 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['선물', '배포', '준비', '기념품'],
  ARRAY['우주연', '김영미', '이보라', '최우현']
);

-- 확인용 쿼리
SELECT title, title_zh, assigned_members
FROM tasks 
WHERE title = '선물팀';

