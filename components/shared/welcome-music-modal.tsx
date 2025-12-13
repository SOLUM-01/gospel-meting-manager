'use client'

import { useEffect, useState, useRef } from 'react'
import { Music, X, Volume2, VolumeX, Play, Pause, SkipForward } from 'lucide-react'
import { supabase, isSupabaseReady } from '@/lib/database/supabase'

// 한국어/중국어 버전 정보 - 천사 찬송하기를 (Hark! The Herald Angels Sing)
const versions = {
  korean: {
    title: "천사 찬송하기를",
    subtitle: "(새찬송가 126장)",
    english: "Hark! The Herald Angels Sing",
    verse1: "천사 찬송하기를 거룩하신 구주께",
    verse2: "땅에서는 평화요 사람에게 은혜라",
    welcomeTitle: "환영합니다",
    welcomeSuffix: "님",
    loginSuccess: "로그인을 축하드립니다!",
    hymnLabel: "♪ 성탄 찬송 ♪",
    blessingMessage: "✨ 메리 크리스마스! 하나님의 사랑이 함께하시길 ✨",
    youtubeId: "BinM3lQa_QA", // 한국어 찬송가 126장
    duration: 199, // 3분 19초
  },
  chinese: {
    title: "聽啊，天使高聲唱",
    subtitle: "(讚美詩)",
    english: "Hark! The Herald Angels Sing",
    verse1: "聽啊，天使高聲唱，榮耀歸與新生王",
    verse2: "地上平安人蒙恩，神人和好喜訊來",
    welcomeTitle: "歡迎光臨",
    welcomeSuffix: "",
    loginSuccess: "登入成功！",
    hymnLabel: "♪ 聖誕讚美 ♪",
    blessingMessage: "✨ 聖誕快樂！願神的愛與你同在 ✨",
    youtubeId: "mG7tXrUqU1k", // 중국어 新心音樂事工 버전
    duration: 213, // 3분 33초
  }
}

export function WelcomeMusicModal() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [language, setLanguage] = useState<'korean' | 'chinese'>('korean')
  const [videoKey, setVideoKey] = useState(0)
  const [isMuted, setIsMuted] = useState(true) // 모바일 자동재생을 위해 기본 음소거
  const [showUnmuteHint, setShowUnmuteHint] = useState(true) // 소리 켜기 안내 표시
  
  // 타이머 ref
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    if (!supabase || !isSupabaseReady) return

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        
        const modalShown = sessionStorage.getItem('welcomeModalShown')
        
        if (!modalShown) {
          setShowModal(true)
          setPlayMusic(true)
        } else {
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
          setShowModal(true)
          setPlayMusic(true)
        } else {
          setPlayMusic(true)
        }
      } else {
        // 로그아웃 시 모든 상태 초기화
        setUser(null)
        setShowModal(false)
        setPlayMusic(false)
        setIsPaused(false)
        // 타이머 클리어
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // 다음 언어로 전환하는 함수
  const switchToNextLanguage = () => {
    const nextLang = language === 'korean' ? 'chinese' : 'korean'
    console.log(`🎵 언어 전환: ${language} → ${nextLang}`)
    setLanguage(nextLang)
    setVideoKey(prev => prev + 1)
    startTimeRef.current = Date.now()
  }

  // 타이머 설정 및 관리
  useEffect(() => {
    // 타이머 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // 재생 중이 아니거나 일시정지면 타이머 설정 안함
    if (!playMusic || isPaused) {
      return
    }

    // 현재 언어의 duration
    const duration = versions[language].duration * 1000
    
    console.log(`⏱️ 타이머 설정: ${language} - ${duration / 1000}초 후 전환`)
    startTimeRef.current = Date.now()

    // 타이머 설정
    timerRef.current = setTimeout(() => {
      console.log(`⏱️ 타이머 완료! 전환 실행`)
      switchToNextLanguage()
    }, duration)

    // 클린업
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playMusic, isPaused, language])

  // 모달 닫기
  const closeModal = () => {
    sessionStorage.setItem('welcomeModalShown', 'true')
    setShowModal(false)
  }

  // 음소거 토글
  const toggleMute = () => {
    setIsMuted(prev => !prev)
    setShowUnmuteHint(false) // 한번 터치하면 안내 숨김
    setVideoKey(prev => prev + 1)
  }

  // 재생/일시정지 토글
  const togglePause = () => {
    if (isPaused) {
      // 재생 재개
      setVideoKey(prev => prev + 1)
      startTimeRef.current = Date.now()
    }
    setIsPaused(prev => !prev)
  }

  // 다음 곡으로 수동 전환
  const skipToNext = () => {
    switchToNextLanguage()
  }

  // 음악 완전히 끄기
  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPlayMusic(false)
    setShowModal(false)
    setIsPaused(false)
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
                  onClick={() => { setLanguage('korean'); setVideoKey(prev => prev + 1); startTimeRef.current = Date.now(); }}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                    language === 'korean' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/20 text-white/60 hover:bg-white/30'
                  }`}
                >
                  🇰🇷 한국어
                </button>
                <button 
                  onClick={() => { setLanguage('chinese'); setVideoKey(prev => prev + 1); startTimeRef.current = Date.now(); }}
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
                  key={`modal-${videoKey}-${language}`}
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
          {!isPaused && (
            <div className="fixed -left-[9999px] -top-[9999px] w-[1px] h-[1px] overflow-hidden">
              <iframe
                key={`hidden-${videoKey}-${language}`}
                width="1"
                height="1"
                src={`https://www.youtube.com/embed/${currentVersion.youtubeId}?autoplay=1&rel=0&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
                title="Background Music"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          {/* 소리 켜기 안내 (음소거 상태일 때) */}
          {isMuted && showUnmuteHint && (
            <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
              <button
                onClick={toggleMute}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-medium"
              >
                <Volume2 className="h-5 w-5" />
                🔊 탭하여 소리 켜기
              </button>
            </div>
          )}

          {/* 통합 음악 컨트롤 바 */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-md">
            <div className="bg-black/70 backdrop-blur-md rounded-full px-3 py-2 flex items-center justify-between shadow-lg border border-white/10">
              {/* 좌측: 음악 정보 */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`flex-shrink-0 ${isPaused ? '' : 'animate-pulse'}`}>
                  <Music className={`h-4 w-4 ${isPaused ? 'text-gray-400' : 'text-pink-400'}`} />
                </div>
                <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                  <span className="text-white text-xs font-medium flex-shrink-0">
                    {language === 'korean' ? '🇰🇷' : '🇹🇼'}
                  </span>
                  <span className="text-white/80 text-xs truncate">
                    {currentVersion.title}
                  </span>
                  {isPaused && (
                    <span className="text-yellow-400 text-xs flex-shrink-0">⏸</span>
                  )}
                  {isMuted && (
                    <span className="text-red-400 text-xs flex-shrink-0">🔇</span>
                  )}
                </div>
              </div>

              {/* 우측: 컨트롤 버튼들 */}
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                {/* 재생/일시정지 */}
                <button
                  onClick={togglePause}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all"
                  title={isPaused ? "재생" : "일시정지"}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                {/* 다음 곡 (수동 전환) */}
                <button
                  onClick={skipToNext}
                  className="bg-blue-500/80 text-white p-2 rounded-full hover:bg-blue-600 transition-all"
                  title="다음 곡"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
                {/* 음소거/소리켜기 - 음소거 상태면 강조 */}
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-full transition-all ${
                    isMuted 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isMuted ? "소리 켜기" : "음소거"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                {/* 끄기 */}
                <button
                  onClick={stopMusic}
                  className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  title="음악 끄기"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
