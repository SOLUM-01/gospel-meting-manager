'use client'

import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function SchedulePage() {
  const scheduleData = [
    {
      date: '12/18',
      day: 'Thr.',
      dayKo: '목',
      items: [
        { time: '오전', kr: '早上\n아침', activities: [] },
        { 
          time: '오후', 
          kr: '下午\n오후',
          activities: [
            { kr: '韓國to대만타이중의 공항', zh: '台灣台中機場\nto 韓國' }
          ]
        },
        { 
          time: '저녁', 
          kr: '晚上\n저녁',
          activities: [
            { kr: '환영 만찬', zh: '歡迎晚宴' }
          ]
        }
      ]
    },
    {
      date: '12/19',
      day: 'Fri.',
      dayKo: '금',
      items: [
        { 
          time: '오전', 
          kr: '',
          activities: [
            { kr: '원린 북항 탐방', zh: '雲林北港採訪' }
          ]
        },
        { 
          time: '오후', 
          kr: '下午\n오후',
          activities: [
            { kr: '크리스마스 마켓 준비', zh: '耶誕市集預備' }
          ]
        },
        { 
          time: '저녁', 
          kr: '晚上\n저녁',
          activities: [
            { kr: '대만 한국 연합 격례 기도회/크리스마스 선물 교환', zh: '台韓聯合歡迎晚會/耶誕聖父探禮物' }
          ]
        }
      ]
    },
    {
      date: '12/20',
      day: 'Sat.',
      dayKo: '토',
      items: [
        { 
          time: '오전', 
          kr: '',
          activities: [
            { kr: '크리스마스 마켓 준비/공연 단체 리허설', zh: '耶誕市集預備/去演唱露營場' }
          ]
        },
        { 
          time: '오후', 
          kr: '',
          activities: [
            { kr: '크리스마스 마켓', zh: '耶誕市集' }
          ]
        },
        { 
          time: '저녁', 
          kr: '',
          activities: [
            { kr: '성탄 음악회', zh: '耶誕晚會' }
          ]
        }
      ]
    },
    {
      date: '12/21',
      day: 'Sun.',
      dayKo: '일',
      items: [
        { 
          time: '오전', 
          kr: '',
          activities: [
            { kr: '주일 모임', zh: '主日聚會' }
          ]
        },
        { 
          time: '오후', 
          kr: '',
          activities: [
            { kr: '현장파의 식사', zh: '與韓府用餐' },
            { kr: '복음 폭발 수입&탐방', zh: '福音爆發獎座探訪' }
          ]
        },
        { 
          time: '저녁', 
          kr: '',
          activities: [
            { kr: '탐방 팀과 함께 저녁 식사', zh: '和採訪院共進晚餐' }
          ]
        }
      ]
    },
    {
      date: '12/22',
      day: 'Mon.',
      dayKo: '월',
      items: [
        { 
          time: '오전', 
          kr: '',
          activities: [
            { kr: '타이중 유람', zh: '台中遊覽' }
          ]
        },
        { 
          time: '오후', 
          kr: '',
          activities: [
            { kr: '대만타이중의 공항\nto 대만', zh: '台灣台中機場\nto 韓國' }
          ]
        },
        { time: '저녁', kr: '', activities: [] }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
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
            
            {/* 크리스마스 장식 */}
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 text-2xl">
                🎄 💡 🎅 💡 🎁 💡 ⭐ 💡 🔔 💡 🎄
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-red-600 via-green-600 to-red-600 rounded-lg mb-4">
                <Calendar className="h-12 w-12 text-white mx-auto mb-2" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  韓國參訪台灣行程表
                </h1>
                <p className="text-xl text-white mt-2">
                  한국의 대만 방문 일정표
                </p>
              </div>
            </div>
          </div>

          {/* 일정표 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {scheduleData.map((day, dayIndex) => (
              <Card 
                key={dayIndex} 
                className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* 날짜 헤더 */}
                <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4 rounded-t-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{day.date}</div>
                    <div className="text-sm">({day.day})</div>
                  </div>
                </div>

                {/* 시간별 일정 */}
                <div className="p-4 space-y-4">
                  {day.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="min-h-[120px]">
                      {/* 시간 라벨 */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {item.time}
                        </div>
                      </div>

                      {/* 활동 내용 */}
                      <div className="space-y-2">
                        {item.activities.length > 0 ? (
                          item.activities.map((activity, actIndex) => (
                            <div 
                              key={actIndex} 
                              className="bg-white p-3 rounded-lg border-2 border-amber-200 hover:border-amber-400 transition-colors"
                            >
                              <div className="text-sm font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                                {activity.zh}
                              </div>
                              <div className="text-xs text-blue-600 mt-1 whitespace-pre-line leading-relaxed">
                                {activity.kr}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-400 text-sm py-4">
                            -
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* 크리스마스 장식 하단 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 text-2xl">
              ⭐ 🎄 🎁 🔔 🎅 🔔 🎁 🎄 ⭐
            </div>
          </div>

          {/* 안내사항 */}
          <Card className="bg-gradient-to-r from-red-50 to-green-50 border-2 border-red-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-red-600" />
              행사 안내
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-green-700 mb-1">📍 주요 일정</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>북항 문화 탐방</li>
                  <li>크리스마스 마켓</li>
                  <li>성탄 음악회</li>
                  <li>주일 예배</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-red-700 mb-1">🎯 참가 안내</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>일정은 현지 사정에 따라 변경될 수 있습니다</li>
                  <li>자세한 내용은 담당자에게 문의하세요</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
