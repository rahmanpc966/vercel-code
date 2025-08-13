import type { Metadata } from "next"
import YouTubeConverter from "@/components/YouTubeConverter"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import FAQ from "@/components/FAQ"
import EnhancedFAQ from "@/components/EnhancedFAQ"
import AboutSection from "@/components/AboutSection"
import AdvancedSEOContent from "@/components/AdvancedSEOContent"
import TechnicalSpecs from "@/components/TechnicalSpecs"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import Script from "next/script"
import VisibleAdUnit from "@/components/VisibleAdUnit"
import InternalLinkBanner from "@/components/InternalLinkBanner"

export const metadata: Metadata = {
  title: "YT2MP3 - #1 YouTube to MP3 Converter | Free HD Audio Extraction 2024",
  description:
    "🎵 Convert YouTube videos & Shorts to MP3 instantly! Free, fast, and high-quality (320kbps). No registration required. 50,000+ daily users trust our YouTube to MP3 converter.",
  keywords: [
    "youtube to mp3",
    "youtube converter",
    "youtube shorts to mp3",
    "mp3 converter",
    "download youtube audio",
    "youtube to audio",
    "free youtube converter",
    "youtube mp3 320kbps",
    "youtube audio extractor",
    "convert youtube videos",
    "youtube downloader mp3",
    "online youtube converter",
    "youtube to mp3 free",
    "youtube music converter",
    "youtube shorts converter",
  ].join(", "),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YT2MP3 - #1 YouTube to MP3 Converter | Free HD Audio Extraction",
    description:
      "🎵 Convert YouTube videos & Shorts to MP3 instantly! Free, fast, and high-quality (320kbps). 50,000+ daily users trust our converter.",
    type: "website",
    url: "https://yt2mate.pro",
    images: [
      {
        url: "https://yt2mate.pro/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YT2MP3 - YouTube to MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YT2MP3 - #1 YouTube to MP3 Converter",
    description: "🎵 Convert YouTube videos & Shorts to MP3 instantly! Free, fast, and high-quality (320kbps).",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
}

// JSON-LD structured data for the homepage
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://yt2mate.pro/#website",
      url: "https://yt2mate.pro/",
      name: "YT2MP3 - YouTube to MP3 Converter",
      description: "Convert YouTube videos and Shorts to MP3 format with our free online converter",
      publisher: {
        "@id": "https://yt2mate.pro/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://yt2mate.pro/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
    {
      "@type": "WebApplication",
      "@id": "https://yt2mate.pro/#webapp",
      url: "https://yt2mate.pro/",
      name: "YT2MP3 Converter",
      description: "Free online YouTube to MP3 converter with high-quality audio extraction",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      softwareVersion: "2.0",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "15420",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Convert YouTube videos to MP3",
        "Convert YouTube Shorts to MP3",
        "High-quality audio up to 320kbps",
        "No registration required",
        "Fast conversion speed",
        "Mobile-friendly interface",
        "Batch conversion support",
        "Privacy-focused processing",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://yt2mate.pro/#organization",
      name: "YT2MP3",
      url: "https://yt2mate.pro/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://yt2mate.pro/#logo",
        url: "https://yt2mate.pro/logo.svg",
        contentUrl: "https://yt2mate.pro/logo.svg",
        width: 120,
        height: 40,
        caption: "YT2MP3 Logo",
      },
      image: {
        "@id": "https://yt2mate.pro/#logo",
      },
      sameAs: ["https://twitter.com/yt2mp3", "https://facebook.com/yt2mp3"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English"],
        url: "https://yt2mate.pro/contact",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://yt2mate.pro/#webpage",
      url: "https://yt2mate.pro/",
      name: "YT2MP3 - #1 YouTube to MP3 Converter | Free HD Audio Extraction",
      isPartOf: {
        "@id": "https://yt2mate.pro/#website",
      },
      about: {
        "@id": "https://yt2mate.pro/#organization",
      },
      description:
        "Convert YouTube videos & Shorts to MP3 instantly! Free, fast, and high-quality (320kbps). No registration required.",
      breadcrumb: {
        "@id": "https://yt2mate.pro/#breadcrumb",
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: ["https://yt2mate.pro/"],
        },
      ],
    },
  ],
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
              🎵 #1 YouTube to MP3 Converter | Free HD Audio Extraction
            </h1>
            <p className="text-xl mb-8 text-white max-w-3xl mx-auto">
              Convert your favorite YouTube videos and Shorts to high-quality MP3 files instantly.
              <strong> 320kbps quality, lightning-fast speed, zero registration required!</strong>
              Join 50,000+ daily users who trust YT2MP3 for premium audio conversion.
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

        {/* First Ad Placement - Banner after hero */}
        <div className="container mx-auto px-4 py-8">
          <VisibleAdUnit size="leaderboard" showFallback={true} className="mb-4" />
        </div>

        <Features />

        <div className="container mx-auto px-4">
          <InternalLinkBanner />
        </div>

        <HowItWorks />

        {/* Second Ad Placement - Rectangle in middle content */}
        <div className="container mx-auto px-4 py-8">
          <VisibleAdUnit size="rectangle" showFallback={true} className="mb-8" />
        </div>

        <TechnicalSpecs />
        <AdvancedSEOContent />

        {/* Third Ad Placement - Banner before FAQ */}
        <div className="container mx-auto px-4 py-6">
          <VisibleAdUnit size="banner" showFallback={true} className="mb-6" />
        </div>

        <FAQ />
        <EnhancedFAQ />
        <AboutSection />
      </main>

      <Footer />

      {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>

      {/* Additional Schema for Software Application */}
      <Script id="software-app-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "YT2MP3 YouTube to MP3 Converter",
          operatingSystem: "Web Browser",
          applicationCategory: "MultimediaApplication",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "15420",
          },
          offers: {
            "@type": "Offer",
            price: "0.00",
            priceCurrency: "USD",
          },
          downloadUrl: "https://yt2mate.pro/",
          featureList: [
            "YouTube to MP3 conversion",
            "YouTube Shorts support",
            "High-quality audio extraction",
            "Batch processing",
            "Mobile optimization",
            "No registration required",
          ],
        })}
      </Script>
    </div>
  )
}
