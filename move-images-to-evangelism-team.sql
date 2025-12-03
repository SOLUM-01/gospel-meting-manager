-- 전폭특강 사진 3장을 전도팀으로 이동
-- Supabase SQL Editor에서 실행하세요!

-- ============================================
-- 1단계: 현재 상태 확인
-- ============================================

-- 전폭특강 현재 이미지 확인
SELECT 
  id, 
  title, 
  images,
  array_length(images, 1) as image_count
FROM tasks 
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- 전도팀 현재 이미지 확인
SELECT 
  id, 
  title, 
  images,
  array_length(images, 1) as image_count
FROM tasks 
WHERE id = '85100067-e709-4e3e-8e50-243a784a8a1e';

-- ============================================
-- 2단계: 전도팀에 사진 갤러리 추가
-- ============================================
UPDATE tasks
SET 
  images = ARRAY[
    '/images/gospel-training-poster-1.jpg',
    '/images/gospel-training-poster-2.jpg',
    '/images/gospel-training-poster-3.jpg'
  ],
  updated_at = NOW()
WHERE id = '85100067-e709-4e3e-8e50-243a784a8a1e';

-- ============================================
-- 3단계: 전폭특강은 동영상만 남기기
-- ============================================
UPDATE tasks
SET 
  images = ARRAY[
    'https://www.youtube.com/embed/itdn-nNlx2c'
  ],
  updated_at = NOW()
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- ============================================
-- 4단계: 결과 확인
-- ============================================

-- 전폭특강 확인 (동영상만 있어야 함)
SELECT 
  title,
  images,
  array_length(images, 1) as count
FROM tasks 
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- 전도팀 확인 (사진 3장이 있어야 함)
SELECT 
  title,
  images,
  array_length(images, 1) as count
FROM tasks 
WHERE id = '85100067-e709-4e3e-8e50-243a784a8a1e';

