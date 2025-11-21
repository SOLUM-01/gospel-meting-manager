import { supabase } from '../supabase'
import type { WorshipSong, CreateWorshipSongDto, WorshipType } from '@/types/worship'

// 모든 찬양 조회
export async function getAllWorshipSongs() {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .order('title', { ascending: true })

  if (error) throw error
  return data as WorshipSong[]
}

// 공개 찬양만 조회
export async function getPublicWorshipSongs() {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .eq('is_public', true)
    .order('title', { ascending: true })

  if (error) throw error
  return data as WorshipSong[]
}

// 특정 찬양 조회
export async function getWorshipSongById(id: string) {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as WorshipSong
}

// 타입별 찬양 조회
export async function getWorshipSongsByType(type: WorshipType) {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .eq('type', type)
    .eq('is_public', true)
    .order('title', { ascending: true })

  if (error) throw error
  return data as WorshipSong[]
}

// 찬양 검색 (제목 또는 아티스트)
export async function searchWorshipSongs(query: string) {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .or(`title.ilike.%${query}%,artist.ilike.%${query}%`)
    .eq('is_public', true)
    .order('title', { ascending: true })

  if (error) throw error
  return data as WorshipSong[]
}

// 찬양 생성
export async function createWorshipSong(song: CreateWorshipSongDto) {
  const { data, error } = await (supabase as any)
    .from('worship_songs')
    .insert({
      title: song.title,
      title_zh: song.titleZh,
      artist: song.artist,
      type: song.type,
      lyrics: song.lyrics,
      image_url: song.imageUrl,
      pdf_url: song.pdfUrl,
      youtube_url: song.youtubeUrl,
      sheet_music_url: song.sheetMusicUrl,
      tags: song.tags,
      is_public: song.isPublic,
    })
    .select()
    .single()

  if (error) throw error
  return data as WorshipSong
}

// 찬양 업데이트
export async function updateWorshipSong(id: string, updates: Partial<CreateWorshipSongDto>) {
  const updateData: any = {}
  
  if (updates.title) updateData.title = updates.title
  if (updates.titleZh !== undefined) updateData.title_zh = updates.titleZh
  if (updates.artist !== undefined) updateData.artist = updates.artist
  if (updates.type) updateData.type = updates.type
  if (updates.lyrics !== undefined) updateData.lyrics = updates.lyrics
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl
  if (updates.pdfUrl !== undefined) updateData.pdf_url = updates.pdfUrl
  if (updates.youtubeUrl !== undefined) updateData.youtube_url = updates.youtubeUrl
  if (updates.sheetMusicUrl !== undefined) updateData.sheet_music_url = updates.sheetMusicUrl
  if (updates.tags !== undefined) updateData.tags = updates.tags
  if (updates.isPublic !== undefined) updateData.is_public = updates.isPublic

  const { data, error } = await (supabase as any)
    .from('worship_songs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as WorshipSong
}

// 찬양 삭제
export async function deleteWorshipSong(id: string) {
  const { error } = await (supabase as any)
    .from('worship_songs')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// 태그로 찬양 조회
export async function getWorshipSongsByTags(tags: string[]) {
  const { data, error } = await supabase
    .from('worship_songs')
    .select('*')
    .overlaps('tags', tags)
    .eq('is_public', true)
    .order('title', { ascending: true })

  if (error) throw error
  return data as WorshipSong[]
}

