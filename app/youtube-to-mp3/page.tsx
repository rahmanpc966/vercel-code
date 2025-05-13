import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import YouTubeConverter from "@/components/YouTubeConverter"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import FAQ from "@/components/FAQ"
import Breadcrumb from "@/components/Breadcrumb"
import OrganizationSchema from "@/components/OrganizationSchema"
import WebsiteSchema from "@/components/WebsiteSchema"
import Script from "next/script"
import AdUnit from "@/components/AdUnit"

export const metadata: Metadata = {
  title: "YouTube to MP3 Converter | Extract Audio from YouTube Videos",
  description:
    "Convert YouTube videos to MP3 format with our free online converter. High-quality audio extraction, no registration required.",
  alternates: {
    canonical: "/youtube-to-mp3",
  },
}

export default function YouTubeToMP3Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <div className="container mx-auto px-4 py-2">
        <Breadcrumb items={[{ label: "YouTube to MP3", href: "/youtube-to-mp3" }]} />
      </div>

      <main className="flex-1">
        <section className="px-4 py-16 bg-[#0066FF] text-white text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              YouTube to MP3 Converter | Extract Audio from Videos
            </h1>
            <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
              Convert your favorite YouTube videos to high-quality MP3 files quickly and easily. No registration
              required!
            </p>
            <YouTubeConverter />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>

        <Features />
        <HowItWorks />

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>

        <FAQ />
      </main>

      <Footer />

      {/* Schema Markup */}
      <OrganizationSchema />
      <WebsiteSchema />
      <Script id="youtube-to-mp3-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "YouTube to MP3 Converter",
          description:
            "Convert YouTube videos to MP3 format with our free online converter. High-quality audio extraction, no registration required.",
          url: "https://yt2mate.pro/youtube-to-mp3",
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "YouTube to MP3 Converter",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        })}
      </Script>
    </div>
  )
}
