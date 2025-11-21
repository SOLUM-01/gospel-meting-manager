'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Schedule, CreateScheduleDto, EventType } from '@/types/schedule'
import { createSchedule, updateSchedule } from '@/lib/database/api/schedules'
import { Loader2 } from 'lucide-react'

interface ScheduleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: Schedule | null
  onSuccess: () => void
}

export function ScheduleForm({ open, onOpenChange, schedule, onSuccess }: ScheduleFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateScheduleDto>({
    title: '',
    titleZh: '',
    description: '',
    descriptionZh: '',
    eventType: 'other',
    location: '',
    locationZh: '',
    address: '',
    startTime: new Date(),
    endTime: new Date(),
    performers: [],
    isMainEvent: false,
    color: '#8B5CF6',
    maxParticipants: undefined,
    tags: [],
    isPublic: true,
  })

  const [performersInput, setPerformersInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (schedule) {
      setFormData({
        title: schedule.title,
        titleZh: schedule.titleZh,
        description: schedule.description,
        descriptionZh: schedule.descriptionZh,
        eventType: schedule.eventType,
        location: schedule.location,
        locationZh: schedule.locationZh,
        address: schedule.address,
        startTime: new Date(schedule.startTime),
        endTime: new Date(schedule.endTime),
        performers: schedule.performers,
        isMainEvent: schedule.isMainEvent,
        color: schedule.color,
        maxParticipants: schedule.maxParticipants,
        tags: schedule.tags,
        isPublic: schedule.isPublic,
      })
      setPerformersInput(schedule.performers?.join(', ') || '')
      setTagsInput(schedule.tags?.join(', ') || '')
    } else {
      const now = new Date()
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
      
      setFormData({
        title: '',
        titleZh: '',
        description: '',
        descriptionZh: '',
        eventType: 'other',
        location: '',
        locationZh: '',
        address: '',
        startTime: now,
        endTime: oneHourLater,
        performers: [],
        isMainEvent: false,
        color: '#8B5CF6',
        maxParticipants: undefined,
        tags: [],
        isPublic: true,
      })
      setPerformersInput('')
      setTagsInput('')
    }
  }, [schedule, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.titleZh || !formData.location || !formData.locationZh) {
      alert('제목(한국어/중국어)과 장소(한국어/중국어)는 필수 입력 항목입니다.')
      return
    }

    if (formData.startTime >= formData.endTime) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.')
      return
    }

    try {
      setLoading(true)
      
      const submitData = {
        ...formData,
        performers: performersInput ? performersInput.split(',').map(p => p.trim()) : undefined,
        tags: tagsInput ? tagsInput.split(',').map(t => t.trim()) : undefined,
      }
      
      if (schedule) {
        await updateSchedule(schedule.id, submitData)
      } else {
        await createSchedule(submitData)
      }
      
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error('일정 저장 실패:', err)
      alert('일정 저장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {schedule ? '일정 수정' : '일정 등록'}
          </DialogTitle>
          <DialogDescription>
            일정 정보를 입력해주세요. * 표시는 필수 항목입니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 제목 (한국어) */}
            <div className="space-y-2">
              <Label htmlFor="title">제목 (한국어) *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="크리스마스 축제"
                required
              />
            </div>

            {/* 제목 (중국어) */}
            <div className="space-y-2">
              <Label htmlFor="titleZh">제목 (중국어) *</Label>
              <Input
                id="titleZh"
                value={formData.titleZh}
                onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                placeholder="聖誕慶典"
                required
              />
            </div>

            {/* 이벤트 유형 */}
            <div className="space-y-2">
              <Label htmlFor="eventType">이벤트 유형 *</Label>
              <Select 
                value={formData.eventType} 
                onValueChange={(value) => setFormData({ ...formData, eventType: value as EventType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="press">{t('schedule.eventTypes.press')}</SelectItem>
                  <SelectItem value="rally">{t('schedule.eventTypes.rally')}</SelectItem>
                  <SelectItem value="concert">{t('schedule.eventTypes.concert')}</SelectItem>
                  <SelectItem value="outreach">{t('schedule.eventTypes.outreach')}</SelectItem>
                  <SelectItem value="meeting">{t('schedule.eventTypes.meeting')}</SelectItem>
                  <SelectItem value="other">{t('schedule.eventTypes.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 장소 (한국어) */}
            <div className="space-y-2">
              <Label htmlFor="location">장소 (한국어) *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="운과대 운수청"
                required
              />
            </div>

            {/* 장소 (중국어) */}
            <div className="space-y-2">
              <Label htmlFor="locationZh">장소 (중국어) *</Label>
              <Input
                id="locationZh"
                value={formData.locationZh}
                onChange={(e) => setFormData({ ...formData, locationZh: e.target.value })}
                placeholder="雲科大 雲秀廳"
                required
              />
            </div>

            {/* 주소 */}
            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="상세 주소를 입력하세요"
              />
            </div>

            {/* 시작 시간 */}
            <div className="space-y-2">
              <Label htmlFor="startTime">시작 시간 *</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, startTime: new Date(e.target.value) })}
                required
              />
            </div>

            {/* 종료 시간 */}
            <div className="space-y-2">
              <Label htmlFor="endTime">종료 시간 *</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime.toISOString().slice(0, 16)}
                onChange={(e) => setFormData({ ...formData, endTime: new Date(e.target.value) })}
                required
              />
            </div>

            {/* 출연자/발표자 */}
            <div className="space-y-2">
              <Label htmlFor="performers">출연자/발표자 (쉼표로 구분)</Label>
              <Input
                id="performers"
                value={performersInput}
                onChange={(e) => setPerformersInput(e.target.value)}
                placeholder="Kim Soo, Solnamoo, 韓國Kpop公演"
              />
              <p className="text-xs text-muted-foreground">
                여러 출연자는 쉼표(,)로 구분하세요
              </p>
            </div>

            {/* 설명 (한국어) */}
            <div className="space-y-2">
              <Label htmlFor="description">설명 (한국어)</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="일정에 대한 설명을 입력하세요"
                rows={3}
              />
            </div>

            {/* 설명 (중국어) */}
            <div className="space-y-2">
              <Label htmlFor="descriptionZh">설명 (중국어)</Label>
              <Textarea
                id="descriptionZh"
                value={formData.descriptionZh || ''}
                onChange={(e) => setFormData({ ...formData, descriptionZh: e.target.value })}
                placeholder="請輸入活動說明"
                rows={3}
              />
            </div>

            {/* 최대 참가자 수 */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">최대 참가자 수</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants || ''}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="제한 없음"
                min="1"
              />
            </div>

            {/* 색상 */}
            <div className="space-y-2">
              <Label htmlFor="color">캘린더 색상</Label>
              <Input
                id="color"
                type="color"
                value={formData.color || '#8B5CF6'}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            {/* 태그 */}
            <div className="space-y-2">
              <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="복음, 크리스마스, 공연"
              />
            </div>

            {/* 메인 이벤트 */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isMainEvent"
                checked={formData.isMainEvent}
                onCheckedChange={(checked) => setFormData({ ...formData, isMainEvent: checked })}
              />
              <Label htmlFor="isMainEvent">메인 이벤트로 표시</Label>
            </div>

            {/* 공개 여부 */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
              />
              <Label htmlFor="isPublic">공개 일정</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {schedule ? t('common.save') : t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

