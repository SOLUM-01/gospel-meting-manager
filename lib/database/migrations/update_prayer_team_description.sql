-- 중보기도팀 소개글 확인 및 업데이트
-- Supabase SQL Editor에서 실행하세요!

-- 현재 소개글 확인
SELECT id, title, description, description_zh
FROM tasks 
WHERE title = '중보기도팀';

-- 소개글 업데이트
UPDATE tasks
SET 
  description = '복음 집회를 위해 기도로 섬기는 중보기도팀 입니다.',
  description_zh = '为福音聚会祷告服事的代祷团队。'
WHERE title = '중보기도팀';

-- 결과 확인
SELECT id, title, description, description_zh
FROM tasks 
WHERE title = '중보기도팀';

