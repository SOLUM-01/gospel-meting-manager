-- =====================================================
-- Supabase RLS (Row Level Security) 활성화 및 정책 설정
-- Supabase Dashboard > SQL Editor에서 실행하세요
-- =====================================================

-- =====================================================
-- 1. 모든 테이블에 RLS 활성화
-- =====================================================
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worship_songs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. 기존 정책 삭제 (중복 방지)
-- =====================================================
DROP POLICY IF EXISTS "Teams are viewable by everyone" ON public.teams;
DROP POLICY IF EXISTS "Teams are insertable by authenticated" ON public.teams;
DROP POLICY IF EXISTS "Teams are updatable by authenticated" ON public.teams;
DROP POLICY IF EXISTS "Teams are deletable by authenticated" ON public.teams;

DROP POLICY IF EXISTS "Admins can view all data" ON public.admins;
DROP POLICY IF EXISTS "Admins are insertable by authenticated" ON public.admins;
DROP POLICY IF EXISTS "Admins are updatable by authenticated" ON public.admins;
DROP POLICY IF EXISTS "Admins are deletable by authenticated" ON public.admins;

DROP POLICY IF EXISTS "Active participants are viewable by everyone" ON public.participants;
DROP POLICY IF EXISTS "Participants are insertable by authenticated" ON public.participants;
DROP POLICY IF EXISTS "Participants are updatable by authenticated" ON public.participants;
DROP POLICY IF EXISTS "Participants are deletable by authenticated" ON public.participants;

DROP POLICY IF EXISTS "Public schedules are viewable by everyone" ON public.schedules;
DROP POLICY IF EXISTS "Schedules are insertable by authenticated" ON public.schedules;
DROP POLICY IF EXISTS "Schedules are updatable by authenticated" ON public.schedules;
DROP POLICY IF EXISTS "Schedules are deletable by authenticated" ON public.schedules;

DROP POLICY IF EXISTS "Public tasks are viewable by everyone" ON public.tasks;
DROP POLICY IF EXISTS "Tasks are insertable by authenticated" ON public.tasks;
DROP POLICY IF EXISTS "Tasks are updatable by authenticated" ON public.tasks;
DROP POLICY IF EXISTS "Tasks are deletable by authenticated" ON public.tasks;

DROP POLICY IF EXISTS "Public worship songs are viewable by everyone" ON public.worship_songs;
DROP POLICY IF EXISTS "Worship songs are insertable by authenticated" ON public.worship_songs;
DROP POLICY IF EXISTS "Worship songs are updatable by authenticated" ON public.worship_songs;
DROP POLICY IF EXISTS "Worship songs are deletable by authenticated" ON public.worship_songs;

-- =====================================================
-- 3. 읽기(SELECT) 정책 설정 - 공개 데이터
-- =====================================================

-- 팀: 모든 사용자가 조회 가능
CREATE POLICY "Teams are viewable by everyone" ON public.teams
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 관리자: 인증된 사용자만 조회 가능
CREATE POLICY "Admins can view all data" ON public.admins
  FOR SELECT
  TO authenticated
  USING (true);

-- 참가자: 활성화된(is_active = true) 참가자만 공개 조회 가능
CREATE POLICY "Active participants are viewable by everyone" ON public.participants
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- 일정: 공개(is_public = true) 일정만 조회 가능
CREATE POLICY "Public schedules are viewable by everyone" ON public.schedules
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- 할일/팀 정보: 공개(is_public = true) 데이터만 조회 가능
CREATE POLICY "Public tasks are viewable by everyone" ON public.tasks
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- 찬양: 공개(is_public = true) 찬양만 조회 가능
CREATE POLICY "Public worship songs are viewable by everyone" ON public.worship_songs
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- =====================================================
-- 4. 쓰기(INSERT/UPDATE/DELETE) 정책 - 인증된 사용자만
-- =====================================================

-- Teams 쓰기 정책
CREATE POLICY "Teams are insertable by authenticated" ON public.teams
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Teams are updatable by authenticated" ON public.teams
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Teams are deletable by authenticated" ON public.teams
  FOR DELETE
  TO authenticated
  USING (true);

-- Admins 쓰기 정책
CREATE POLICY "Admins are insertable by authenticated" ON public.admins
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins are updatable by authenticated" ON public.admins
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins are deletable by authenticated" ON public.admins
  FOR DELETE
  TO authenticated
  USING (true);

-- Participants 쓰기 정책
CREATE POLICY "Participants are insertable by authenticated" ON public.participants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Participants are updatable by authenticated" ON public.participants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Participants are deletable by authenticated" ON public.participants
  FOR DELETE
  TO authenticated
  USING (true);

-- Schedules 쓰기 정책
CREATE POLICY "Schedules are insertable by authenticated" ON public.schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Schedules are updatable by authenticated" ON public.schedules
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Schedules are deletable by authenticated" ON public.schedules
  FOR DELETE
  TO authenticated
  USING (true);

-- Tasks 쓰기 정책
CREATE POLICY "Tasks are insertable by authenticated" ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Tasks are updatable by authenticated" ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Tasks are deletable by authenticated" ON public.tasks
  FOR DELETE
  TO authenticated
  USING (true);

-- Worship Songs 쓰기 정책
CREATE POLICY "Worship songs are insertable by authenticated" ON public.worship_songs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Worship songs are updatable by authenticated" ON public.worship_songs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Worship songs are deletable by authenticated" ON public.worship_songs
  FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- 5. Service Role 우회 설정 (API에서 사용)
-- =====================================================
-- 참고: Supabase의 service_role 키를 사용하면 RLS를 우회할 수 있습니다.
-- 서버 사이드에서 데이터를 관리할 때는 service_role 키를 사용하세요.

-- =====================================================
-- 완료 메시지
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE 'RLS 정책이 성공적으로 설정되었습니다!';
  RAISE NOTICE '- teams: 모든 사용자 읽기 가능';
  RAISE NOTICE '- admins: 인증된 사용자만 읽기 가능';
  RAISE NOTICE '- participants: is_active=true인 참가자만 공개';
  RAISE NOTICE '- schedules: is_public=true인 일정만 공개';
  RAISE NOTICE '- tasks: is_public=true인 할일만 공개';
  RAISE NOTICE '- worship_songs: is_public=true인 찬양만 공개';
  RAISE NOTICE '- 모든 쓰기 작업은 인증된 사용자(authenticated)만 가능';
END $$;

