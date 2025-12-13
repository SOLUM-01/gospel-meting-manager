'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Footer } from '@/components/shared/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, ListTodo, ArrowRight, Home, LogIn, LogOut, UserPlus, Music, Info } from 'lucide-react'
import { supabase, isSupabaseReady } from '@/lib/database/supabase'
import { useEffect, useState } from 'react'

export default function InfoPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    if (!supabase || !isSupabaseReady) return

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자',
          email: session.user.email || ''
        })
      }
    })

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자',
          email: session.user.email || ''
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  const navItems = [
    { href: '/', label: '홈', icon: Home },
  ]
  const menuItems = [
    {
      title: '참가자',
      titleZh: '參加者',
      description: '2025 블레싱 타이완 윈린3 아웃리치 참가자 명단',
      descriptionZh: '2025 Blessing Taiwan 雲林3 外展參加者名單',
      icon: Users,
      href: '/participants',
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      title: '큐티 QT',
      titleZh: '靈修 QT',
      description: '매일 말씀 묵상과 기도',
      descriptionZh: '每日靈修與禱告',
      icon: BookOpen,
      href: '/worship',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
    },
    {
      title: '안내',
      titleZh: '指南',
      description: '이벤트 준비 및 참가 안내 사항',
      descriptionZh: '活動準備及參加指南事項',
      icon: Info,
      href: '/guide',
      color: 'from-cyan-500 to-teal-500',
      bgGradient: 'from-cyan-50 to-teal-50',
    },
    {
      title: '사역',
      titleZh: '待辦事項',
      description: '이벤트 준비 및 진행 사역 목록',
      descriptionZh: '活動準備及進行待辦清單',
      icon: ListTodo,
      href: '/tasks',
      color: 'from-blue-500 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* 네비게이션 바 */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* 로고/타이틀과 네비게이션 */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/church-mission-logo-1.png"
                  alt="대만을 주님 품으로"
                  width={120}
                  height={120}
                  className="h-12 w-auto"
                  priority
                />
              </Link>

              {/* 네비게이션 메뉴 */}
              <div className="hidden md:flex gap-3 items-center">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? 'default' : 'ghost'}
                      asChild
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* 사용자 메뉴 */}
            <div className="hidden md:flex gap-3 items-center">
              {user ? (
                <>
                  <span className="text-sm font-medium">
                    할렐루야 <span className="text-blue-600">{user.name}</span> 님
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      로그인
                    </Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                    <Link href="/signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      회원가입
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* 모바일 메뉴 */}
            <div className="flex md:hidden gap-2 items-center">
              {user ? (
                <>
                  <span className="text-xs font-medium whitespace-nowrap">
                    할렐루야 <span className="text-blue-600">{user.name}</span> 님
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      로그인
                    </Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                    <Link href="/signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* 모바일 네비게이션 */}
          <div className="flex md:hidden gap-2 pb-4 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link href={item.href} className="flex items-center gap-2 whitespace-nowrap">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* 헤더 */}
          <div className="text-center mb-12">
            
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 border-white/20">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                    歡迎光臨
                  </h1>
                </div>
              </div>
            </div>

            {user && (
              <div className="mb-6">
                <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-lg md:text-xl font-semibold">
                    할렐루야 <span className="text-yellow-300">{user.name}</span> 님 환영합니다! 🙏
                  </p>
                  <p className="text-sm md:text-base opacity-90 mt-1">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              2025 雲林城市耶誕慶典
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              HI LIGHT CHRISTMAS
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              {user ? '로그인된 상태입니다. 모든 기능을 이용하실 수 있습니다.' : '이벤트 정보를 확인하세요'}
            </p>
          </div>

          {/* 메뉴 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              
              const handleClick = (e: React.MouseEvent) => {
                if (!user) {
                  e.preventDefault()
                  alert('로그인이 필요한 서비스입니다.\n회원가입 또는 로그인 후 이용해주세요.')
                  router.push('/login')
                }
              }
              
              return (
                <div key={item.href} onClick={handleClick}>
                  <Link href={user ? item.href : '#'} className="block">
                    <Card className={`
                      h-full border-2 transition-all duration-300 
                      ${user 
                        ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed grayscale hover:grayscale-0 hover:opacity-80'
                      }
                      bg-gradient-to-br ${item.bgGradient}
                      ${!user && 'relative'}
                    `}>
                      {!user && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] rounded-lg z-10">
                          <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                            <p className="text-sm font-semibold text-gray-700">🔒 로그인 필요</p>
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <div className={`
                          w-16 h-16 rounded-full mb-4 mx-auto
                          bg-gradient-to-br ${item.color}
                          flex items-center justify-center
                          shadow-lg
                        `}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-center">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-center text-base font-medium">
                          {item.titleZh}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-center text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-center text-muted-foreground mb-4">
                          {item.descriptionZh}
                        </p>
                        <div className="flex justify-center">
                          <Button 
                            variant="ghost" 
                            className="group"
                          >
                            {user ? '보러가기' : '로그인하기'}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

