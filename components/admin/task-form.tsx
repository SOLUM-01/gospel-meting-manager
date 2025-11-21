'use client'

import { useState } from 'react'
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
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CreateTaskDto, TaskCategory, TaskPriority } from '@/types/task'
import { Calendar, Upload, X, Loader2 } from 'lucide-react'
import { uploadTaskImage } from '@/lib/database/storage'
import Image from 'next/image'

interface TaskFormProps {
  initialData?: Partial<CreateTaskDto>
  onSubmit: (data: CreateTaskDto) => void
  onCancel?: () => void
  isEdit?: boolean
}

export function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: TaskFormProps) {
  const { t } = useTranslation()

  const [formData, setFormData] = useState<CreateTaskDto>({
    title: initialData?.title || '',
    titleZh: initialData?.titleZh || '',
    description: initialData?.description || '',
    descriptionZh: initialData?.descriptionZh || '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || 'preparation',
    priority: initialData?.priority || 'medium',
    isPublic: initialData?.isPublic ?? true,
    tags: initialData?.tags || [],
    assignedTo: initialData?.assignedTo || [],
    startDate: initialData?.startDate,
    dueDate: initialData?.dueDate,
  })

  const [tagInput, setTagInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || '')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.')
      return
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    try {
      setUploading(true)
      
      // 미리보기 생성
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Supabase Storage에 업로드
      const imageUrl = await uploadTaskImage(file)
      
      setFormData({
        ...formData,
        imageUrl,
      })

      alert('이미지가 업로드되었습니다!')
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      alert('이미지 업로드에 실패했습니다.')
      setImagePreview('')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      imageUrl: '',
    })
    setImagePreview('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
      <Card>
        <CardHeader>
          <CardTitle>{t('tasks.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">제목 (한국어) *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="titleZh">標題 (繁體中文) *</Label>
            <Input
              id="titleZh"
              value={formData.titleZh}
              onChange={(e) =>
                setFormData({ ...formData, titleZh: e.target.value })
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* 이미지 업로드 */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Upload className="h-5 w-5 inline mr-2" />
            사역 이미지
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {imagePreview ? (
            <div className="space-y-4">
              <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                이미지를 변경하려면 새 이미지를 선택하세요
              </p>
            </div>
          ) : (
            <div>
              <Label htmlFor="image" className="cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">업로드 중...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <p className="font-medium">클릭하여 이미지 업로드</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, GIF 파일 (최대 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 설명 */}
      <Card>
        <CardHeader>
          <CardTitle>{t('tasks.description')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">설명 (한국어)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="descriptionZh">說明 (繁體中文)</Label>
            <Textarea
              id="descriptionZh"
              value={formData.descriptionZh}
              onChange={(e) =>
                setFormData({ ...formData, descriptionZh: e.target.value })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 및 우선순위 */}
      <Card>
        <CardHeader>
          <CardTitle>분류</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">{t('tasks.category')} *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as TaskCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preparation">
                    {t('tasks.categories.preparation')}
                  </SelectItem>
                  <SelectItem value="event">
                    {t('tasks.categories.event')}
                  </SelectItem>
                  <SelectItem value="followup">
                    {t('tasks.categories.followup')}
                  </SelectItem>
                  <SelectItem value="logistics">
                    {t('tasks.categories.logistics')}
                  </SelectItem>
                  <SelectItem value="program">
                    {t('tasks.categories.program')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">{t('tasks.priority')} *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value as TaskPriority })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    {t('tasks.priorities.low')}
                  </SelectItem>
                  <SelectItem value="medium">
                    {t('tasks.priorities.medium')}
                  </SelectItem>
                  <SelectItem value="high">
                    {t('tasks.priorities.high')}
                  </SelectItem>
                  <SelectItem value="urgent">
                    {t('tasks.priorities.urgent')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 날짜 */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar className="h-5 w-5 inline mr-2" />
            일정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">{t('tasks.startDate')}</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={
                  formData.startDate
                    ? new Date(formData.startDate)
                        .toISOString()
                        .slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="dueDate">{t('tasks.dueDate')}</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={
                  formData.dueDate
                    ? new Date(formData.dueDate).toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 태그 */}
      <Card>
        <CardHeader>
          <CardTitle>{t('tasks.tags')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <Button type="button" onClick={addTag}>
              추가
            </Button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 공개 설정 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isPublic" className="text-base">
                {t('tasks.isPublic')}
              </Label>
              <p className="text-sm text-muted-foreground">
                공개 페이지에서 볼 수 있도록 설정
              </p>
            </div>
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPublic: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 버튼 */}
      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          {isEdit ? t('common.save') : t('common.create')}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        )}
      </div>
    </form>
  )
}

