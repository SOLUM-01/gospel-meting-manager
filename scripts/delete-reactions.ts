// 특정 task의 모든 리액션을 삭제하는 스크립트
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function deleteTaskReactions(taskId: string) {
  console.log(`Deleting all reactions for task: ${taskId}`)
  
  // 먼저 현재 리액션 확인
  const { data: reactions, error: fetchError } = await supabase
    .from('task_reactions')
    .select('*')
    .eq('task_id', taskId)
  
  if (fetchError) {
    console.error('Error fetching reactions:', fetchError)
    return
  }
  
  console.log(`Found ${reactions?.length || 0} reactions to delete`)
  
  if (reactions && reactions.length > 0) {
    // 리액션 삭제
    const { error: deleteError } = await supabase
      .from('task_reactions')
      .delete()
      .eq('task_id', taskId)
    
    if (deleteError) {
      console.error('Error deleting reactions:', deleteError)
      return
    }
    
    console.log('✅ All reactions deleted successfully!')
  } else {
    console.log('No reactions found to delete.')
  }
}

// 실행
const taskId = '00113bf0-ec8b-4733-888d-74d13fe8e192'
deleteTaskReactions(taskId)
