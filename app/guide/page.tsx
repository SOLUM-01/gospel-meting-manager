'use client'

import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Info, ArrowLeft } from 'lucide-react'
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
          <div className="grid gap-6 max-w-4xl mx-auto mb-8">
            {/* 여권 유효기간 확인 */}
            <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-4 border-red-400 shadow-2xl overflow-hidden">
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">✈️</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📖</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="text-5xl animate-pulse">🛂</div>
                    <div className="text-5xl animate-pulse delay-100">📖</div>
                    <div className="text-5xl animate-pulse delay-200">✈️</div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                    여권 유효기간 확인 필독
                  </h2>
                  <p className="text-xl text-center font-bold text-yellow-200">
                    護照有效期確認必讀
                  </p>
                </div>
              </div>

              {/* 본문 내용 */}
              <div className="p-8">
                {/* 중요 안내 박스 */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-4 border-orange-300">
                  <div className="flex items-start gap-4">
                    <div className="text-6xl flex-shrink-0">⚠️</div>
                    <div className="space-y-4 flex-1">
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <p className="text-lg font-bold text-gray-800 mb-2">
                          🌏 해외여행 경우 각 나라마다 다르지만
                        </p>
                        <p className="text-xl font-extrabold text-red-600">
                          대만은 출국일로부터 <span className="text-3xl underline decoration-wavy decoration-red-500">6개월</span> 이상이어야 합니다
                        </p>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <p className="text-lg font-bold text-gray-800 mb-2">
                          ✅ 안심하려면
                        </p>
                        <p className="text-xl font-extrabold text-green-600">
                          <span className="text-3xl">2026년 6월</span> 이후 유효기간이어야 합니다
                        </p>
                      </div>

                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <p className="text-lg font-bold text-gray-800 mb-2">
                          🔄 만약 그 이전이라면
                        </p>
                        <p className="text-xl font-extrabold text-red-600">
                          재발급을 하시는 게 좋습니다
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 시각적 타임라인 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                    📅 여권 유효기간 타임라인
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="text-center">
                      <div className="bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold mb-2 shadow-lg">
                        📅
                      </div>
                      <p className="font-bold text-gray-700">출국일</p>
                      <p className="text-sm text-gray-600">2025.12.18</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-5xl">➕</div>
                      <p className="font-bold text-orange-600 mt-2">6개월</p>
                    </div>

                    <div className="text-center">
                      <div className="bg-green-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold mb-2 shadow-lg">
                        ✅
                      </div>
                      <p className="font-bold text-gray-700">최소 유효기간</p>
                      <p className="text-sm text-green-600 font-bold">2026년 6월 이후</p>
                    </div>
                  </div>
                </div>

                {/* 강조 메시지 */}
                <div className="mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-center text-2xl font-black animate-pulse">
                    ⚠️ 꼭 확인해 보시기 바랍니다 ⚠️
                  </p>
                  <p className="text-center text-lg mt-2 font-semibold">
                    請務必確認護照有效期
                  </p>
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

