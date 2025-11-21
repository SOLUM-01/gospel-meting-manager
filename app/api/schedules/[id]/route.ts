import { NextRequest, NextResponse } from 'next/server'
import { getScheduleById, updateSchedule, deleteSchedule } from '@/lib/database/api/schedules'

// GET /api/schedules/[id] - 특정 일정 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const schedule = await getScheduleById(params.id)
    return NextResponse.json(schedule)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/schedules/[id] - 일정 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const schedule = await updateSchedule(params.id, body)
    return NextResponse.json(schedule)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/schedules/[id] - 일정 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteSchedule(params.id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

