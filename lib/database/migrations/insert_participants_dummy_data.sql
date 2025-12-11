-- 2025 블레싱 타이완 윈린3 아웃리치 참가자 더미 데이터 (62명, 정웅규 선교사 제외 시 61명)
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- ⚠️ 기존 데이터 완전 삭제 (중복 방지)
DELETE FROM participants;

-- 참가자 데이터 삽입 (첨부 이미지 순서 그대로 1-59번)
INSERT INTO participants (name, name_zh, gender, english_first_name, english_last_name, phone, image_url, team_category, role, nationality, position, is_active) VALUES
-- 1-3번
('김요성', '金宇晟', 'M', 'YOO SEONG', 'KIM', '', NULL, '목사', 'leader', '한국', '총괄목사', true),
('제인량', '薛仁亮', 'F', 'INNYANG', 'JE', '', NULL, '목사', 'leader', '한국', '교육목사', true),
('김동환', '金東煥', 'M', 'DONGWHOAN', 'KIM', '', NULL, '장로', 'leader', '한국', '장로/찬양', true),

-- 4-8번 양재수요
('이영민', '李寧敏', 'F', 'YOUNG MIN', 'LEE', '', NULL, '양재수요', 'member', '한국', '부채춤', true),
('문유선', '文宥善', 'F', 'YOU SUN', 'MOON', '', NULL, '양재수요', 'member', '한국', '한복팀장/전도', true),
('정재영', '鄭才瑛', 'F', 'JAE YOUNG', 'JUNG', '', NULL, '양재수요', 'member', '한국', '부채춤', true),
('박혜성', '朴慧晟', 'F', 'HYE SUNG', 'PARK', '', NULL, '양재수요', 'member', '한국', '중보기도팀장/전도', true),
('이서은', '李抒恩', 'F', 'SEOEUN', 'LEE', '', NULL, '양재수요', 'member', '한국', '찬양', true),

-- 9-17번 광주
('김화숙', '金和淑', 'F', 'HWASOOK', 'KIM', '', NULL, '광주', 'member', '한국', '워십', true),
('이야셀', '李亞瑟', 'F', 'ASEL', 'LEE', '', NULL, '광주', 'member', '한국', '찬양', true),
('정정희', '丁正姬', 'F', 'JUNGHEE', 'JUNG', '', NULL, '광주', 'member', '한국', '워십', true),
('양인숙', '梁仁淑', 'F', 'INSOOK', 'YANG', '', NULL, '광주', 'member', '한국', '워십', true),
('유영단', '劉英丹', 'F', 'YOUNGDAN', 'YU', '', NULL, '광주', 'member', '한국', '워십', true),
('이미경', '李美敬', 'F', 'MIKYUNG', 'LEE', '', NULL, '광주', 'member', '한국', '중보기도/푸드', true),
('김양덕', '金良德', 'F', 'YANGDEOK', 'KIM', '', NULL, '광주', 'member', '한국', '중보기도/푸드/전도', true),
('윤정현', '尹正鉉', 'M', 'Jeong hyun', 'YOON', '', NULL, '광주', 'member', '한국', '1차팀/미용/영상', true),
('이정윤', '李旌允', 'F', 'JEONG YUN', 'LEE', '', NULL, '광주', 'member', '한국', '워십팀장/찬양', true),

-- 18-23번 양재주일
('김양신', '金陽信', 'F', 'YANGSHIN', 'KIM', '', NULL, '양재주일', 'leader', '한국', '전도팀장/', true),
('박세은', '朴世恩', 'F', 'SEEUN', 'PARK', '', NULL, '양재주일', 'member', '한국', '영상/찬양/팝업북/통역/전도', true),
('황철호', '黃哲昊', 'M', 'CHEOLHO', 'HWANG', '', NULL, '양재주일', 'member', '한국', '찬양/통역', true),
('김민경', '金玟炅', 'F', 'MINKYUNG', 'KIM', '', NULL, '양재주일', 'member', '한국', '찬양/중보', true),
('백승이', '白承伊', 'F', 'SEUNGYEE', 'BAEK', '', NULL, '양재주일', 'member', '한국', '찬양/중보', true),
('우주연', '禹周延', 'F', 'JOOYUN', 'WOO', '', NULL, '양재주일', 'member', '한국', '찬양/푸드/통역/전도', true),

-- 24-30번 주간반
('권옥희', '權玉姬', 'F', 'OKHEE', 'KWON', '', NULL, '주간반', 'member', '한국', '총무서기/찬양/통역/전도', true),
('백정희', '白貞喜', 'F', 'JEONGHEE', 'BAEK', '', NULL, '주간반', 'member', '한국', '부채춤', true),
('오경자', '吳景子', 'F', 'KYOUNGJAO', 'OH', '', NULL, '주간반', 'member', '한국', '찬양팀장/찬양/통역/전도', true),
('김영미', '金英薇', 'F', 'YOUNGMI', 'KIM', '', NULL, '주간반', 'member', '한국', '푸드/찬양/전도', true),
('차승희', '車承喜', 'F', 'SEUNGHEE', 'CHA', '', NULL, '주간반', 'member', '한국', '부채춤', true),
('조영선', '趙英善', 'F', 'YOUNGSUN', 'CHO', '', NULL, '주간반', 'member', '한국', '회계/찬양/전도', true),
('윤효정', '尹孝楨', 'F', 'HYA', 'YOON', '', NULL, '주간반', 'member', '한국', '찬양/', true),

