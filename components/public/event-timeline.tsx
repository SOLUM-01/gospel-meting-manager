'use client'

import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

interface TimelineEvent {
  time: string
  title: string
  location?: string
}

export function EventTimeline() {
  const { t } = useTranslation()

  const marketEvents: TimelineEvent[] = [
    { time: '10:00-10:30', title: '長官、來賓、媒體報到' },
    { time: '10:30-10:31', title: '耶誕慶典前導影片' },
    { time: '10:31-10:40', title: '韓國舞蹈表演' },
    { time: '10:40-10:55', title: '長官貴賓介紹及致詞' },
    { time: '10:55-11:00', title: '啟動儀式' },
    { time: '11:00-11:05', title: '媒體聯訪' },
  ]

  const celebrationEvents: TimelineEvent[] = [
    { time: '19:00-19:15', title: '福氣耶誕歌曲組曲' },
    { time: '19:15-19:25', title: '長官、來賓介紹及致詞' },
    { time: '19:25-19:30', title: '城市祝福告白' },
    { time: '19:30-19:35', title: '大合唱' },
    { time: '19:35-19:45', title: '雲林福音青年表演' },
    { time: '19:45-19:50', title: '韓國廚子舞' },
    { time: '19:50-20:00', title: '耶誕好消息' },
    { time: '20:00-20:20', title: '韓國Kpop表演' },
    { time: '20:20-20:40', title: '宋松樹 Solnamoo' },
    { time: '20:40-21:00', title: '金秀 Kim Soo' },
    { time: '21:00-21:10', title: '賭府520' },
    { time: '21:10-21:20', title: '大合唱' },
    { time: '21:20-21:30', title: '攝影時間' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 기자회견 및 시장 */}
      <Card className="border-2 border-pink-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-pink-500" />
            {t('event.market.title')} 記者會
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('event.market.location')} | 12/15 10:00-11:05
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketEvents.map((event, index) => (
              <div
                key={index}
                className="flex gap-4 relative pl-4 border-l-2 border-pink-500/30 pb-4 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500 border-2 border-background"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-semibold text-pink-600 dark:text-pink-400">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{event.title}</p>
                  {event.location && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 축제 */}
      <Card className="border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            {t('event.celebration.title')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('event.celebration.location')} | 12/20 {t('event.celebration.time')}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {celebrationEvents.map((event, index) => (
              <div
                key={index}
                className="flex gap-4 relative pl-4 border-l-2 border-purple-500/30 pb-4 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-background"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-semibold text-purple-600 dark:text-purple-400">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

