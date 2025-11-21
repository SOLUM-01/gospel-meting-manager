import { NextRequest, NextResponse } from 'next/server'
import { getAllParticipants, createParticipant } from '@/lib/database/api/participants'

// GET /api/participants - 모든 참가자 조회
export async function GET() {
  try {
    const participants = await getAllParticipants()
    return NextResponse.json(participants)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/participants - 참가자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const participant = await createParticipant(body)
    return NextResponse.json(participant, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

