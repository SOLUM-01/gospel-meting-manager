'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import type { Participant, CreateParticipantDto, ParticipantRole, Gender, TeamCategory } from '@/types/participant'
import { createParticipant, updateParticipant } from '@/lib/database/api/participants'
import { Loader2 } from 'lucide-react'

interface ParticipantFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participant?: Participant | null
  onSuccess: () => void
}

export function ParticipantForm({ open, onOpenChange, participant, onSuccess }: ParticipantFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateParticipantDto>({
    name: '',
    nameZh: '',
    phone: '',
    email: '',
    role: 'member',
    nationality: '한국',
    notes: '',
  })

  const [gender, setGender] = useState<Gender | undefined>()
  const [teamCategory, setTeamCategory] = useState<TeamCategory | undefined>()

  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name,
        nameZh: participant.nameZh,
        phone: participant.phone,
        email: participant.email,
        role: participant.role,
        nationality: participant.nationality,
        notes: participant.notes,
      })
      setGender(participant.gender)
      setTeamCategory(participant.teamCategory)
    } else {
      setFormData({
        name: '',
        nameZh: '',
        phone: '',
        email: '',
        role: 'member',
        nationality: '한국',
        notes: '',
      })
      setGender(undefined)
      setTeamCategory(undefined)
    }
  }, [participant, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone) {
      alert('이름과 전화번호는 필수 입력 항목입니다.')
      return
    }

    try {
      setLoading(true)
      
      const submitData = {
        ...formData,
        gender,
        teamCategory,
      }
      
      if (participant) {
        await updateParticipant(participant.id, submitData)
      } else {
        await createParticipant(submitData)
      }
      
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error('참가자 저장 실패:', err)
      alert('참가자 저장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const teamCategories: TeamCategory[] = [
    '전폭특강',
    '전도팀',
    '중보기도팀',
    '찬양팀',
    '부채춤팀',
    '푸드팀',
    '미용팀',
    '물품팀',
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {participant ? '참가자 수정' : '참가자 등록'}
          </DialogTitle>
          <DialogDescription>
            참가자 정보를 입력해주세요. * 표시는 필수 항목입니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* 이름 */}
            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                required
              />
            </div>

            {/* 중국어 이름 */}
            <div className="space-y-2">
              <Label htmlFor="nameZh">중국어 이름</Label>
              <Input
                id="nameZh"
                value={formData.nameZh || ''}
                onChange={(e) => setFormData({ ...formData, nameZh: e.target.value })}
                placeholder="洪吉童"
              />
            </div>

            {/* 성별 */}
            <div className="space-y-2">
              <Label htmlFor="gender">성별</Label>
              <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
                <SelectTrigger>
                  <SelectValue placeholder="성별 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">남성</SelectItem>
                  <SelectItem value="F">여성</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호 *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-1234-5678"
                required
              />
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>

            {/* 팀 카테고리 */}
            <div className="space-y-2">
              <Label htmlFor="teamCategory">팀 카테고리</Label>
              <Select value={teamCategory} onValueChange={(value) => setTeamCategory(value as TeamCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="팀 선택" />
                </SelectTrigger>
                <SelectContent>
                  {teamCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 역할 */}
            <div className="space-y-2">
              <Label htmlFor="role">역할 *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value as ParticipantRole })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leader">{t('participants.roles.leader')}</SelectItem>
                  <SelectItem value="member">{t('participants.roles.member')}</SelectItem>
                  <SelectItem value="volunteer">{t('participants.roles.volunteer')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 국적 */}
            <div className="space-y-2">
              <Label htmlFor="nationality">국적 *</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                placeholder="한국"
                required
              />
            </div>

            {/* 비고 */}
            <div className="space-y-2">
              <Label htmlFor="notes">비고</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="추가 정보를 입력하세요"
                rows={3}
              />
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
              {participant ? t('common.save') : t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

