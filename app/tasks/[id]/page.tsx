'use client'
// Updated: 2025-12-11 - 선물팀, 어린이 사역팀 팀원 표시 기능

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, Tag, Users, MapPin, Download, X, ZoomIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getTaskById } from '@/lib/database/api/tasks'
import { getAllParticipants } from '@/lib/database/api/participants'
import { TaskComments } from '@/components/task/task-comments'
import type { Task } from '@/types/task'
import type { Participant } from '@/types/participant'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useTranslation()
  const taskId = params.id as string

  const [task, setTask] = useState<Task | null>(null)
  const [teamMembers, setTeamMembers] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)

  useEffect(() => {
    async function fetchTask() {
      try {
        setLoading(true)
        const data = await getTaskById(taskId)
        setTask(data)
        
        // 팀원 정보 가져오기
        const participants = await getAllParticipants()
        
        // task 제목에 따라 팀원 필터링
        let filteredMembers: Participant[] = []
        
        if (data.title === '부채춤팀' || data.title === '부채춤') {
          // position에 '부채춤'이 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('부채춤')
          )
          
          // 팀장을 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('팀장')) return -1
            if (b.position?.includes('팀장')) return 1
            return 0
          })
        } else if (data.title === '찬양팀') {
          // position에 '찬양'이 포함된 사람들 필터링 (워십 제외)
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('찬양')
          )
          
          // 오경자(찬양팀장)를 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.name === '오경자') return -1
            if (b.name === '오경자') return 1
            return 0
          })
        } else if (data.title === '푸드팀' || data.title === '푸드') {
          // position에 '푸드'가 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('푸드')
          )
          
          // 팀장을 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('팀장')) return -1
            if (b.position?.includes('팀장')) return 1
            return 0
          })
        } else if (data.title === '물품팀' || data.title === '차량물품') {
          // position에 '물품'이 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('물품')
          )
          
          // 팀장을 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('팀장')) return -1
            if (b.position?.includes('팀장')) return 1
            return 0
          })
        } else if (data.title === '전도팀') {
          // position에 '전도'가 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('전도')
          )
          
          // 전도팀장만 맨 위로 정렬 (다른 팀의 팀장은 제외)
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('전도팀장')) return -1
            if (b.position?.includes('전도팀장')) return 1
            return 0
          })
        } else if (data.title === '중보기도팀' || data.title === '중보기도') {
          // position에 '중보'가 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('중보')
          )
          
          // 중보기도팀장만 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('중보기도팀장')) return -1
            if (b.position?.includes('중보기도팀장')) return 1
            return 0
          })
        } else if (data.title === '미용팀' || data.title === '미용') {
          // position에 '미용'이 포함된 사람들 필터링
          filteredMembers = participants.filter(p => 
            p.position && p.position.includes('미용')
          )
          
          // 미용팀장만 맨 위로 정렬
          filteredMembers.sort((a, b) => {
            if (a.position?.includes('미용팀장')) return -1
            if (b.position?.includes('미용팀장')) return 1
            return 0
          })
        } else if (data.title === '선물팀') {
          // 선물팀: 지정된 멤버들만 필터링
          const giftTeamMembers = ['우주연', '김영미', '이보라', '최우현']
          filteredMembers = participants.filter(p => 
            giftTeamMembers.includes(p.name)
          )
          
          // 순서 유지
          filteredMembers.sort((a, b) => {
            return giftTeamMembers.indexOf(a.name) - giftTeamMembers.indexOf(b.name)
          })
        } else if (data.title === '어린이 사역팀') {
          // 어린이 사역팀: 지정된 멤버들만 필터링
          const childrenMinistryMembers = ['김동환', '제인현', '이혜승', '이승헌', '김대현']
          filteredMembers = participants.filter(p => 
            childrenMinistryMembers.includes(p.name)
          )
          
          // 순서 유지
          filteredMembers.sort((a, b) => {
            return childrenMinistryMembers.indexOf(a.name) - childrenMinistryMembers.indexOf(b.name)
          })
        }
        
        setTeamMembers(filteredMembers)
        setError(null)
      } catch (err) {
        console.error('Task 로딩 실패:', err)
        setError('사역 정보를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    if (taskId) {
      fetchTask()
    }
  }, [taskId])

  const getCategoryLabel = (category: string) => {
    return t(`tasks.categories.${category}`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 hover:bg-red-600 text-white'
      case 'high':
        return 'bg-orange-500 hover:bg-orange-600 text-white'
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white'
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 hover:bg-green-600 text-white'
      case 'in_progress':
        return 'bg-blue-500 hover:bg-blue-600 text-white'
      case 'cancelled':
        return 'bg-gray-500 hover:bg-gray-600 text-white'
      default:
        return 'bg-purple-500 hover:bg-purple-600 text-white'
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  // 이미지 다운로드 함수
  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      // CORS 문제 시 새 탭에서 열기
      window.open(imageUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">
                사역 정보를 불러오는 중...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
            <div className="text-center py-16">
              <p className="text-lg text-red-500 mb-4">{error || '사역을 찾을 수 없습니다.'}</p>
              <Button onClick={() => router.back()}>목록으로 돌아가기</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* 뒤로 가기 버튼 */}
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로 돌아가기
          </Button>

          {/* 상세 컨텐츠 */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              {/* 이미지 영역 */}
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                {task.imageUrl ? (
                  <Image
                    src={task.imageUrl}
                    alt={language === 'zh-TW' ? task.titleZh : task.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl opacity-20">📋</div>
                  </div>
                )}
              </div>

              <CardContent className="p-8">
                {/* 제목 */}
                <h1 className="text-4xl font-bold mb-4">
                  {language === 'zh-TW' ? task.titleZh : task.title}
                </h1>

                {/* 강의자 정보 (전폭특강인 경우) */}
                {task.title === '전폭특강' && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">강의자</p>
                        <p className="text-xl font-bold text-blue-700 dark:text-blue-300">제인량 목사</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 설명 및 팀원 */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">사역 소개</h2>
                  {task.title === '전폭특강' ? (
                    <div className="text-center py-6">
                      <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                        예수께서 이르시되 나를 따라오라 내가 너희로
                      </p>
                      <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed mt-2">
                        사람을 낚는 어부가 되게 하리라 하시니
                      </p>
                      <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mt-4">
                        (마가복음 1:17)
                      </p>
                    </div>
                  ) : (
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed mb-4">
                    {language === 'zh-TW'
                      ? (task.descriptionZh || '사역에 대한 설명이 준비 중입니다.')
                      : (task.description || '사역에 대한 설명이 준비 중입니다.')}
                  </p>
                  )}
                  
                  {/* 팀원 목록 */}
                  {teamMembers.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        팀원 ({teamMembers.length}명)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {teamMembers.map((member, index) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {member.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {member.name}
                                {member.nameZh && (
                                  <span className="text-muted-foreground ml-1">
                                    ({member.nameZh})
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {member.position}
                              </p>
                            </div>
                            {(() => {
                              // 찬양팀은 오경자만 팀장 배지 표시
                              if (task.title === '찬양팀') {
                                return member.name === '오경자' && member.position?.includes('팀장') && (
                                  <Badge variant="default" className="flex-shrink-0">
                                    팀장
                                  </Badge>
                                )
                              }
                              // 다른 팀은 모든 팀장에게 배지 표시
                              return member.position?.includes('팀장') && (
                                <Badge variant="default" className="flex-shrink-0">
                                  팀장
                                </Badge>
                              )
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 어린이 사역팀 - 복음 팔찌 전도 가이드 특별 섹션 */}
                {task.title === '어린이 사역팀' && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      「福音手環 (복음팔찌) 푸인 쇼우환」
                    </h2>
                    
                    {/* 메인 이미지 */}
                    <div className="mb-6">
                      <Image
                        src="/images/gospel-bracelet-chinese.png"
                        alt="복음 팔찌 전도 가이드"
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-xl shadow-lg border-2 border-purple-200"
                      />
                    </div>

                    {/* 색깔별 설명과 유튜브 영상 */}
                    <div className="space-y-6">
                      {/* 1. 파란색 - 팔찌 소개 */}
                      <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">💙</span>
                          <div>
                            <p className="font-bold text-blue-800 text-lg">쩌거 쇼우환 쓰 짜이 건 워먼 슈오 /상디 더 구쓰 /</p>
                            <p className="text-blue-600 text-sm">這個手環是在跟我們說上帝的故事</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/hUX5VKVj-t8"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 2. 노란색 - 천국 */}
                      <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">💛</span>
                          <div>
                            <p className="font-bold text-yellow-800 text-lg">황써 가오쑤 워먼 /이허우 커이 짜이 티엔탕 (티엔궈) / 허 상디 용위엔 쭈 짜이 이치 /</p>
                            <p className="text-yellow-600 text-sm">黃色告訴我們以後可以在天堂和上帝永遠住在一起</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/TjDrB7cM7Go"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 3. 검정색 - 죄 */}
                      <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-400">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">🖤</span>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">헤이써 따이비아오 /인웨이 쭈어취 스 /워먼 리 상디 헌 위앤 /</p>
                            <p className="text-gray-600 text-sm">黑色表示因為做錯事我們離上帝很遠</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/Ae3ZjPE4UG8"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 4. 빨간색 - 예수님의 사랑 */}
                      <div className="bg-red-50 rounded-xl p-4 border-2 border-red-300">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">❤️</span>
                          <div>
                            <p className="font-bold text-red-800 text-lg">홍써 따이비아오 /예수 아이 워먼 /웨이러 워먼 얼 쓰 /</p>
                            <p className="text-red-600 text-sm">紅色表示耶穌愛我們為了我們而死</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/ZA64sU4f2FI"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 5. 흰색 - 깨끗함 */}
                      <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-300">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">💜</span>
                          <div>
                            <p className="font-bold text-purple-800 text-lg">땅 워먼 시앙신 예수 /신 지우 후이 시앙 바이써 이양 / 비엔 더 깐깐 찡찡</p>
                            <p className="text-purple-600 text-sm">當我們信耶穌心就會像白色一樣變得乾乾淨淨</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/-I6F-J3yOUI"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 6. 초록색 - 성장 */}
                      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">💚</span>
                          <div>
                            <p className="font-bold text-green-800 text-lg">뤼써 따이비아오 /워먼 메이티엔 건 /상디 이치 만만 장다</p>
                            <p className="text-green-600 text-sm">綠色表示我們每天跟上帝一起慢慢長大</p>
                          </div>
                        </div>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <iframe
                            src="https://www.youtube.com/embed/fpBRDbQK7KQ"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 물품팀 첨부파일 섹션 */}
                {(task.title === '물품팀' || task.title === '차량물품') && (
                  <div className="mb-8 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 rounded-2xl border-4 border-slate-400 shadow-2xl overflow-hidden">
                    {/* 헤더 배너 */}
                    <div className="bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 text-white p-4 md:p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-10 text-7xl md:text-9xl">📋</div>
                      <div className="absolute bottom-0 left-0 opacity-10 text-7xl md:text-9xl">📦</div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <div className="text-3xl md:text-5xl animate-bounce">📋</div>
                          <div className="text-3xl md:text-5xl animate-bounce delay-100">📦</div>
                          <div className="text-3xl md:text-5xl animate-bounce delay-200">🎁</div>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-center mb-1 md:mb-2 tracking-tight">
                          물품 대장 첨부파일
                        </h2>
                        <p className="text-base md:text-xl text-center font-bold text-slate-200">
                          物品清單附件 | Supply Documents
                        </p>
                      </div>
                    </div>

                    {/* 본문 내용 */}
                    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                      {/* 모바일 카드 뷰 */}
                      <div className="md:hidden space-y-3">
                        {/* 특강용주머니물품대장(전도팀) */}
                        <div className="bg-cyan-50 rounded-xl p-4 border-2 border-cyan-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-cyan-700">📦 특강용주머니물품대장</span>
                            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">전도팀</span>
                          </div>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-evangelism-team.png', title: '📦 특강용주머니물품대장 (전도팀)' })}
                          >
                            <Image src="/images/supplies-evangelism-team.png" alt="특강용주머니물품대장(전도팀)" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-evangelism-team.png', '특강용주머니물품대장_전도팀.png')} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 행정관료130명 선물용품대장 */}
                        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-yellow-700">🎁 행정관료130명</span>
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">선물용품</span>
                          </div>
                          <p className="text-xs text-yellow-600 mb-2">(박스1북주머니1약과1전도지1엽서1)</p>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-admin-130.png', title: '🎁 행정관료130명 선물용품대장' })}
                          >
                            <Image src="/images/supplies-admin-130.png" alt="행정관료130명 선물용품대장" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-admin-130.png', '행정관료130명_선물용품대장.png')} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 전도물품 배분현황 */}
                        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-blue-700">📊 전도물품 배분현황</span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">31명</span>
                          </div>
                          <p className="text-xs text-blue-600 mb-2">배분일자: 2025년12월15일</p>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-distribution.png', title: '📊 전도물품 배분현황' })}
                          >
                            <Image src="/images/supplies-distribution.png" alt="전도물품 배분현황" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-distribution.png', '전도물품_배분현황.png')} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 특별 선물 목록 */}
                        <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-purple-700">🎀 특별 선물 목록</span>
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">VIP</span>
                          </div>
                          <p className="text-xs text-purple-600 mb-2">정선교사님부부/중목사님/원로목사님/7개기도처</p>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-special-gift.png', title: '🎀 특별 선물 목록' })}
                          >
                            <Image src="/images/supplies-special-gift.png" alt="특별 선물 목록" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-special-gift.png', '특별선물_목록.png')} className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 청년리더쉽14명 */}
                        <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-pink-700">👥 청년리더쉽14명</span>
                            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">14명</span>
                          </div>
                          <p className="text-xs text-pink-600 mb-2">남성 리더쉽7명 / 여성 리더쉽7명</p>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-youth-leadership.png', title: '👥 청년리더쉽14명 전물용품대장' })}
                          >
                            <Image src="/images/supplies-youth-leadership.png" alt="청년리더쉽14명 전물용품대장" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-youth-leadership.png', '청년리더쉽14명_전물용품대장.png')} className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 푸드팀 떡볶이 소스 */}
                        <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-300 shadow-md">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-black text-orange-700">🍜 푸드팀 떡볶이 소스</span>
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">푸드팀</span>
                          </div>
                          <p className="text-xs text-orange-600 mb-2">고추장소스(실온보관) / 짜장소스(냉장보관)</p>
                          <div 
                            className="bg-white rounded-lg p-2 mb-3 cursor-pointer active:scale-95 transition-transform relative"
                            onClick={() => setSelectedImage({ src: '/images/supplies-food-team-sauce.png', title: '🍜 푸드팀 떡볶이 소스 물품대장' })}
                          >
                            <Image src="/images/supplies-food-team-sauce.png" alt="푸드팀 떡볶이 소스 물품대장" width={400} height={300} className="w-full h-auto rounded-lg" />
                            <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <ZoomIn className="h-3 w-3" /> 크게보기
                            </div>
                          </div>
                          <button onClick={() => handleDownload('/images/supplies-food-team-sauce.png', '푸드팀_떡볶이소스_물품대장.png')} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors">
                            <Download className="h-4 w-4" /> 다운로드
                          </button>
                        </div>

                        {/* 개별 물품 배분 현황 */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-400 shadow-md">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-black text-emerald-700">📦 개별 물품 배분 현황</span>
                            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">6명</span>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-emerald-200">
                              <div>
                                <span className="font-bold text-emerald-800">🎪 현수막</span>
                                <span className="text-sm text-emerald-600 ml-2">대1개, 소1개</span>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">김대현 형제님</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-emerald-200">
                              <div>
                                <span className="font-bold text-emerald-800">📄 특강프린트</span>
                                <span className="text-sm text-emerald-600 ml-2">130장</span>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">김양신 권사님</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-emerald-200">
                              <div>
                                <span className="font-bold text-emerald-800">📚 팝업북</span>
                                <span className="text-sm text-emerald-600 ml-2">15개</span>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">윤숙영 권사님</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-emerald-200">
                              <div>
                                <span className="font-bold text-emerald-800">🍪 약과</span>
                                <span className="text-sm text-emerald-600 ml-2">40개</span>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">박혜성 팀장님</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-emerald-200">
                              <div>
                                <span className="font-bold text-emerald-800">📖 전도메뉴얼</span>
                                <span className="text-sm text-emerald-600 ml-2">61개</span>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">정회평 팀장님</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-emerald-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-emerald-800">🎁 VIP 선물 세트</span>
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">제인량 목사님</span>
                              </div>
                              <div className="text-sm text-emerald-600 space-y-1 pl-2">
                                <div>• 시장님/현장님/부현장님 선물 <span className="font-bold">3박스</span></div>
                                <div>• 관료 복주머니 <span className="font-bold">150개</span></div>
                                <div>• 카드 <span className="font-bold">150개</span></div>
                                <div>• 약과 <span className="font-bold">80개</span></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 합계 */}
                        <div className="bg-slate-200 rounded-xl p-4 border-2 border-slate-400">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-black text-slate-700">📊 총 첨부파일</span>
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-black text-xl">7개</span>
                          </div>
                        </div>
                      </div>

                      {/* PC 카드 뷰 */}
                      <div className="hidden md:block">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* 특강용주머니물품대장(전도팀) */}
                          <div className="bg-cyan-50 rounded-2xl border-3 border-cyan-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">📦 특강용주머니물품대장</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">전도팀</span>
                              </div>
                              <p className="text-xs text-cyan-100 mt-1">약과, 사탕묶음, 팝업북 등</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-evangelism-team.png', title: '📦 특강용주머니물품대장 (전도팀)' })}
                              >
                                <Image src="/images/supplies-evangelism-team.png" alt="특강용주머니물품대장(전도팀)" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-cyan-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-evangelism-team.png', '특강용주머니물품대장_전도팀.png')} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>

                          {/* 행정관료130명 선물용품대장 */}
                          <div className="bg-yellow-50 rounded-2xl border-3 border-yellow-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">🎁 행정관료130명</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">선물용품</span>
                              </div>
                              <p className="text-xs text-yellow-100 mt-1">(박스1북주머니1약과1전도지1엽서1)</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-admin-130.png', title: '🎁 행정관료130명 선물용품대장' })}
                              >
                                <Image src="/images/supplies-admin-130.png" alt="행정관료130명 선물용품대장" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-yellow-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-admin-130.png', '행정관료130명_선물용품대장.png')} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>

                          {/* 전도물품 배분현황 */}
                          <div className="bg-blue-50 rounded-2xl border-3 border-blue-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">📊 전도물품 배분현황</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">31명</span>
                              </div>
                              <p className="text-xs text-blue-100 mt-1">배분일자: 2025년12월15일</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-distribution.png', title: '📊 전도물품 배분현황' })}
                              >
                                <Image src="/images/supplies-distribution.png" alt="전도물품 배분현황" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-blue-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-distribution.png', '전도물품_배분현황.png')} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>

                          {/* 특별 선물 목록 */}
                          <div className="bg-purple-50 rounded-2xl border-3 border-purple-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">🎀 특별 선물 목록</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">VIP</span>
                              </div>
                              <p className="text-xs text-purple-100 mt-1">정선교사님부부/중목사님/원로목사님/7개기도처</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-special-gift.png', title: '🎀 특별 선물 목록' })}
                              >
                                <Image src="/images/supplies-special-gift.png" alt="특별 선물 목록" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-purple-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-special-gift.png', '특별선물_목록.png')} className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>

                          {/* 청년리더쉽14명 */}
                          <div className="bg-pink-50 rounded-2xl border-3 border-pink-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">👥 청년리더쉽14명</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">14명</span>
                              </div>
                              <p className="text-xs text-pink-100 mt-1">남성 리더쉽7명 / 여성 리더쉽7명</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-youth-leadership.png', title: '👥 청년리더쉽14명 전물용품대장' })}
                              >
                                <Image src="/images/supplies-youth-leadership.png" alt="청년리더쉽14명 전물용품대장" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-pink-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-youth-leadership.png', '청년리더쉽14명_전물용품대장.png')} className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>

                          {/* 푸드팀 떡볶이 소스 */}
                          <div className="bg-orange-50 rounded-2xl border-3 border-orange-400 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black">🍜 푸드팀 떡볶이 소스</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">푸드팀</span>
                              </div>
                              <p className="text-xs text-orange-100 mt-1">고추장소스(실온보관) / 짜장소스(냉장보관)</p>
                            </div>
                            <div className="p-4">
                              <div 
                                className="bg-white rounded-xl p-2 mb-4 shadow-inner cursor-pointer relative group/img"
                                onClick={() => setSelectedImage({ src: '/images/supplies-food-team-sauce.png', title: '🍜 푸드팀 떡볶이 소스 물품대장' })}
                              >
                                <Image src="/images/supplies-food-team-sauce.png" alt="푸드팀 떡볶이 소스 물품대장" width={400} height={300} className="w-full h-auto rounded-lg group-hover/img:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20 rounded-xl">
                                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                    <ZoomIn className="h-6 w-6 text-orange-600" />
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => handleDownload('/images/supplies-food-team-sauce.png', '푸드팀_떡볶이소스_물품대장.png')} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-md">
                                <Download className="h-5 w-5" /> 다운로드
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 개별 물품 배분 현황 - PC 버전 */}
                        <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-3 border-emerald-400 shadow-lg overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-2xl font-black">📦 개별 물품 배분 현황</span>
                                <p className="text-sm text-emerald-100 mt-1">Individual Supply Distribution</p>
                              </div>
                              <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-bold">6명 담당</span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">🎪</span>
                                  <span className="font-black text-emerald-800">현수막</span>
                                </div>
                                <div className="text-emerald-600 font-bold mb-2">대1개, 소1개</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  김대현 형제님
                                </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">📄</span>
                                  <span className="font-black text-emerald-800">특강프린트</span>
                                </div>
                                <div className="text-emerald-600 font-bold mb-2">130장</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  김양신 권사님
                                </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">📚</span>
                                  <span className="font-black text-emerald-800">팝업북</span>
                                </div>
                                <div className="text-emerald-600 font-bold mb-2">15개</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  윤숙영 권사님
                                </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">🍪</span>
                                  <span className="font-black text-emerald-800">약과</span>
                                </div>
                                <div className="text-emerald-600 font-bold mb-2">40개</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  박혜성 팀장님
                                </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">📖</span>
                                  <span className="font-black text-emerald-800">전도메뉴얼</span>
                                </div>
                                <div className="text-emerald-600 font-bold mb-2">61개</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  정회평 팀장님
                                </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">🎁</span>
                                  <span className="font-black text-emerald-800">VIP 선물 세트</span>
                                </div>
                                <div className="text-emerald-600 text-sm mb-2 space-y-1">
                                  <div>• 시장님/현장님/부현장님 선물 <b>3박스</b></div>
                                  <div>• 복주머니 <b>150개</b> / 카드 <b>150개</b></div>
                                  <div>• 약과 <b>80개</b></div>
                                </div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                                  제인량 목사님
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 합계 */}
                        <div className="mt-6 bg-slate-200 rounded-xl p-4 border-2 border-slate-400 flex justify-between items-center">
                          <span className="text-xl font-black text-slate-700">📊 총 첨부파일</span>
                          <span className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-xl">7개</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 악보/이미지/동영상 갤러리 섹션 (어린이 사역팀 제외) */}
                {task.title !== '어린이 사역팀' && task.images && task.images.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                      {task.title === '찬양팀' 
                        ? '🎵 찬양 악보' 
                        : task.title === '전폭특강'
                          ? '🎥 온누리교회 전도폭발 40기'
                          : task.images.every((url: string) => url.includes('youtube.com/embed/') || url.match(/\.(mp4|webm|mov|avi|m4v)$/i))
                            ? '🎥 동영상'
                            : '📸 사진 갤러리'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {task.images.map((imageUrl: string, index: number) => {
                        // URL이 동영상인지 확인
                        const isVideo = imageUrl.match(/\.(mp4|webm|mov|avi|m4v)$/i) || imageUrl.includes('youtube.com/embed/')
                        
                        // 찬양팀 악보 제목 매핑 (한국어/중국어)
                        const worshipSongTitles: { ko: string; zh: string }[] = [
                          { ko: '축복합니다 주님의 이름으로', zh: '我們祝福你' },
                          { ko: '주님 다시 오실때까지 1절', zh: '直到主耶穌再來時候 1' },
                          { ko: '주님 다시 오실때까지 2절', zh: '直到主耶穌再來時候 2' },
                          { ko: '당신은 사랑받기 위해 태어난 사람', zh: '你是为了接受主爱被拣选的人' },
                          { ko: '천사 찬송하기를 1절', zh: '聽啊天使高聲唱 (1)' },
                          { ko: '천사 찬송하기를 2절', zh: '聽啊天使高聲唱 (2)' },
                        ]
                        
                        const songTitle = task.title === '찬양팀' && worshipSongTitles[index]
                          ? (language === 'zh-TW' ? worshipSongTitles[index].zh : worshipSongTitles[index].ko)
                          : null
                        
                        return (
                          <div
                            key={index}
                            className={`relative bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all cursor-pointer group shadow-md ${isVideo ? 'md:col-span-2' : ''}`}
                          >
                            {isVideo ? (
                              // 동영상 표시 (전체 너비로 크게)
                              <div className="relative w-full">
                                {imageUrl.includes('youtube.com/embed/') ? (
                                  // 유튜브 embed - 더 큰 비율로
                                  <div className="relative w-full" style={{ paddingTop: '50%' }}>
                                    <iframe
                                      src={imageUrl}
                                      className="absolute inset-0 w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ) : (
                                  // 로컬 동영상 파일
                                  <video
                                    controls
                                    className="w-full h-auto"
                                    preload="metadata"
                                  >
                                    <source src={imageUrl} type={`video/${imageUrl.split('.').pop()}`} />
                                    동영상을 재생할 수 없습니다.
                                  </video>
                                )}
                              </div>
                            ) : task.title === '찬양팀' ? (
                              // 찬양팀 악보: A4 비율 고정 + 제목 표시
                              <div className="relative w-full">
                                {/* 악보 제목 헤더 */}
                                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">🎵</span>
                                    <div className="flex-1">
                                      <p className="font-bold text-sm md:text-base">
                                        {songTitle || `악보 ${index + 1}`}
                                      </p>
                                      {language !== 'zh-TW' && worshipSongTitles[index] && (
                                        <p className="text-xs text-purple-100 mt-0.5">
                                          {worshipSongTitles[index].zh}
                                        </p>
                                      )}
                                      {language === 'zh-TW' && worshipSongTitles[index] && (
                                        <p className="text-xs text-purple-100 mt-0.5">
                                          {worshipSongTitles[index].ko}
                                        </p>
                                      )}
                                    </div>
                                    {/* 다운로드 버튼 */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDownload(imageUrl, `${songTitle || `악보_${index + 1}`}.jpg`)
                                      }}
                                      className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
                                      title="다운로드"
                                    >
                                      <Download className="h-4 w-4" />
                                    </button>
                                    <Badge className="bg-white/20 text-white text-xs">
                                      {index + 1}
                                    </Badge>
                                  </div>
                                </div>
                                {/* 악보 이미지 */}
                                <div className="relative w-full" style={{ paddingTop: '141.4%' }}>
                                  <Image
                                    src={imageUrl}
                                    alt={songTitle || `악보 ${index + 1}`}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                                  />
                                </div>
                              </div>
                            ) : (
                              // 다른 팀: 원본 이미지 비율 유지 + 다운로드 버튼
                              <div className="relative w-full">
                                <Image
                                  src={imageUrl}
                                  alt={`${language === 'zh-TW' ? task.titleZh : task.title} - 사진 ${index + 1}`}
                                  width={800}
                                  height={600}
                                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                  style={{ aspectRatio: 'auto' }}
                                />
                                {/* 다운로드 버튼 오버레이 */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDownload(imageUrl, `${task.title}_사진_${index + 1}.jpg`)
                                    }}
                                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all shadow-lg"
                                    title="다운로드"
                                  >
                                    <Download className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 정보 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* 시작일 */}
                  {task.startDate && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">시작일</p>
                        <p className="font-semibold">{formatDate(task.startDate)}</p>
                      </div>
                    </div>
                  )}

                  {/* 담당자 */}
                  {task.assignedTo && task.assignedTo.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">담당 팀원</p>
                        <p className="font-semibold">{task.assignedTo.length}명</p>
                      </div>
                    </div>
                  )}

                  {/* 팀 ID */}
                  {task.teamId && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">팀</p>
                        <p className="font-semibold">{task.teamId}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 태그 */}
                {task.tags && task.tags.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      태그
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 댓글 및 리액션 섹션 */}
                <TaskComments taskId={taskId} taskTitle={task.title} />

                {/* 하단 버튼 */}
                <div className="flex gap-3 pt-6 border-t">
                  <Link href="/tasks" className="flex-1">
                    <Button variant="outline" className="w-full">
                      목록으로 돌아가기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold truncate">{selectedImage.title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(selectedImage.src, `${selectedImage.title}.png`)
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Download className="h-4 w-4" /> 다운로드
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* 이미지 */}
            <div 
              className="bg-white rounded-b-xl overflow-auto flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* 하단 안내 */}
            <p className="text-center text-white/70 text-sm mt-3">
              👆 이미지를 스크롤하여 내용을 확인하세요 | 배경 클릭 또는 X 버튼으로 닫기
            </p>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
