-- 어린이 사역팀 사역 데이터 추가
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 어린이 사역팀 사역 추가
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
  '어린이 사역팀',
  '儿童事工队',
  '어린이들을 위한 복음 사역을 담당하는 팀입니다. 어린이 프로그램 기획 및 진행, 어린이 찬양과 율동, 복음 전달 활동을 합니다.',
  '负责儿童福音事工的团队。策划和组织儿童节目、儿童赞美和律动、传福音活动。',
  '/images/children-ministry.jpg',
  ARRAY['/images/children-ministry-1.jpg', '/images/children-ministry-2.jpg', '/images/children-ministry-3.jpg']::text[],
  'ministry',
  'high',
  'in_progress',
  '2025-12-20 09:00:00+09',
  true,
  (SELECT id FROM admins LIMIT 1),
  ARRAY['어린이', '사역', '복음', '프로그램'],
  ARRAY['김동환', '제인현', '이혜승', '이승헌', '김대현']
);

-- 확인용 쿼리
SELECT title, title_zh, assigned_members
FROM tasks 
WHERE title = '어린이 사역팀';

