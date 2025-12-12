-- 댓글 리액션 테이블 생성
-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS comment_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES task_comments(id) ON DELETE CASCADE,
  user_name VARCHAR(50) NOT NULL,
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'heart', 'clap', 'pray', 'fire', 'smile')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_name, reaction_type)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_comment_reactions_comment_id ON comment_reactions(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_reactions_user_name ON comment_reactions(user_name);

-- RLS 정책 설정
ALTER TABLE comment_reactions ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read comment reactions" ON comment_reactions
  FOR SELECT USING (true);

-- 모든 사용자가 추가 가능
CREATE POLICY "Anyone can insert comment reactions" ON comment_reactions
  FOR INSERT WITH CHECK (true);

-- 자신이 추가한 리액션만 삭제 가능
CREATE POLICY "Users can delete own comment reactions" ON comment_reactions
  FOR DELETE USING (true);
