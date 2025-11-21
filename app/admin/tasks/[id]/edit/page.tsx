'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { TaskForm } from '@/components/admin/task-form'
import { useTranslation } from '@/lib/i18n/use-translation'
import { useAuthStore } from '@/app/store/auth-store'
import type { Task, UpdateTaskDto } from '@/types/task'
import { getTaskById, updateTask } from '@/lib/database/api/tasks'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { t } = useTranslation()
  const { admin } = useAuthStore()
  const { id } = use(params)
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const data = await getTaskById(id)
        setTask(data)
        setError(null)
      } catch (err) {
        console.error('사역 데이터 로딩 실패:', err)
        setError('사역 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleSubmit = async (data: UpdateTaskDto) => {
    try {
      await updateTask(id, data)
      alert('사역이 수정되었습니다!')
      router.push('/admin/tasks')
    } catch (error) {
      console.error('사역 수정 실패:', error)
      alert('사역 수정에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    router.push('/admin/tasks')
  }

  // 로딩 중
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-16 w-16 animate-spin text-purple-600 mb-4" />
          <p className="text-lg text-muted-foreground">
            사역 데이터를 불러오는 중...
          </p>
        </div>
      </div>
    )
  }

  // 에러
  if (error || !task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-red-500 mb-4">
            {error || '사역을 찾을 수 없습니다.'}
          </p>
          <Button onClick={() => router.push('/admin/tasks')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 헤더 */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/tasks">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t('admin.editTask')}</h1>
        <p className="text-muted-foreground mt-2">
          사역 정보를 수정합니다
        </p>
      </div>

      {/* 폼 */}
      <TaskForm
        initialData={{
          title: task.title,
          titleZh: task.titleZh,
          description: task.description,
          descriptionZh: task.descriptionZh,
          category: task.category,
          priority: task.priority,
          assignedTo: task.assignedTo,
          teamId: task.teamId,
          dueDate: task.dueDate,
          startDate: task.startDate,
          isPublic: task.isPublic,
          tags: task.tags,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit
      />
    </div>
  )
}

