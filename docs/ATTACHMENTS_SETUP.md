# 첨부파일 기능 설정 가이드

## 개요
참가자 상세보기에서 사진, 동영상, PDF 등의 파일을 첨부할 수 있는 기능입니다.

## 데이터베이스 설정

### 1. 테이블 생성
`supabase/migrations/create_attachments_table.sql` 파일의 SQL을 실행하여 `participant_attachments` 테이블을 생성합니다.

```bash
# Supabase SQL Editor에서 실행하거나
# 또는 migration 파일 적용
```

### 2. Storage 버킷 생성

1. Supabase 대시보드 접속
2. Storage 메뉴로 이동
3. "New Bucket" 클릭
4. 버킷 이름: `attachments`
5. Public bucket: ✅ 체크 (공개 접근 허용)
6. Create 클릭

### 3. Storage 정책 설정

Storage > attachments 버킷 > Policies 탭에서 다음 정책을 추가:

#### INSERT 정책 (업로드)
```sql
CREATE POLICY "Authenticated users can upload attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'attachments');
```

#### SELECT 정책 (다운로드)
```sql
CREATE POLICY "Anyone can view attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'attachments');
```

#### DELETE 정책 (삭제)
```sql
CREATE POLICY "Authenticated users can delete attachments"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'attachments');
```

## 기능 설명

### 지원 파일 형식
- **이미지**: JPEG, PNG, GIF, WebP 등
- **동영상**: MP4, AVI, MOV 등
- **문서**: PDF, DOC, DOCX
- **기타**: 모든 파일 형식

### 주요 기능
1. **파일 업로드**: 여러 파일을 동시에 선택하여 업로드
2. **파일 목록**: 업로드된 파일 목록 확인
3. **파일 다운로드**: 첨부된 파일 다운로드
4. **파일 삭제**: 불필요한 파일 삭제

### 사용 방법
1. 참가자 목록에서 참가자 행 클릭
2. 상세보기 다이얼로그 열림
3. "첨부파일" 탭 클릭
4. "파일 선택" 버튼으로 파일 선택
5. "업로드" 버튼으로 업로드

## 사역목록 변경사항

기존 팀 카테고리가 다음 8개로 변경되었습니다:

1. **전폭특강** (빨강)
2. **전도팀** (파랑)
3. **중보기도팀** (보라)
4. **찬양팀** (핑크)
5. **부채춤팀** (노랑)
6. **푸드팀** (초록)
7. **미용팀** (남색)
8. **물품팀** (주황)

## 파일 구조

```
components/
  ├── public/
  │   ├── participant-list.tsx          # 참가자 목록 (상세보기 연동)
  │   └── participant-detail-dialog.tsx # 상세보기 다이얼로그 (첨부파일 기능)
  └── ui/
      ├── toast.tsx                      # Toast UI 컴포넌트
      └── toaster.tsx                    # Toast 컨테이너

hooks/
  └── use-toast.ts                       # Toast hook

lib/
  └── database/
      └── api/
          └── attachments.ts             # 첨부파일 API

types/
  └── participant.ts                     # Participant 및 Attachment 타입

supabase/
  └── migrations/
      └── create_attachments_table.sql   # 테이블 생성 SQL
```

## 환경 변수

`.env.local` 파일에 Supabase 설정이 있어야 합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 주의사항

1. Storage 버킷이 Public으로 설정되어 있어야 파일 접근 가능
2. 파일 업로드 시 Supabase의 파일 크기 제한 확인 필요 (기본 50MB)
3. 대용량 파일 업로드 시 네트워크 속도에 따라 시간이 걸릴 수 있음
4. 프로덕션 환경에서는 적절한 RLS 정책 설정 권장

## 향후 개선 사항

- [ ] 파일 미리보기 기능
- [ ] 이미지 썸네일 생성
- [ ] 파일 크기 제한 설정
- [ ] 진행률 표시
- [ ] 드래그 앤 드롭 업로드
- [ ] 파일 압축 기능

