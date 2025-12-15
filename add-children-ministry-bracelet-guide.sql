-- 어린이 사역팀에 복음 팔찌 가이드 이미지 추가
-- 실행 방법: Supabase 대시보드 > SQL Editor에서 실행

UPDATE tasks
SET 
  images = ARRAY['/images/gospel-bracelet-guide.png'],
  updated_at = NOW()
WHERE id = 'cc0bfb98-b384-46d3-91c1-89fed97eb7e3';

-- 결과 확인
SELECT id, title, images FROM tasks WHERE id = 'cc0bfb98-b384-46d3-91c1-89fed97eb7e3';
