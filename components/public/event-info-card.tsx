'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EventInfoCardProps {
  title: string
  description?: string
  items: {
    label: string
    value: string
    icon?: LucideIcon
  }[]
  color?: 'pink' | 'purple' | 'blue' | 'green'
}

const colorClasses = {
  pink: 'border-pink-500/50 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20',
  purple: 'border-purple-500/50 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20',
  blue: 'border-blue-500/50 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
  green: 'border-green-500/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
}

export function EventInfoCard({
  title,
  description,
  items,
  color = 'purple',
}: EventInfoCardProps) {
  return (
    <Card className={cn('border-2 transition-all hover:shadow-lg', colorClasses[color])}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-start gap-3">
              {Icon && (
                <div className="mt-1">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-base font-semibold">{item.value}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

