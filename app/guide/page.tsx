'use client'

import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Info, ArrowLeft, Sparkles, MapPin, Clock, Users as UsersIcon, Gift, Utensils, Music as MusicIcon } from 'lucide-react'
import Link from 'next/link'

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
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
              <div className="inline-block p-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 rounded-lg mb-4">
                <Info className="h-12 w-12 text-white mx-auto mb-2" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  行事案內
                </h1>
                <p className="text-xl text-white mt-2">
                  행사 안내
                </p>
              </div>
            </div>
          </div>

          {/* 안내사항 그리드 */}
          <div className="grid gap-6 max-w-5xl mx-auto mb-8">
            {/* 주요 일정 */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-green-600" />
                📍 주요 일정
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">북항 문화 탐방</h4>
                  <p className="text-sm text-gray-700">北港文化探訪</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">크리스마스 마켓</h4>
                  <p className="text-sm text-gray-700">耶誕市集</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">성탄 음악회</h4>
                  <p className="text-sm text-gray-700">耶誕晚會</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-green-100">
                  <h4 className="font-bold text-green-700 mb-2">주일 예배</h4>
                  <p className="text-sm text-gray-700">主日禮拜</p>
                </div>
              </div>
            </Card>

            {/* 크리스마스 마켓 정보 */}
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Gift className="h-6 w-6 text-red-600" />
                🎄 크리스마스 마켓
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">장소</p>
                    <p className="text-sm text-gray-700">斗六郡公園 (두류군 공원)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">시간</p>
                    <p className="text-sm text-gray-700">13:00 - 16:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <Utensils className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">프로그램</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>한국 공연 (韓國公演)</li>
                      <li>한국 음식 (韓國美食)</li>
                      <li>시 낭송 대회 (詩朗誦比賽)</li>
                      <li>국제 미식 (國際美食)</li>
                      <li>클래식 카드 해석 (經典卡片解說)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 크리스마스 축제 정보 */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MusicIcon className="h-6 w-6 text-purple-600" />
                🎵 크리스마스 축제
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">장소</p>
                    <p className="text-sm text-gray-700">雲科大 雲秀廳 (윈커따 윈슈팅)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">시간</p>
                    <p className="text-sm text-gray-700">19:00 - 21:30</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 참가 안내 */}
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <UsersIcon className="h-6 w-6 text-orange-600" />
                🎯 참가 안내
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="bg-white p-4 rounded-lg border-2 border-orange-100">
                  <p className="font-semibold mb-2">📌 주의 사항</p>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                    <li>일정은 현지 사정에 따라 변경될 수 있습니다</li>
                    <li>본인 일정은 현지 상황에 따라 조정될 수 있습니다</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-orange-100">
                  <p className="font-semibold mb-2">📞 문의</p>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                    <li>자세한 내용은 담당자에게 문의하세요</li>
                    <li>차량팀 내용은 담당자에게 문의하세요</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* 크리스마스 장식 하단 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 text-2xl">
              ⭐ 🎄 🎁 🔔 🎅 🔔 🎁 🎄 ⭐
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

