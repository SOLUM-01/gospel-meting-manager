-- 샘플 데이터 삽입 SQL
-- 테스트 및 데모용 샘플 데이터

-- 1. 관리자 샘플 데이터
INSERT INTO admins (email, password, name, role, permissions, is_active) VALUES
('admin@gospel.com', 'admin123', '관리자', 'super_admin', ARRAY['all'], true),
('moderator@gospel.com', 'mod123', '운영자', 'moderator', ARRAY['read', 'write'], true);

-- 2. 팀 샘플 데이터
INSERT INTO teams (name, name_zh, description, color, member_count) VALUES
('전도팀', '传道队', '복음 전도를 담당하는 팀입니다', '#FF6B6B', 0),
('찬양팀', '赞美队', '찬양과 경배를 인도하는 팀입니다', '#4ECDC4', 0),
('중보기도팀', '代祷队', '중보기도를 담당하는 팀입니다', '#95E1D3', 0),
('푸드팀', '餐饮队', '식사와 간식을 준비하는 팀입니다', '#FFE66D', 0),
('차량물품팀', '车辆物品队', '차량과 물품을 관리하는 팀입니다', '#A8E6CF', 0);

-- 3. 참가자 샘플 데이터
-- 먼저 팀 ID를 가져오기 위한 변수 선언이 필요하지만, PostgreSQL에서는 직접 서브쿼리 사용
INSERT INTO participants (name, name_zh, phone, email, team_id, role, nationality, is_active) VALUES
('김철수', '金哲洙', '010-1234-5678', 'kim@example.com', 
  (SELECT id FROM teams WHERE name = '전도팀' LIMIT 1), 'leader', 'KR', true),
('이영희', '李英姬', '010-2345-6789', 'lee@example.com', 
  (SELECT id FROM teams WHERE name = '전도팀' LIMIT 1), 'member', 'KR', true),
('박민수', '朴民秀', '010-3456-7890', 'park@example.com', 
  (SELECT id FROM teams WHERE name = '찬양팀' LIMIT 1), 'leader', 'KR', true),
('최지은', '崔智恩', '010-4567-8901', 'choi@example.com', 
  (SELECT id FROM teams WHERE name = '찬양팀' LIMIT 1), 'member', 'KR', true),
('정현우', '郑贤宇', '010-5678-9012', 'jung@example.com', 
  (SELECT id FROM teams WHERE name = '중보기도팀' LIMIT 1), 'leader', 'KR', true);

-- 4. 팀 멤버 수 업데이트
UPDATE teams SET member_count = (
  SELECT COUNT(*) FROM participants 
  WHERE participants.team_id = teams.id AND participants.is_active = true
);

-- 5. 일정 샘플 데이터
INSERT INTO schedules (
  title, title_zh, description, description_zh, 
  event_type, location, location_zh, 
  start_time, end_time, 
  is_main_event, is_public, 
  created_by
) VALUES
(
  '개막 예배', '开幕礼拜', 
  '복음 집회의 시작을 알리는 개막 예배입니다', '福音聚会开幕礼拜',
  'rally', '중앙교회 본당', '中央教会礼堂',
  '2025-12-01 10:00:00+09', '2025-12-01 12:00:00+09',
  true, true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '찬양 집회', '赞美聚会',
  '은혜로운 찬양과 경배의 시간입니다', '恩典的赞美与敬拜时间',
  'concert', '중앙교회 본당', '中央教会礼堂',
  '2025-12-01 14:00:00+09', '2025-12-01 16:00:00+09',
  true, true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '노방 전도', '街头传道',
  '거리에서 복음을 전하는 시간입니다', '在街头传福音的时间',
  'outreach', '시청 광장', '市政厅广场',
  '2025-12-02 15:00:00+09', '2025-12-02 18:00:00+09',
  false, true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '중보기도회', '代祷会',
  '집회를 위한 중보기도 시간입니다', '为聚会代祷的时间',
  'meeting', '기도실', '祷告室',
  '2025-12-01 06:00:00+09', '2025-12-01 07:00:00+09',
  false, false,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
);

-- 6. 할일 샘플 데이터
INSERT INTO tasks (
  title, title_zh, description, description_zh,
  category, priority, status,
  team_id, due_date, is_public,
  created_by
) VALUES
(
  '현수막 제작', '横幅制作',
  '행사 홍보용 현수막을 제작해야 합니다', '制作活动宣传横幅',
  'preparation', 'high', 'todo',
  NULL, '2025-11-25 18:00:00+09', true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '찬양 연습', '赞美练习',
  '집회에서 부를 찬양곡을 연습합니다', '练习聚会要唱的赞美诗',
  'preparation', 'high', 'in_progress',
  (SELECT id FROM teams WHERE name = '찬양팀' LIMIT 1), 
  '2025-11-28 20:00:00+09', true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '음향 장비 점검', '音响设备检查',
  '음향 시스템이 정상 작동하는지 확인합니다', '确认音响系统正常运作',
  'logistics', 'medium', 'todo',
  NULL, '2025-11-30 15:00:00+09', true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '식사 준비', '餐饮准备',
  '참가자들을 위한 식사를 준비합니다', '为参与者准备餐饮',
  'event', 'urgent', 'todo',
  (SELECT id FROM teams WHERE name = '푸드팀' LIMIT 1),
  '2025-12-01 11:00:00+09', true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
),
(
  '사후 정리', '事后整理',
  '집회 후 장소를 정리합니다', '聚会后整理场地',
  'followup', 'low', 'todo',
  NULL, '2025-12-02 20:00:00+09', true,
  (SELECT id FROM admins WHERE email = 'admin@gospel.com' LIMIT 1)
);

-- 7. 찬양 샘플 데이터
INSERT INTO worship_songs (
  title, title_zh, artist, type, 
  lyrics, youtube_url, is_public
) VALUES
(
  '주님의 마음', '主的心',
  '예수전도단', 'worship',
  '주님의 마음 우리의 마음이 되게 하소서...',
  'https://youtube.com/watch?v=example1',
  true
),
(
  '놀라운 주의 은혜', '奇异恩典',
  'Chris Tomlin', 'praise',
  'Amazing Grace, how sweet the sound...',
  'https://youtube.com/watch?v=example2',
  true
),
(
  '나 주를 멀리 떠났다', '我曾离开主',
  '찬송가', 'hymn',
  '나 주를 멀리 떠났다 어리석고 약하여...',
  NULL,
  true
),
(
  '주님 찬양 받으소서', '赞美主',
  '소리엘', 'ccm',
  '주님 찬양 받으소서 영광의 왕...',
  'https://youtube.com/watch?v=example3',
  true
);

-- 확인용 쿼리
SELECT '팀:', COUNT(*) as count FROM teams
UNION ALL
SELECT '참가자:', COUNT(*) FROM participants
UNION ALL
SELECT '일정:', COUNT(*) FROM schedules
UNION ALL
SELECT '할일:', COUNT(*) FROM tasks
UNION ALL
SELECT '찬양:', COUNT(*) FROM worship_songs
UNION ALL
SELECT '관리자:', COUNT(*) FROM admins;

