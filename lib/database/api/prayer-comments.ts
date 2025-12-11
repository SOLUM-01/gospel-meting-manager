import { supabase } from '../supabase'

export interface PrayerComment {
  id: string
  prayer_id: string
  user_name: string
  content: string
  created_at: string
}

export interface PrayerReaction {
  id: string
  prayer_id: string
  user_name: string
  reaction_type: 'like' | 'heart' | 'pray' | 'amen' | 'clap' | 'smile'
  created_at: string
}

// 댓글 가져오기
export async function getPrayerComments(prayerId: string): Promise<PrayerComment[]> {
  const { data, error } = await supabase
    .from('prayer_comments' as any)
    .select('*')
    .eq('prayer_id', prayerId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching prayer comments:', error)
    return []
  }

  return (data as PrayerComment[]) || []
}

// 댓글 추가
export async function addPrayerComment(
  prayerId: string,
  userName: string,
  content: string
): Promise<PrayerComment | null> {
  if (content.length > 300) {
    console.error('Comment exceeds 300 characters')
    return null
  }

  const { data, error } = await supabase
    .from('prayer_comments' as any)
    .insert({
      prayer_id: prayerId,
      user_name: userName,
      content: content
    } as any)
    .select()
    .single()

  if (error) {
    console.error('Error adding prayer comment:', error)
    return null
  }

  return data as PrayerComment
}

// 댓글 삭제
export async function deletePrayerComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('prayer_comments' as any)
    .delete()
    .eq('id', commentId)

  if (error) {
    console.error('Error deleting prayer comment:', error)
    return false
  }

  return true
}

// 리액션 가져오기
export async function getPrayerReactions(prayerId: string): Promise<PrayerReaction[]> {
  const { data, error } = await supabase
    .from('prayer_reactions' as any)
    .select('*')
    .eq('prayer_id', prayerId)

  if (error) {
    console.error('Error fetching prayer reactions:', error)
    return []
  }

  return (data as PrayerReaction[]) || []
}

// 리액션 토글
export async function togglePrayerReaction(
  prayerId: string,
  userName: string,
  reactionType: PrayerReaction['reaction_type']
): Promise<{ added: boolean }> {
  const { data: existing } = await supabase
    .from('prayer_reactions' as any)
    .select('*')
    .eq('prayer_id', prayerId)
    .eq('user_name', userName)
    .eq('reaction_type', reactionType)
    .single()

  if (existing) {
    await supabase
      .from('prayer_reactions' as any)
      .delete()
      .eq('id', (existing as any).id)
    return { added: false }
  } else {
    const { error } = await supabase
      .from('prayer_reactions' as any)
      .insert({
        prayer_id: prayerId,
        user_name: userName,
        reaction_type: reactionType
      } as any)

    if (error) {
      console.error('Error adding prayer reaction:', error)
      return { added: false }
    }

    return { added: true }
  }
}

// 리액션 카운트
export async function getPrayerReactionCounts(prayerId: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('prayer_reactions' as any)
    .select('reaction_type')
    .eq('prayer_id', prayerId)

  if (error) {
    console.error('Error fetching prayer reaction counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  ;(data as any[])?.forEach(reaction => {
    counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1
  })

  return counts
}

