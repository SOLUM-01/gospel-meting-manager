import { NextRequest, NextResponse } from 'next/server'
import { getParticipantById, updateParticipant, deleteParticipant } from '@/lib/database/api/participants'

// GET /api/participants/[id] - 특정 참가자 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const participant = await getParticipantById(params.id)
    return NextResponse.json(participant)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/participants/[id] - 참가자 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const participant = await updateParticipant(params.id, body)
    return NextResponse.json(participant)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/participants/[id] - 참가자 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteParticipant(params.id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

