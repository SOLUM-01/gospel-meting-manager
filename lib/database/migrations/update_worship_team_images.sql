-- 찬양팀 메인 이미지를 단체 사진으로 업데이트
-- 맨 위 큰 이미지(image_url)만 교체, 악보 이미지들(images)은 유지

UPDATE tasks
SET image_url = '/images/worship-team-group.jpg'
WHERE id = '2433cc3f-8328-4b84-ae7b-2935002388bb';

