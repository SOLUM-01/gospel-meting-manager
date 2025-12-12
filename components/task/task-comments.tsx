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
  Download
} from 'lucide-react'
import Image from 'next/image'
import { 
  getTaskComments, 
  addTaskComment, 
  deleteTaskComment,
  getTaskReactions,
  toggleTaskReaction,
  getReactionCounts,
  getCommentsReactions,
  toggleCommentReaction,
  type TaskComment,
  type TaskReaction,
  type CommentReaction
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
  const [showReactionPicker, setShowReactionPicker] = useState(false)
  const [showReactionUsers, setShowReactionUsers] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 댓글 리액션 관련 상태
  const [commentReactions, setCommentReactions] = useState<Record<string, CommentReaction[]>>({})
  const [showCommentReactionPicker, setShowCommentReactionPicker] = useState<string | null>(null)
  const [showCommentReactionUsers, setShowCommentReactionUsers] = useState<{ commentId: string; type: string } | null>(null)

  // 특정 리액션을 누른 사용자 목록 가져오기
  const getReactionUsers = (reactionType: string) => {
    return reactions
      .filter(r => r.reaction_type === reactionType)
      .map(r => r.user_name)
  }

  // 댓글 리액션을 누른 사용자 목록 가져오기
  const getCommentReactionUsers = (commentId: string, reactionType: string) => {
    return (commentReactions[commentId] || [])
      .filter(r => r.reaction_type === reactionType)
      .map(r => r.user_name)
  }

  // 댓글 리액션 카운트 가져오기
  const getCommentReactionCounts = (commentId: string): Record<string, number> => {
    const counts: Record<string, number> = {}
    ;(commentReactions[commentId] || []).forEach(r => {
      counts[r.reaction_type] = (counts[r.reaction_type] || 0) + 1
    })
    return counts
  }

  // 내가 누른 댓글 리액션인지 확인
  const isMyCommentReaction = (commentId: string, reactionType: string) => {
    return (commentReactions[commentId] || []).some(
      r => r.user_name === userName && r.reaction_type === reactionType
    )
  }

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
    
    // 댓글 리액션도 함께 불러오기
    if (data.length > 0) {
      const commentIds = data.map(c => c.id)
      const reactionsData = await getCommentsReactions(commentIds)
      setCommentReactions(reactionsData)
    }
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

  // 댓글 리액션 토글
  const handleCommentReaction = async (commentId: string, reactionType: CommentReaction['reaction_type']) => {
    if (!userName.trim()) {
      alert('이름을 먼저 입력해주세요.')
      return
    }

    await toggleCommentReaction(commentId, userName, reactionType)
    
    // 해당 댓글의 리액션만 다시 불러오기
    const commentIds = comments.map(c => c.id)
    const reactionsData = await getCommentsReactions(commentIds)
    setCommentReactions(reactionsData)
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

  // 이미지 다운로드 함수
  const handleDownload = async (imageUrl: string, userName: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const timestamp = new Date().toISOString().slice(0, 10)
      link.download = `${taskTitle}_${userName}_${timestamp}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      // CORS 문제 시 새 탭에서 열기
      window.open(imageUrl, '_blank')
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* 리액션 섹션 - 카카오톡 스타일 */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* 리액션이 있는 것만 표시 - 클릭하면 토글 */}
        {REACTIONS.filter(r => reactionCounts[r.type] > 0).map((reaction) => (
          <div key={reaction.type} className="relative group/taskreaction">
            <button
              onClick={() => handleReaction(reaction.type)}
              className={`
                flex items-center gap-1 px-2.5 py-1 rounded-full text-sm
                transition-all duration-200 hover:scale-105
                ${isMyReaction(reaction.type)
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-400'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600'
                }
                hover:shadow-md
              `}
              title={isMyReaction(reaction.type) ? '클릭하면 취소' : '클릭하면 추가'}
            >
              <span>{reaction.emoji}</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{reactionCounts[reaction.type]}</span>
            </button>
            
            {/* 누가 눌렀는지 팝업 - hover시 표시 */}
            <div className="absolute bottom-full left-0 mb-2 z-50 min-w-[120px] max-w-[200px] opacity-0 group-hover/taskreaction:opacity-100 pointer-events-none transition-opacity">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 px-1">
                  {reaction.emoji} {reaction.label}
                </p>
                <div className="max-h-32 overflow-y-auto">
                  {getReactionUsers(reaction.type).map((name, idx) => (
                    <p key={idx} className="text-sm py-0.5 px-1">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="absolute left-3 -bottom-1 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45"></div>
            </div>
          </div>
        ))}
        
        {/* 리액션 추가 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <span className="text-gray-500 dark:text-gray-400">😊</span>
          </button>
          
          {/* 리액션 선택 팝업 */}
          {showReactionPicker && (
            <div className="absolute bottom-full left-0 mb-2 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-600 p-1.5 flex gap-1">
                {REACTIONS.map((reaction) => (
                  <button
                    key={reaction.type}
                    onClick={() => {
                      handleReaction(reaction.type)
                      setShowReactionPicker(false)
                    }}
                    className={`
                      w-9 h-9 flex items-center justify-center rounded-full text-xl
                      transition-all duration-200 hover:scale-125 hover:bg-gray-100 dark:hover:bg-gray-700
                      ${isMyReaction(reaction.type) ? 'bg-blue-100 dark:bg-blue-900/50' : ''}
                    `}
                    title={reaction.label}
                  >
                    {reaction.emoji}
                  </button>
                ))}
              </div>
              <div className="absolute left-3 -bottom-1 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>

      {/* 팝업 닫기용 오버레이 */}
      {(showReactionPicker || showReactionUsers || showCommentReactionPicker || showCommentReactionUsers) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowReactionPicker(false)
            setShowReactionUsers(null)
            setShowCommentReactionPicker(null)
            setShowCommentReactionUsers(null)
          }}
        />
      )}

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
            {/* 댓글 입력 폼 - 카카오톡 스타일 */}
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* 이름이 있으면 표시, 없으면 입력란 */}
              {userName ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {userName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                  <button
                    onClick={() => handleNameChange('')}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    이름 변경
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={20}
                />
              )}

              {/* 댓글 입력 */}
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={userName ? "댓글을 입력하세요" : "먼저 이름을 입력해주세요"}
                  disabled={!userName}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  rows={2}
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
                comments.map((comment) => {
                  const commentCounts = getCommentReactionCounts(comment.id)
                  return (
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
                        <div className="mt-2 relative inline-block group">
                          <Image
                            src={comment.image_url}
                            alt="Comment image"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                          />
                          {/* 다운로드 버튼 - PC에서는 hover시 표시 */}
                          <button
                            onClick={() => handleDownload(comment.image_url!, comment.user_name)}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full 
                              transition-all shadow-lg opacity-0 group-hover:opacity-100 md:opacity-0"
                            title="다운로드"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      
                      {/* 댓글 리액션 - 카카오톡 스타일 */}
                      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex-wrap">
                        {/* 리액션이 있는 것만 표시 - 클릭하면 토글 */}
                        {REACTIONS.filter(r => commentCounts[r.type] > 0).map((reaction) => (
                          <div key={reaction.type} className="relative group/reaction">
                            <button
                              onClick={() => handleCommentReaction(comment.id, reaction.type)}
                              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs transition-all hover:scale-110 ${
                                isMyCommentReaction(comment.id, reaction.type)
                                  ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-400'
                                  : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                              }`}
                              title={isMyCommentReaction(comment.id, reaction.type) ? '클릭하면 취소' : '클릭하면 추가'}
                            >
                              <span className="text-sm">{reaction.emoji}</span>
                              <span className="font-medium text-xs">{commentCounts[reaction.type]}</span>
                            </button>
                            
                            {/* 누가 눌렀는지 팝업 - hover시 표시 */}
                            <div className="absolute bottom-full left-0 mb-1 z-50 min-w-[80px] opacity-0 group-hover/reaction:opacity-100 pointer-events-none transition-opacity">
                              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 p-1.5">
                                <p className="text-xs font-semibold text-gray-500 mb-0.5 px-1">
                                  {reaction.emoji} {reaction.label}
                                </p>
                                <div className="max-h-20 overflow-y-auto">
                                  {getCommentReactionUsers(comment.id, reaction.type).map((name, idx) => (
                                    <p key={idx} className="text-xs py-0.5 px-1">{name}</p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* 리액션 추가 버튼 */}
                        <div className="relative">
                          <button
                            onClick={() => setShowCommentReactionPicker(
                              showCommentReactionPicker === comment.id ? null : comment.id
                            )}
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                          >
                            <span className="text-xs text-gray-500">😊</span>
                          </button>
                          
                          {/* 리액션 선택 팝업 */}
                          {showCommentReactionPicker === comment.id && (
                            <div className="absolute bottom-full left-0 mb-1 z-50">
                              <div className="bg-white dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-600 p-1 flex gap-0.5">
                                {REACTIONS.map((reaction) => (
                                  <button
                                    key={reaction.type}
                                    onClick={() => {
                                      handleCommentReaction(comment.id, reaction.type)
                                      setShowCommentReactionPicker(null)
                                    }}
                                    className={`w-7 h-7 flex items-center justify-center rounded-full text-base transition-all hover:scale-125 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                      isMyCommentReaction(comment.id, reaction.type) ? 'bg-blue-100 dark:bg-blue-900/50' : ''
                                    }`}
                                    title={reaction.label}
                                  >
                                    {reaction.emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

