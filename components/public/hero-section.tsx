'use client'

import { useTranslation } from '@/lib/i18n/use-translation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserPlus, LogIn, LogOut, Music, X } from 'lucide-react'
import { supabase } from '@/lib/database/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const { t } = useTranslation()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
      }
    })

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자'
        })
        // 로그인 성공 후 음악 플레이어 표시
        const justLoggedIn = localStorage.getItem('justLoggedIn')
        if (justLoggedIn === 'true') {
          setShowMusicPlayer(true)
          localStorage.removeItem('justLoggedIn')
        }
      } else {
        setUser(null)
        setShowMusicPlayer(false)
      }
    })

    // 페이지 로드 시 로그인 플래그 확인
    const justLoggedIn = localStorage.getItem('justLoggedIn')
    if (justLoggedIn === 'true') {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setShowMusicPlayer(true)
          localStorage.removeItem('justLoggedIn')
        }
      })
    }

    return () => subscription.unsubscribe()
  }, [])

  const closeMusicPlayer = () => {
    setShowMusicPlayer(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 음악 플레이어 모달 */}
      {showMusicPlayer && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
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
                🎵 환영합니다, {user.name}님! 🎵
              </h2>
              <p className="text-purple-200 text-base md:text-lg">
                로그인을 축하드립니다!
              </p>
            </div>

            {/* 찬송 정보 */}
            <div className="bg-white/10 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-white/10">
              <p className="text-pink-300 text-sm mb-2 text-center">♪ 찬송 ♪</p>
              <h3 className="text-lg md:text-xl font-bold text-white text-center mb-3">
                당신은 사랑받기 위해<br />태어난 사람
              </h3>
              <p className="text-purple-200 text-center text-sm mb-4">
                You were born to be loved
              </p>
              
              {/* YouTube 임베드 */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/4a6PO9UKTTA?autoplay=1&loop=1"
                  title="당신은 사랑받기 위해 태어난 사람"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* 하단 메시지 */}
            <p className="text-center text-purple-300/70 text-sm">
              ✨ 하나님의 사랑이 함께하시길 ✨
            </p>
          </div>
        </div>
      )}

      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* 로고 */}
          <div className="mb-6 md:mb-8 flex flex-col items-center gap-4 md:gap-5">
            {/* EVANGELISM EXPLOSION INTERNATIONAL 로고 */}
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-xl">
              <Image
                src="/ee-logo.png"
                alt="Evangelism Explosion International"
                width={684}
                height={138}
                className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto"
                priority
              />
            </div>
            
            {/* 교회 선교 로고 */}
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-xl">
              <Image
                src="/church-mission-logo-1.png"
                alt="Church Mission Logo"
                width={684}
                height={684}
                className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto"
                priority
              />
            </div>
          </div>
          {/* 메인 타이틀 */}
          <div className="mb-4 md:mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 border-white/20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  歡迎光臨
                </h1>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-2 md:mb-3">
            {t('event.title')}
          </p>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200 mb-6 md:mb-8">
            HI LIGHT CHRISTMAS
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg"
              asChild
            >
              <Link href="/info" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
                참여하기
              </Link>
            </Button>
            
            {user ? (
              <>
                <div className="text-white text-base md:text-lg font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  할렐루야 <span className="text-pink-300">{user.name}</span> 님
                </div>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg backdrop-blur-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg"
                  asChild
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
                    회원가입
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg backdrop-blur-sm"
                  asChild
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4 md:h-5 md:w-5" />
                    로그인
                  </Link>
                </Button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 장식 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

