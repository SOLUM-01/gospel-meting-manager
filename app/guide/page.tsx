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
            {/* 전도메뉴얼 */}
            <Card 
              className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-4 border-amber-500 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('evangelism')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">📖</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">🇹🇼</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">📖</div>
                        <div className="text-5xl animate-pulse delay-100">🗣️</div>
                        <div className="text-5xl animate-pulse delay-200">🇹🇼</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        전도 메뉴얼
                      </h2>
                      <p className="text-xl text-center font-bold text-amber-200">
                        傳道手冊 | 대만 현지 회화
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'evangelism' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'evangelism' && (
              <div className="p-8 space-y-6">
                {/* STEP 1: 도입 인사 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-4 border-blue-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black shadow-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-blue-700">도입 인사</h3>
                      <p className="text-sm text-blue-600">Introduction 開場白</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* 인사 1 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <p className="text-3xl font-black text-red-600 mb-2">你好嗎？</p>
                      <p className="text-xl font-bold text-orange-600 mb-1">Nǐ hǎo ma? | 니 하오 마?</p>
                      <p className="text-lg text-gray-700 bg-blue-50 p-2 rounded">👋 안녕하세요?</p>
                    </div>

                    {/* 인사 2 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <p className="text-3xl font-black text-red-600 mb-2">我是韓國來的。</p>
                      <p className="text-xl font-bold text-orange-600 mb-1">Wǒ shì Hán-guó lái de. | 워 쉬 한궈 라이 더</p>
                      <p className="text-lg text-gray-700 bg-blue-50 p-2 rounded">🇰🇷 저는 한국에서 왔습니다.</p>
                      {/* 영상 1: 안녕하세요? 저는 한국에서 왔습니다. */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/MdmTsUuPxO0"
                          title="안녕하세요? 저는 한국에서 왔습니다."
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* 인사 3 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <p className="text-3xl font-black text-red-600 mb-2">可以跟你聊一會兒嗎？</p>
                      <p className="text-xl font-bold text-orange-600 mb-1">Kěyǐ gēn nǐ liáo yí huìr ma? | 커이 건 니 랴오 이 후얼 마?</p>
                      <p className="text-lg text-gray-700 bg-blue-50 p-2 rounded">💬 당신과 잠깐 이야기를 나눌 수 있을까요?</p>
                    </div>

                    {/* 인사 4 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <p className="text-3xl font-black text-red-600 mb-2">我想和你分享一則好消息。</p>
                      <p className="text-xl font-bold text-orange-600 mb-1">Wǒ xiǎng hé nǐ fēnxiǎng yì zé hǎo xiāoxi. | 워 시앙 허 니 펀샹 이 쩌 하오 샤오시</p>
                      <p className="text-lg text-gray-700 bg-blue-50 p-2 rounded">✨ 저는 당신과 기쁜 소식을 나누고 싶습니다.</p>
                      {/* 영상 2: 당신과 잠깐 이야기... 기쁜 소식 */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/uM-EgBTe2fs"
                          title="당신과 잠깐 이야기를 나눌 수 있을까요? 저는 당신과 기쁜 소식을 나누고 싶습니다."
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: 선물 전달 */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-4 border-pink-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black shadow-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-pink-700">선물 전달</h3>
                      <p className="text-sm text-pink-600">Gift Giving 送禮物</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* 선물 1 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">선택 1</div>
                      <p className="text-2xl font-black text-red-600 mb-2">這是我帶來的小禮物，準備送給我見面的人。請收下。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Zhè shì wǒ dài lái de xiǎo lǐwù, zhǔnbèi sòng gěi wǒ jiànmiàn de rén. Qǐng shōu xià.</p>
                      <p className="text-base text-orange-500 mb-2">쯔 스 워 따이 라이 더 샤오 리우, 쥰베이 송 게이 워 지엔미엔 더 런. 칭 쇼우 시아.</p>
                      <p className="text-lg text-gray-700 bg-pink-50 p-2 rounded">🎁 이것은 제가 만나는 사람들에게 주려고 가져온 작은 선물입니다. 받아주세요.</p>
                      {/* 영상 3: 선택 1 */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/6QVflTssuuo"
                          title="이것은 제가 만나는 사람들에게 주려고 가져온 작은 선물입니다. 받아주세요."
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* 선물 2 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">선택 2</div>
                      <p className="text-2xl font-black text-red-600 mb-2">這是給你的小禮物，希望能帶給你祝福。請收下。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Zhè shì gěi nǐ de xiǎo lǐwù, xīwàng néng dài gěi nǐ zhùfú. Qǐng shōu xià.</p>
                      <p className="text-base text-orange-500 mb-2">쯔 스 게이 니 더 샤오 리우, 씨왕 능 따이 게이 니 주푸. 칭 쇼우 시아.</p>
                      <p className="text-lg text-gray-700 bg-pink-50 p-2 rounded">🎁 이것은 당신에게 드리는 작은 선물입니다. 당신께 축복이 되기를 바랍니다. 받아주세요.</p>
                      {/* 영상 4: 선택 2 */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/qAf65lP1o3Y"
                          title="이것은 당신에게 드리는 작은 선물입니다. 당신께 축복이 되기를 바랍니다. 받아주세요."
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* 영원한 선물 */}
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-400 shadow-md space-y-4">
                      {/* 영상 5: 이 선물은 쓰고 나면 없어져버립니다 */}
                      <div>
                        <p className="text-2xl font-black text-red-600 mb-2">這個禮物用完後就沒有了。</p>
                        <p className="text-lg font-bold text-orange-600 mb-1">Zhè ge lǐwù yòng wán hòu jiù méi yǒu le. | 쩌 거 리우 용완 허우 지우 메이요우 러</p>
                        <p className="text-lg text-gray-700 bg-yellow-50 p-2 rounded mb-3">📦 이 선물은 쓰고 나면 없어져버립니다.</p>
                        <div className="rounded-lg overflow-hidden aspect-video">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/AEGs_NA4Fpc"
                            title="이 선물은 쓰고 나면 없어져버립니다."
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      
                      {/* 영상 6: 그래서 영원히 없어지지 않는 선물을 드리려고 합니다 */}
                      <div>
                        <p className="text-2xl font-black text-red-600 mb-2">所以我把一份永不消失的禮物送給你。</p>
                        <p className="text-lg font-bold text-orange-600 mb-1">Suǒyǐ wǒ bǎ yí fèn yǒng bù xiāoshī de lǐwù sòng gěi nǐ.</p>
                        <p className="text-base text-orange-500 mb-2">쑤오이 워 바 이펀 용부 샤오스 더 리우 송 게이 니</p>
                        <p className="text-lg text-gray-700 bg-yellow-50 p-2 rounded mb-3">✨ 그래서 영원히 없어지지 않는 선물을 드리려고 합니다.</p>
                        <div className="rounded-lg overflow-hidden aspect-video">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/zEBWhQLTS_o"
                            title="그래서 영원히 없어지지 않는 선물을 드리려고 합니다."
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      
                      {/* 영상 7: 당신은 이 영원한 선물을 받으시겠습니까? */}
                      <div>
                        <p className="text-2xl font-black text-red-600 mb-2">你願意接受這份永生的禮物嗎？</p>
                        <p className="text-lg font-bold text-orange-600 mb-1">Nǐ yuànyì jiēshòu zhè fèn yǒngshēng de lǐwù ma?</p>
                        <p className="text-base text-orange-500 mb-2">니 위엔이 지에쇼우 쩌 펀 용성 더 리우 마?</p>
                        <p className="text-lg text-gray-700 bg-yellow-50 p-2 rounded mb-3">🙏 당신은 이 영원한 선물을 받으시겠습니까?</p>
                        <div className="rounded-lg overflow-hidden aspect-video">
                          <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/gFNuMcuVyy8"
                            title="당신은 이 영원한 선물을 받으시겠습니까?"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 3: 복음 제시 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-4 border-green-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black shadow-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-green-700">복음 제시</h3>
                      <p className="text-sm text-green-600">Gospel Presentation 福音分享</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* 책 보여주기 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">📖 책을 펴서 손가락으로 가리키면서</div>
                      <p className="text-2xl font-black text-red-600 mb-2">你可以看一下這裡，請閱讀一下吧。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Nǐ kěyǐ kàn yíxià zhèlǐ, qǐng yuèdú yíxià ba.</p>
                      <p className="text-base text-orange-500 mb-2">니 커이 칸 이샤 쩌리, 칭 위에두 이샤 바</p>
                      <p className="text-lg text-gray-700 bg-green-50 p-2 rounded">👀 여기를 보면서 읽어보시겠어요.</p>
                      {/* 영상 8: 여기를 보면서 읽어보시겠어요? */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/pdn24o58BZ8"
                          title="여기를 보면서 읽어보시겠어요?"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* 복음 제시 순서 */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-5 border-2 border-green-300">
                      <h4 className="text-xl font-black text-green-800 mb-3">📋 복음 제시 순서</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                          <span className="font-bold text-gray-700">확신 질문 두 개</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                          <span className="font-bold text-gray-700">은혜 恩典</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                          <span className="font-bold text-gray-700">인간 人</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                          <span className="font-bold text-gray-700">하나님 神</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">5</span>
                          <span className="font-bold text-gray-700">예수 그리스도 耶穌基督</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">6</span>
                          <span className="font-bold text-gray-700">믿음 信心</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center gap-2 md:col-span-2">
                          <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">7</span>
                          <span className="font-bold text-gray-700">결신 질문 / 결신 기도문 읽기</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 4: 마무리 인사 */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border-4 border-purple-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black shadow-lg">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-purple-700">마무리 인사</h3>
                      <p className="text-sm text-purple-600">Closing 結束語</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* 마무리 1 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">📚 전도지를 가리키면서</div>
                      <p className="text-2xl font-black text-red-600 mb-2">請你回到家以後，一定要讀一讀這本小冊子。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Qǐng nǐ huí dào jiā yǐhòu, yídìng yào dú yí dú zhè běn xiǎo cèzi.</p>
                      <p className="text-base text-orange-500 mb-2">칭 니 후이따오 지아 이호우, 이딩 야오 두 이두 쩌 번 샤오 쯔</p>
                      <p className="text-lg text-gray-700 bg-purple-50 p-2 rounded">📖 당신은 집에 돌아가서 이 작은 책자를 꼭 반드시 읽어보세요.</p>
                      {/* 영상 9: 당신은 집에 돌아가서 이 작은 책자를 꼭 반드시 읽어보세요. */}
                      <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                        <iframe 
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/MFdRqFMnqgA"
                          title="당신은 집에 돌아가서 이 작은 책자를 꼭 반드시 읽어보세요."
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* 마무리 2 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <p className="text-2xl font-black text-red-600 mb-2">當你閱讀這本小冊子的時候，你將迎來一生之中最重要的時刻。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Dāng nǐ yuèdú zhè běn xiǎo cèzi de shíhou, nǐ jiāng yínglái yìshēng zhī zhōng zuì zhòngyào de shíkè.</p>
                      <p className="text-base text-orange-500 mb-2">당 니 위에두 쩌 번 샤오 쯔 더 스허우, 니 지앙 잉라이 이성 즈쭝 쭈이 쭝야오 더 스커</p>
                      <p className="text-lg text-gray-700 bg-purple-50 p-2 rounded">⭐ 당신이 이 작은 책자를 읽을 때 당신의 일생 중에 가장 중요한 순간을 맞이할 것입니다.</p>
                    </div>

                    {/* 마무리 3 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <p className="text-2xl font-black text-red-600 mb-2">如果你想作為上帝的孩子來生活，請去教會或禮拜堂。</p>
                      <p className="text-lg font-bold text-orange-600 mb-1">Rúguǒ nǐ xiǎng zuòwéi Shàngdì de háizi lái shēnghuó, qǐng qù jiàohuì huòzhě lǐbàitáng.</p>
                      <p className="text-base text-orange-500 mb-2">루궈 니 샹 쭈오웨이 샹디 더 하이즈 라이 셩후어, 칭 취 지아오후이 훠저 리바이탕</p>
                      <p className="text-lg text-gray-700 bg-purple-50 p-2 rounded">⛪ 그리고 하나님의 자녀로 살고 싶다면 교회나 예배당을 가세요.</p>
                    </div>

                    {/* 축복 인사 */}
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-400 shadow-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-yellow-300">
                          <p className="text-3xl font-black text-red-600 mb-1">我們祝福你。</p>
                          <p className="text-lg font-bold text-orange-600">Wǒmen zhùfú nǐ.</p>
                          <p className="text-base text-orange-500">워먼 주푸 니</p>
                          <p className="text-lg text-gray-700 mt-2">🙏 축복합니다.</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-yellow-300">
                          <p className="text-3xl font-black text-red-600 mb-1">我在主裡愛你。</p>
                          <p className="text-lg font-bold text-orange-600">Wǒ zài zhǔ lǐ ài nǐ.</p>
                          <p className="text-base text-orange-500">워 짜이 주 리 아이 니</p>
                          <p className="text-lg text-gray-700 mt-2">❤️ 주님 안에서 당신을 사랑합니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 말씀 인용 */}
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center space-y-3">
                    <p className="text-xl font-bold italic">
                      "많은 사람을 옳은 데로 돌아오게 한 자는 별과 같이 영원토록 빛나리라"
                    </p>
                    <p className="text-lg font-semibold">
                      다니엘 12:3
                    </p>
                    <p className="text-2xl font-black mt-4">
                      🙏 하나님의 은혜가 함께 하시길! 🙏
                    </p>
                  </div>
                </div>
              </div>
              )}
            </Card>
            {/* 대면회의내용(25.12.8) */}
            <Card 
              className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 border-4 border-rose-500 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('meeting1208')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">📋</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📝</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">📋</div>
                        <div className="text-5xl animate-pulse delay-100">✏️</div>
                        <div className="text-5xl animate-pulse delay-200">📝</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        대면회의내용(25.12.8)
                      </h2>
                      <p className="text-xl text-center font-bold text-rose-200">
                        對面會議內容
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'meeting1208' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'meeting1208' && (
              <div className="p-8 space-y-6">
                {/* 물품 배분 현황(25.12.8) */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-4 border-blue-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">📦</div>
                    <h3 className="text-2xl font-black text-blue-700">물품 배분 현황(25.12.8)</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* 1. 한복 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">👘 한복</p>
                          <p className="text-gray-700">문유선(전량)</p>
                        </div>
                      </div>
                    </div>

                    {/* 2. 팝업북 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">📚 팝업북(교육용), 121권(1포장 4권)</p>
                          <p className="text-gray-700 text-sm leading-relaxed">곽미동(2개), 김동환, 김민중, 김양신, 김영미, 김유하, 김정, 김진해(2개), 박혜성, 서희숙, 송형숙(2개), 오경자(2개, 5권포함), 이보라, 이승헌, 이혜승, 정회평(2개), 제인현, 조영선, 조하령(2개), 최미자(2개), 최세정(2개), 최희주</p>
                        </div>
                      </div>
                    </div>

                    {/* 3. 복음팔찌 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">📿 복음팔찌(300개)</p>
                          <p className="text-gray-700">김동환</p>
                        </div>
                      </div>
                    </div>

                    {/* 4. 복 주머니 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">🧧 복 주머니(150개)</p>
                          <p className="text-gray-700">제인현</p>
                        </div>
                      </div>
                    </div>

                    {/* 5. 푸드팀 앞치마 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">👨‍🍳 푸드팀(앞치마) 22개</p>
                          <p className="text-gray-700 text-sm">김영미(3개), 김유하, 김진해(9개), 박효양, 서희숙, 이보라, 이순옥, 이혜승, 임종옥(2개), 조하령, 최우현</p>
                        </div>
                      </div>
                    </div>

                    {/* 6. 대만 교육용 배너 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">🎌 대만 교육용 배너</p>
                          <p className="text-gray-700">김진해 : 대(1개), 소(1개)</p>
                        </div>
                      </div>
                    </div>

                    {/* 7. 남녀두루마기 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">7</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">👘 남녀두루마기</p>
                          <p className="text-gray-700">김진해</p>
                        </div>
                      </div>
                    </div>

                    {/* 8. 엽서 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">8</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">✉️ 엽서</p>
                          <p className="text-gray-700">1명당 3장씩</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 물품 배분 예정(25.12.15) */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border-4 border-purple-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">📅</div>
                    <h3 className="text-2xl font-black text-purple-700">물품 배분 예정(25.12.15)</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <p className="font-bold text-gray-800">1. 전도물품 2,000개 포장</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <p className="font-bold text-gray-800">2. 일반떡볶이소스(1,300g) 15병, 짜장떡볶이소스(1,300g) 5병</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <p className="font-bold text-gray-800">3. 준비물 : 은혜충만한 맘과 짐을 배분해서 가져가실 캐리어 또는 가방</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl shadow-lg">
                    <p className="text-center text-lg font-black animate-pulse">
                      ★ 25.12.15일 대면 모임 시 에는 전원이 참석하시어 전도물품 포장과 물품 배분에 협조하여 주시면 감사하겠습니다.
                    </p>
                  </div>
                </div>

                {/* 초코파이 */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border-4 border-amber-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🍫</div>
                    <h3 className="text-2xl font-black text-amber-700">초코파이 준비</h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-amber-200">
                    <p className="text-xl font-bold text-center text-gray-800">
                      초코파이 1인당 1Box 씩 준비하시기 바랍니다.
                    </p>
                  </div>
                </div>

                {/* 초청자 현황 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-4 border-green-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">👥</div>
                    <h3 className="text-2xl font-black text-green-700">초청자 현황</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <p className="font-bold text-gray-800">• 윈린현에서 현장님 초청으로 참석자 <span className="text-green-600 text-xl">100명</span></p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <p className="font-bold text-gray-800">• 동우료우 시장님이 초청한 시 행정관 <span className="text-green-600 text-xl">30명</span></p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg">
                    <p className="text-center text-2xl font-black">
                      총 130명 참석 예정
                    </p>
                  </div>
                </div>

                {/* 12.15 대면 모임 안내 */}
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border-4 border-cyan-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">📍</div>
                    <h3 className="text-2xl font-black text-cyan-700">12.15(월) 출발전 마지막 대면 모임안내</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-200 shadow-md">
                      <p className="font-bold text-gray-800">1. 장소 : 서빙고 콘서트홀(선교관 B02)</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-200 shadow-md">
                      <div className="space-y-2">
                        <p className="font-bold text-gray-800">2. 시간 : 19:00(저녁 7시)</p>
                        <p className="text-gray-700 ml-4">- 찬양 팀 : 16:00(저녁 4시)</p>
                        <p className="text-gray-700 ml-4">- 저녁식사 : 18:30~</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-200 shadow-md">
                      <p className="font-bold text-gray-800">3. 준비물 : 은혜충만한 맘과 짐을 배분해서 가져가실 캐리어 또는 큰 가방</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-200 shadow-md">
                      <div className="space-y-2">
                        <p className="font-bold text-gray-800">4. 할 일 :</p>
                        <p className="text-gray-700 ml-4">• 선물 포장(2,000개)</p>
                        <p className="text-gray-700 ml-4">• 공통짐 분배 및 출발전 최종 준비사항 점검</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12.19 선물 교환 안내 */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-4 border-pink-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🎁</div>
                    <h3 className="text-2xl font-black text-pink-700">12월19일 저녁 선물 교환 관련 안내</h3>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
                    <p className="text-gray-700 italic">
                      ※ 선물준비에 고민이 많으시죠? 부담갖지 마시고 우리 가족끼리 명절에 사랑을 담은 마음의 표시라고 생각하시면 될 거 같습니다
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <p className="font-bold text-gray-800">1. 일시 : 19일 저녁 연합기도회 후 일반 성도는 귀가하신 후</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <p className="font-bold text-gray-800">2. 교환 대상 : 후치교회 리더십(순장과 그 가족 60여명)</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="space-y-2">
                        <p className="font-bold text-gray-800">3. 선물 준비 :</p>
                        <p className="text-gray-700 ml-4">• 한국 돈 17,000원 정도의 한국의 문화 전통을 담은 소박한 선물</p>
                        <p className="text-gray-700 ml-4">• 손글씨로 축복과 사랑의 메세지를 쓴 카드와 함께</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 선물팀 */}
                <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-2xl p-6 border-4 border-fuchsia-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🎁</div>
                    <h3 className="text-2xl font-black text-fuchsia-700">선물팀</h3>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-fuchsia-200">
                    <h4 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                      👥 팀원 (4명)
                    </h4>
                    <div className="space-y-3">
                      {/* 우주연 */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          우
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800">
                            우주연 <span className="text-gray-500 font-normal">(禹周延)</span>
                          </p>
                          <p className="text-xs text-gray-500">찬양/푸드/통역/전도</p>
                        </div>
                      </div>
                      {/* 김영미 */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          김
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800">
                            김영미 <span className="text-gray-500 font-normal">(金英薇)</span>
                          </p>
                          <p className="text-xs text-gray-500">푸드/찬양/전도</p>
                        </div>
                      </div>
                      {/* 이보라 */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          이
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800">
                            이보라 <span className="text-gray-500 font-normal">(李保羅)</span>
                          </p>
                          <p className="text-xs text-gray-500">찬양/푸드/전도</p>
                        </div>
                      </div>
                      {/* 최우현 */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          최
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800">
                            최우현 <span className="text-gray-500 font-normal">(崔禹炫)</span>
                          </p>
                          <p className="text-xs text-gray-500">푸드/찬양</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 대만 반입 불가 물품 */}
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 border-4 border-red-500 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🚫</div>
                    <h3 className="text-2xl font-black text-red-700">대만 절대 반입 불가 물품</h3>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-4">
                    <p className="text-red-700 font-bold text-lg">
                      이 정도는 괜찮겠지~~~ 천만에 말씀입니다.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-5 border-2 border-red-300 shadow-md mb-4">
                    <p className="text-gray-800 leading-relaxed">
                      육고기 냄새라도 들어있는 라면/컵라면, 볶음 고추장 등, <span className="font-bold text-red-600">육류/육류가공 모든 제품 반입 불가</span>입니다.
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      (육류: 소고기, 돼지고기, 닭고기, 오리고기, 양고기 등등등)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-red-500 text-white rounded-xl p-4 shadow-md">
                      <p className="font-bold text-center">
                        1차 적발시: NTD20만 = <span className="text-2xl">한화 약 800만원</span>
                      </p>
                    </div>
                    <div className="bg-red-700 text-white rounded-xl p-4 shadow-md">
                      <p className="font-bold text-center">
                        최대: NTD100만 = <span className="text-2xl">한화 약 4천만원</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-xl shadow-lg">
                    <p className="text-center text-xl font-black animate-pulse">
                      ⚠️ 대만 세관을 시험하지 마세용~~ ⚠️
                    </p>
                  </div>
                </div>

                {/* Grand Earl Hotel */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border-4 border-indigo-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🏨</div>
                    <h3 className="text-2xl font-black text-indigo-700">Grand Earl Hotel</h3>
                  </div>

                  <div className="bg-white rounded-xl p-5 border-2 border-indigo-200 shadow-md">
                    <p className="text-gray-800 mb-3">저희가 머무르게 될 Grand Earl Hotel입니다.</p>
                    <a 
                      href="https://naver.me/FgTyEI2X" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-600 transition-colors"
                    >
                      🔗 네이버에서 보기
                    </a>
                  </div>
                </div>

                {/* 준비물 및 대만 전압 안내 */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border-4 border-yellow-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">⚡</div>
                    <h3 className="text-2xl font-black text-yellow-700">준비물 및 대만 전압 안내</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-200 shadow-md">
                      <p className="font-bold text-gray-800">• 기본적인 세면도구, 드라이기, 수건 비치되어 있음</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-200 shadow-md">
                      <p className="font-bold text-gray-800">• 칫솔, 치약, 면도기, 개인용 전기장판(초겨울 날씨이나 난방이 안됩니다)은 준비하시는 게 좋겠습니다</p>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-4 border-2 border-yellow-400 shadow-md">
                      <p className="font-bold text-yellow-800">
                        ⚡ 대만 전압이 <span className="text-2xl text-red-600">110V</span>이니까 전기장판, 전기제품은 110V나 자동변압이 아니면 가져오지 마세요..
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-200 shadow-md">
                      <p className="font-bold text-gray-800">• 대만은 빌딩 자체가 난방이 없어서 추위 타시는 분은 보온에 잘 대비해오시는게 좋습니다</p>
                    </div>
                  </div>
                </div>

                {/* 입국신고서 */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-4 border-teal-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">📄</div>
                    <h3 className="text-2xl font-black text-teal-700">입국신고서</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-teal-200 shadow-md">
                      <p className="font-bold text-gray-800">• 비행기 타시기 전에 대만 입국 신고서 인터넷으로 작성해서 제출하고 오세요</p>
                    </div>
                    <div className="bg-teal-100 rounded-xl p-4 border-2 border-teal-400 shadow-md">
                      <p className="font-bold text-teal-800">
                        ⚠️ 10월부터 종이 입국 신고서가 폐지되서 인터넷으로 작성해서 제출하셔야 합니다
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white rounded-xl p-5 border-2 border-teal-200 shadow-md">
                    <a 
                      href="https://twac.immigration.gov.tw/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-600 transition-colors"
                    >
                      🔗 대만 입국 신고서 작성하기
                    </a>
                  </div>
                </div>

                {/* 강조 메시지 */}
                <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-center text-2xl font-black">
                    🙏 함께 준비해요! 🙏
                  </p>
                  <p className="text-center text-lg mt-2 font-semibold">
                    讓我們一起準備！
                  </p>
                </div>
              </div>
              )}
            </Card>
            {/* 대만 방문 일정표 */}
            <Card 
              className="bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 border-4 border-sky-500 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('schedule')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">✈️</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📅</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">✈️</div>
                        <div className="text-5xl animate-pulse delay-100">📅</div>
                        <div className="text-5xl animate-pulse delay-200">🇹🇼</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        대만 방문 일정표
                      </h2>
                      <p className="text-xl text-center font-bold text-sky-200">
                        韓國參訪台灣行程表 (2025.12.18-22)
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'schedule' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'schedule' && (
              <div className="p-8 space-y-6">
                {/* 전체 일정 요약 */}
                <div className="bg-gradient-to-r from-sky-100 to-cyan-100 rounded-2xl p-6 border-4 border-sky-300 shadow-lg">
                  <h3 className="text-2xl font-black text-center text-sky-800 mb-4">📅 전체 일정 요약</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center border-2 border-sky-200 shadow-md">
                      <div className="text-lg font-black text-sky-600">12/18</div>
                      <div className="text-sm text-gray-600">목 Thu.</div>
                      <div className="text-xs mt-2 text-gray-700">서울팀 도착<br/>환영 만찬</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border-2 border-green-200 shadow-md">
                      <div className="text-lg font-black text-green-600">12/19</div>
                      <div className="text-sm text-gray-600">금 Fri.</div>
                      <div className="text-xs mt-2 text-gray-700">북항탐방<br/>연합경배기도회</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border-2 border-orange-200 shadow-md">
                      <div className="text-lg font-black text-orange-600">12/20</div>
                      <div className="text-sm text-gray-600">토 Sat.</div>
                      <div className="text-xs mt-2 text-gray-700">크리스마스 마켓<br/>성탄 만찬회</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border-2 border-purple-200 shadow-md">
                      <div className="text-lg font-black text-purple-600">12/21</div>
                      <div className="text-sm text-gray-600">일 Sun.</div>
                      <div className="text-xs mt-2 text-gray-700">연합 주일<br/>복음폭발 수업</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border-2 border-red-200 shadow-md">
                      <div className="text-lg font-black text-red-600">12/22</div>
                      <div className="text-sm text-gray-600">월 Mon.</div>
                      <div className="text-xs mt-2 text-gray-700">타이중 유람<br/>귀국</div>
                    </div>
                  </div>
                </div>

                {/* 12/18 목요일 */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border-4 border-sky-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/18
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-sky-700">목요일 (Thursday)</h3>
                      <p className="text-lg font-bold text-sky-600">首爾團隊抵達 서울 팀 도착</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-sky-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">15:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">정 목사&사우, 타이중공항 도착</p>
                          <p className="text-sm text-gray-600">鄭牧師＆思羽抵達台中機場 | 공항 픽업 코리아 동종업계</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-sky-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">18:00-19:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통시간</p>
                          <p className="text-sm text-gray-600">交通時間 | 공항→호텔</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-sky-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">19:30-21:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">환영 만찬</p>
                          <p className="text-sm text-gray-600">歡迎晚宴 | 호텔 12층. 끝나고 사우님이 격일 일정을 설명해 주신다</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12/19 금요일 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-4 border-green-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/19
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-green-700">금요일 (Friday)</h3>
                      <p className="text-lg font-bold text-green-600">雲林北港探訪、市集預備、台韓聯合敬拜禱告會</p>
                      <p className="text-sm text-gray-600">운림북항탐방, 장보기비, 대한합동경배기도회</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">조식</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">아침을 먹다</p>
                          <p className="text-sm text-gray-600">享用早餐 | 호텔 조식은 6:30-9:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">8:10-9:10</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통교통</p>
                          <p className="text-sm text-gray-600">交通教通 | 호텔→북항</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:10-12:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">운림북항탐방, 점심식사</p>
                          <p className="text-sm text-gray-600">雲林北港探訪、午餐 | 거리 복음전, 소대 방문, 노인학당 탐방</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:30-13:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통교통</p>
                          <p className="text-sm text-gray-600">交通教通 | 북항→교회호텔</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">14:00-17:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-2">팀별 활동</p>
                          <div className="space-y-2 text-sm">
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">서울복음전도구:</span> 1층 선물 꾸러미, 복음 전도 시 리허설
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">식재료 예비팀:</span> 식당&교회 뒤편 모든 재료 준비 ★10인 대만 요리 도우미
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">한복 체험팀:</span> 2층 정리 한복
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">한국 뷰티팀:</span> 2층 교구실 뷰티 서비스, 예비
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">대한민국의 공연팀:</span> 3층 메인 홀 연습
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">17:30-18:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">저녁 식사</p>
                          <p className="text-sm text-gray-600">晚餐저녁 식사 | 교회 1층</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">19:00-21:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">대만한국연합경배기도회</p>
                          <p className="text-sm text-gray-600">台韓聯合敬拜禱告會 | 교회교회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">21:50-</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통교통</p>
                          <p className="text-sm text-gray-600">交通教通 | 교회→호텔</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12/20 토요일 */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-4 border-orange-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/20
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-orange-700">토요일 (Saturday)</h3>
                      <p className="text-lg font-bold text-orange-600">市集預備、耶誕晚會</p>
                      <p className="text-sm text-gray-600">시장 준비, 크리스마스 이브닝 파티</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">조식</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">아침을 먹다</p>
                          <p className="text-sm text-gray-600">享用早餐 | 호텔 조식은 6:30-9:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">8:30-8:40</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→교회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">8:40-11:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-2">팀별 활동</p>
                          <div className="space-y-2 text-sm">
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">식재료 예비팀:</span> 레스토랑 예비소식: 떡볶이, 김밥 각 500인분 ★10인 대만 요리 도우미
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">서울복음전도구:</span> 1층 선물 꾸러미, 복음 전도 시 리허설
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">한복 체험팀:</span> 2층 확인 한복
                            </div>
                            <div className="bg-white/70 p-2 rounded border border-yellow-200">
                              <span className="font-bold text-orange-700">한국 뷰티팀:</span> 2층 교구실 준비
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">11:30-12:20</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">점심식사</p>
                          <p className="text-sm text-gray-600">午餐점심식사 | 교회 1층</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:20-12:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 시장 판매부 & 모든 동종 교회→공원</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:30-13:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">성탄절 장(공원)</p>
                          <p className="text-sm text-gray-600">耶誕市集（公園）| 예비기간(대만동시조합은 미리 장에 도착하여 예비)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">13:00-16:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-red-800 text-lg">🎄 크리스마스 마켓 🎄</p>
                          <p className="text-sm text-gray-700">한국음식판매, 한복체험, 한국뷰티, 복음전파 부스</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">16:00-16:10</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 공원→호텔</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">16:10-17:50</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">호텔 라운지&디너</p>
                          <p className="text-sm text-gray-600">飯店休息＆晚餐 | 17:00 저녁 도시락은 호텔까지 배달됩니다</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">17:50-18:10</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→공연장</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">18:10-19:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">공연장</p>
                          <p className="text-sm text-gray-600">表演廳공연장 | 진장예비입장준비</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">19:00-21:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-red-800 text-lg">🎄 성탄 만찬회 🎄</p>
                          <p className="text-sm text-gray-700">耶誕晚會성탄 음악회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">22:00-</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 공연장→호텔</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12/20 공연팀 별도 일정 */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-4 border-pink-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/20
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-pink-700">토요일 - 공연팀 별도 일정</h3>
                      <p className="text-lg font-bold text-pink-600">表演團隊-彩排、耶誕市集、耶誕晚會</p>
                      <p className="text-sm text-gray-600">공연팀-리허설, 크리스마스 마켓, 크리스마스 이브닝 파티</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">조식</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">아침을 먹다</p>
                          <p className="text-sm text-gray-600">享用早餐 | 호텔 조식은 6:30-9:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:30-9:50</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→공연장</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:30-12:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">공연장</p>
                          <p className="text-sm text-gray-600">表演廳공연장 | 채배리허설</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:00-13:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">점심식사</p>
                          <p className="text-sm text-gray-600">午餐점심식사 | 공연장 대기실 식사</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">13:00-16:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-red-800 text-lg">🎄 성탄절 장터 공연 🎄</p>
                          <p className="text-sm text-gray-700">耶誕市集表演 성탄절 장터 공연.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">17:00-17:50</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">저녁 식사</p>
                          <p className="text-sm text-gray-600">晚餐저녁 식사 | 공연장 대기실 식사</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">19:00-21:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-red-800 text-lg">🎄 성탄 만찬회 🎄</p>
                          <p className="text-sm text-gray-700">耶誕晚會성탄 만찬회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-pink-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">21:40-</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 공연장→호텔</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12/21 일요일 */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border-4 border-purple-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/21
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-purple-700">일요일 (Sunday)</h3>
                      <p className="text-lg font-bold text-purple-600">台韓聯合主日、縣府午宴、福音爆發課程＆探訪、家樂福</p>
                      <p className="text-sm text-gray-600">대한 연합 주일, 현청 오찬, 복음폭발 수업&탐방, 까르푸</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">조식</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">아침을 먹다</p>
                          <p className="text-sm text-gray-600">享用早餐 | 호텔 조식은 6:30-9:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:30-9:40</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→교회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border-2 border-indigo-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">10:00-11:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-indigo-800 text-lg">⛪ 대만과 한국의 합동군주일 ⛪</p>
                          <p className="text-sm text-gray-700">台韓聯合主日</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">11:40-11:50</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 교회→호텔</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:00-13:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">현청 오찬</p>
                          <p className="text-sm text-gray-600">縣府午宴현청 오찬 | 호텔 12층</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">13:30-13:40</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→교회</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">14:00-16:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-yellow-800 text-lg">📖 복음서 폭발 과정 📖</p>
                          <p className="text-sm text-gray-700">傳福音爆發課程</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">16:30-18:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">탐방 소대가 운림향진으로 출발하다.</p>
                          <p className="text-sm text-gray-600">探訪小隊出發到雲林鄉鎮</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">18:30-20:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">탐방소대 저녁식사, 교통시간</p>
                          <p className="text-sm text-gray-600">探訪小隊共進晚餐、交通時間</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">20:30-21:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-blue-800 text-lg">🛒 까르푸 쇼핑!! 🛒</p>
                          <p className="text-sm text-gray-700">家樂福까르푸 shopping!!</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">21:30-21:40</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 까르푸→호텔</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">21:40-22:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">대한민국의 팀별 공유</p>
                          <p className="text-sm text-gray-600">韓國各團隊分享</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12/22 월요일 */}
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border-4 border-red-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-black shadow-lg">
                      12/22
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-red-700">월요일 (Monday)</h3>
                      <p className="text-lg font-bold text-red-600">台灣觀光＆回韓國</p>
                      <p className="text-sm text-gray-600">타이완 관광&한국으로 돌아가기</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">조식</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">아침을 먹다</p>
                          <p className="text-sm text-gray-600">享用早餐 | 호텔 조식은 6:30-9:30</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:00-9:40</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 호텔→嘉義자이</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">9:40-12:20</div>
                        <div className="flex-1">
                          <p className="font-bold text-yellow-800 text-lg">🍍 펑리수 관광공장, 금귤공장 DIY 🍊</p>
                          <p className="text-sm text-gray-700">鳳梨酥觀光工廠、金桔工廠DIY</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">12:30-13:30</div>
                        <div className="flex-1">
                          <p className="font-bold text-orange-800 text-lg">🍜 우육면!! 🍜</p>
                          <p className="text-sm text-gray-700">午餐점심식사 | 牛肉麵！우육면!</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">14:30-16:00</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">교통</p>
                          <p className="text-sm text-gray-600">交通 | 타이중 공항으로 출발합니다.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 border-2 border-sky-300 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-lg font-bold text-sm min-w-[100px] text-center">✈️</div>
                        <div className="flex-1">
                          <p className="font-bold text-sky-800 text-lg">✈️ 한국으로 귀국 ✈️</p>
                          <p className="text-sm text-gray-700">台灣台中機場 to 韓國 대만타이중의 공항 to 대만</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 하단 강조 메시지 */}
                <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-black">
                      ✈️ 2025.12.18 - 12.22 ✈️
                    </p>
                    <p className="text-xl font-bold">
                      🇹🇼 韓國參訪台灣行程表 🇰🇷
                    </p>
                    <p className="text-lg font-semibold">
                      한국의 대만 방문 일정표
                    </p>
                  </div>
                </div>
              </div>
              )}
            </Card>
            {/* 룸 배정 & 차량 탑승 현황 */}
            <Card 
              className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-4 border-slate-500 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('vehicle')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">🚌</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">🚐</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-bounce">🏨</div>
                        <div className="text-5xl animate-bounce delay-100">🚌</div>
                        <div className="text-5xl animate-bounce delay-200">✈️</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        룸 배정 & 차량 탑승 현황
                      </h2>
                      <p className="text-xl text-center font-bold text-slate-200">
                        房間分配 & 車輛乘車現況
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'vehicle' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'vehicle' && (
              <div className="p-8 space-y-6">
                {/* 룸 배정 섹션 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-purple-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-black shadow-lg">
                      🏨
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-purple-700">룸 배정</h3>
                      <p className="text-lg font-bold text-purple-600">房間分配 | Room Assignment</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Room 1 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 1</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">김요성</span>
                          <span className="text-gray-500 text-sm">金堯聖</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 2 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-green-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 2</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">김동환</span>
                          <span className="text-gray-500 text-sm">金東煥</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이혜승</span>
                          <span className="text-gray-500 text-sm">李慧承</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 3 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 3</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">황철호</span>
                          <span className="text-gray-500 text-sm">黃哲昊</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">박세은</span>
                          <span className="text-gray-500 text-sm">朴世銀</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 4 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 4</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">최우현</span>
                          <span className="text-gray-500 text-sm">崔禹炫</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">임종옥</span>
                          <span className="text-gray-500 text-sm">林鍾玉</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 5 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-teal-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-teal-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 5</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">김진해</span>
                          <span className="text-gray-500 text-sm">金鎮海</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">조하령</span>
                          <span className="text-gray-500 text-sm">趙夏翎</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 6 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-indigo-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 6</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">정희평</span>
                          <span className="text-gray-500 text-sm">鄭會平</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">윤숙영</span>
                          <span className="text-gray-500 text-sm">尹淑英</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 7 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-cyan-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 7</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">이승헌</span>
                          <span className="text-gray-500 text-sm">李承憲</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">김대현</span>
                          <span className="text-gray-500 text-sm">金笭炫</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 8 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-rose-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-rose-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 8</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">정선은</span>
                          <span className="text-gray-500 text-sm">鄭旋恩</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">강서현</span>
                          <span className="text-gray-500 text-sm">姜舒縇</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 9 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-violet-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-violet-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 9</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">제인량</span>
                          <span className="text-gray-500 text-sm">諸仁亮</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">제인현</span>
                          <span className="text-gray-500 text-sm">諸仁炫</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 10 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-amber-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 10</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김화숙</span>
                          <span className="text-gray-500 text-sm">金和淑</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이아셀</span>
                          <span className="text-gray-500 text-sm">李亞셀</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 11 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-lime-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-lime-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 11</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김신하</span>
                          <span className="text-gray-500 text-sm">金信河</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김덕희</span>
                          <span className="text-gray-500 text-sm">金德喜</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 12 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-emerald-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 12</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">서희숙</span>
                          <span className="text-gray-500 text-sm">徐喜淑</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 13 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-sky-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-sky-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 13</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김민경</span>
                          <span className="text-gray-500 text-sm">金玟吳</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김정</span>
                          <span className="text-gray-500 text-sm">金靜</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 14 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-fuchsia-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-fuchsia-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 14</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이순옥</span>
                          <span className="text-gray-500 text-sm">李順玉</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">송형숙</span>
                          <span className="text-gray-500 text-sm">宋亨叔</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 15 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 15</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이영민</span>
                          <span className="text-gray-500 text-sm">李寧敏</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">정재영</span>
                          <span className="text-gray-500 text-sm">鄭才瑛</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 16 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-green-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 16</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">문유선</span>
                          <span className="text-gray-500 text-sm">文瑜善</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이서은</span>
                          <span className="text-gray-500 text-sm">李抒恩</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 17 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 17</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">박혜성</span>
                          <span className="text-gray-500 text-sm">朴惠晟</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">우주연</span>
                          <span className="text-gray-500 text-sm">禹周延</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 18 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 18</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">정정희</span>
                          <span className="text-gray-500 text-sm">丁正姬</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">양인숙</span>
                          <span className="text-gray-500 text-sm">梁仁淑</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 19 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-teal-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-teal-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 19</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">유영단</span>
                          <span className="text-gray-500 text-sm">劉英丹</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이정윤</span>
                          <span className="text-gray-500 text-sm">李延允</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 20 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-indigo-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 20</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김양덕</span>
                          <span className="text-gray-500 text-sm">金良德</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이미경</span>
                          <span className="text-gray-500 text-sm">李美敬</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 21 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-cyan-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-cyan-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 21</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김양신</span>
                          <span className="text-gray-500 text-sm">金良信</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">백승이</span>
                          <span className="text-gray-500 text-sm">白承伊</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 22 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-rose-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-rose-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 22</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">백정희</span>
                          <span className="text-gray-500 text-sm">白貞喜</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">유은진</span>
                          <span className="text-gray-500 text-sm">柳恩珍</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 23 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-violet-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-violet-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 23</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">최옥자</span>
                          <span className="text-gray-500 text-sm">崔玉子</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이명대</span>
                          <span className="text-gray-500 text-sm">李明大</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 24 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-amber-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 24</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">차승희</span>
                          <span className="text-gray-500 text-sm">車承喜</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김유하</span>
                          <span className="text-gray-500 text-sm">金有夏</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 25 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-lime-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-lime-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 25</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">최희주</span>
                          <span className="text-gray-500 text-sm">崔希州</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이보라</span>
                          <span className="text-gray-500 text-sm">李保羅</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 26 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-emerald-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 26</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">조영선</span>
                          <span className="text-gray-500 text-sm">趙英善</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">이예진</span>
                          <span className="text-gray-500 text-sm">李芮珍</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 27 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-sky-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-sky-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 27</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">최세정</span>
                          <span className="text-gray-500 text-sm">崔世貞</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">윤효정</span>
                          <span className="text-gray-500 text-sm">尹孝情</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 28 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-fuchsia-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-fuchsia-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 28</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">오경자</span>
                          <span className="text-gray-500 text-sm">吳慶子</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">김영미</span>
                          <span className="text-gray-500 text-sm">金英微</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 29 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-blue-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 29</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">권옥희</span>
                          <span className="text-gray-500 text-sm">權玉姬</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">박효양</span>
                          <span className="text-gray-500 text-sm">朴孝陽</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 30 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-green-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 30</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">최미자</span>
                          <span className="text-gray-500 text-sm">崔美子</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">곽미동</span>
                          <span className="text-gray-500 text-sm">郭美東</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 31 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 31</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">신교순</span>
                          <span className="text-gray-500 text-sm">辛敎順</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-600">👤</span>
                          <span className="font-semibold">강성혜</span>
                          <span className="text-gray-500 text-sm">姜聖惠</span>
                          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs">F</span>
                        </div>
                      </div>
                    </div>

                    {/* Room 32 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-300 shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">Room 32</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600">👤</span>
                          <span className="font-semibold">윤정헌</span>
                          <span className="text-gray-500 text-sm">尹正賢</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 총 룸 수 요약 */}
                  <div className="mt-6 text-center">
                    <span className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg">
                      🏨 총 32개 룸 배정 완료
                    </span>
                  </div>
                </div>

                {/* 차량 탑승 현황 구분선 */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-slate-400 to-slate-400 rounded"></div>
                  <span className="text-2xl font-black text-slate-600 flex items-center gap-2">
                    🚌 차량 탑승 현황 🚐
                  </span>
                  <div className="flex-1 h-1 bg-gradient-to-r from-slate-400 via-slate-400 to-transparent rounded"></div>
                </div>

                {/* 1차량 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-4 border-blue-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black shadow-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-blue-700">1차량</h3>
                      <p className="text-lg font-bold text-blue-600">第1車 | 차장: 김진해 | 통역: 정웅규, 황철호</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex flex-wrap gap-2">
                      {[
                        '김진해', '정웅규', '황철호', '제인량', '김동환', '박세은', '정회평',
                        '윤숙영', '이승헌', '김대현', '정선은', '강서현', '제인현',
                        '이아셀', '김민경', '김정', '문유선', '이서은', '박혜성',
                        '조하령', '김양신', '백승이', '최희주', '조영선', '이예진',
                        '최세정', '윤효정', '오경자', '권옥희', '최미자', '곽미동'
                      ].map((name, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1.5 rounded-lg font-bold border ${
                            name === '김진해' 
                              ? 'bg-blue-500 text-white border-blue-600' 
                              : ['정웅규', '황철호'].includes(name)
                                ? 'bg-blue-400 text-white border-blue-500'
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {name}{name === '김진해' && ' ⭐'}{['정웅규', '황철호'].includes(name) && ' 🌐'}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                        총 31명
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2차량 */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-4 border-emerald-400 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black shadow-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-emerald-700">2차량</h3>
                      <p className="text-lg font-bold text-emerald-600">第2車 | 차장: 윤정현 | 통역: 우주연</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border-2 border-emerald-200">
                    <div className="flex flex-wrap gap-2">
                      {[
                        '윤정현', '우주연', '김요성', '이영민', '정재영', '백정희', '유은진',
                        '최옥자', '이명대', '차승희', '김화숙', '정정희', '양인숙',
                        '유영단', '이정윤', '최우현', '임종옥', '서희숙', '이순옥',
                        '송형숙', '김양덕', '이미경', '김유하', '이보라', '김영미',
                        '박효양', '강성혜', '이혜승', '김신하', '신교순', '김덕희'
                      ].map((name, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1.5 rounded-lg font-bold border ${
                            name === '윤정현' 
                              ? 'bg-emerald-500 text-white border-emerald-600' 
                              : name === '우주연'
                                ? 'bg-emerald-400 text-white border-emerald-500'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          {name}{name === '윤정현' && ' ⭐'}{name === '우주연' && ' 🌐'}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="bg-emerald-600 text-white px-4 py-2 rounded-full font-bold">
                        총 31명
                      </span>
                    </div>
                  </div>
                </div>

                {/* 총인원 요약 */}
                <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center space-y-3">
                    <p className="text-2xl font-black">
                      🚌 전체 탑승 인원: 62명 🚐
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">1차량: 31명</span>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">2차량: 31명</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold mt-2">
                      ⭐ 차장 표시 | 🌐 통역 표시
                    </p>
                  </div>
                </div>
              </div>
              )}
            </Card>
            {/* 대만아웃리치를 위한 기도 */}
            <Card 
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-4 border-purple-400 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('prayer')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">🙏</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">✝️</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">🙏</div>
                        <div className="text-5xl animate-pulse delay-100">✝️</div>
                        <div className="text-5xl animate-pulse delay-200">❤️</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        대만아웃리치를 위한 기도
                      </h2>
                      <p className="text-xl text-center font-bold text-purple-200">
                        台灣外展代禱事項
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'prayer' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'prayer' && (
              <div className="p-8 space-y-4">
                {/* 기도 제목들 */}
                <div className="space-y-4">
                  {/* 기도 1 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        대만 아웃리치를 통해 윈린현에 성령의 불이 일어나고 푸치교회가 날로 성장하는 교회되며 대만이 복음의 항공모함되는데 전초기지로 쓰임받길 기도합니다.
                      </p>
                    </div>
                  </div>

                  {/* 기도 2 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-pink-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        대만전역에 우상들과 하나님을 대적하여 높아진 생각들은 무너지고 예수그리스도가 가장 존귀하게 되기를 기도합니다.
                      </p>
                    </div>
                  </div>

                  {/* 기도 3 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        25년 대만 윈린에서의 성탄절 복음집회를 통한 하나님의 영광이 윈린현과 대만땅에 가득하도록...
                      </p>
                    </div>
                  </div>

                  {/* 기도 4 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        25년도에 함께 참여하시는 전폭팀과 대만 스텝들모두 아웃리치현장통해 성령의 능력과 권능으로 살아계신 하나님을 한마음으로 경험하며 사도행전29장을 써나가는 은혜의 시간되길.
                      </p>
                    </div>
                  </div>

                  {/* 기도 5 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-pink-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        전폭팀과 대만팀이 아웃리치 세부일정에 상호 원할한 소통과 지혜주시길.
                      </p>
                    </div>
                  </div>

                  {/* 기도 6 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        6
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        전도폭발교육을 맡은 제인량목사님에게 성령의 기름 부어주시고 윈린현에 잘 심겨지고 뿌리내려서 충성된 훈련자들과 리더쉽들이 세워지고 배가되게 하옵소서. 이를통해 평신도들도 전도의 사명을 품게 하옵소서.
                      </p>
                    </div>
                  </div>

                  {/* 기도 7 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        7
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        전도폭발팀이 준비하는 모든 과정과 대만에 오가는 모든 여정가운데 하나님의 임재와 기쁨과 사랑이 모든 팀원들에게 가득하며 영혼육이 충만하도록. 대만준비팀에도 피곤치않게하시고 동일한 성령의 은혜를 주옵소서.
                      </p>
                    </div>
                  </div>

                  {/* 기도 8 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-pink-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        8
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        12월20일 크리스마스거리 마켓행사가 은혜가운데 진행되고 영혼구원의 귀한 시간이 되도록 윈린의 많은 사람들로 채워주옵소서. 준비과정부터 공연하는 동안 팀들 (부채춤 워십팀 송솔나무등)의 연합및 기쁨과 충만함이 있게하옵소서 무대설치와 당일 날씨에도 은혜베풀어 주옵소서.
                      </p>
                    </div>
                  </div>

                  {/* 기도 9 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        9
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        거리노방전도에서 꼭 만나야할 귀한 영혼들을 만나게 하시고 전폭교육이 현지교회들에게 귀한 실습이 되어지길. 또한 성령의 강력한 역사를 통해 복음의 능력을 경험하는 전도가 되길 기도합니다.
                      </p>
                    </div>
                  </div>

                  {/* 기도 10 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        10
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        정웅규선교사님께 지혜와 계시의 영으로 충만케하셔서 팀을 잘이끄는데 부족함 없으시도록. 또한 아내 임난주선교사님 12/10 윈린 성탄절집회를 위한 차세대 k-pop훈련사역을 하는데 건강지켜주시길 기도합니다. 또한 참석하는 100여명 윈린정부관료들이 예수 그리스도의 참빛을 경험하고 윈린을 섬기고 대만을 섬기게 하옵소서
                      </p>
                    </div>
                  </div>

                  {/* 기도 11 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-pink-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                        11
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        정회평팀장님과 권옥희총무님 그리고 각 사역팀장들에게 지혜를 주옵소서. 전폭팀모든 지체들이 은사대로 잘 조직되어 섬기며 순종의 믿음과 성령으로 연합되어 선한 열매주시길 기도합니다.
                      </p>
                    </div>
                  </div>

                  {/* 기도 12 */}
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        12
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        참석자모두의 영육간 강건함과 안전을 지켜주시며 영적전쟁에서 승리케하옵소서. 참석자들이 자원함으로 모든 순서에 참여하며 전도의 지경과 비전을 확장시켜주옵소서.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 강조 메시지 */}
                <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-center text-xl font-black">
                    🙏 함께 기도해주세요 🙏
                  </p>
                  <p className="text-center text-sm mt-2 font-semibold">
                    請為我們代禱
                  </p>
                </div>
              </div>
              )}
            </Card>
            {/* 블레싱 타이완 기도제목 */}
            <Card 
              className="bg-gradient-to-br from-red-50 via-green-50 to-red-50 border-4 border-red-500 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('blessing')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">🎄</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">✨</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">🎄</div>
                        <div className="text-5xl animate-pulse delay-100">⭐</div>
                        <div className="text-5xl animate-pulse delay-200">🎁</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        블레싱 타이완 2025
                      </h2>
                      <p className="text-xl text-center font-bold text-red-200">
                        雲林城市耶誕慶典 (2025.12.18-22)
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'blessing' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'blessing' && (
              <div className="p-8 space-y-6">
                {/* 메인 포스터 이미지 - 블레싱 타이완 2025 */}
                <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-red-400">
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <img 
                      src="/images/blessing-taiwan-2025-main.jpg" 
                      alt="블레싱 타이완 2025 메인 포스터"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* 기도제목 포스터 이미지 */}
                <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-green-400">
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <img 
                      src="/images/blessing-taiwan-2025-prayer.jpg" 
                      alt="블레싱 타이완 2025 기도제목"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* 행사 안내 */}
                <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center space-y-3">
                    <p className="text-2xl font-black">
                      🎄 2025 雲林城市耶誕慶典 🎄
                    </p>
                    <p className="text-xl font-bold">
                      2025.12.18 - 12.22
                    </p>
                    <p className="text-lg font-semibold">
                      윈린 雲林 | 주최: 온누리 전도폭발 훈련 학교
                    </p>
                  </div>
                </div>
              </div>
              )}
            </Card>
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
            {/* 단체티 명단 */}
            <Card 
              className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-4 border-emerald-400 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('tshirt')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">👕</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📋</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-bounce">👕</div>
                        <div className="text-5xl animate-bounce delay-100">📋</div>
                        <div className="text-5xl animate-bounce delay-200">✨</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        단체티 명단 (최종본)
                      </h2>
                      <p className="text-xl text-center font-bold text-emerald-200">
                        團體T恤名單 (最終版)
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'tshirt' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'tshirt' && (
              <div className="p-8 space-y-6">
                {/* S 사이즈 */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-4 border-pink-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black shadow-lg">
                      S
                    </div>
                    <h3 className="text-2xl font-black text-pink-700">Small</h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-pink-200">
                    <div className="flex flex-wrap gap-3">
                      {['신교순', '이명대'].map((name, index) => (
                        <span key={index} className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg font-bold border border-pink-300">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* M 사이즈 */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-4 border-blue-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black shadow-lg">
                      M
                    </div>
                    <h3 className="text-2xl font-black text-blue-700">Medium</h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex flex-wrap gap-3">
                      {['곽미동', '김신하', '문유선', '박세은', '백승이', '이서은', '강성혜', '정정희', '이아셀', '이영민', '이예진', '정선은', '정재영', '조하령', '최미자', '윤효정', '조영선', '김민지', '김덕희'].map((name, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold border border-blue-300">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* L 사이즈 */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border-4 border-purple-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-black shadow-lg">
                      L
                    </div>
                    <h3 className="text-2xl font-black text-purple-700">Large</h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200">
                    <div className="flex flex-wrap gap-3">
                      {['김유하', '김진해', '류은진', '서희숙', '유영단', '이보라', '최옥자', '임종옥', '최우현', '박세은', '김화숙'].map((name, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold border border-purple-300">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* XL 사이즈 */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-4 border-orange-300 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-black shadow-lg">
                      XL
                    </div>
                    <h3 className="text-2xl font-black text-orange-700">Extra Large</h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-orange-200">
                    <div className="flex flex-wrap gap-3">
                      {['김정', '이미경', '이승헌', '양인숙', '김동환', '김대현'].map((name, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-bold border border-orange-300">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 총인원 안내 */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <p className="text-2xl font-black mb-2">
                      👕 총 인원: 39명
                    </p>
                    <div className="flex justify-center gap-6 mt-4 flex-wrap">
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">S: 2명</span>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">M: 19명</span>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">L: 11명</span>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <span className="font-bold">XL: 6명</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </Card>
            {/* 회비 공지 */}
            <Card 
              className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-4 border-amber-400 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all"
              onClick={() => toggleCard('fee')}
            >
              {/* 헤더 배너 */}
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-9xl">💰</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-9xl">📢</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="text-5xl animate-pulse">💰</div>
                        <div className="text-5xl animate-pulse delay-100">📢</div>
                        <div className="text-5xl animate-pulse delay-200">💳</div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-center mb-2 tracking-tight">
                        회비 공지
                      </h2>
                      <p className="text-xl text-center font-bold text-amber-200">
                        繳費通知
                      </p>
                    </div>
                    <div className="ml-4">
                      {expandedCard === 'fee' ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8 animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문 내용 */}
              {expandedCard === 'fee' && (
              <div className="p-8 space-y-6">
                {/* 1. 회비 금액 */}
                <div className="bg-white rounded-xl p-6 border-2 border-amber-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-black text-gray-800 mb-3">
                        1인당 55만원
                      </p>
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-bold">- 산출근거:</span> 첨부예산(안) 참조
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 입금 계좌 */}
                <div className="bg-white rounded-xl p-6 border-2 border-orange-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-gray-800 mb-3">
                        입금계좌: 카카오뱅크
                      </p>
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-lg border-2 border-orange-300">
                        <p className="text-2xl font-black text-center text-orange-900 tracking-wider">
                          3333-34-2421695
                        </p>
                        <p className="text-lg font-bold text-center text-orange-800 mt-2">
                          (조영선)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. 기한 */}
                <div className="bg-white rounded-xl p-6 border-2 border-red-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold text-gray-800 mb-3">
                        기한
                      </p>
                      <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
                        <p className="text-3xl font-black text-red-600 text-center animate-pulse">
                          12.3(수) 까지
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 감사 메시지 */}
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-center text-2xl font-black">
                    🙏 감사합니다 🙏
                  </p>
                  <p className="text-center text-lg mt-2 font-semibold">
                    謝謝
                  </p>
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

