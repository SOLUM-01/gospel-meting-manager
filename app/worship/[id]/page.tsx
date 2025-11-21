'use client'

import { useParams } from 'next/navigation'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Construction } from 'lucide-react'
import Link from 'next/link'

export default function WorshipDetailPage() {
  const params = useParams()
  const { t } = useTranslation()
  const songId = params.id

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* 뒤로 가기 버튼 */}
          <Link href="/worship">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
          </Link>

          {/* Placeholder 컨텐츠 */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Construction className="h-8 w-8 text-yellow-500" />
                찬양 상세 페이지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  찬양 ID: <span className="font-mono font-bold">{songId}</span>
                </p>
                <div className="p-6 bg-muted rounded-lg text-center">
                  <Construction className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-xl font-bold mb-2">준비 중입니다</h3>
                  <p className="text-muted-foreground">
                    상세 페이지는 추후 구현 예정입니다.
                  </p>
                </div>
                <div className="flex justify-center pt-4">
                  <Link href="/worship">
                    <Button>
                      찬양 목록으로 돌아가기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

