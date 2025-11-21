import { NextRequest, NextResponse } from 'next/server'
import { getScheduleById, updateSchedule, deleteSchedule } from '@/lib/database/api/schedules'

// GET /api/schedules/[id] - 특정 일정 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const schedule = await getScheduleById(id)
    return NextResponse.json(schedule)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/schedules/[id] - 일정 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const schedule = await updateSchedule(id, body)
    return NextResponse.json(schedule)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/schedules/[id] - 일정 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteSchedule(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

