-- 전폭특강 갤러리에 이미지 추가
-- 10번(기도), 6번(전도활동)을 맨 위에 배치

UPDATE tasks
SET images = ARRAY[
  'https://www.youtube.com/embed/itdn-nNlx2c',
  '/images/jeonpok-10.jpg',
  '/images/jeonpok-6.jpg',
  '/images/jeonpok-5.jpg',
  '/images/jeonpok-3.jpg',
  '/images/jeonpok-7.jpg',
  '/images/jeonpok-9.jpg',
  '/images/jeonpok-1.jpg',
  '/images/jeonpok-2.jpg',
  '/images/jeonpok-4.jpg',
  '/images/jeonpok-8.jpg'
]
WHERE id = '00113bf0-ec8b-4733-888d-74d13fe8e192';

