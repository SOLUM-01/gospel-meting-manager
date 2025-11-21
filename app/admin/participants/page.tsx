'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserPlus, Search, Loader2 } from 'lucide-react'
import { ParticipantTable } from '@/components/admin/participant-table'
import { ParticipantForm } from '@/components/admin/participant-form'
import type { Participant, TeamCategory } from '@/types/participant'
import { getAllParticipants, deleteParticipant } from '@/lib/database/api/participants'

export default function AdminParticipantsPage() {
  const { t } = useTranslation()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)

  // Supabase에서 참가자 데이터 가져오기
  const fetchParticipants = async () => {
    try {
      setLoading(true)
      const data = await getAllParticipants()
      setParticipants(data)
      setError(null)
    } catch (err) {
      console.error('참가자 데이터 로딩 실패:', err)
      setError('참가자 데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  // 필터링된 참가자 목록
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.nameZh?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.phone.includes(searchQuery) ||
      participant.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole =
      roleFilter === 'all' || participant.role === roleFilter

    const matchesTeam =
      teamFilter === 'all' || participant.teamCategory === teamFilter

    return matchesSearch && matchesRole && matchesTeam
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteParticipant(id)
      setParticipants(participants.filter((p) => p.id !== id))
      alert('참가자가 삭제되었습니다!')
    } catch (err) {
      console.error('참가자 삭제 실패:', err)
      alert('참가자 삭제에 실패했습니다.')
    }
  }

  const handleEdit = (participant: Participant) => {
    setSelectedParticipant(participant)
    setFormOpen(true)
  }

  const handleFormSuccess = () => {
    fetchParticipants()
    setSelectedParticipant(null)
  }

  const handleFormClose = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setSelectedParticipant(null)
    }
  }

  const teamCategories: TeamCategory[] = [
    '목사',
    '선교사',
    '장로',
    '총괄팀장',
    '전폭특강',
    '전도팀',
    '찬양팀',
    '중보기도',
    '부채춤',
    '푸드',
    '차량물품',
    '미용',
  ]

  // 로딩 중 UI
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-16 w-16 animate-spin text-purple-600 mb-4" />
          <p className="text-lg text-muted-foreground">
            참가자 데이터를 불러오는 중...
          </p>
        </div>
      </div>
    )
  }

  // 에러 UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchParticipants()}>
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.participantManagement')}</h1>
          <p className="text-muted-foreground mt-2">
            참가자 목록을 관리합니다
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          참가자 추가
        </Button>
      </div>

      {/* 필터 */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="이름, 전화번호, 이메일 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 역할 필터 */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="역할" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 역할</SelectItem>
              <SelectItem value="leader">{t('participants.roles.leader')}</SelectItem>
              <SelectItem value="member">{t('participants.roles.member')}</SelectItem>
              <SelectItem value="volunteer">{t('participants.roles.volunteer')}</SelectItem>
            </SelectContent>
          </Select>

          {/* 팀 필터 */}
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="팀" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 팀</SelectItem>
              {teamCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredParticipants.length}명의 참가자
        </div>
      </div>

      {/* 테이블 */}
      <ParticipantTable 
        participants={filteredParticipants} 
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* 등록/수정 폼 다이얼로그 */}
      <ParticipantForm
        open={formOpen}
        onOpenChange={handleFormClose}
        participant={selectedParticipant}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}

