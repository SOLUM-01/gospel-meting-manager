'use client'

import { useRouter } from 'next/navigation'
import { TaskForm } from '@/components/admin/task-form'
import { useTranslation } from '@/lib/i18n/use-translation'
import { useAuthStore } from '@/app/store/auth-store'
import type { CreateTaskDto } from '@/types/task'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NewTaskPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { admin } = useAuthStore()

  const handleSubmit = async (data: CreateTaskDto) => {
    try {
      const { createTask } = await import('@/lib/database/api/tasks')
      await createTask(data)
      alert('사역이 등록되었습니다!')
      router.push('/admin/tasks')
    } catch (error) {
      console.error('사역 등록 실패:', error)
      alert('사역 등록에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    router.push('/admin/tasks')
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
        <h1 className="text-3xl font-bold">{t('admin.createTask')}</h1>
        <p className="text-muted-foreground mt-2">
          새로운 할일을 등록합니다
        </p>
      </div>

      {/* 폼 */}
      <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

