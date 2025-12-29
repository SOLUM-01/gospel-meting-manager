-- 부채춤팀 갤러리 이미지 업데이트
-- 기존 로컬 이미지 6장을 댓글의 Supabase Storage 이미지 12장으로 교체
-- (성탄음악회 5장 + 크리스마스 마켓 행사 7장)
-- Task ID: 567b7de1-161f-46dc-a608-5213257a8c4b

-- 1단계: 현재 부채춤팀 데이터 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as image_count,
  updated_at
FROM tasks 
WHERE id = '567b7de1-161f-46dc-a608-5213257a8c4b';

-- 2단계: 부채춤팀 갤러리 이미지를 댓글 사진 12장으로 교체
-- 성탄음악회 사진 5장 + 크리스마스 마켓 행사 사진 7장
UPDATE tasks
SET 
  images = ARRAY[
    -- 성탄음악회 사진 5장
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478302563-findl.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478304973-opjj98.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478305951-7363c9.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478307187-8lbi2c.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478307670-xv6ret.jpg',
    -- 크리스마스 마켓 행사 사진 7장
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478726624-nxhfoc.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478741844-iqcngu.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478744177-2pxldp.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478746863-5twn1e.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478749449-237z2.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478752267-asy9q.jpg',
    'https://ghhymwidsustninjrepw.supabase.co/storage/v1/object/public/gospel-meeting/tasks/1766478754232-mhigdo.jpg'
  ],
  updated_at = NOW()
WHERE id = '567b7de1-161f-46dc-a608-5213257a8c4b';

-- 3단계: 업데이트 결과 확인
SELECT 
  id, 
  title, 
  title_zh,
  image_url,
  images,
  array_length(images, 1) as image_count,
  updated_at
FROM tasks 
WHERE id = '567b7de1-161f-46dc-a608-5213257a8c4b';
