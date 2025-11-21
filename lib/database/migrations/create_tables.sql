-- Supabase 데이터베이스 테이블 생성 SQL
-- 이 SQL을 Supabase Dashboard > SQL Editor에서 실행하세요

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 팀 테이블 (다른 테이블에서 참조하므로 먼저 생성)
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255) NOT NULL,
  description TEXT,
  leader_id UUID,
  member_count INTEGER DEFAULT 0,
  color VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 관리자 테이블
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 참가자 테이블
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255),
  gender VARCHAR(1) CHECK (gender IN ('M', 'F')),
  english_first_name VARCHAR(255),
  english_last_name VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  image_url TEXT,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  team_category VARCHAR(100),
  role VARCHAR(50) NOT NULL CHECK (role IN ('leader', 'member', 'volunteer')),
  nationality VARCHAR(100) NOT NULL,
  position VARCHAR(255),
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 일정 테이블
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255) NOT NULL,
  description TEXT,
  description_zh TEXT,
  image_url TEXT,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('press', 'rally', 'concert', 'outreach', 'meeting', 'other')),
  location VARCHAR(255) NOT NULL,
  location_zh VARCHAR(255) NOT NULL,
  address TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  performers TEXT[],
  is_main_event BOOLEAN DEFAULT FALSE,
  color VARCHAR(50),
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 할일 테이블
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255) NOT NULL,
  description TEXT,
  description_zh TEXT,
  image_url TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('preparation', 'event', 'followup', 'logistics', 'program')),
  priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(50) DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed', 'cancelled')),
  assigned_to TEXT[],
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  start_date TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 찬양 테이블
CREATE TABLE IF NOT EXISTS worship_songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255),
  artist VARCHAR(255),
  type VARCHAR(50) NOT NULL CHECK (type IN ('hymn', 'praise', 'ccm', 'worship')),
  lyrics TEXT,
  image_url TEXT,
  pdf_url TEXT,
  youtube_url TEXT,
  sheet_music_url TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_participants_team_id ON participants(team_id);
CREATE INDEX IF NOT EXISTS idx_participants_role ON participants(role);
CREATE INDEX IF NOT EXISTS idx_participants_is_active ON participants(is_active);

CREATE INDEX IF NOT EXISTS idx_schedules_start_time ON schedules(start_time);
CREATE INDEX IF NOT EXISTS idx_schedules_event_type ON schedules(event_type);
CREATE INDEX IF NOT EXISTS idx_schedules_is_public ON schedules(is_public);
CREATE INDEX IF NOT EXISTS idx_schedules_created_by ON schedules(created_by);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
CREATE INDEX IF NOT EXISTS idx_tasks_team_id ON tasks(team_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);

CREATE INDEX IF NOT EXISTS idx_worship_songs_type ON worship_songs(type);
CREATE INDEX IF NOT EXISTS idx_worship_songs_is_public ON worship_songs(is_public);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_is_active ON admins(is_active);

-- Updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated_at 트리거 설정
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_worship_songs_updated_at BEFORE UPDATE ON worship_songs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE worship_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 공개 데이터 읽기 정책 (is_public = true인 데이터는 누구나 조회 가능)
CREATE POLICY "Public schedules are viewable by everyone" ON schedules
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public tasks are viewable by everyone" ON tasks
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public worship songs are viewable by everyone" ON worship_songs
  FOR SELECT USING (is_public = true);

-- 참가자는 활성화된 사용자만 조회 가능
CREATE POLICY "Active participants are viewable by everyone" ON participants
  FOR SELECT USING (is_active = true);

-- 팀은 모두 조회 가능
CREATE POLICY "Teams are viewable by everyone" ON teams
  FOR SELECT USING (true);

-- 관리자 데이터는 인증된 사용자만 접근 가능 (나중에 auth 추가 시 수정)
CREATE POLICY "Admins can view all data" ON admins
  FOR SELECT USING (true);

-- 삽입/수정/삭제는 인증된 관리자만 가능 (나중에 auth 추가 시 수정)
-- 현재는 API를 통해서만 가능하도록 설정

