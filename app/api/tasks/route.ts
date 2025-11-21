import { NextRequest, NextResponse } from 'next/server'
import { getPublicTasks, createTask } from '@/lib/database/api/tasks'

// GET /api/tasks - 공개 할일 조회
export async function GET() {
  try {
    const tasks = await getPublicTasks()
    return NextResponse.json(tasks)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/tasks - 할일 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const task = await createTask(body)
    return NextResponse.json(task, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