-- 31-43번 주간반
('최희주', '崔希州', 'F', 'HEEJU', 'CHOI', '', NULL, '주간반', 'member', '한국', '반주/찬양', true),
('이보라', '李保羅', 'F', 'BORA', 'LEE', '', NULL, '주간반', 'member', '한국', '찬양/푸드/전도', true),
('임종옥', '林鍾玉', 'F', 'JONGOK', 'LIM', '', NULL, '주간반', 'member', '한국', '푸드팀장', true),
('최우현', '崔禹炫', 'M', 'WOOHYUN', 'CHOI', '', NULL, '주간반', 'member', '한국', '푸드/찬양', true),
('김유하', '金有夏', 'F', 'YUHA', 'KIM', '', NULL, '주간반', 'member', '한국', '찬양/푸드/전도', true),
('이명대', '李明大', 'F', 'MYUNGDAE', 'LEE', '', NULL, '주간반', 'member', '한국', '부채춤', true),
('정선은', '鄭旋恩', 'F', 'SUNEUN', 'JUNG', '', NULL, '주간반', 'member', '한국', '찬양/팝업북', true),
('이예진', '李芮珍', 'F', 'YEJIN', 'LEE', '', NULL, '주간반', 'member', '한국', '찬양/팝업북/전도', true),
('박효양', '朴孝陽', 'F', 'HYOYANG', 'PARK', '', NULL, '주간반', 'member', '한국', '푸드/중보', true),
('유은진', '柳恩珍', 'F', 'EUNJIN', 'RYU', '', NULL, '주간반', 'member', '한국', '부채춤팀장', true),
('강성혜', '', 'F', '', '', '', NULL, '주간반', 'member', '한국', '푸드/중보/찬양', true),
('최옥자', '崔玉子', 'F', 'OKJA', 'CHOI', '', NULL, '주간반', 'member', '한국', '부채춤', true),
('최세정', '崔世真', 'F', 'SEJUNG', 'CHOI', '', NULL, '주간반', 'member', '한국', '찬양/팝업북', true),
('강서헌', '姜錫憲', 'M', 'SEO HEON', 'KANG', '', NULL, '주간반', 'member', '한국', '팝업북', true),

-- 44-55번 저녁반
('정회평', '鄭喜平', 'M', 'HOEPYEONG', 'JEONG', '', NULL, '총괄팀장', 'leader', '한국', '총괄팀장/찬양', true),
('김신하', '金信河', 'F', 'SHINHA', 'KIM', '', NULL, '저녁반', 'member', '한국', '미용', true),
('김진해', '金鎭海', 'M', 'JINHAE', 'KIM', '', NULL, '저녁반', 'member', '한국', '차량/물품팀장/찬양', true),
('김대현', '金岱炫', 'M', 'DEAHYUN', 'KIM', '', NULL, '저녁반', 'member', '한국', '차량/물품/찬양', true),
('신교순', '辛敎順', 'F', 'KOYSOON', 'SHIN', '', NULL, '저녁반', 'member', '한국', '미용팀장', true),
('이순옥', '李順玉', 'F', 'SOONOK', 'LEE', '', NULL, '저녁반', 'member', '한국', '전도/중보/푸드', true),
('송형숙', '宋亨淑', 'F', 'HYUNG SUK', 'SONG', '', NULL, '저녁반', 'member', '한국', '전도/중보/푸드', true),
('이승헌', '李承憲', 'M', 'SEUNGHEON', 'LEE', '', NULL, '저녁반', 'member', '한국', '차량/물품/찬양', true),
('최미자', '崔美子', 'F', 'MIJA', 'CHOI', '', NULL, '저녁반', 'member', '한국', '찬양/중보/전도', true),
('조하령', '趙夏玲', 'F', 'HALYEONG', 'CHO', '', NULL, '저녁반', 'member', '한국', '찬양/팝업북', true),
('곽미동', '郭美棟', 'F', 'MIDONG', 'KWAK', '', NULL, '저녁반', 'member', '한국', '찬양/팝업북/전도', true),
('이혜승', '李惠承', 'F', 'HYESEUNG', 'LEE', '', NULL, '저녁반', 'member', '한국', '푸드/중보', true),

-- 56-59번 무소속
('김덕희', '金德喜', 'F', 'DOKHEE', 'KIM', '', NULL, '무소속', 'member', '한국', '미용/찬양', true),
('김정', '金靜', 'F', 'JEONG', 'KIM', '', NULL, '무소속', 'member', '한국', '찬양/중보', true),
('서희숙', '徐喜淑', 'F', 'HEESOOK', 'SEO', '', NULL, '무소속', 'member', '한국', '푸드/찬양', true),
('김민지', '金珉志', 'F', 'MINJI', 'KIM', '', NULL, '무소속', 'member', '한국', '푸드/찬양', true);

-- 결과 확인
SELECT 
  '추가된 참가자 수:' as 정보, 
  COUNT(*) as 개수 
FROM participants 
WHERE is_active = true;

-- 팀별 참가자 수 확인
SELECT 
  team_category as 팀,
  COUNT(*) as 인원
FROM participants 
WHERE is_active = true 
GROUP BY team_category 
ORDER BY COUNT(*) DESC;
