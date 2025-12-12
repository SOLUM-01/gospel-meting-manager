"use client"

import { useState, useEffect } from "react"
import { Download, X, Share, Plus, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Service Worker 등록
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker 등록 성공:', registration.scope)
        })
        .catch((error) => {
          console.log('Service Worker 등록 실패:', error)
        })
    }

    // 모바일 기기 감지
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent)
    setIsMobile(isMobileDevice)

    // iOS 감지
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
    setIsIOS(isIOSDevice)

    // Android 감지
    const isAndroidDevice = /android/i.test(userAgent)
    setIsAndroid(isAndroidDevice)

    // 이미 설치되었는지 확인 (standalone 모드)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    setIsInstalled(isStandalone)

    // 이미 설치되었으면 표시하지 않음
    if (isStandalone) return

    // 이전에 닫았는지 확인 (24시간 동안 다시 표시하지 않음)
    const dismissedAt = localStorage.getItem("pwa-prompt-dismissed")
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10)
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60)
      if (hoursSinceDismissed < 24) return
    }

    // Android/Chrome: beforeinstallprompt 이벤트 리스너
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)

    // 모바일 기기인 경우 2초 후 배너 표시
    if (isMobileDevice && !isStandalone) {
      setTimeout(() => setShowPrompt(true), 2000)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString())
  }

  // 모바일이 아니거나 이미 설치된 경우 표시하지 않음
  if (!showPrompt || isInstalled || !isMobile) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-4 pr-12 shadow-2xl border border-violet-400/30 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-lg"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-white" strokeWidth={3} />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Smartphone className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-1">
              📲 앱으로 설치하기
            </h3>

            {isIOS ? (
              // iOS 안내 (Safari)
              <div className="text-white/90 text-sm space-y-2">
                <p>홈 화면에 앱을 추가하세요!</p>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs">
                  <Share className="w-4 h-4 flex-shrink-0" />
                  <span>화면 하단의 <strong>공유 버튼 ⎋</strong> 탭</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs">
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  <span><strong>&quot;홈 화면에 추가&quot;</strong> 선택</span>
                </div>
              </div>
            ) : isAndroid ? (
              // Android 안내
              <div className="text-white/90 text-sm space-y-2">
                {deferredPrompt ? (
                  <>
                    <p>홈 화면에서 빠르게 접근하세요!</p>
                    <Button
                      onClick={handleInstall}
                      className="w-full bg-white text-violet-600 hover:bg-white/90 font-bold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      지금 설치하기
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-yellow-200 font-semibold">⚠️ Chrome 브라우저에서 열어주세요!</p>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs">
                      <span className="text-lg font-bold">⋮</span>
                      <span>메뉴(⋮) → <strong>&quot;다른 브라우저로 열기&quot;</strong></span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs">
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span>Chrome에서 메뉴 → <strong>&quot;앱 설치&quot;</strong></span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // 기타 모바일 브라우저
              <div className="text-white/90 text-sm space-y-2">
                <p>홈 화면에 앱을 추가하세요!</p>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-xs">
                  <Download className="w-4 h-4 flex-shrink-0" />
                  <span>브라우저 메뉴에서 <strong>&quot;홈 화면에 추가&quot;</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
