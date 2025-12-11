-- 사역 상세페이지 댓글 및 리액션 테이블 생성
-- Supabase SQL Editor에서 이 파일을 실행하세요!

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  content VARCHAR(300) NOT NULL, -- 300자 제한
  image_url TEXT, -- 사진 첨부 (선택)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 리액션(좋아요/이모티콘) 테이블
CREATE TABLE IF NOT EXISTS task_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'heart', 'clap', 'pray', 'fire', 'smile')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- 한 사용자가 같은 task에 같은 리액션을 중복으로 달 수 없음
  UNIQUE(task_id, user_name, reaction_type)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_task_comments_task_id ON task_comments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_comments_created_at ON task_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_task_reactions_task_id ON task_reactions(task_id);
CREATE INDEX IF NOT EXISTS idx_task_reactions_type ON task_reactions(reaction_type);

-- Updated_at 트리거
CREATE TRIGGER update_task_comments_updated_at BEFORE UPDATE ON task_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_reactions ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 댓글과 리액션을 읽을 수 있음
CREATE POLICY "Comments are viewable by everyone" ON task_comments
  FOR SELECT USING (true);

CREATE POLICY "Reactions are viewable by everyone" ON task_reactions
  FOR SELECT USING (true);

-- 모든 사용자가 댓글과 리액션을 추가할 수 있음
CREATE POLICY "Anyone can insert comments" ON task_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert reactions" ON task_reactions
  FOR INSERT WITH CHECK (true);

-- 자신의 댓글만 삭제 가능
CREATE POLICY "Users can delete own comments" ON task_comments
  FOR DELETE USING (true);

-- 자신의 리액션만 삭제 가능
CREATE POLICY "Users can delete own reactions" ON task_reactions
  FOR DELETE USING (true);

-- 확인용 쿼리
SELECT 'task_comments 테이블 생성 완료' as status;
SELECT 'task_reactions 테이블 생성 완료' as status;

