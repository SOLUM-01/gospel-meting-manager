-- 미용팀 소개글 업데이트
-- Supabase SQL Editor에서 실행하세요!

UPDATE tasks
SET 
  description = '복음 집회를 위해 피부관리로 섬기는 미용팀입니다.',
  description_zh = '为福音聚会提供皮肤护理服务的美容团队。'
WHERE title = '미용팀';

-- 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  description,
  description_zh
FROM tasks 
WHERE title = '미용팀';

