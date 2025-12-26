import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { PWAInstallPrompt } from "@/components/shared/pwa-install-prompt"

export const metadata: Metadata = {
  title: "2025 雲林城市耶誕慶典 歡迎光臨",
  description: "대만 윈린현 도우료우시 제3회 성탄절 복음집회 - HI LIGHT CHRISTMAS",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "복음집회",
  },
  icons: {
    icon: "/gospel-meeting-icon.png",
    apple: "/gospel-meeting-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/gospel-meeting-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <PWAInstallPrompt />
        <Toaster />
      </body>
    </html>
  )
}
