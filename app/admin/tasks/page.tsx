'use client'

import { useState, useEffect } from 'react'
import { TaskTable } from '@/components/admin/task-table'
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
import { Plus, Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { Task } from '@/types/task'
import { getAllTasks, deleteTask } from '@/lib/database/api/tasks'

export default function AdminTasksPage() {
  const { t } = useTranslation()
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Supabase에서 사역 데이터 가져오기
  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true)
        const data = await getAllTasks()
        setTasks(data)
        setError(null)
      } catch (err) {
        console.error('사역 데이터 로딩 실패:', err)
        setError('사역 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTasks()
  }, [])

  // 필터링된 할일 목록
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.titleZh?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 사역을 삭제하시겠습니까?')) {
      return
    }

    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
      alert('할일이 삭제되었습니다!')
    } catch (err) {
      console.error('사역 삭제 실패:', err)
      alert('사역 삭제에 실패했습니다.')
    }
  }

  // 로딩 중 UI
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

  // 에러 UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
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
          <h1 className="text-3xl font-bold">{t('admin.taskManagement')}</h1>
          <p className="text-muted-foreground mt-2">
            할일 목록을 관리합니다
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tasks/new">
            <Plus className="h-4 w-4 mr-2" />
            {t('tasks.createNew')}
          </Link>
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
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 상태 필터 */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t('tasks.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="todo">
                {t('tasks.statuses.todo')}
              </SelectItem>
              <SelectItem value="in_progress">
                {t('tasks.statuses.in_progress')}
              </SelectItem>
              <SelectItem value="completed">
                {t('tasks.statuses.completed')}
              </SelectItem>
              <SelectItem value="cancelled">
                {t('tasks.statuses.cancelled')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredTasks.length}개의 할일
        </div>
      </div>

      {/* 테이블 */}
      <TaskTable tasks={filteredTasks} onDelete={handleDelete} />
    </div>
  )
}

