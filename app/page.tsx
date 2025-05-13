import type { Metadata } from "next"
import YouTubeConverter from "@/components/YouTubeConverter"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import FAQ from "@/components/FAQ"
import AboutSection from "@/components/AboutSection"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import Script from "next/script"
import OrganizationSchema from "@/components/OrganizationSchema"
import WebsiteSchema from "@/components/WebsiteSchema"
import AdUnit from "@/components/AdUnit"
import InternalLinkBanner from "@/components/InternalLinkBanner"

export const metadata: Metadata = {
  title: "YT2MP3 - YouTube to MP3 Converter | Convert Videos and Shorts",
  description:
    "Free YouTube to MP3 converter. Extract high-quality audio from YouTube videos and Shorts. No registration, fast downloads, and easy to use.",
  keywords:
    "youtube to mp3, youtube converter, youtube shorts to mp3, mp3 converter, download youtube audio, youtube to audio, free youtube converter",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1">
        <section className="px-4 py-16 bg-[#0066FF] text-white text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              YouTube to MP3 Converter | Free Online Audio Extractor
            </h1>
            <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
              Convert your favorite YouTube videos and Shorts to high-quality MP3 files quickly and easily. No
              registration required!
            </p>
            <YouTubeConverter />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>

        <Features />

        <div className="container mx-auto px-4">
          <InternalLinkBanner />
        </div>

        <HowItWorks />

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>

        <FAQ />
        <AboutSection />
      </main>

      <Footer />

      {/* Schema Markup */}
      <OrganizationSchema />
      <WebsiteSchema />
      <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "YT2MP3 Converter",
          url: "https://yt2mate.pro/",
          description:
            "Convert YouTube videos and Shorts to MP3 format with our free online converter. High-quality audio, fast downloads, and no registration required!",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "All",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          provider: {
            "@type": "Organization",
            name: "YT2MP3",
            url: "https://yt2mate.pro/",
          },
        })}
      </Script>
    </div>
  )
}
