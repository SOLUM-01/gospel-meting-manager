'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/app/store/auth-store'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  LayoutDashboard,
  ListTodo,
  Users,
  Calendar,
  LogOut,
  Menu,
} from 'lucide-react'
import { LanguageSwitcher } from '@/components/shared/language-switcher'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, admin, logout } = useAuthStore()
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 로그인 페이지는 인증 체크 제외
  const isLoginPage = pathname === '/admin/login'

  // 인증 및 role 체크
  useEffect(() => {
    // 로그인 페이지는 인증 체크 건너뛰기
    if (isLoginPage) {
      return
    }

    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }
    
    // role이 'user'인 경우 (일반 고객) admin 페이지 접근 불가
    if (admin?.role === 'user') {
      alert('관리자 권한이 필요합니다.')
      router.push('/')
      return
    }
  }, [isAuthenticated, admin, router, pathname, isLoginPage])

  // 로그인 페이지는 레이아웃 없이 바로 렌더링
  if (isLoginPage) {
    return <>{children}</>
  }

  // 인증되지 않았거나 일반 사용자(user)인 경우 아무것도 렌더링하지 않음
  if (!isAuthenticated || admin?.role === 'user') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      label: t('admin.dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: '/admin/tasks',
      label: t('admin.taskManagement'),
      icon: ListTodo,
    },
    {
      href: '/admin/participants',
      label: t('admin.participantManagement'),
      icon: Users,
    },
    {
      href: '/admin/schedule',
      label: t('admin.scheduleManagement'),
      icon: Calendar,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 - 데스크톱 */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-6 border-b">
          <Link href="/admin/dashboard">
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {t('admin.title')}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            {admin?.name || 'Admin'}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Button
                key={item.href}
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <LanguageSwitcher />
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('common.logout')}
          </Button>
        </div>
      </aside>

      {/* 모바일 사이드바 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-card border-r"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {t('admin.title')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {admin?.name || 'Admin'}
              </p>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    asChild
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t space-y-2">
              <LanguageSwitcher />
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('common.logout')}
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        {/* 모바일 헤더 */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="font-bold">{t('admin.title')}</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {children}
      </main>
    </div>
  )
}

