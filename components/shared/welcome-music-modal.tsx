'use client'

import { useEffect, useState, useCallback } from 'react'
import { Music, X, Volume2, VolumeX } from 'lucide-react'
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
  const [showModal, setShowModal] = useState(false) // 모달 표시 여부
  const [playMusic, setPlayMusic] = useState(false) // 음악 재생 여부
  const [language, setLanguage] = useState<'korean' | 'chinese'>('korean')
  const [videoKey, setVideoKey] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        
        // 이번 세션에서 모달을 이미 봤는지 확인
        const modalShown = sessionStorage.getItem('welcomeModalShown')
        
        if (!modalShown) {
          // 처음 로그인 - 모달 표시 + 음악 재생
          setShowModal(true)
          setPlayMusic(true)
        } else {
          // 이미 모달 봤음 - 음악만 재생
          setShowModal(false)
          setPlayMusic(true)
        }
      }
    })

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        
        const modalShown = sessionStorage.getItem('welcomeModalShown')
        
        if (!modalShown) {
          // 처음 로그인 - 모달 표시 + 음악 재생
          setShowModal(true)
          setPlayMusic(true)
        } else {
          // 이미 모달 봤음 - 음악만 재생
          setPlayMusic(true)
        }
      } else {
        setUser(null)
        setShowModal(false)
        setPlayMusic(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // 현재 찬양이 끝나면 다음 언어로 전환
  const switchToNextLanguage = useCallback(() => {
    setLanguage(prev => prev === 'korean' ? 'chinese' : 'korean')
    setVideoKey(prev => prev + 1)
  }, [])

  // 찬양 재생 타이머
  useEffect(() => {
    if (!playMusic) return

    const currentVersion = versions[language]
    const timer = setTimeout(() => {
      switchToNextLanguage()
    }, currentVersion.duration * 1000)

    return () => clearTimeout(timer)
  }, [playMusic, language, switchToNextLanguage])

  // 모달 닫기 - 음악은 계속 재생
  const closeModal = () => {
    sessionStorage.setItem('welcomeModalShown', 'true')
    setShowModal(false)
    // 음악은 계속 재생됨 (playMusic = true 유지)
  }

  // 음악 토글
  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  // 음악 완전히 끄기
  const stopMusic = () => {
    setPlayMusic(false)
    setShowModal(false)
  }

  if (!user) return null

  const currentVersion = versions[language]

  return (
    <>
      {/* 모달 - 처음 로그인 시에만 표시 */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-900/90 rounded-3xl p-6 md:p-8 max-w-lg w-[95%] mx-4 shadow-2xl border border-white/20">
            {/* 닫기 버튼 */}
            <button 
              onClick={closeModal}
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

              <div className="text-center text-purple-100/80 text-xs md:text-sm space-y-1 mb-4">
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
              
              {/* YouTube 임베드 */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  key={videoKey}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVersion.youtubeId}?autoplay=1&rel=0&mute=${isMuted ? 1 : 0}`}
                  title={currentVersion.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* 하단 메시지 */}
            <p className="text-center text-purple-300/70 text-sm">
              {currentVersion.blessingMessage}
            </p>
          </div>
        </div>
      )}

      {/* 숨겨진 음악 플레이어 - 모달 닫아도 계속 재생 */}
      {playMusic && !showModal && (
        <>
          {/* 숨겨진 YouTube iframe */}
          <div className="hidden">
            <iframe
              key={`hidden-${videoKey}`}
              src={`https://www.youtube.com/embed/${currentVersion.youtubeId}?autoplay=1&rel=0&mute=${isMuted ? 1 : 0}`}
              title="Background Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* 음악 컨트롤 버튼 - 우측 하단 */}
          <div className="fixed bottom-4 right-4 z-50 flex gap-2">
            <button
              onClick={toggleMute}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all"
              title={isMuted ? "음소거 해제" : "음소거"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              onClick={stopMusic}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-white/30 transition-all"
              title="음악 끄기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 현재 재생 중인 찬양 정보 - 좌측 하단 */}
          <div className="fixed bottom-4 left-4 z-50 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <div className="animate-pulse">
              <Music className="h-4 w-4 text-pink-400" />
            </div>
            <span className="text-white text-sm">
              {language === 'korean' ? '🇰🇷' : '🇹🇼'} {currentVersion.title}
            </span>
          </div>
        </>
      )}
    </>
  )
}
