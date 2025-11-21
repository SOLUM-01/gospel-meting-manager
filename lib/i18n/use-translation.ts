import { useLanguageStore } from '@/app/store/language-store'
import { ko } from './translations/ko'
import { zhTW } from './translations/zh-TW'

const translations = {
  ko,
  'zh-TW': zhTW,
}

export function useTranslation() {
  const { language } = useLanguageStore()

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { t, language }
}

