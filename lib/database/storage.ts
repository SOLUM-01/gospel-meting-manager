import { supabase } from './supabase'

// 이미지 업로드 함수
export async function uploadTaskImage(file: File): Promise<string> {
  try {
    // 파일명 생성 (타임스탬프 + 원본 파일명)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `tasks/${fileName}`

    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from('gospel-meeting') // 버킷 이름
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw error
    }

    // 공개 URL 가져오기
    const { data: urlData } = supabase.storage
      .from('gospel-meeting')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
    throw error
  }
}

// 이미지 삭제 함수
export async function deleteTaskImage(imageUrl: string): Promise<void> {
  try {
    // URL에서 파일 경로 추출
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const filePath = pathParts.slice(pathParts.indexOf('tasks')).join('/')

    const { error } = await supabase.storage
      .from('gospel-meeting')
      .remove([filePath])

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('이미지 삭제 실패:', error)
    throw error
  }
}

// 다중 이미지 업로드 함수
export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadTaskImage(file))
  return Promise.all(uploadPromises)
}

