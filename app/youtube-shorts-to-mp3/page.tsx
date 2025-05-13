import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import YouTubeConverter from "@/components/YouTubeConverter"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Breadcrumb from "@/components/Breadcrumb"
import OrganizationSchema from "@/components/OrganizationSchema"
import WebsiteSchema from "@/components/WebsiteSchema"
import Script from "next/script"
import AdUnit from "@/components/AdUnit"

export const metadata: Metadata = {
  title: "YouTube Shorts to MP3 Converter | Extract Audio from Shorts",
  description:
    "Convert YouTube Shorts to MP3 format with our free online converter. Extract audio from short videos quickly and easily.",
  alternates: {
    canonical: "/youtube-shorts-to-mp3",
  },
}

export default function YouTubeShortsToMP3Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <div className="container mx-auto px-4 py-2">
        <Breadcrumb items={[{ label: "YouTube Shorts to MP3", href: "/youtube-shorts-to-mp3" }]} />
      </div>

      <main className="flex-1">
        <section className="px-4 py-16 bg-[#0066FF] text-white text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              YouTube Shorts to MP3 Converter | Extract Audio from Shorts
            </h1>
            <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
              Convert YouTube Shorts to MP3 format quickly and easily. Perfect for saving audio from short videos!
            </p>
            <YouTubeConverter />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">How to Convert YouTube Shorts to MP3</h2>
            <div className="space-y-6">
              <p>
                YouTube Shorts are short, vertical videos designed for mobile viewing. Our converter makes it easy to
                extract the audio from these short videos and save it as an MP3 file. Here's how to use our YouTube
                Shorts to MP3 converter:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Find a YouTube Short</strong> - Browse YouTube for the Short video you want to convert
                </li>
                <li>
                  <strong>Copy the URL</strong> - Click the share button and copy the YouTube Shorts URL
                </li>
                <li>
                  <strong>Paste and Convert</strong> - Paste the URL into our converter above and click "Convert to MP3"
                </li>
                <li>
                  <strong>Download Your MP3</strong> - Once conversion is complete, download your MP3 file
                </li>
              </ol>
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />

        <div className="container mx-auto px-4 py-8">
          <AdUnit />
        </div>
      </main>

      <Footer />

      {/* Schema Markup */}
      <OrganizationSchema />
      <WebsiteSchema />
      <Script id="youtube-shorts-to-mp3-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "YouTube Shorts to MP3 Converter",
          description:
            "Convert YouTube Shorts to MP3 format with our free online converter. Extract audio from short videos quickly and easily.",
          url: "https://yt2mate.pro/youtube-shorts-to-mp3",
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "YouTube Shorts to MP3 Converter",
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
