'use client'

import { Button } from '@/components/ui/button'
import { useLanguageStore } from '@/app/store/language-store'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'ko' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('ko')}
      >
        한국어
      </Button>
      <Button
        variant={language === 'zh-TW' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('zh-TW')}
      >
        繁體中文
      </Button>
    </div>
  )
}

