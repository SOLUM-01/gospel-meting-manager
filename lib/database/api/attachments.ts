import { supabase } from '../supabase'
import type { Attachment } from '@/types/participant'

// 참가자의 첨부파일 조회
export async function getParticipantAttachments(participantId: string) {
  const { data, error } = await supabase
    .from('participant_attachments')
    .select('*')
    .eq('participant_id', participantId)
    .order('uploaded_at', { ascending: false })

  if (error) throw error

  return (data || []).map((item: any) => ({
    id: item.id,
    fileName: item.file_name,
    fileUrl: item.file_url,
    fileType: item.file_type,
    fileSize: item.file_size,
    uploadedAt: item.uploaded_at,
  })) as Attachment[]
}

// 첨부파일 업로드
export async function uploadAttachment(
  participantId: string,
  file: File
): Promise<Attachment> {
  // 1. Supabase Storage에 파일 업로드
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `participants/${participantId}/${fileName}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('attachments')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  // 2. 공개 URL 가져오기
  const { data: urlData } = supabase.storage
    .from('attachments')
    .getPublicUrl(filePath)

  // 3. 파일 타입 결정
  let fileType: 'image' | 'video' | 'pdf' | 'other' = 'other'
  if (file.type.startsWith('image/')) fileType = 'image'
  else if (file.type.startsWith('video/')) fileType = 'video'
  else if (file.type === 'application/pdf') fileType = 'pdf'

  // 4. 데이터베이스에 메타데이터 저장
  const { data, error } = await supabase
    .from('participant_attachments')
    .insert({
      participant_id: participantId,
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: fileType,
      file_size: file.size,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    fileName: data.file_name,
    fileUrl: data.file_url,
    fileType: data.file_type,
    fileSize: data.file_size,
    uploadedAt: data.uploaded_at,
  } as Attachment
}

// 첨부파일 삭제
export async function deleteAttachment(attachmentId: string) {
  // 1. 첨부파일 정보 가져오기
  const { data: attachment, error: fetchError } = await supabase
    .from('participant_attachments')
    .select('file_url')
    .eq('id', attachmentId)
    .single()

  if (fetchError) throw fetchError

  // 2. Storage에서 파일 삭제
  const fileUrl = attachment.file_url
  const filePath = fileUrl.split('/attachments/')[1]
  
  if (filePath) {
    const { error: deleteStorageError } = await supabase.storage
      .from('attachments')
      .remove([filePath])

    if (deleteStorageError) {
      console.error('Storage 파일 삭제 오류:', deleteStorageError)
    }
  }

  // 3. 데이터베이스에서 메타데이터 삭제
  const { error: deleteDbError } = await supabase
    .from('participant_attachments')
    .delete()
    .eq('id', attachmentId)

  if (deleteDbError) throw deleteDbError

  return true
}

// 여러 파일 일괄 업로드
export async function uploadMultipleAttachments(
  participantId: string,
  files: File[]
): Promise<Attachment[]> {
  const uploadPromises = files.map(file => 
    uploadAttachment(participantId, file)
  )
  
  return await Promise.all(uploadPromises)
}

