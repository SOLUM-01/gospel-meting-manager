'use client'

import { useEffect, useState, useCallback } from 'react'
import { Music, X } from 'lucide-react'
import { supabase } from '@/lib/database/supabase'

// 한국어/중국어 버전 정보
const versions = {
  korean: {
    title: "당신은 사랑받기 위해",
    subtitle: "태어난 사람",
    english: "You were born to be loved",
    verse1: "당신은 사랑받기 위해 태어난 사람",
    verse2: "당신의 삶 속에서 그 사랑 받고 있지요",
    welcomeTitle: "환영합니다",
    welcomeSuffix: "님",
    loginSuccess: "로그인을 축하드립니다!",
    hymnLabel: "♪ 찬송 ♪",
    blessingMessage: "✨ 하나님의 사랑이 함께하시길 ✨",
    youtubeId: "5MRH5oNG7hA", // 한국어 찬양
    duration: 273, // 4분 33초
  },
  chinese: {
    title: "你是被愛的",
    subtitle: "而生的人",
    english: "You were born to be loved",
    verse1: "你是被愛的而生的人",
    verse2: "在你的生命中正接受著那份愛",
    welcomeTitle: "歡迎光臨",
    welcomeSuffix: "",
    loginSuccess: "登入成功！",
    hymnLabel: "♪ 讚美 ♪",
    blessingMessage: "✨ 願神的愛與你同在 ✨",
    youtubeId: "TDcGWrfWieI", // 중국어 커버 버전
    duration: 277, // 4분 37초
  }
}

export function WelcomeMusicModal() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [language, setLanguage] = useState<'korean' | 'chinese'>('korean')
  const [videoKey, setVideoKey] = useState(0) // YouTube 리로드용

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        // 로그인 상태면 항상 음악 플레이어 표시
        setShowMusicPlayer(true)
      }
    })

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        // 로그인 성공 시 음악 플레이어 표시
        setShowMusicPlayer(true)
      } else {
        setUser(null)
        setShowMusicPlayer(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // 현재 찬양이 끝나면 다음 언어로 전환
  const switchToNextLanguage = useCallback(() => {
    setLanguage(prev => prev === 'korean' ? 'chinese' : 'korean')
    setVideoKey(prev => prev + 1) // YouTube 다시 로드
  }, [])

  // 찬양 재생 타이머 (현재 언어의 duration 후 전환)
  useEffect(() => {
    if (!showMusicPlayer) return

    const currentVersion = versions[language]
    const timer = setTimeout(() => {
      switchToNextLanguage()
    }, currentVersion.duration * 1000) // 초를 밀리초로 변환

    return () => clearTimeout(timer)
  }, [showMusicPlayer, language, switchToNextLanguage])

  // 닫아도 3초 후 다시 나타남
  const closeMusicPlayer = () => {
    setShowMusicPlayer(false)
    // 3초 후 다시 표시
    setTimeout(() => {
      if (user) {
        setShowMusicPlayer(true)
      }
    }, 3000)
  }

  if (!showMusicPlayer || !user) return null

  const currentVersion = versions[language]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-900/90 rounded-3xl p-6 md:p-8 max-w-lg w-[95%] mx-4 shadow-2xl border border-white/20">
        {/* 닫기 버튼 */}
        <button 
          onClick={closeMusicPlayer}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* 음악 아이콘 애니메이션 */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative animate-bounce">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 p-4 md:p-6 rounded-full">
              <Music className="h-8 w-8 md:h-12 md:w-12 text-white" />
            </div>
          </div>
        </div>

        {/* 환영 메시지 */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            🎵 {currentVersion.welcomeTitle}, {user.name}{currentVersion.welcomeSuffix}! 🎵
          </h2>
          <p className="text-purple-200 text-base md:text-lg">
            {currentVersion.loginSuccess}
          </p>
        </div>

        {/* 찬송 정보 */}
        <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-white/10">
          <p className="text-pink-300 text-sm mb-2 text-center">
            {currentVersion.hymnLabel}
          </p>
          
          {/* 제목 */}
          <div className="transition-all duration-500 ease-in-out">
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-1">
              {currentVersion.title}
            </h3>
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
              {currentVersion.subtitle}
            </h3>
          </div>
          
          <p className="text-purple-200 text-center text-sm mb-3">
            {currentVersion.english}
          </p>

          {/* 가사 표시 */}
          <div className="text-center text-purple-100/80 text-xs md:text-sm space-y-1 mb-4 transition-all duration-500">
            <p>{currentVersion.verse1}</p>
            <p>{currentVersion.verse2}</p>
          </div>

          {/* 언어 표시기 */}
          <div className="flex justify-center gap-2 mb-4">
            <button 
              onClick={() => { setLanguage('korean'); setVideoKey(prev => prev + 1); }}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                language === 'korean' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/20 text-white/60 hover:bg-white/30'
              }`}
            >
              🇰🇷 한국어
            </button>
            <button 
              onClick={() => { setLanguage('chinese'); setVideoKey(prev => prev + 1); }}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                language === 'chinese' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/20 text-white/60 hover:bg-white/30'
              }`}
            >
              🇹🇼 中文
            </button>
          </div>
          
          {/* YouTube 임베드 - key로 리로드 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              key={videoKey}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${currentVersion.youtubeId}?autoplay=1&rel=0`}
              title={currentVersion.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* 하단 메시지 */}
        <p className="text-center text-purple-300/70 text-sm transition-all duration-500">
          {currentVersion.blessingMessage}
        </p>
      </div>
    </div>
  )
}
