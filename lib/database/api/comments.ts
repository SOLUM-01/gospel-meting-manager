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
    .from('task_comments' as any)
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return (data as TaskComment[]) || []
}

// 댓글 추가 결과 타입
export interface AddCommentResult {
  success: boolean
  comment?: TaskComment
  error?: string
}

// 댓글 추가
export async function addTaskComment(
  taskId: string,
  userName: string,
  content: string,
  imageUrl?: string
): Promise<AddCommentResult> {
  // 입력값 검증
  if (!taskId) {
    return { success: false, error: '사역 ID가 없습니다.' }
  }
  
  if (!userName || userName.trim().length === 0) {
    return { success: false, error: '이름을 입력해주세요.' }
  }
  
  if (!content || content.trim().length === 0) {
    return { success: false, error: '댓글 내용을 입력해주세요.' }
  }

  // 300자 제한
  if (content.length > 300) {
    return { success: false, error: '댓글은 300자 이내로 작성해주세요.' }
  }

  // 이미지 데이터 크기 체크 (약 500KB 제한)
  if (imageUrl && imageUrl.length > 500000) {
    return { success: false, error: `이미지가 너무 큽니다. 사진 수를 줄여주세요.` }
  }

  try {
    const { data, error } = await supabase
      .from('task_comments' as any)
      .insert({
        task_id: taskId,
        user_name: userName.trim(),
        content: content.trim(),
        image_url: imageUrl || null
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return { 
        success: false, 
        error: `DB 오류: ${error.message || '알 수 없는 오류'}` 
      }
    }

    return { success: true, comment: data as TaskComment }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: '네트워크 오류가 발생했습니다.' }
  }
}

// 댓글 삭제
export async function deleteTaskComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('task_comments' as any)
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
    .from('task_reactions' as any)
    .select('*')
    .eq('task_id', taskId)

  if (error) {
    console.error('Error fetching reactions:', error)
    return []
  }

  return (data as TaskReaction[]) || []
}

// 리액션 추가/토글
export async function toggleTaskReaction(
  taskId: string,
  userName: string,
  reactionType: TaskReaction['reaction_type']
): Promise<{ added: boolean; reaction?: TaskReaction }> {
  // 기존 리액션 확인
  const { data: existing } = await supabase
    .from('task_reactions' as any)
    .select('*')
    .eq('task_id', taskId)
    .eq('user_name', userName)
    .eq('reaction_type', reactionType)
    .single()

  if (existing) {
    // 기존 리액션 삭제
    await supabase
      .from('task_reactions' as any)
      .delete()
      .eq('id', (existing as any).id)
    return { added: false }
  } else {
    // 새 리액션 추가
    const { data, error } = await supabase
      .from('task_reactions' as any)
      .insert({
        task_id: taskId,
        user_name: userName,
        reaction_type: reactionType
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Error adding reaction:', error)
      return { added: false }
    }

    return { added: true, reaction: data as TaskReaction }
  }
}

// 리액션 통계 가져오기
export async function getReactionCounts(taskId: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('task_reactions' as any)
    .select('reaction_type')
    .eq('task_id', taskId)

  if (error) {
    console.error('Error fetching reaction counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  ;(data as any[])?.forEach(reaction => {
    counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1
  })

  return counts
}

// 특정 task의 모든 리액션 삭제
export async function deleteAllTaskReactions(taskId: string): Promise<boolean> {
  const { error } = await supabase
    .from('task_reactions' as any)
    .delete()
    .eq('task_id', taskId)

  if (error) {
    console.error('Error deleting all reactions:', error)
    return false
  }

  return true
}

// ============= 댓글 리액션 관련 =============

export interface CommentReaction {
  id: string
  comment_id: string
  user_name: string
  reaction_type: 'like' | 'heart' | 'clap' | 'pray' | 'fire' | 'smile'
  created_at: string
}

// 댓글 리액션 가져오기
export async function getCommentReactions(commentId: string): Promise<CommentReaction[]> {
  const { data, error } = await supabase
    .from('comment_reactions' as any)
    .select('*')
    .eq('comment_id', commentId)

  if (error) {
    console.error('Error fetching comment reactions:', error)
    return []
  }

  return (data as CommentReaction[]) || []
}

// 여러 댓글의 리액션 한번에 가져오기
export async function getCommentsReactions(commentIds: string[]): Promise<Record<string, CommentReaction[]>> {
  if (commentIds.length === 0) return {}
  
  const { data, error } = await supabase
    .from('comment_reactions' as any)
    .select('*')
    .in('comment_id', commentIds)

  if (error) {
    console.error('Error fetching comments reactions:', error)
    return {}
  }

  const result: Record<string, CommentReaction[]> = {}
  ;(data as CommentReaction[])?.forEach(reaction => {
    if (!result[reaction.comment_id]) {
      result[reaction.comment_id] = []
    }
    result[reaction.comment_id].push(reaction)
  })

  return result
}

// 댓글 리액션 토글
export async function toggleCommentReaction(
  commentId: string,
  userName: string,
  reactionType: CommentReaction['reaction_type']
): Promise<{ added: boolean; reaction?: CommentReaction }> {
  // 기존 리액션 확인
  const { data: existing } = await supabase
    .from('comment_reactions' as any)
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_name', userName)
    .eq('reaction_type', reactionType)
    .single()

  if (existing) {
    // 기존 리액션 삭제
    await supabase
      .from('comment_reactions' as any)
      .delete()
      .eq('id', (existing as any).id)
    return { added: false }
  } else {
    // 새 리액션 추가
    const { data, error } = await supabase
      .from('comment_reactions' as any)
      .insert({
        comment_id: commentId,
        user_name: userName,
        reaction_type: reactionType
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Error adding comment reaction:', error)
      return { added: false }
    }

    return { added: true, reaction: data as CommentReaction }
  }
}

// 댓글 리액션 통계 가져오기
export async function getCommentReactionCounts(commentId: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from('comment_reactions' as any)
    .select('reaction_type')
    .eq('comment_id', commentId)

  if (error) {
    console.error('Error fetching comment reaction counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  ;(data as any[])?.forEach(reaction => {
    counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1
  })

  return counts
}
