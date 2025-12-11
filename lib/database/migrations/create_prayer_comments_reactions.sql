-- 기도/말씀 나눔 댓글 및 리액션 테이블 생성
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 기도/말씀 댓글 테이블
CREATE TABLE IF NOT EXISTS prayer_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prayer_id UUID NOT NULL REFERENCES prayers(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  content VARCHAR(300) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기도/말씀 리액션(좋아요/이모티콘) 테이블
CREATE TABLE IF NOT EXISTS prayer_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prayer_id UUID NOT NULL REFERENCES prayers(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'heart', 'pray', 'amen', 'clap', 'smile')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(prayer_id, user_name, reaction_type)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_prayer_comments_prayer_id ON prayer_comments(prayer_id);
CREATE INDEX IF NOT EXISTS idx_prayer_reactions_prayer_id ON prayer_reactions(prayer_id);

-- RLS 활성화
ALTER TABLE prayer_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_reactions ENABLE ROW LEVEL SECURITY;

-- 정책
CREATE POLICY "Prayer comments viewable by everyone" ON prayer_comments FOR SELECT USING (true);
CREATE POLICY "Prayer reactions viewable by everyone" ON prayer_reactions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert prayer comments" ON prayer_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert prayer reactions" ON prayer_reactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete prayer comments" ON prayer_comments FOR DELETE USING (true);
CREATE POLICY "Anyone can delete prayer reactions" ON prayer_reactions FOR DELETE USING (true);

