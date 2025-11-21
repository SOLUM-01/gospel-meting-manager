UPDATE tasks
SET 
  image_url = '/images/supplies-team.jpg',
  images = ARRAY[
    '/images/supplies-team-1.jpg',
    '/images/supplies-team-2.jpg',
    '/images/supplies-team-3.jpg',
    '/images/supplies-team-4.jpg',
    '/images/supplies-team-5.jpg',
    '/images/supplies-team-6.jpg'
  ],
  description = '복음 집회에 필요한 물품을 준비하고 관리하는 팀입니다. 필요 물품을 준비하고 포장하여 전도 현장에 전달합니다.',
  description_zh = '为福音聚会准备和管理所需物品的团队。准备糖果、传单、礼物袋等，并包装后送到传道现场。'
WHERE title = '물품팀';

