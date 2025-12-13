'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LanguageSwitcher } from './language-switcher'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import { Calendar, Home, ListTodo, Users, LogIn, UserPlus, LogOut } from 'lucide-react'
import { supabase, isSupabaseReady } from '@/lib/database/supabase'
import { useEffect, useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
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
    router.push('/')
    router.refresh()
  }

  const navItems = [
    { href: '/', label: t('common.home'), icon: Home },
    { href: '/participants', label: t('common.participants'), icon: Users },
    { href: '/tasks', label: t('common.tasks'), icon: ListTodo },
    { href: '/schedule', label: t('common.schedule'), icon: Calendar },
  ]

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-2 items-center">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href))

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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3 items-center">
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
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden gap-2 pb-4 overflow-x-auto items-center">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))

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
          
          {user ? (
            <>
              <span className="text-sm font-medium whitespace-nowrap">
                할렐루야 <span className="text-blue-600">{user.name}</span> 님
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-2 whitespace-nowrap">
                  <LogIn className="h-4 w-4" />
                  로그인
                </Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <Link href="/signup" className="flex items-center gap-2 whitespace-nowrap">
                  <UserPlus className="h-4 w-4" />
                  회원가입
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

