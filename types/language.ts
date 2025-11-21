// 다국어 타입 정의
export type Language = 'ko' | 'zh-TW'

export interface Translation {
  [key: string]: string | Translation
}

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

