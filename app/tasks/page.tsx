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
    '미용'
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

      {/* 회비 공지 섹션 */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-4 border-amber-400 shadow-2xl rounded-lg overflow-hidden">
          {/* 헤더 배너 */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 text-9xl">💰</div>
            <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📢</div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-5xl animate-pulse">💰</div>
                <div className="text-5xl animate-pulse delay-100">📢</div>
                <div className="text-5xl animate-pulse delay-200">💳</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                [회비 공지]
              </h2>
              <p className="text-xl text-center font-bold text-amber-200">
                繳費通知
              </p>
            </div>
          </div>

          {/* 본문 내용 */}
          <div className="p-8 space-y-6">
            {/* 1. 회비 금액 */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-300 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-black text-gray-800 mb-3">
                    1인당 55만원
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">- 산출근거:</span> 첨부예산(안) 참조
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 입금 계좌 */}
            <div className="bg-white rounded-xl p-6 border-2 border-orange-300 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-gray-800 mb-3">
                    입금계좌: 카카오뱅크
                  </p>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-lg border-2 border-orange-300">
                    <p className="text-2xl font-black text-center text-orange-900 tracking-wider">
                      3333-34-2421695
                    </p>
                    <p className="text-lg font-bold text-center text-orange-800 mt-2">
                      (조영선)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 기한 */}
            <div className="bg-white rounded-xl p-6 border-2 border-red-300 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-gray-800 mb-3">
                    기한
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
                    <p className="text-3xl font-black text-red-600 text-center animate-pulse">
                      12.3(수) 까지
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 감사 메시지 */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-center text-2xl font-black">
                🙏 감사합니다 🙏
              </p>
              <p className="text-center text-lg mt-2 font-semibold">
                謝謝
              </p>
            </div>
          </div>
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

