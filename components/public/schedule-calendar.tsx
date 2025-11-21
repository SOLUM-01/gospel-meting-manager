'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/use-translation'
import type { Schedule } from '@/types/schedule'
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns'
import { ko, zhTW } from 'date-fns/locale'
import Link from 'next/link'

interface ScheduleCalendarProps {
  schedules: Schedule[]
}

export function ScheduleCalendar({ schedules }: ScheduleCalendarProps) {
  const { t, language } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)) // 2025년 12월
  const dateLocale = language === 'zh-TW' ? zhTW : ko

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'press':
        return 'bg-pink-500'
      case 'rally':
        return 'bg-purple-500'
      case 'concert':
        return 'bg-blue-500'
      case 'outreach':
        return 'bg-green-500'
      case 'meeting':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getSchedulesForDay = (day: Date) => {
    return schedules.filter((schedule) =>
      isSameDay(new Date(schedule.startTime), day)
    )
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  return (
    <div className="space-y-6">
      {/* 달력 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">
              {format(currentDate, 'yyyy년 M월', { locale: dateLocale })}
            </CardTitle>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 달력 그리드 */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const daySchedules = getSchedulesForDay(day)
              const isCurrentDay = isToday(day)

              return (
                <div
                  key={day.toString()}
                  className={`min-h-[100px] p-2 border rounded-lg transition-colors ${
                    isCurrentDay
                      ? 'bg-primary/10 border-primary'
                      : 'bg-background border-border hover:bg-accent'
                  } ${
                    !isSameMonth(day, currentDate) ? 'opacity-50' : ''
                  }`}
                >
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      isCurrentDay ? 'text-primary' : ''
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {daySchedules.slice(0, 3).map((schedule) => (
                      <Link
                        key={schedule.id}
                        href={`/schedule/${schedule.id}`}
                      >
                        <div
                          className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getEventTypeColor(
                            schedule.eventType
                          )} text-white truncate`}
                          title={
                            language === 'zh-TW'
                              ? schedule.titleZh
                              : schedule.title
                          }
                        >
                          {language === 'zh-TW'
                            ? schedule.titleZh
                            : schedule.title}
                        </div>
                      </Link>
                    ))}
                    {daySchedules.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{daySchedules.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 이벤트 범례 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">이벤트 유형</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              'press',
              'rally',
              'concert',
              'outreach',
              'meeting',
              'other',
            ].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded ${getEventTypeColor(type)}`}
                ></div>
                <span className="text-sm">
                  {t(`schedule.types.${type}`)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

