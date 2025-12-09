-- 두 명의 참가자 추가 SQL
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. 제인현 (諸仁炫) - 주간반, 전도/중보/찬양
INSERT INTO participants (
    name,
    name_zh,
    gender,
    english_first_name,
    english_last_name,
    phone,
    team_category,
    role,
    nationality,
    position,
    is_active,
    created_at
) VALUES (
    '제인현',
    '諸仁炫',
    'F',
    'INHYUN',
    'JE',
    '',
    '주간반',
    'member',
    '한국',
    '전도/중보/찬양',
    true,
    '2024-01-01 00:01:02+00'
);

-- 2. 윤숙영 (尹淑英) - 저녁반, 찬양
INSERT INTO participants (
    name,
    name_zh,
    gender,
    english_first_name,
    english_last_name,
    phone,
    team_category,
    role,
    nationality,
    position,
    is_active,
    created_at
) VALUES (
    '윤숙영',
    '尹淑英',
    'F',
    'SOOKYOUNG',
    'YOON',
    '',
    '저녁반',
    'member',
    '한국',
    '찬양',
    true,
    '2024-01-01 00:01:03+00'
);

-- 확인용 쿼리
SELECT id, name, name_zh, team_category, position 
FROM participants 
WHERE name IN ('제인현', '윤숙영');

