"use client"

import Script from "next/script"
import Link from "next/link"

export default function EnhancedFAQ() {
  const faqData = [
    {
      question: "How do I convert YouTube videos to MP3 with the highest quality?",
      answer:
        "To get the highest quality MP3 from YouTube videos, ensure you're converting from HD or 4K videos when available. Our converter automatically extracts the best available audio stream and can output MP3 files up to 320kbps bitrate for premium sound quality.",
      category: "Quality",
    },
    {
      question: "Can I convert YouTube Shorts to MP3 format?",
      answer:
        "Yes! Our YouTube Shorts to MP3 converter specializes in extracting audio from vertical short-form videos. Simply paste the YouTube Shorts URL and convert just like regular videos. The process is identical and maintains the same high-quality output.",
      category: "Shorts",
    },
    {
      question: "Is there a limit to how many YouTube videos I can convert to MP3?",
      answer:
        "No, there are no daily limits on conversions. You can convert as many YouTube videos to MP3 as needed. However, we recommend reasonable usage to ensure optimal performance for all users.",
      category: "Usage",
    },
    {
      question: "What's the maximum length of YouTube video I can convert?",
      answer:
        "Our converter supports YouTube videos up to 3 hours in length. For longer content like livestreams or extended podcasts, consider breaking them into smaller segments for optimal conversion speed and reliability.",
      category: "Technical",
    },
    {
      question: "How long does it take to convert a YouTube video to MP3?",
      answer:
        "Most YouTube to MP3 conversions complete within 15-45 seconds, depending on video length and current server load. Our optimized infrastructure ensures fast processing times even during peak usage periods.",
      category: "Speed",
    },
    {
      question: "Can I convert private or unlisted YouTube videos?",
      answer:
        "No, our converter only works with public YouTube videos and Shorts. Private, unlisted, or age-restricted content cannot be processed due to YouTube's access restrictions and privacy policies.",
      category: "Privacy",
    },
    {
      question: "Do you store the YouTube videos or MP3 files I convert?",
      answer:
        "No, we prioritize your privacy. All conversions are processed in real-time, and neither the original YouTube videos nor the converted MP3 files are stored on our servers. Files are automatically deleted after download.",
      category: "Privacy",
    },
    {
      question: "What audio formats do you support besides MP3?",
      answer:
        "While MP3 is our primary format, we also support M4A and WAV conversions for users requiring different audio formats. MP3 remains the most popular choice due to its universal compatibility and optimal file size.",
      category: "Formats",
    },
    {
      question: "Is it legal to convert YouTube videos to MP3?",
      answer:
        "The legality depends on the content and your intended use. Converting copyrighted music for personal use may fall under fair use in some jurisdictions, but commercial use typically requires permission. Always respect copyright laws and consider supporting artists through official channels.",
      category: "Legal",
    },
    {
      question: "Why is my YouTube to MP3 conversion failing?",
      answer:
        "Common issues include: invalid URLs, region-restricted content, very long videos, or temporary server issues. Try refreshing the page, checking the URL format, or contact our support team if problems persist.",
      category: "Troubleshooting",
    },
  ]

  const categories = [...new Set(faqData.map((faq) => faq.category))]

  return (
    <section id="enhanced-faq" className="py-16 px-4 bg-gray-50" aria-labelledby="enhanced-faq-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="enhanced-faq-heading" className="text-4xl font-bold mb-4">
            Complete YouTube to MP3 Converter FAQ Guide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about converting YouTube videos and Shorts to MP3 format. Get expert answers to
            the most common questions about our conversion service.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => {
                const element = document.getElementById(`category-${category.toLowerCase()}`)
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ by Categories */}
        {categories.map((category) => (
          <div key={category} id={`category-${category.toLowerCase()}`} className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-blue-600 border-b-2 border-blue-100 pb-2">
              {category} Questions
            </h3>
            <div className="grid gap-6">
              {faqData
                .filter((faq) => faq.category === category)
                .map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h4>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Additional Resources */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">Need More Help?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h4 className="font-semibold mb-2">User Guide</h4>
              <p className="text-sm text-gray-600 mb-3">
                Comprehensive tutorials and tips for optimal conversion results
              </p>
              <Link href="/youtube-to-mp3" className="text-blue-600 hover:underline text-sm font-medium">
                View Guide →
              </Link>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2">Live Support</h4>
              <p className="text-sm text-gray-600 mb-3">Get instant help from our technical support team</p>
              <Link href="/contact" className="text-blue-600 hover:underline text-sm font-medium">
                Contact Us →
              </Link>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h4 className="font-semibold mb-2">Try Converter</h4>
              <p className="text-sm text-gray-600 mb-3">Start converting your favorite YouTube content right now</p>
              <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
                Convert Now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Schema */}
      <Script id="enhanced-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })}
      </Script>
    </section>
  )
}
