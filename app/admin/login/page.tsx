'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/store/auth-store'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // API route를 통해 로그인 진행
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      // 디버깅: 받은 데이터 출력
      console.log('로그인 응답 데이터:', data)
      console.log('사용자 role:', data.user?.role)

      if (!response.ok) {
        setError(data.error || '로그인에 실패했습니다')
        return
      }

      // role 체크 - admin 권한이 없으면 접근 불가
      if (!data.user?.role || data.user.role === 'user') {
        setError(`관리자 권한이 필요합니다. 현재 role: ${data.user?.role || '없음'}`)
        console.error('권한 없음. user data:', data.user)
        return
      }

      // 관리자로 로그인 성공
      const admin = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        permissions: ['all'], // 필요시 API에서 받아올 수 있음
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setAuth(admin, data.token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError('로그인에 실패했습니다')
      console.error('Admin login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {t('admin.title')}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            2025 雲林城市耶誕慶典
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-destructive text-center p-2 bg-destructive/10 rounded">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '로그인 중...' : t('common.login')}
            </Button>

            <div className="text-xs text-center text-muted-foreground mt-4 p-3 bg-muted rounded">
              <p>관리자 계정으로 로그인하세요</p>
              <p className="text-xs mt-1">일반 사용자는 접근할 수 없습니다</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

