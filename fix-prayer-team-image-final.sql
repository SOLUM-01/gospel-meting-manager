-- 중보기도팀 이미지 최종 수정
-- Supabase SQL Editor에서 실행하세요!

-- ============================================
-- STEP 1: title로 중보기도팀 찾기
-- ============================================
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  created_at
FROM tasks 
WHERE title LIKE '%중보%';

-- ============================================
-- STEP 2: UPDATE 실행 (title로 업데이트)
-- ============================================
UPDATE tasks
SET 
  image_url = '/images/prayer-team-1.jpg.jpg',
  updated_at = NOW()
WHERE title = '중보기도팀';

-- ============================================
-- STEP 3: 결과 확인
-- ============================================
SELECT 
  id,
  title, 
  title_zh,
  image_url,
  updated_at
FROM tasks 
WHERE title = '중보기도팀';

-- ============================================
-- STEP 4: 만약 title이 '중보기도'라면 이것도 실행
-- ============================================
UPDATE tasks
SET 
  image_url = '/images/prayer-team-1.jpg.jpg',
  updated_at = NOW()
WHERE title = '중보기도';

SELECT 
  id,
  title, 
  image_url
FROM tasks 
WHERE title = '중보기도';

