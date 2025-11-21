'use client'

import { useState, useEffect } from 'react'
import { ParticipantList } from '@/components/public/participant-list'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Users, ArrowLeft } from 'lucide-react'
import { getAllParticipants } from '@/lib/database/api/participants'
import type { Participant } from '@/types/participant'
import Link from 'next/link'

export default function ParticipantsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [participantsData, setParticipantsData] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Supabase에서 참가자 데이터 가져오기
  useEffect(() => {
    async function fetchParticipants() {
      try {
        setLoading(true)
        const data = await getAllParticipants()
        
        // 각 참가자에게 고정 번호 할당 (1번 김요성 ~ 59번 김민지)
        const dataWithNumbers = data.map((participant, index) => ({
          ...participant,
          displayNumber: index + 1
        }))
        
        setParticipantsData(dataWithNumbers)
        setError(null)
      } catch (err) {
        console.error('참가자 데이터 로딩 실패:', err)
        setError('참가자 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchParticipants()
  }, [])

  // 필터링된 참가자 목록
  const filteredParticipants = participantsData.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.nameZh?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.phone.includes(searchQuery) ||
      participant.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.englishFirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.englishLastName?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole =
      roleFilter === 'all' || 
      (participant.teamCategory && participant.teamCategory.includes(roleFilter))

    return matchesSearch && matchesRole
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Link href="/info">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            정보 페이지로
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('participants.title')}</h1>
            <p className="text-muted-foreground">
              2025 블레싱 타이완 윈린3 아웃리치 참가자 명단<br />
              총 {participantsData.length}명
            </p>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="직책으로 필터링" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="목사">목사</SelectItem>
              <SelectItem value="선교사">선교사</SelectItem>
              <SelectItem value="총괄팀장">총괄팀장</SelectItem>
              <SelectItem value="양재수요">양재수요</SelectItem>
              <SelectItem value="광주">광주</SelectItem>
              <SelectItem value="양재주일">양재주일</SelectItem>
              <SelectItem value="주간반">주간반</SelectItem>
              <SelectItem value="저녁반">저녁반</SelectItem>
              <SelectItem value="무소속">무소속</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* 결과 카운트 */}
        <div className="text-sm text-muted-foreground">
          {filteredParticipants.length}명의 참가자
        </div>
      </div>

      {/* 참가자 목록 */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">
            참가자 데이터를 불러오는 중...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <Users className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      ) : filteredParticipants.length > 0 ? (
        <ParticipantList participants={filteredParticipants} />
      ) : (
        <div className="text-center py-16">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">
            검색 결과가 없습니다
          </p>
        </div>
      )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

