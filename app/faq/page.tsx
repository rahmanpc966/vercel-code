import type { Metadata } from "next"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import Script from "next/script"

export const metadata: Metadata = {
  title: "FAQ - YT2MP3 YouTube to MP3 Converter",
  description:
    "Frequently asked questions about our YouTube to MP3 converter. Learn how to use our service and troubleshoot common issues.",
}

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* This h1 will be placed directly in the body by Next.js */}
        <h1 className="text-3xl font-bold mb-6">YouTube to MP3 Converter FAQ | Common Questions & Answers</h1>

        {/* Rest of the content remains the same */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I convert a YouTube video to MP3?</h3>
            <p>
              Simply paste the YouTube video URL into the converter box on our homepage and click the "Convert to MP3"
              button. Once the conversion is complete, you'll be able to download the MP3 file.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is this service free?</h3>
            <p>Yes, our YouTube to MP3 converter is completely free to use.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">What's the maximum length of video I can convert?</h3>
            <p>
              Our service can convert videos up to 2 hours in length. For longer videos, you may need to split them into
              smaller parts before conversion.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">What's the quality of the converted MP3?</h3>
            <p>
              We provide high-quality MP3 conversions. The exact bitrate may vary, but it's typically up to 320kbps,
              which offers excellent audio quality.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is it legal to convert YouTube videos to MP3?</h3>
            <p>
              The legality of converting YouTube videos to MP3 can vary depending on your location and the specific
              content. It's generally considered acceptable for personal use, but you should be aware of copyright laws
              in your region. Always respect the rights of content creators.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How fast is the conversion process?</h3>
            <p>
              Our advanced algorithms ensure quick conversion times. The exact duration may vary depending on the length
              of the video and current server load, but most conversions are completed within a few minutes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I use this service on my mobile device?</h3>
            <p>
              Yes, our YouTube to MP3 converter is fully compatible with mobile devices. You can use it on your
              smartphone or tablet with any modern web browser.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Do I need to create an account to use this service?</h3>
            <p>
              No, you don't need to create an account or register to use our YouTube to MP3 converter. It's designed for
              quick and easy use without any sign-up process.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">About YT2MP3</h2>
          <p className="mb-4">
            YT2MP3 is your go-to solution for converting YouTube videos to MP3 format. Our platform offers a seamless,
            user-friendly experience for extracting high-quality audio from your favorite YouTube content.
          </p>
          <p className="mb-4">
            Whether you're creating a personal music playlist, saving a podcast for offline listening, or need audio for
            educational purposes, YT2MP3 provides fast, reliable conversion services completely free of charge.
          </p>
          <p className="mb-4">
            Our advanced technology ensures the highest quality audio output while maintaining the original sound
            clarity. With YT2MP3, you can convert YouTube videos to MP3 in just a few clicks, making it the perfect tool
            for music enthusiasts, podcast listeners, and content creators.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Key Features of YT2MP3:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Lightning-fast conversion speed</li>
            <li>High-quality audio output (up to 320kbps)</li>
            <li>No registration required</li>
            <li>Compatible with all devices</li>
            <li>Secure and private conversion process</li>
            <li>24/7 availability</li>
          </ul>
          <p className="mt-4">
            Join millions of satisfied users who trust YT2MP3 for their YouTube to MP3 conversion needs. Experience the
            best online converter tool that combines simplicity with powerful features.
          </p>
        </div>
        {/* Rest of the component remains unchanged */}
      </main>

      <Footer />
      <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I convert a YouTube video to MP3?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply paste the YouTube video URL into the converter box on our homepage and click the 'Convert to MP3' button. Once the conversion is complete, you'll be able to download the MP3 file."
                }
              },
              {
                "@type": "Question",
                "name": "Is this service free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our YouTube to MP3 converter is completely free to use."
                }
              },
              {
                "@type": "Question",
                "name": "What's the maximum length of video I can convert?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our service can convert videos up to 2 hours in length. For longer videos, you may need to split them into smaller parts before conversion."
                }
              },
              {
                "@type": "Question",
                "name": "What's the quality of the converted MP3?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide high-quality MP3 conversions. The exact bitrate may vary, but it's typically up to 320kbps, which offers excellent audio quality."
                }
              },
              {
                "@type": "Question",
                "name": "Is it legal to convert YouTube videos to MP3?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The legality can vary depending on your location and the specific content. It's generally considered acceptable for personal use, but always respect copyright laws and content creators' rights."
                }
              }
            ]
          }
        `}
      </Script>
    </div>
  )
}
