import type { Metadata } from "next"
import YouTubeConverter from "@/components/YouTubeConverter"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"

export const metadata: Metadata = {
  title: "YT2MP3 - #1 YouTube to MP3 Converter | Free HD Audio Extraction 2024",
  description: "🎵 Convert YouTube videos & Shorts to MP3 instantly! Free, fast, and high-quality (320kbps). No registration required.",
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 bg-[#0066FF] text-white text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              YouTube to MP3 Converter
            </h1>
            <p className="text-xl mb-8 text-white max-w-3xl mx-auto">
              Convert your favorite YouTube videos and Shorts to high-quality MP3 files instantly.
              <strong> 320kbps quality, lightning-fast speed, zero registration required!</strong>
            </p>
            <YouTubeConverter />

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>15-second average conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>100% secure & private</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎵</span>
                <span>Up to 320kbps quality</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>Works on all devices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* How It Works */}
        <HowItWorks />

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
