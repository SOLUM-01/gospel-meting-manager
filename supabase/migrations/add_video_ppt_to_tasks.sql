-- tasks 테이블에 video_url, ppt_url, images 컬럼 추가
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS ppt_url TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[];

-- 컬럼 설명 추가
COMMENT ON COLUMN tasks.video_url IS '유튜브 또는 비디오 URL (embed 형식)';
COMMENT ON COLUMN tasks.ppt_url IS 'PPT 또는 프레젠테이션 파일 URL';
COMMENT ON COLUMN tasks.images IS '추가 이미지 URL 배열 (갤러리용)';

