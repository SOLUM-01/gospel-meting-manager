-- 전폭특강 갤러리에 동영상 추가
-- Supabase SQL Editor에서 실행하세요!
-- Task ID: 00113bf0-ec8b-4733-888d-74d13fe8e192

-- ============================================
-- 1단계: 현재 전폭특강 데이터 확인
-- ============================================
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as image_count,
  updated_at
FROM tasks 
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- ============================================
-- 2단계: 갤러리에 동영상 추가 (기존 이미지 유지)
-- ============================================

-- 방법 A: 로컬 동영상 파일 추가 (public/images/에 파일 저장 필수)
UPDATE tasks
SET 
  images = array_append(images, '/images/gospel-training-video.mp4'),
  updated_at = NOW()
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- 방법 B: 유튜브 동영상 추가 (아래 YOUR_VIDEO_ID 부분을 실제 ID로 교체)
/*
UPDATE tasks
SET 
  images = array_append(images, 'https://www.youtube.com/embed/YOUR_VIDEO_ID'),
  updated_at = NOW()
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';
*/

-- ============================================
-- 3단계: 업데이트 결과 확인
-- ============================================
SELECT 
  id, 
  title, 
  images,
  array_length(images, 1) as image_count,
  updated_at
FROM tasks 
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

-- ============================================
-- 선택사항: 전체 갤러리 재설정 (기존 내용 모두 교체)
-- ============================================
/*
UPDATE tasks
SET 
  images = ARRAY[
    '/images/gospel-training-poster-1.jpg',
    '/images/gospel-training-poster-2.jpg',
    '/images/gospel-training-poster-3.jpg',
    '/images/gospel-training-video.mp4'  -- 동영상 추가
  ],
  updated_at = NOW()
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';
*/

-- ============================================
-- 참고: 동영상 제거하기
-- ============================================
/*
UPDATE tasks
SET 
  images = array_remove(images, '/images/gospel-training-video.mp4'),
  updated_at = NOW()
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';
*/

