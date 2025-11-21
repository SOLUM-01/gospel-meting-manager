'use client'

import { useTranslation } from '@/lib/i18n/use-translation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import type { Schedule } from '@/types/schedule'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'

interface ScheduleTableProps {
  schedules: Schedule[]
  onDelete: (id: string) => void
  onEdit?: (schedule: Schedule) => void
}

export function ScheduleTable({ schedules, onDelete, onEdit }: ScheduleTableProps) {
  const { t } = useTranslation()

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'press':
        return 'bg-purple-500'
      case 'rally':
        return 'bg-red-500'
      case 'concert':
        return 'bg-pink-500'
      case 'outreach':
        return 'bg-green-500'
      case 'meeting':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`"${title}" 일정을 정말 삭제하시겠습니까?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>이벤트 유형</TableHead>
            <TableHead>장소</TableHead>
            <TableHead>시작 시간</TableHead>
            <TableHead>종료 시간</TableHead>
            <TableHead>메인 이벤트</TableHead>
            <TableHead>공개</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                등록된 일정이 없습니다
              </TableCell>
            </TableRow>
          ) : (
            schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{schedule.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {schedule.titleZh}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getEventTypeColor(schedule.eventType)}>
                    {t(`schedule.eventTypes.${schedule.eventType}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm">{schedule.location}</div>
                    <div className="text-xs text-muted-foreground">
                      {schedule.locationZh}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(new Date(schedule.startTime), 'PPp', { locale: ko })}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(new Date(schedule.endTime), 'PPp', { locale: ko })}
                  </span>
                </TableCell>
                <TableCell>
                  {schedule.isMainEvent ? (
                    <Badge className="bg-yellow-500">메인</Badge>
                  ) : (
                    <Badge variant="outline">-</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {schedule.isPublic ? (
                    <Badge variant="secondary">공개</Badge>
                  ) : (
                    <Badge variant="outline">비공개</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/schedule/${schedule.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          보기
                        </Link>
                      </DropdownMenuItem>
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(schedule)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(schedule.id, schedule.title)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

