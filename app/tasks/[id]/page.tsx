'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, Tag, Users, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getTaskById } from '@/lib/database/api/tasks'
import { getAllParticipants } from '@/lib/database/api/participants'
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
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed mb-4">
                    {language === 'zh-TW'
                      ? (task.descriptionZh || '사역에 대한 설명이 준비 중입니다.')
                      : (task.description || '사역에 대한 설명이 준비 중입니다.')}
                  </p>
                  
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

                {/* 악보/이미지 갤러리 섹션 */}
                {task.images && task.images.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                      {task.title === '찬양팀' ? '🎵 찬양 악보' : '📸 사진 갤러리'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {task.images.map((imageUrl: string, index: number) => (
                        <div
                          key={index}
                          className="relative bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all cursor-pointer group shadow-md"
                        >
                          {task.title === '찬양팀' ? (
                            // 찬양팀 악보: A4 비율 고정
                            <div className="relative w-full" style={{ paddingTop: '141.4%' }}>
                              <Image
                                src={imageUrl}
                                alt={`${language === 'zh-TW' ? task.titleZh : task.title} - 악보 ${index + 1}`}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                              />
                              <div className="absolute bottom-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                악보 {index + 1}
                              </div>
                            </div>
                          ) : (
                            // 다른 팀: 원본 이미지 비율 유지
                            <div className="relative w-full">
                              <Image
                                src={imageUrl}
                                alt={`${language === 'zh-TW' ? task.titleZh : task.title} - 사진 ${index + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                style={{ aspectRatio: 'auto' }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
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
      <Footer />
    </div>
  )
}
