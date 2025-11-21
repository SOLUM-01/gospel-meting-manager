'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ListTodo,
  Users,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'
import { getAllTasks } from '@/lib/database/api/tasks'
import { getAllParticipants } from '@/lib/database/api/participants'
import { getAllSchedules } from '@/lib/database/api/schedules'

export default function AdminDashboardPage() {
  const { t } = useTranslation()
  
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalParticipants: 0,
    totalSchedules: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tasks, participants, schedules] = await Promise.all([
          getAllTasks(),
          getAllParticipants(),
          getAllSchedules(),
        ])
        
        setStats({
          totalTasks: tasks.length,
          totalParticipants: participants.length,
          totalSchedules: schedules.length,
        })
      } catch (error) {
        console.error('통계 데이터 로딩 실패:', error)
      }
    }
    
    fetchStats()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
        <p className="text-muted-foreground mt-2">
          2025 雲林城市耶誕慶典 관리 현황
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 사역 */}
        <Link href="/admin/tasks">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                사역 등록
              </CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                등록된 사역
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 참가자 */}
        <Link href="/admin/participants">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                참가자 관리
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalParticipants}</div>
              <p className="text-xs text-muted-foreground mt-1">
                등록된 참가자 수
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* 일정 */}
        <Link href="/admin/schedule">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                일정 관리
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSchedules}</div>
              <p className="text-xs text-muted-foreground mt-1">
                등록된 일정
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

