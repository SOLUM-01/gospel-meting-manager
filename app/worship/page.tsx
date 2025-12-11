'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, Search, FileText, Youtube, ArrowLeft, ExternalLink, Send, Heart, MessageCircle, Trash2, User } from 'lucide-react'
import type { WorshipSong } from '@/types/worship'
import type { Prayer } from '@/types/prayer'
import { getPublicWorshipSongs } from '@/lib/database/api/worship-songs'
import { getPrayers, createPrayer, deletePrayer } from '@/lib/database/api/prayers'
import { supabase } from '@/lib/database/supabase'

export default function WorshipPage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [worshipSongs, setWorshipSongs] = useState<WorshipSong[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 기도/말씀 나눔 상태
  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [prayersLoading, setPrayersLoading] = useState(true)
  const [newPrayerContent, setNewPrayerContent] = useState('')
  const [newPrayerType, setNewPrayerType] = useState<'prayer' | 'devotion'>('prayer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)

  // 현재 사용자 정보 가져오기
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자',
          email: session.user.email || ''
        })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '사용자',
          email: session.user.email || ''
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Supabase에서 찬양 데이터 가져오기
  useEffect(() => {
    async function fetchWorshipSongs() {
      try {
        setLoading(true)
        const data = await getPublicWorshipSongs()
        setWorshipSongs(data)
        setError(null)
      } catch (err) {
        console.error('큐티 데이터 로딩 실패:', err)
        setError('큐티 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchWorshipSongs()
  }, [])

  // 기도/말씀 목록 가져오기
  useEffect(() => {
    async function fetchPrayers() {
      try {
        setPrayersLoading(true)
        const data = await getPrayers()
        setPrayers(data)
      } catch (err) {
        console.error('기도/말씀 목록 로딩 실패:', err)
      } finally {
        setPrayersLoading(false)
      }
    }
    
    fetchPrayers()
  }, [])

  // 기도/말씀 제출
  const handleSubmitPrayer = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }
    if (!newPrayerContent.trim()) {
      alert('내용을 입력해주세요.')
      return
    }
    if (newPrayerContent.length > 1000) {
      alert('1000자 이내로 작성해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      const newPrayer = await createPrayer({
        userId: user.id,
        userName: user.name,
        content: newPrayerContent.trim(),
        type: newPrayerType,
      })
      setPrayers([newPrayer, ...prayers])
      setNewPrayerContent('')
      alert('등록되었습니다. 🙏')
    } catch (err) {
      console.error('기도/말씀 등록 실패:', err)
      alert('등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 기도/말씀 삭제
  const handleDeletePrayer = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    
    try {
      await deletePrayer(id)
      setPrayers(prayers.filter(p => p.id !== id))
    } catch (err) {
      console.error('삭제 실패:', err)
      alert('삭제에 실패했습니다.')
    }
  }

  const filteredSongs = worshipSongs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.titleZh?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hymn':
        return 'bg-purple-500 hover:bg-purple-600'
      case 'praise':
        return 'bg-pink-500 hover:bg-pink-600'
      case 'ccm':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'worship':
        return 'bg-orange-500 hover:bg-orange-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hymn':
        return '찬송가'
      case 'praise':
        return '찬양'
      case 'ccm':
        return 'CCM'
      case 'worship':
        return '워십'
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <Link href="/info">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                정보 페이지로
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">생명의 삶 큐티</h1>
                <p className="text-muted-foreground">
                  매일 말씀 묵상과 기도
                </p>
              </div>
            </div>
          </div>

          {/* 기도/말씀 나눔 섹션 */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-pink-500" />
              <h2 className="text-2xl font-bold">기도와 말씀 나눔</h2>
              <Badge variant="secondary" className="ml-2">
                {prayers.length}개
              </Badge>
            </div>

            {/* 입력 폼 */}
            {user ? (
              <Card className="mb-6 border-2 border-amber-200 bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">{user.name}</span>
                    <span className="text-sm text-muted-foreground">님의 나눔</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 타입 선택 */}
                  <div className="flex gap-2">
                    <Button
                      variant={newPrayerType === 'prayer' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewPrayerType('prayer')}
                      className={newPrayerType === 'prayer' ? 'bg-pink-500 hover:bg-pink-600' : ''}
                    >
                      🙏 기도
                    </Button>
                    <Button
                      variant={newPrayerType === 'devotion' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewPrayerType('devotion')}
                      className={newPrayerType === 'devotion' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                    >
                      📖 말씀
                    </Button>
                  </div>

                  {/* 내용 입력 */}
                  <div className="relative">
                    <Textarea
                      placeholder={newPrayerType === 'prayer' 
                        ? "기도 제목이나 감사를 나눠주세요..." 
                        : "오늘 묵상한 말씀을 나눠주세요..."}
                      value={newPrayerContent}
                      onChange={(e) => setNewPrayerContent(e.target.value)}
                      className="min-h-[120px] resize-none pr-16"
                      maxLength={1000}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                      {newPrayerContent.length}/1000
                    </div>
                  </div>

                  {/* 제출 버튼 */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmitPrayer}
                      disabled={isSubmitting || !newPrayerContent.trim()}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          등록 중...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          나눔 등록
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6 border-2 border-gray-200 bg-gray-50">
                <CardContent className="py-8 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-muted-foreground mb-4">
                    기도와 말씀을 나누려면 로그인이 필요합니다.
                  </p>
                  <Button asChild>
                    <Link href="/login">로그인하기</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* 생명의 삶 큐티 - 전체 내용 (스크롤 가능) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-bold">이번 주 말씀 (여호수아)</h3>
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                  12월 15일 ~ 20일
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 월요일 15일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">월</Badge>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 19:1~23</CardTitle>
                    <CardDescription className="text-green-100 text-xs">성경 예언을 성취한 기업 분배</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 390 예수가 거느리시니</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>1절</strong> 두 번째로는 시므온, 곧 시므온 자손의 지파를 위해 그 가문별로 제비를 뽑았습니다.</p>
                      <p><strong>2절</strong> 그들이 얻은 유산은 브엘세바, 세바, 몰라다 등 13개의 성과 그 주변 마을이고</p>
                      <p><strong>7절</strong> 또 아인, 림몬, 에델, 아산으로 네 개의 성과 주변 마을입니다.</p>
                      <p><strong>10절</strong> 세 번째로는 스불론 자손들을 위해 제비를 뽑았습니다.</p>
                      <p><strong>13절</strong> 다시 동쪽으로 가드헤벨과 엣가신으로 가서 림몬에서 나옵니다.</p>
                      <p><strong>16절</strong> 이 성들은 스불론 자손들이 받은 유산입니다.</p>
                      <p><strong>17절</strong> 네 번째로 잇사갈 자손들을 위해 제비를 뽑았습니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">시므온 18개, 스불론 12개, 잇사갈 16개 성을 유산으로 받습니다.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 화요일 16일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">화</Badge>
                      <span className="text-lg font-bold">16</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 19:24~51</CardTitle>
                    <CardDescription className="text-green-100 text-xs">사명을 우선시하는 지도자</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 267 주의 확실한 약속의 말씀</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>24절</strong> 다섯 번째로 아셀 자손의 지파를 위해 제비를 뽑았습니다.</p>
                      <p><strong>25절</strong> 경계에는 헬갓, 할리, 베덴, 악삽 등이 있었습니다.</p>
                      <p><strong>27절</strong> 동쪽으로 돌아 벧다곤을 향해 스불론과 입다엘 골짜기에 이릅니다.</p>
                      <p><strong>31절</strong> 이 성들은 아셀 자손이 받은 유산입니다.</p>
                      <p><strong>32절</strong> 여섯 번째로는 납달리 자손들을 위해 제비를 뽑았습니다.</p>
                      <p><strong>33절</strong> 경계는 헬렙과 사아난님에서부터 요단강까지 이릅니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">아셀 22개, 납달리 19개 성을 유산으로 받습니다.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 수요일 17일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">수</Badge>
                      <span className="text-lg font-bold">17</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 20:1~9</CardTitle>
                    <CardDescription className="text-green-100 text-xs">도피성에 담긴 하나님의 정의</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 310 아 하나님의 은혜로</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>1절</strong> 그때 여호와께서 여호수아에게 말씀하셨습니다.</p>
                      <p><strong>2절</strong> "모세를 통해 지시한 도피성들을 지정하라."</p>
                      <p><strong>3절</strong> 실수로 살인한 자가 피신해 보호받게 하여라.</p>
                      <p><strong>4절</strong> 도피성으로 피신하면 성문에서 사건을 진술해야 한다.</p>
                      <p><strong>7절</strong> 갈릴리 게데스, 세겜, 헤브론을 지정했습니다.</p>
                      <p><strong>8절</strong> 요단 동쪽에는 베셀, 길르앗 라못, 바산 골란을 지정했습니다.</p>
                      <p><strong>9절</strong> 우연히 죽인 사람을 위해 정해 놓은 성들입니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">실수로 살인한 자를 보호하기 위해 6개 도피성을 지정합니다.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 목요일 18일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">목</Badge>
                      <span className="text-lg font-bold">18</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 21:1~7</CardTitle>
                    <CardDescription className="text-green-100 text-xs">하나님의 봉사자들에게 주어지는 성읍</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 393 오 신실하신 주</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>1절</strong> 레위 사람들의 지도자들이 엘르아살과 여호수아에게 나아와</p>
                      <p><strong>2절</strong> "모세를 통해 우리가 살 성과 초지를 주라고 명령하셨습니다."</p>
                      <p><strong>3절</strong> 이스라엘 자손들은 레위 사람들에게 성과 초지를 주었습니다.</p>
                      <p><strong>4절</strong> 아론의 자손들은 유다, 시므온, 베냐민 지파에서 13개 성을 받았고</p>
                      <p><strong>5절</strong> 나머지 그핫 자손은 에브라임, 단, 므낫세 반 지파에서 10개 성을 받았습니다.</p>
                      <p><strong>6절</strong> 게르손 자손은 잇사갈, 아셀, 납달리 지파에서 13개 성을 받았습니다.</p>
                      <p><strong>7절</strong> 므라리 자손은 르우벤, 갓, 스불론 지파에서 12개 성을 받았습니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">레위 자손들이 제비 뽑아 각각 성을 받습니다.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 금요일 19일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">금</Badge>
                      <span className="text-lg font-bold">19</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 21:8~26</CardTitle>
                    <CardDescription className="text-green-100 text-xs">영적 파수꾼의 사명</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 370 주 안에 있는 나에게</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>8절</strong> 이스라엘 자손들은 레위 사람들에게 성과 초지를 제비 뽑아 나눠 주었습니다.</p>
                      <p><strong>9절</strong> 유다와 시므온 지파 가운데 성들을 주었는데</p>
                      <p><strong>13절</strong> 아론의 자손들에게 도피성인 헤브론과 립나 등을 주었습니다.</p>
                      <p><strong>19절</strong> 아론의 자손들을 위한 성은 모두 13개였습니다.</p>
                      <p><strong>20절</strong> 그핫 가문은 에브라임 지파에서 성을 얻었습니다.</p>
                      <p><strong>23절</strong> 단 지파에서는 엘드게 등 네 개의 성을 주었습니다.</p>
                      <p><strong>26절</strong> 모두 열 개의 성은 나머지 그핫 자손들이 갖게 됐습니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">아론 자손 13개, 그핫 자손 10개 성을 받습니다.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 토요일 20일 */}
                <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg h-[320px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white text-green-700 font-bold text-xs">토</Badge>
                      <span className="text-lg font-bold">20</span>
                    </div>
                    <CardTitle className="text-sm mt-1">여호수아 21:27~45</CardTitle>
                    <CardDescription className="text-green-100 text-xs">온전히 성취된 하나님의 선한 말씀</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 text-xs space-y-2 overflow-y-auto flex-1">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="font-semibold text-amber-800 text-xs">🎵 새 445 태산을 넘어 험곡에 가도</p>
                    </div>
                    <div className="space-y-1.5 text-gray-700 leading-relaxed">
                      <p><strong>27절</strong> 게르손 가문에게 바산의 골란 등 두 개의 성을 주었습니다.</p>
                      <p><strong>33절</strong> 게르손 자손들이 갖게 된 성은 모두 13개였습니다.</p>
                      <p><strong>40절</strong> 므라리 자손이 갖게 된 성은 모두 12개였습니다.</p>
                      <p><strong>41절</strong> 레위 사람의 성은 전체 48개와 그 초지였습니다.</p>
                      <p><strong>43절</strong> 여호와께서 맹세하신 모든 땅을 이스라엘에게 주셨습니다.</p>
                      <p><strong>44절</strong> 조상들에게 맹세하신 대로 사방에 안식을 주셨습니다.</p>
                      <p><strong>45절</strong> 모든 선한 약속은 하나도 남김없이 다 이뤄졌습니다.</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-800 text-xs">📝 요약</p>
                      <p className="text-green-700">하나님의 약속은 하나도 남김없이 다 이뤄졌습니다.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* 기도/말씀 목록 */}
            {prayersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">나눔 목록을 불러오는 중...</p>
              </div>
            ) : prayers.length > 0 ? (
              <div className="space-y-4">
                {prayers.map((prayer) => (
                  <Card 
                    key={prayer.id} 
                    className={`border-2 transition-all hover:shadow-md ${
                      prayer.type === 'prayer' 
                        ? 'border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50' 
                        : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={prayer.type === 'prayer' ? 'bg-pink-500' : 'bg-blue-500'}>
                              {prayer.type === 'prayer' ? '🙏 기도' : '📖 말씀'}
                            </Badge>
                            <span className="font-semibold text-gray-800">{prayer.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(prayer.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {prayer.content}
                          </p>
                        </div>
                        {user && user.id === prayer.userId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePrayer(prayer.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-muted-foreground">
                  아직 나눔이 없습니다. 첫 번째로 나눔을 시작해보세요!
                </p>
              </div>
            )}
          </div>

          {/* 큐티 자료 섹션 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-bold">큐티 자료</h2>
              <Badge variant="secondary" className="ml-2">
                {worshipSongs.length}개
              </Badge>
            </div>

            {/* 검색 */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="큐티 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* 로딩 중 */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">
                  큐티 데이터를 불러오는 중...
                </p>
              </div>
            ) : error ? (
              /* 에러 발생 */
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto text-red-500 mb-4" />
                <p className="text-lg text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  다시 시도
                </Button>
              </div>
            ) : filteredSongs.length > 0 ? (
              /* 찬양 목록 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSongs.map((song) => (
                  <Card key={song.id} className="border-2 transition-all hover:shadow-lg overflow-hidden bg-white">
                    {/* 이미지 */}
                    {song.imageUrl && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={song.imageUrl}
                          alt={song.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">
                            {song.title}
                          </CardTitle>
                          {song.titleZh && (
                            <CardDescription className="text-base font-medium">
                              {song.titleZh}
                            </CardDescription>
                          )}
                        </div>
                        <Badge className={getTypeColor(song.type)}>
                          {getTypeLabel(song.type)}
                        </Badge>
                      </div>
                      {song.artist && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {song.artist}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* 가사 미리보기 */}
                      {song.lyrics && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {song.lyrics}
                        </p>
                      )}

                      {/* 링크 버튼들 */}
                      <div className="flex flex-wrap gap-2">
                        {song.pdfUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={song.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4 mr-2" />
                              악보 PDF
                            </a>
                          </Button>
                        )}
                        {song.youtubeUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer">
                              <Youtube className="h-4 w-4 mr-2" />
                              영상
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/worship/${song.id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            상세보기
                          </Link>
                        </Button>
                      </div>

                      {/* 태그 */}
                      {song.tags && song.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {song.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* 검색 결과 없음 */
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  검색 결과가 없습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
