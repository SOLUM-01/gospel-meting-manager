-- 참가자 첨부파일 테이블 생성
CREATE TABLE IF NOT EXISTS participant_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'pdf', 'other')),
  file_size BIGINT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_participant_attachments_participant_id 
ON participant_attachments(participant_id);

CREATE INDEX IF NOT EXISTS idx_participant_attachments_uploaded_at 
ON participant_attachments(uploaded_at DESC);

-- RLS (Row Level Security) 활성화
ALTER TABLE participant_attachments ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 설정
CREATE POLICY "Anyone can view participant attachments"
ON participant_attachments FOR SELECT
USING (true);

-- 인증된 사용자만 삽입 가능
CREATE POLICY "Authenticated users can insert attachments"
ON participant_attachments FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- 인증된 사용자만 삭제 가능
CREATE POLICY "Authenticated users can delete attachments"
ON participant_attachments FOR DELETE
USING (auth.role() = 'authenticated');

-- 업데이트 트리거 함수 생성 (이미 있을 수 있음)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
CREATE TRIGGER update_participant_attachments_updated_at 
BEFORE UPDATE ON participant_attachments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Storage 버킷 생성 (Supabase 대시보드에서 수동으로 생성하거나 아래 코드 실행)
-- 버킷 이름: attachments
-- Public access: true (공개 접근 허용)

-- 버킷 정책 설정 (선택사항)
-- INSERT policy: 인증된 사용자만 업로드 가능
-- SELECT policy: 모든 사용자가 다운로드 가능
-- DELETE policy: 인증된 사용자만 삭제 가능

