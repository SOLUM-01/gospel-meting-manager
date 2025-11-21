'use client'

import { useTranslation } from '@/lib/i18n/use-translation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import type { Participant } from '@/types/participant'
import Link from 'next/link'

interface ParticipantTableProps {
  participants: Participant[]
  onDelete: (id: string) => void
  onEdit?: (participant: Participant) => void
}

export function ParticipantTable({ participants, onDelete, onEdit }: ParticipantTableProps) {
  const { t } = useTranslation()

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader':
        return 'bg-purple-500'
      case 'member':
        return 'bg-blue-500'
      case 'volunteer':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" 참가자를 정말 삭제하시겠습니까?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>중국어 이름</TableHead>
            <TableHead>성별</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>팀 카테고리</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>국적</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                등록된 참가자가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">
                  {participant.name}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {participant.nameZh || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {participant.gender === 'M' ? '남성' : participant.gender === 'F' ? '여성' : '-'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {participant.phone}
                </TableCell>
                <TableCell className="text-sm">
                  {participant.email || '-'}
                </TableCell>
                <TableCell>
                  {participant.teamCategory ? (
                    <Badge variant="secondary">
                      {participant.teamCategory}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(participant.role)}>
                    {t(`participants.roles.${participant.role}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {participant.nationality}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/participants/${participant.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          보기
                        </Link>
                      </DropdownMenuItem>
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(participant)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(participant.id, participant.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

