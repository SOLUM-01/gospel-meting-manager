'use client'

import { Badge } from '@/components/ui/badge'
import type { Participant } from '@/types/participant'
import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { ParticipantDetailDialog } from './participant-detail-dialog'

interface ParticipantListProps {
  participants: Participant[]
}

export function ParticipantList({ participants }: ParticipantListProps) {
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleRowClick = (participant: Participant) => {
    setSelectedParticipant(participant)
    setDialogOpen(true)
  }

  const getTeamCategoryColor = (category?: string) => {
    switch (category) {
      case '전도팀':
        return 'bg-blue-600 hover:bg-blue-700'
      case '중보기도팀':
        return 'bg-purple-600 hover:bg-purple-700'
      case '찬양팀':
        return 'bg-pink-600 hover:bg-pink-700'
      case '부채춤팀':
        return 'bg-yellow-600 hover:bg-yellow-700'
      case '푸드팀':
        return 'bg-green-600 hover:bg-green-700'
      case '미용팀':
        return 'bg-indigo-600 hover:bg-indigo-700'
      case '물품팀':
        return 'bg-orange-600 hover:bg-orange-700'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // 정렬 로직: 정렬 컬럼이 없으면 displayNumber 순서로 정렬 (1-59번 고정)
  const sortedParticipants = sortColumn ? [...participants].sort((a, b) => {
    let aValue: any = a[sortColumn as keyof Participant]
    let bValue: any = b[sortColumn as keyof Participant]

    if (aValue === null || aValue === undefined) aValue = ''
    if (bValue === null || bValue === undefined) bValue = ''

    if (typeof aValue === 'string') aValue = aValue.toLowerCase()
    if (typeof bValue === 'string') bValue = bValue.toLowerCase()

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  }) : [...participants].sort((a, b) => {
    // 정렬 컬럼이 없으면 displayNumber 순서로 정렬 (1번 김요성 ~ 59번 김민지)
    const aNum = a.displayNumber || 0
    const bNum = b.displayNumber || 0
    return aNum - bNum
  })

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 ml-1 inline opacity-40" />
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-3 w-3 ml-1 inline" />
      : <ArrowDown className="h-3 w-3 ml-1 inline" />
  }

  return (
    <div className="w-full space-y-6">
      {/* 엑셀 스타일 테이블 */}
      <div className="w-full overflow-x-auto rounded-lg border-2 border-gray-300 shadow-xl bg-white">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-700 to-blue-600">
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white border-r border-blue-500 sticky left-0 z-10 bg-blue-700"
                style={{ minWidth: '50px', width: '50px' }}
              >
                번호
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white border-r border-blue-500 cursor-pointer hover:bg-blue-800 transition-colors select-none"
                onClick={() => handleSort('name')}
                style={{ minWidth: '80px', width: '100px' }}
              >
                <div className="flex items-center justify-center">
                  한글 이름
                  <SortIcon column="name" />
                </div>
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white border-r border-blue-500 cursor-pointer hover:bg-blue-800 transition-colors select-none hidden sm:table-cell"
                onClick={() => handleSort('nameZh')}
                style={{ minWidth: '80px', width: '100px' }}
              >
                <div className="flex items-center justify-center">
                  中文名
                  <SortIcon column="nameZh" />
                </div>
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white border-r border-blue-500 cursor-pointer hover:bg-blue-800 transition-colors select-none hidden md:table-cell"
                onClick={() => handleSort('gender')}
                style={{ minWidth: '60px', width: '60px' }}
              >
                <div className="flex items-center justify-center">
                  성별
                  <SortIcon column="gender" />
                </div>
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-bold text-white border-r border-blue-500 hidden lg:table-cell"
                style={{ minWidth: '120px', width: '150px' }}
              >
                English Name
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white border-r border-blue-500 cursor-pointer hover:bg-blue-800 transition-colors select-none"
                onClick={() => handleSort('teamCategory')}
                style={{ minWidth: '80px', width: '110px' }}
              >
                <div className="flex items-center justify-center">
                  소속 팀
                  <SortIcon column="teamCategory" />
                </div>
              </th>
              <th 
                className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-bold text-white cursor-pointer hover:bg-blue-800 transition-colors select-none"
                onClick={() => handleSort('position')}
                style={{ minWidth: '100px', width: '140px' }}
              >
                <div className="flex items-center justify-center">
                  직임
                  <SortIcon column="position" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedParticipants.map((participant, index) => {
              // 참가자의 고정 번호 사용 (1번 김요성 ~ 59번 김민지)
              const displayNumber = participant.displayNumber || index + 1
              
              return (
              <tr 
                key={participant.id}
                onClick={() => handleRowClick(participant)}
                className={`
                  border-b border-gray-200
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  hover:bg-blue-50 transition-colors cursor-pointer
                `}
              >
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center text-gray-900 font-medium border-r border-gray-200 sticky left-0 z-10" style={{
                  backgroundColor: index % 2 === 0 ? 'white' : 'rgb(249 250 251)'
                }}>
                  {displayNumber}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center font-semibold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                  {participant.name}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap hidden sm:table-cell">
                  {participant.nameZh || '-'}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center text-gray-700 border-r border-gray-200 hidden md:table-cell">
                  {participant.gender === 'M' ? '남' : participant.gender === 'F' ? '여' : '-'}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap hidden lg:table-cell">
                  {participant.englishLastName || participant.englishFirstName
                    ? `${participant.englishFirstName || ''} ${participant.englishLastName || ''}`.trim()
                    : '-'}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center border-r border-gray-200">
                  {participant.teamCategory ? (
                    <Badge className={`${getTeamCategoryColor(participant.teamCategory)} text-white text-[10px] md:text-xs font-medium px-1.5 md:px-2.5 py-0.5 whitespace-nowrap`}>
                      {participant.teamCategory}
                    </Badge>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-center text-gray-700">
                  <div className="line-clamp-2">
                    {participant.position || '-'}
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 md:p-4 text-white shadow-lg">
          <div className="text-xs md:text-sm font-medium opacity-90">총 인원</div>
          <div className="text-2xl md:text-3xl font-bold mt-1">{participants.length}명</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-3 md:p-4 text-white shadow-lg">
          <div className="text-xs md:text-sm font-medium opacity-90">남성</div>
          <div className="text-2xl md:text-3xl font-bold mt-1">
            {participants.filter(p => p.gender === 'M').length}명
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-3 md:p-4 text-white shadow-lg">
          <div className="text-xs md:text-sm font-medium opacity-90">여성</div>
          <div className="text-2xl md:text-3xl font-bold mt-1">
            {participants.filter(p => p.gender === 'F').length}명
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 md:p-4 text-white shadow-lg">
          <div className="text-xs md:text-sm font-medium opacity-90">팀 수</div>
          <div className="text-2xl md:text-3xl font-bold mt-1">
            {new Set(participants.map(p => p.teamCategory).filter(Boolean)).size}개
          </div>
        </div>
      </div>

      {/* 상세보기 다이얼로그 */}
      <ParticipantDetailDialog
        participant={selectedParticipant}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
