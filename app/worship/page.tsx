'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/shared/footer'
import { useTranslation } from '@/lib/i18n/use-translation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Music, Search, FileText, Youtube, Image as ImageIcon, ArrowLeft, ExternalLink } from 'lucide-react'
import type { WorshipSong } from '@/types/worship'

// 더미 데이터
const mockWorshipSongs: WorshipSong[] = [
  {
    id: '1',
    title: '주님의 영광',
    titleZh: '主的榮耀',
    artist: '찬양팀',
    type: 'worship',
    lyrics: '주님의 영광이 이곳에 충만하네...',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    pdfUrl: '/worship/sample-sheet.pdf',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['찬양', '워십'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '이 땅에 평화',
    titleZh: '這地平安',
    artist: '찬양팀',
    type: 'praise',
    lyrics: '이 땅에 평화를 주소서...',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['평화', '찬양'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: '할렐루야',
    titleZh: '哈利路亞',
    artist: '전체',
    type: 'hymn',
    lyrics: '할렐루야 주를 찬양하라...',
    pdfUrl: '/worship/hallelujah.pdf',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['찬송가', '할렐루야'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function WorshipPage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = mockWorshipSongs.filter((song) => {
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

  return (
    <div className="flex flex-col min-h-screen">
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
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">찬양 목록</h1>
                <p className="text-muted-foreground">
                  총 {mockWorshipSongs.length}곡
                </p>
              </div>
            </div>
          </div>

          {/* 검색 */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="찬양 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 찬양 목록 */}
          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSongs.map((song) => (
                <Card key={song.id} className="border-2 transition-all hover:shadow-lg overflow-hidden">
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
            <div className="text-center py-16">
              <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                검색 결과가 없습니다
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

