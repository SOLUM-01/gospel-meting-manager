import { NextRequest, NextResponse } from 'next/server'
import { deleteAllTaskReactions, getReactionCounts } from '@/lib/database/api/comments'

// GET: 특정 task의 리액션 통계 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: taskId } = await params

  try {
    const counts = await getReactionCounts(taskId)
    return NextResponse.json({ success: true, data: counts })
  } catch (error) {
    console.error('Error getting reactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get reactions' },
      { status: 500 }
    )
  }
}

// DELETE: 특정 task의 모든 리액션 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: taskId } = await params

  try {
    const success = await deleteAllTaskReactions(taskId)
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: `All reactions for task ${taskId} have been deleted` 
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to delete reactions' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error deleting reactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete reactions' },
      { status: 500 }
    )
  }
}
