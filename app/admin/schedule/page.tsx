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
import { CalendarPlus, Search, Loader2 } from 'lucide-react'
import { ScheduleTable } from '@/components/admin/schedule-table'
import { ScheduleForm } from '@/components/admin/schedule-form'
import type { Schedule, EventType } from '@/types/schedule'
import { getAllSchedules, deleteSchedule } from '@/lib/database/api/schedules'

export default function AdminSchedulePage() {
  const { t } = useTranslation()
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)

  // Supabase에서 일정 데이터 가져오기
  const fetchSchedules = async () => {
    try {
      setLoading(true)
      const data = await getAllSchedules()
      setSchedules(data)
      setError(null)
    } catch (err) {
      console.error('일정 데이터 로딩 실패:', err)
      setError('일정 데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  // 필터링된 일정 목록
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.titleZh?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.locationZh?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesEventType =
      eventTypeFilter === 'all' || schedule.eventType === eventTypeFilter

    return matchesSearch && matchesEventType
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteSchedule(id)
      setSchedules(schedules.filter((s) => s.id !== id))
      alert('일정이 삭제되었습니다!')
    } catch (err) {
      console.error('일정 삭제 실패:', err)
      alert('일정 삭제에 실패했습니다.')
    }
  }

  const handleEdit = (schedule: Schedule) => {
    setSelectedSchedule(schedule)
    setFormOpen(true)
  }

  const handleFormSuccess = () => {
    fetchSchedules()
    setSelectedSchedule(null)
  }

  const handleFormClose = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setSelectedSchedule(null)
    }
  }

  // 로딩 중 UI
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-16 w-16 animate-spin text-purple-600 mb-4" />
          <p className="text-lg text-muted-foreground">
            일정 데이터를 불러오는 중...
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
          <Button onClick={() => fetchSchedules()}>
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
          <h1 className="text-3xl font-bold">{t('admin.scheduleManagement')}</h1>
          <p className="text-muted-foreground mt-2">
            일정 목록을 관리합니다
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <CalendarPlus className="h-4 w-4 mr-2" />
          일정 추가
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
                placeholder="제목, 장소 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 이벤트 유형 필터 */}
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="이벤트 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 유형</SelectItem>
              <SelectItem value="press">{t('schedule.eventTypes.press')}</SelectItem>
              <SelectItem value="rally">{t('schedule.eventTypes.rally')}</SelectItem>
              <SelectItem value="concert">{t('schedule.eventTypes.concert')}</SelectItem>
              <SelectItem value="outreach">{t('schedule.eventTypes.outreach')}</SelectItem>
              <SelectItem value="meeting">{t('schedule.eventTypes.meeting')}</SelectItem>
              <SelectItem value="other">{t('schedule.eventTypes.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredSchedules.length}개의 일정
        </div>
      </div>

      {/* 테이블 */}
      <ScheduleTable 
        schedules={filteredSchedules} 
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* 등록/수정 폼 다이얼로그 */}
      <ScheduleForm
        open={formOpen}
        onOpenChange={handleFormClose}
        schedule={selectedSchedule}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}

