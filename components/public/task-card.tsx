'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/use-translation'
import type { Task } from '@/types/task'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { t, language } = useTranslation()
  const router = useRouter()

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/tasks/${task.id}`)
  }

  return (
    <Card className="overflow-hidden border-2 transition-all hover:shadow-xl">
      {/* 이미지 영역 */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        {task.imageUrl ? (
          <Image
            src={task.imageUrl}
            alt={language === 'zh-TW' ? task.titleZh : task.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">📋</div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* 제목 */}
        <h3 className="text-xl font-bold mb-2 line-clamp-1">
          {language === 'zh-TW' ? task.titleZh : task.title}
        </h3>

        {/* 설명 */}
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">
          {language === 'zh-TW' 
            ? (task.descriptionZh || '사역에 대한 설명이 준비 중입니다.')
            : (task.description || '사역에 대한 설명이 준비 중입니다.')}
        </p>

        {/* 상세보기 버튼 */}
        <Button 
          onClick={handleDetailClick}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6"
          size="lg"
        >
          상세보기
        </Button>
      </CardContent>
    </Card>
  )
}

