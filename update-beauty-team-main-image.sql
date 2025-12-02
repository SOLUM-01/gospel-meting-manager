-- 미용팀 메인 이미지 업데이트
-- Supabase SQL Editor에서 실행하세요!
-- Task ID: 621b6db4-996e-4f91-b619-0e69c9b665e0

-- 1단계: 현재 미용팀 데이터 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  updated_at
FROM tasks 
WHERE id = '621b6db4-996e-4f91-b619-0e69c9b665e0';

-- 2단계: 미용팀 메인 이미지 업데이트
UPDATE tasks
SET 
  image_url = '/images/beauty-team-main.jpg',
  updated_at = NOW()
WHERE id = '621b6db4-996e-4f91-b619-0e69c9b665e0';

-- 3단계: 업데이트 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  updated_at
FROM tasks 
WHERE id = '621b6db4-996e-4f91-b619-0e69c9b665e0';

-- ============================================
-- 선택사항: 갤러리에 여러 사진 추가하기
-- ============================================
-- 여러 장의 사진을 추가하려면 아래 쿼리를 사용하세요:
/*
UPDATE tasks
SET 
  image_url = '/images/beauty-team-main.jpg',
  images = ARRAY[
    '/images/beauty-team-main.jpg',
    '/images/beauty-team-1.jpg',
    '/images/beauty-team-2.jpg',
    '/images/beauty-team-3.jpg'
  ],
  updated_at = NOW()
WHERE id = '621b6db4-996e-4f91-b619-0e69c9b665e0';
*/

