-- 전도팀 소개글 업데이트
-- Supabase SQL Editor에서 실행하세요!

UPDATE tasks
SET 
  description = '복음을 전하는 전도 사역팀입니다.',
  description_zh = '传福音的传道事工团队。'
WHERE title = '전도팀';

-- 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  description,
  description_zh
FROM tasks 
WHERE title = '전도팀';

