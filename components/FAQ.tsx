import Script from "next/script"

export default function FAQ() {
  return (
    <section id="faq" className="py-16 px-4 bg-gray-100" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="faq-heading" className="text-3xl font-bold text-center mb-8">
          YouTube to MP3 Converter FAQ
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I use YT2MP3 to convert YouTube to MP3?</h3>
            <p>
              Simply paste the YouTube video URL into our converter, click the convert button, and download your MP3
              file. Our{" "}
              <a href="/youtube-to-mp3" className="text-blue-600 hover:underline">
                YouTube to MP3 converter
              </a>{" "}
              works with all types of YouTube videos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is this YouTube to MP3 converter free to use?</h3>
            <p>
              Yes, our YouTube to MP3 service is completely free. You can convert and download as many MP3s from YouTube
              as you want without any cost.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What's the maximum length of YouTube video I can convert to MP3?
            </h3>
            <p>
              You can convert YouTube videos up to 2 hours in length to MP3 format. For longer videos, you may need to
              split them into smaller parts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is it legal to convert YouTube videos to MP3?</h3>
            <p>
              Converting YouTube videos to MP3 should only be done for content you have permission to use or falls under
              fair use. Always respect copyright laws and content creators' rights when using our YouTube to MP3
              converter. See our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              for more information.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">What quality are the converted MP3 files from YouTube?</h3>
            <p>
              We offer high-quality MP3 conversions from YouTube with bitrates up to 320kbps, ensuring excellent audio
              quality for your converted files.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>
          Still have questions? Visit our{" "}
          <a href="/faq" className="text-blue-600 hover:underline">
            complete FAQ page
          </a>{" "}
          or{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact our support team
          </a>{" "}
          for assistance.
        </p>
      </div>

      {/* Add FAQ Schema Markup */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I use YT2MP3 to convert YouTube to MP3?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Simply paste the YouTube video URL into our converter, click the convert button, and download your MP3 file. Our YouTube to MP3 converter works with all types of YouTube videos.",
              },
            },
            {
              "@type": "Question",
              name: "Is this YouTube to MP3 converter free to use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, our YouTube to MP3 service is completely free. You can convert and download as many MP3s from YouTube as you want without any cost.",
              },
            },
            {
              "@type": "Question",
              name: "What's the maximum length of YouTube video I can convert to MP3?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can convert YouTube videos up to 2 hours in length to MP3 format. For longer videos, you may need to split them into smaller parts.",
              },
            },
            {
              "@type": "Question",
              name: "Is it legal to convert YouTube videos to MP3?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Converting YouTube videos to MP3 should only be done for content you have permission to use or falls under fair use. Always respect copyright laws and content creators' rights when using our YouTube to MP3 converter.",
              },
            },
            {
              "@type": "Question",
              name: "What quality are the converted MP3 files from YouTube?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We offer high-quality MP3 conversions from YouTube with bitrates up to 320kbps, ensuring excellent audio quality for your converted files.",
              },
            },
          ],
        })}
      </Script>
    </section>
  )
}
