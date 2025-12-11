'use client'

import { useEffect, useState } from 'react'
import { Music, X } from 'lucide-react'
import { supabase } from '@/lib/database/supabase'

// 한국어/중국어 가사
const lyrics = {
  korean: {
    title: "당신은 사랑받기 위해",
    subtitle: "태어난 사람",
    english: "You were born to be loved",
    verse1: "당신은 사랑받기 위해 태어난 사람",
    verse2: "당신의 삶 속에서 그 사랑 받고 있지요",
    verse3: "당신은 사랑받기 위해 태어난 사람",
    verse4: "지금도 그 사랑 받고 있지요",
  },
  chinese: {
    title: "你是被愛的",
    subtitle: "而生的人",
    english: "You were born to be loved",
    verse1: "你是被愛的而生的人",
    verse2: "在你的生命中正接受著那份愛",
    verse3: "你是被愛的而生的人",
    verse4: "現在也正接受著那份愛",
  }
}

export function WelcomeMusicModal() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [language, setLanguage] = useState<'korean' | 'chinese'>('korean')

  useEffect(() => {
    // 현재 세션 확인 및 음악 플레이어 표시 여부 결정
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        // 이번 브라우저 세션에서 음악을 아직 안 봤으면 표시
        const musicShown = sessionStorage.getItem('musicShownThisSession')
        if (!musicShown) {
          setShowMusicPlayer(true)
        }
      }
    })

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        // 로그인 성공 후 음악 플레이어 표시 (이번 세션에서 안 봤으면)
        const musicShown = sessionStorage.getItem('musicShownThisSession')
        if (!musicShown) {
          setShowMusicPlayer(true)
        }
      } else {
        setUser(null)
        setShowMusicPlayer(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // 한국어/중국어 번갈아 표시 (5초마다)
  useEffect(() => {
    if (!showMusicPlayer) return

    const interval = setInterval(() => {
      setLanguage(prev => prev === 'korean' ? 'chinese' : 'korean')
    }, 5000)

    return () => clearInterval(interval)
  }, [showMusicPlayer])

  const closeMusicPlayer = () => {
    sessionStorage.setItem('musicShownThisSession', 'true')
    setShowMusicPlayer(false)
  }

  if (!showMusicPlayer || !user) return null

  const currentLyrics = lyrics[language]

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
            🎵 {language === 'korean' ? '환영합니다' : '歡迎光臨'}, {user.name}
            {language === 'korean' ? '님' : ''}! 🎵
          </h2>
          <p className="text-purple-200 text-base md:text-lg">
            {language === 'korean' ? '로그인을 축하드립니다!' : '登入成功！'}
          </p>
        </div>

        {/* 찬송 정보 - 언어 전환 애니메이션 */}
        <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-white/10">
          <p className="text-pink-300 text-sm mb-2 text-center">
            {language === 'korean' ? '♪ 찬송 ♪' : '♪ 讚美 ♪'}
          </p>
          
          {/* 제목 - 페이드 애니메이션 */}
          <div className="transition-all duration-500 ease-in-out">
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-1">
              {currentLyrics.title}
            </h3>
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
              {currentLyrics.subtitle}
            </h3>
          </div>
          
          <p className="text-purple-200 text-center text-sm mb-3">
            {currentLyrics.english}
          </p>

          {/* 가사 표시 */}
          <div className="text-center text-purple-100/80 text-xs md:text-sm space-y-1 mb-4 transition-all duration-500">
            <p>{currentLyrics.verse1}</p>
            <p>{currentLyrics.verse2}</p>
          </div>

          {/* 언어 표시기 */}
          <div className="flex justify-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
              language === 'korean' 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/20 text-white/60'
            }`}>
              한국어
            </span>
            <span className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
              language === 'chinese' 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/20 text-white/60'
            }`}>
              中文
            </span>
          </div>
          
          {/* YouTube 임베드 */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/5MRH5oNG7hA?autoplay=1"
              title="당신은 사랑받기 위해 태어난 사람"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* 하단 메시지 */}
        <p className="text-center text-purple-300/70 text-sm transition-all duration-500">
          {language === 'korean' 
            ? '✨ 하나님의 사랑이 함께하시길 ✨' 
            : '✨ 願神的愛與你同在 ✨'}
        </p>
      </div>
    </div>
  )
}

