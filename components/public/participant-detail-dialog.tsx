'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Participant, Attachment } from '@/types/participant'
import { 
  User, Phone, Mail, MapPin, Briefcase, FileText, 
  Image, Video, FileIcon, Download, Trash2, Upload,
  X, Loader2
} from 'lucide-react'
import NextImage from 'next/image'
import { 
  getParticipantAttachments, 
  uploadMultipleAttachments, 
  deleteAttachment 
} from '@/lib/database/api/attachments'
import { useToast } from '@/hooks/use-toast'

interface ParticipantDetailDialogProps {
  participant: Participant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ParticipantDetailDialog({
  participant,
  open,
  onOpenChange
}: ParticipantDetailDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedAttachments, setUploadedAttachments] = useState<Attachment[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  // 참가자가 변경되거나 다이얼로그가 열릴 때 첨부파일 로드
  useEffect(() => {
    if (participant && open) {
      loadAttachments()
    }
  }, [participant, open])

  const loadAttachments = async () => {
    if (!participant) return
    
    try {
      setLoading(true)
      const attachments = await getParticipantAttachments(participant.id)
      setUploadedAttachments(attachments)
    } catch (error) {
      console.error('첨부파일 로드 실패:', error)
      toast({
        title: '오류',
        description: '첨부파일을 불러오는데 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!participant) return null

  const getTeamCategoryColor = (category?: string) => {
    switch (category) {
      case '전폭특강':
        return 'bg-red-600'
      case '전도팀':
        return 'bg-blue-600'
      case '중보기도팀':
        return 'bg-purple-600'
      case '찬양팀':
        return 'bg-pink-600'
      case '부채춤팀':
        return 'bg-yellow-600'
      case '푸드팀':
        return 'bg-green-600'
      case '미용팀':
        return 'bg-indigo-600'
      case '물품팀':
        return 'bg-orange-600'
      default:
        return 'bg-gray-500'
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles([...selectedFiles, ...filesArray])
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!participant || selectedFiles.length === 0) return

    try {
      setUploading(true)
      const newAttachments = await uploadMultipleAttachments(
        participant.id,
        selectedFiles
      )
      
      setUploadedAttachments([...newAttachments, ...uploadedAttachments])
      setSelectedFiles([])
      
      toast({
        title: '업로드 완료',
        description: `${newAttachments.length}개의 파일이 업로드되었습니다.`,
      })
    } catch (error) {
      console.error('파일 업로드 실패:', error)
      toast({
        title: '오류',
        description: '파일 업로드에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId)
      setUploadedAttachments(uploadedAttachments.filter(a => a.id !== attachmentId))
      
      toast({
        title: '삭제 완료',
        description: '첨부파일이 삭제되었습니다.',
      })
    } catch (error) {
      console.error('첨부파일 삭제 실패:', error)
      toast({
        title: '오류',
        description: '첨부파일 삭제에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <Image className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      case 'pdf':
        return <FileText className="h-5 w-5" />
      default:
        return <FileIcon className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">참가자 상세 정보</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="attachments">첨부파일</TabsTrigger>
          </TabsList>

          {/* 기본 정보 탭 */}
          <TabsContent value="info" className="space-y-6">
            {/* 프로필 섹션 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              {participant.imageUrl ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <NextImage
                    src={participant.imageUrl}
                    alt={participant.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{participant.name}</h2>
                  {participant.displayNumber && (
                    <Badge variant="outline" className="text-sm">
                      No. {participant.displayNumber}
                    </Badge>
                  )}
                </div>
                {participant.nameZh && (
                  <p className="text-lg text-muted-foreground mb-2">{participant.nameZh}</p>
                )}
                {(participant.englishFirstName || participant.englishLastName) && (
                  <p className="text-md text-muted-foreground mb-3">
                    {participant.englishFirstName} {participant.englishLastName}
                  </p>
                )}
                {participant.teamCategory && (
                  <Badge className={`${getTeamCategoryColor(participant.teamCategory)} text-white`}>
                    {participant.teamCategory}
                  </Badge>
                )}
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 성별 */}
              {participant.gender && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">성별</p>
                    <p className="font-medium">
                      {participant.gender === 'M' ? '남성' : '여성'}
                    </p>
                  </div>
                </div>
              )}

              {/* 전화번호 */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-muted-foreground">전화번호</p>
                  <p className="font-medium">{participant.phone}</p>
                </div>
              </div>

              {/* 이메일 */}
              {participant.email && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <p className="font-medium break-all">{participant.email}</p>
                  </div>
                </div>
              )}

              {/* 국적 */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-muted-foreground">국적</p>
                  <p className="font-medium">{participant.nationality}</p>
                </div>
              </div>

              {/* 직임 */}
              {participant.position && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">직임</p>
                    <p className="font-medium">{participant.position}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 메모 */}
            {participant.notes && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900 mb-1">메모</p>
                    <p className="text-sm text-yellow-800 whitespace-pre-wrap">
                      {participant.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* 첨부파일 탭 */}
          <TabsContent value="attachments" className="space-y-6">
            {/* 파일 업로드 섹션 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">파일 업로드</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  사진, 동영상, PDF 등을 첨부할 수 있습니다
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" asChild>
                    <span>파일 선택</span>
                  </Button>
                </label>
              </div>

              {/* 선택된 파일 목록 */}
              {selectedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-sm">선택된 파일 ({selectedFiles.length})</h4>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded border"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {file.type.startsWith('image/') && <Image className="h-5 w-5 text-blue-500" />}
                        {file.type.startsWith('video/') && <Video className="h-5 w-5 text-purple-500" />}
                        {file.type === 'application/pdf' && <FileText className="h-5 w-5 text-red-500" />}
                        {!file.type.startsWith('image/') && !file.type.startsWith('video/') && file.type !== 'application/pdf' && (
                          <FileIcon className="h-5 w-5 text-gray-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    onClick={handleUpload} 
                    className="w-full mt-4"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        업로드 중...
                      </>
                    ) : (
                      '업로드'
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* 업로드된 파일 목록 */}
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-gray-400 mb-4" />
                <p className="text-muted-foreground">첨부파일을 불러오는 중...</p>
              </div>
            ) : uploadedAttachments.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  첨부파일 ({uploadedAttachments.length})
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {uploadedAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(attachment.fileType)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{attachment.fileName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(attachment.fileSize)} • {' '}
                            {new Date(attachment.uploadedAt).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={attachment.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAttachment(attachment.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {!loading && uploadedAttachments.length === 0 && selectedFiles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>첨부된 파일이 없습니다</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

