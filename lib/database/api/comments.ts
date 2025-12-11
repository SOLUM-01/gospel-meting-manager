import { supabase } from '../supabase'

export interface TaskComment {
  id: string
  task_id: string
  user_name: string
  content: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface TaskReaction {
  id: string
  task_id: string
  user_name: string
  reaction_type: 'like' | 'heart' | 'clap' | 'pray' | 'fire' | 'smile'
  created_at: string
}

// 댓글 가져오기
export async function getTaskComments(taskId: string): Promise<TaskComment[]> {
  const { data, error } = await supabase
    .from('task_comments')
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return data || []
}

// 댓글 추가
export async function addTaskComment(
  taskId: string,
  userName: string,
  content: string,
  imageUrl?: string
): Promise<TaskComment | null> {
  // 300자 제한
  if (content.length > 300) {
    console.error('Comment exceeds 300 characters')
    return null
  }

  const { data, error } = await supabase
    .from('task_comments')
    .insert({
      task_id: taskId,
      user_name: userName,
      content: content,
      image_url: imageUrl
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding comment:', error)
    return null
  }

  return data
}

// 댓글 삭제
export async function deleteTaskComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('task_comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    console.error('Error deleting comment:', error)
    return false
  }

  return true
}

// 리액션 가져오기
export async function getTaskReactions(taskId: string): Promise<TaskReaction[]> {
  const { data, error } = await supabase
    .from('task_reactions')
    .select('*')
    .eq('task_id', taskId)

  if (error) {
    console.error('Error fetching reactions:', error)
    return []
  }

  return data || []
}

// 리액션 추가/토글
export async function toggleTaskReaction(
  taskId: string,
  userName: string,
  reactionType: TaskReaction['reaction_type']
): Promise<{ added: boolean; reaction?: TaskReaction }> {
  // 기존 리액션 확인
  const { data: existing } = await supabase
    .from('task_reactions')
    .select('*')
    .eq('task_id', taskId)
    .eq('user_name', userName)
    .eq('reaction_type', reactionType)
    .single()

  if (existing) {
    // 기존 리액션 삭제
    await supabase
      .from('task_reactions')
      .delete()
      .eq('id', existing.id)
    return { added: false }
  } else {
    // 새 리액션 추가
    const { data, error } = await supabase
      .from('task_reactions')
      .insert({
        task_id: taskId,
        user_name: userName,
        reaction_type: reactionType
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding reaction:', error)
      return { added: false }
    }

    return { added: true, reaction: data }
  }
}

// 리액션 통계 가져오기
export async function getReactionCounts(taskId: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('task_reactions')
    .select('reaction_type')
    .eq('task_id', taskId)

  if (error) {
    console.error('Error fetching reaction counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  data?.forEach(reaction => {
    counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1
  })

  return counts
}

