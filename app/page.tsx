'use client'

import { HeroSection } from '@/components/public/hero-section'
import { Footer } from '@/components/shared/footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

