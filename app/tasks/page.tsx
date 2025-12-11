'use client'

import { useState, useEffect } from 'react'
import { TaskCard } from '@/components/public/task-card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListTodo, Search, ArrowLeft } from 'lucide-react'
import type { Task, TaskCategory, TaskPriority, TaskStatus } from '@/types/task'
import { getPublicTasks } from '@/lib/database/api/tasks'
import Link from 'next/link'

export default function TasksPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusTab, setStatusTab] = useState<string>('all')
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Supabase에서 사역 데이터 가져오기
  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true)
        const data = await getPublicTasks()
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

  // 사역 순서 정의 (고정 순서)
  const taskOrder = [
    '전폭특강',
    '전도팀',
    '찬양팀',
    '중보기도',
    '부채춤',
    '푸드',
    '차량물품',
    '미용',
    '선물팀',
    '어린이 사역팀'
  ]

  // 필터링된 사역 목록
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.titleZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.descriptionZh?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        categoryFilter === 'all' || task.category === categoryFilter

      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter

      const matchesStatus =
        statusTab === 'all' || task.status === statusTab

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus
    })
    .sort((a, b) => {
      // 지정된 순서대로 정렬
      const indexA = taskOrder.indexOf(a.title)
      const indexB = taskOrder.indexOf(b.title)
      
      // 둘 다 순서에 있으면 순서대로
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB
      }
      // A만 순서에 있으면 A를 먼저
      if (indexA !== -1) return -1
      // B만 순서에 있으면 B를 먼저
      if (indexB !== -1) return 1
      // 둘 다 순서에 없으면 제목으로 정렬
      return a.title.localeCompare(b.title)
    })

  // 상태별 카운트
  const statusCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  }

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
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
            <ListTodo className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('tasks.title')}</h1>
            <p className="text-muted-foreground">
              {t('participants.total')}: {tasks.length}
            </p>
          </div>
        </div>
      </div>

      {/* 검색 섹션 */}
      <div className="mb-8">
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

      {/* 상태 탭 */}
      <Tabs value={statusTab} onValueChange={setStatusTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">
            전체 ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="todo">
            {t('tasks.statuses.todo')} ({statusCounts.todo})
          </TabsTrigger>
          <TabsTrigger value="in_progress">
            {t('tasks.statuses.in_progress')} ({statusCounts.in_progress})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('tasks.statuses.completed')} ({statusCounts.completed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={statusTab} className="mt-6">
          {/* 사역 목록 */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">
                사역 데이터를 불러오는 중...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <ListTodo className="h-16 w-16 mx-auto text-red-500 mb-4" />
              <p className="text-lg text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                다시 시도
              </Button>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ListTodo className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                검색 결과가 없습니다
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

