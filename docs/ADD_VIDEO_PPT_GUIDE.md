# 동영상 및 PPT 자료 추가 가이드

## 1단계: 데이터베이스 컬럼 추가

### Supabase Dashboard에서 SQL 실행

1. **Supabase Dashboard 접속**: https://supabase.com/dashboard
2. **프로젝트 선택**: 해당 프로젝트 선택
3. **SQL Editor 메뉴** 클릭
4. **New Query** 클릭
5. 아래 SQL 복사해서 붙여넣기:

```sql
-- tasks 테이블에 video_url과 ppt_url 컬럼 추가
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS ppt_url TEXT;

-- 컬럼 설명 추가
COMMENT ON COLUMN tasks.video_url IS '유튜브 또는 비디오 URL (embed 형식)';
COMMENT ON COLUMN tasks.ppt_url IS 'PPT 또는 프레젠테이션 파일 URL';
```

6. **Run** 버튼 클릭하여 실행

## 2단계: 전폭특강에 샘플 데이터 추가

SQL Editor에서 아래 SQL 실행:

```sql
-- 전폭특강에 동영상 및 PPT URL 추가
UPDATE tasks 
SET 
  video_url = 'https://www.youtube.com/embed/VIDEO_ID_HERE',
  ppt_url = 'https://docs.google.com/presentation/d/YOUR_PPT_ID/edit?usp=sharing'
WHERE title = '전폭특강';
```

## 3단계: 실제 URL로 교체

### 동영상 URL 형식

**유튜브 동영상**:
- 원본: `https://www.youtube.com/watch?v=VIDEO_ID`
- Embed: `https://www.youtube.com/embed/VIDEO_ID`

예시:
- 원본: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Embed: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### PPT URL 형식

**Google Slides/Drive**:
- 공유 링크를 그대로 사용
- 예: `https://docs.google.com/presentation/d/1ABC123.../edit?usp=sharing`

**Microsoft OneDrive/SharePoint**:
- 공유 링크 사용
- 예: `https://onedrive.live.com/embed?...`

## 4단계: 상세 페이지에서 확인

1. http://localhost:3000/tasks 접속
2. "전폭특강" 카드의 **상세보기** 버튼 클릭
3. 동영상과 PPT 자료가 표시되는지 확인

## 참고사항

### 동영상 섹션
- 유튜브 embed URL이면 iframe으로 자동 재생 가능
- 16:9 비율로 표시됨

### PPT 섹션  
- "보기/다운로드" 버튼 제공
- 새 탭에서 열림

## 다른 사역에도 추가하기

```sql
-- 다른 사역에 동영상/PPT 추가 예시
UPDATE tasks 
SET 
  video_url = 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  ppt_url = 'https://your-ppt-url.com'
WHERE title = '찬양팀';
```

## 문제 해결

### 동영상이 표시되지 않는 경우
- 유튜브 URL이 **embed 형식**인지 확인
- `watch?v=` 대신 `embed/` 사용

### PPT가 열리지 않는 경우
- 공유 설정이 "링크가 있는 모든 사용자"로 되어있는지 확인
- 링크 전체를 복사했는지 확인

