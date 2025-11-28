'use client'

import { useState } from 'react'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Info, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export default function GuidePage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }
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
            <Card 
              className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-4 border-red-400 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('passport')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">✈️</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📖</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
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
                    <div className="ml-4">
                      {expandedCard === 'passport' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'passport' && (
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
              )}
            </Card>

            {/* 개인물품 준비물 */}
            <Card 
              className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-4 border-blue-400 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('items')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">🎒</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">🧳</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-bounce">🎒</div>
                        <div className="text-5xl animate-bounce delay-100">🧳</div>
                        <div className="text-5xl animate-bounce delay-200">✈️</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        개인물품 준비물
                      </h2>
                      <p className="text-xl text-center font-bold text-blue-200">
                        個人物品準備清單
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'items' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'items' && (
              <div className="p-8 space-y-6">
                {/* 필수 준비물 */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-4 border-red-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🔴</div>
                    <h3 className="text-2xl font-black text-red-700">필수 준비물</h3>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-red-200 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">📋</div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-800 mb-3">여권, 지갑, 여권사본, 현지화폐, 신용카드(VISA 또는 MASTER), 여권사진 2매(분실)</p>
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                          <p className="text-xl font-black text-red-600">
                            ※ 여권유효 기간 필 확인
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border-2 border-red-200 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">📖</div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-800">성경, 생명의 삶, 필기도구</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🧴</div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-gray-800 mb-3">세면도구 및 생활용품</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          세면도구(치약, 칫솔, 클렌징폼, (면도기), 빗), 면봉/솜, 때수건) 기초화장품, 선글라스, 모자, 우산, 썬크림, 복용약 및 상비약, 단체티, 대청 단체티, 대만 현금 (NTD2,000), 휴대폰 충전기/케이블, <span className="text-red-600 font-bold">전원 아답터(110V임)</span>, 각종 옷(양말), 신발, 슬리퍼, 동전지갑
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 부가 준비물 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-4 border-green-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🟢</div>
                    <h3 className="text-2xl font-black text-green-700">부가 준비물 (선택사항)</h3>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-green-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      기타 화장품, 고데기, 개인식품, 보조 밧데리, 손톱깍이, 이어폰, 셀카봉, 휴지/물티슈, 비닐봉지(빨래) /지퍼백, 휴대용선풍기, 손수건, 귀마개, 마스크팩, 백팩/가방, 접이식 장바구니
                    </p>
                  </div>
                </div>

                {/* 수하물 안내 */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-4 border-orange-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🧳</div>
                    <h3 className="text-2xl font-black text-orange-700">수하물 규정</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 border-2 border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">✈️</div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-orange-700 mb-2">화물</p>
                          <p className="text-gray-700 mb-3">배분받은 짐을 각자 소지하여 방문국으로 가져감 (물품가방 28인치 이상~)</p>
                          <div className="bg-orange-100 p-4 rounded-lg">
                            <p className="text-sm font-bold text-orange-800 mb-1">위탁 수화물:</p>
                            <p className="text-sm text-gray-700">일반석: 23Kg 1개, 비즈니스: 32Kg 2개+ 모닝캄 이상 1개 추가</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🎒</div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-orange-700 mb-2">기내</p>
                          <p className="text-gray-700">기내 20인치 10Kg 이내</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="space-y-3">
                    <p className="text-xl font-black text-center mb-4">⚠️ 주의사항</p>
                    <div className="space-y-2 text-sm md:text-base">
                      <p className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>오디오 가이드를 위하여 유선 3.5파이 이어폰 준비</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>육류 반입금지</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>기내가방: 보조 바데리 반드시 기내가방(개인 휴대)</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-yellow-300">•</span>
                        <span>수하물: 액체류, 스프레이, 날카로운 제품(가위, 칼등)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )}
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

