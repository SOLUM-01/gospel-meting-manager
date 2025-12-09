-- 기도/말씀 나눔 테이블 생성
CREATE TABLE IF NOT EXISTS prayers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 1000),
  type VARCHAR(20) NOT NULL DEFAULT 'prayer' CHECK (type IN ('prayer', 'devotion')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_prayers_user_id ON prayers(user_id);
CREATE INDEX IF NOT EXISTS idx_prayers_type ON prayers(type);
CREATE INDEX IF NOT EXISTS idx_prayers_created_at ON prayers(created_at DESC);

-- RLS 정책 설정
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "prayers_select_policy" ON prayers
  FOR SELECT USING (true);

-- 인증된 사용자만 추가 가능
CREATE POLICY "prayers_insert_policy" ON prayers
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 본인 글만 삭제 가능
CREATE POLICY "prayers_delete_policy" ON prayers
  FOR DELETE USING (auth.uid() = user_id);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_prayers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prayers_updated_at_trigger
  BEFORE UPDATE ON prayers
  FOR EACH ROW
  EXECUTE FUNCTION update_prayers_updated_at();

-- 코멘트 추가
COMMENT ON TABLE prayers IS '기도/말씀 나눔 테이블';
COMMENT ON COLUMN prayers.type IS 'prayer: 기도, devotion: 말씀';
COMMENT ON COLUMN prayers.content IS '최대 1000자';

