import { NextRequest, NextResponse } from 'next/server'
import { getPublicSchedules, createSchedule } from '@/lib/database/api/schedules'

// GET /api/schedules - 공개 일정 조회
export async function GET() {
  try {
    const schedules = await getPublicSchedules()
    return NextResponse.json(schedules)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/schedules - 일정 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const schedule = await createSchedule(body)
    return NextResponse.json(schedule, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

