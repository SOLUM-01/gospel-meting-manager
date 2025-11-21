'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = () => {
    if (!email.trim()) {
      setError('이메일을 입력해주세요')
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail()) return

    setIsLoading(true)
    
    try {
      // TODO: API 호출
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error)
      alert('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">이메일 전송 완료</CardTitle>
            <CardDescription className="text-base">
              비밀번호 재설정 링크가 전송되었습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <span className="font-semibold text-gray-900">{email}</span>로<br />
              비밀번호 재설정 링크를 보냈습니다.
            </p>
            <p className="mb-2">
              이메일을 확인하고 링크를 클릭하여<br />
              비밀번호를 재설정해주세요.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              이메일이 도착하지 않았나요?<br />
              스팸 폴더를 확인해주세요.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                로그인 페이지로 돌아가기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            비밀번호 찾기
          </CardTitle>
          <CardDescription className="text-center">
            가입하신 이메일 주소를 입력해주세요.<br />
            비밀번호 재설정 링크를 보내드립니다.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={handleChange}
                className={error ? 'border-red-500' : ''}
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? '전송 중...' : '재설정 링크 보내기'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <Link 
                href="/login" 
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

