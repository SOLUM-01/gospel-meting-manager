'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  MessageCircle, 
  Send, 
  ImagePlus, 
  X, 
  Trash2,
  Heart,
  ThumbsUp,
  Flame,
  Smile,
  HandMetal
} from 'lucide-react'
import Image from 'next/image'
import { 
  getTaskComments, 
  addTaskComment, 
  deleteTaskComment,
  getTaskReactions,
  toggleTaskReaction,
  getReactionCounts,
  type TaskComment,
  type TaskReaction
} from '@/lib/database/api/comments'

interface TaskCommentsProps {
  taskId: string
  taskTitle: string
}

const REACTIONS = [
  { type: 'like' as const, emoji: '👍', label: '좋아요' },
  { type: 'heart' as const, emoji: '❤️', label: '사랑해요' },
  { type: 'clap' as const, emoji: '👏', label: '박수' },
  { type: 'pray' as const, emoji: '🙏', label: '기도' },
  { type: 'fire' as const, emoji: '🔥', label: '불타오르네' },
  { type: 'smile' as const, emoji: '😊', label: '미소' },
]

export function TaskComments({ taskId, taskTitle }: TaskCommentsProps) {
  const [comments, setComments] = useState<TaskComment[]>([])
  const [reactions, setReactions] = useState<TaskReaction[]>([])
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({})
  const [newComment, setNewComment] = useState('')
  const [userName, setUserName] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 저장된 사용자 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('gospel_user_name')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  // 댓글 및 리액션 불러오기
  useEffect(() => {
    loadComments()
    loadReactions()
  }, [taskId])

  const loadComments = async () => {
    const data = await getTaskComments(taskId)
    setComments(data)
  }

  const loadReactions = async () => {
    const [reactionsData, countsData] = await Promise.all([
      getTaskReactions(taskId),
      getReactionCounts(taskId)
    ])
    setReactions(reactionsData)
    setReactionCounts(countsData)
  }

  // 사용자 이름 저장
  const handleNameChange = (name: string) => {
    setUserName(name)
    localStorage.setItem('gospel_user_name', name)
  }

  // 이미지 선택
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 댓글 제출
  const handleSubmitComment = async () => {
    if (!newComment.trim() || !userName.trim()) return
    if (newComment.length > 300) {
      alert('댓글은 300자 이내로 작성해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const comment = await addTaskComment(taskId, userName, newComment, imagePreview || undefined)
      if (comment) {
        setComments([comment, ...comments])
        setNewComment('')
        setImagePreview(null)
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return
    
    const success = await deleteTaskComment(commentId)
    if (success) {
      setComments(comments.filter(c => c.id !== commentId))
    }
  }

  // 리액션 토글
  const handleReaction = async (reactionType: TaskReaction['reaction_type']) => {
    if (!userName.trim()) {
      alert('이름을 먼저 입력해주세요.')
      return
    }

    const result = await toggleTaskReaction(taskId, userName, reactionType)
    await loadReactions()
  }

  // 내가 누른 리액션인지 확인
  const isMyReaction = (reactionType: string) => {
    return reactions.some(r => r.user_name === userName && r.reaction_type === reactionType)
  }

  // 시간 포맷
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  return (
    <div className="mt-8 space-y-6">
      {/* 리액션 섹션 */}
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>😊</span> 이 사역에 반응하기
        </h3>
        <div className="flex flex-wrap gap-2">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => handleReaction(reaction.type)}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium
                transition-all duration-200 transform hover:scale-105
                ${isMyReaction(reaction.type)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }
              `}
            >
              <span className="text-lg">{reaction.emoji}</span>
              <span>{reactionCounts[reaction.type] || 0}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 댓글 섹션 */}
      <Card className="p-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="w-full flex items-center justify-between text-lg font-semibold mb-4"
        >
          <span className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            댓글 ({comments.length})
          </span>
          <span className="text-gray-400">{showComments ? '▲' : '▼'}</span>
        </button>

        {showComments && (
          <div className="space-y-4">
            {/* 댓글 입력 폼 */}
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* 이름 입력 */}
              <input
                type="text"
                value={userName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={20}
              />

              {/* 댓글 입력 */}
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요 (300자 이내)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  maxLength={300}
                />
                <span className={`absolute bottom-2 right-2 text-xs ${newComment.length > 280 ? 'text-red-500' : 'text-gray-400'}`}>
                  {newComment.length}/300
                </span>
              </div>

              {/* 이미지 미리보기 */}
              {imagePreview && (
                <div className="relative inline-block">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* 버튼들 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="w-4 h-4 mr-1" />
                    사진
                  </Button>
                </div>
                <Button
                  onClick={handleSubmitComment}
                  disabled={isSubmitting || !newComment.trim() || !userName.trim()}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? '등록 중...' : '등록'}
                </Button>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {comment.user_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{comment.user_name}</p>
                          <p className="text-xs text-gray-500">{formatTime(comment.created_at)}</p>
                        </div>
                      </div>
                      {comment.user_name === userName && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-wrap">{comment.content}</p>
                    {comment.image_url && (
                      <div className="mt-2">
                        <Image
                          src={comment.image_url}
                          alt="Comment image"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

