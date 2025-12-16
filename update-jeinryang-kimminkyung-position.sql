-- 제인량, 김민경 직임 변경 SQL
-- Supabase SQL Editor에서 실행하세요!

-- ================================================================
-- 1단계: 현재 데이터 확인
-- ================================================================

-- 제인량 현재 상태 확인
SELECT id, name, name_zh, team_category, position 
FROM participants 
WHERE name = '제인량';

-- 김민경 현재 상태 확인 (26번 - 양재주일 소속)
SELECT id, name, name_zh, team_category, position 
FROM participants 
WHERE name = '김민경';

-- ================================================================
-- 2단계: 직임(position) 업데이트
-- ================================================================

-- 제인량: 목사 → 교육목사
UPDATE participants 
SET 
  position = '교육목사',
  updated_at = NOW()
WHERE name = '제인량';

-- 김민경 (양재주일 소속): 찬양/중보 → 찬양/전도
UPDATE participants 
SET 
  position = '찬양/전도',
  updated_at = NOW()
WHERE name = '김민경' AND team_category = '양재주일';

-- ================================================================
-- 3단계: 변경 결과 확인
-- ================================================================

-- 제인량 변경 확인
SELECT id, name, name_zh, team_category, position, updated_at
FROM participants 
WHERE name = '제인량';

-- 김민경 변경 확인
SELECT id, name, name_zh, team_category, position, updated_at
FROM participants 
WHERE name = '김민경';

-- ================================================================
-- 완료 메시지
-- ================================================================
SELECT '✅ 직임 변경 완료!' as 결과,
       '제인량: 교육목사' as 변경1,
       '김민경: 찬양/전도' as 변경2;
