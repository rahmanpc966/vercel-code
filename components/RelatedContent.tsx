import Link from "next/link"

interface RelatedContentProps {
  currentPage: string
}

export default function RelatedContent({ currentPage }: RelatedContentProps) {
  return (
    <section className="py-8 px-4 bg-gray-50 rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {currentPage !== "youtube-to-mp3" && (
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/youtube-to-mp3" className="text-blue-600 hover:underline">
                YouTube to MP3 Converter
              </Link>
            </h3>
            <p className="text-gray-600 mb-3">
              Convert any YouTube video to high-quality MP3 format with our fast and free converter.
            </p>
            <Link
              href="/youtube-to-mp3"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Convert Videos Now
            </Link>
          </div>
        )}

        {currentPage !== "youtube-shorts-to-mp3" && (
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/youtube-shorts-to-mp3" className="text-blue-600 hover:underline">
                YouTube Shorts to MP3
              </Link>
            </h3>
            <p className="text-gray-600 mb-3">Extract audio from YouTube Shorts videos quickly and easily.</p>
            <Link
              href="/youtube-shorts-to-mp3"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Convert Shorts Now
            </Link>
          </div>
        )}

        {currentPage !== "faq" && (
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/faq" className="text-blue-600 hover:underline">
                Frequently Asked Questions
              </Link>
            </h3>
            <p className="text-gray-600 mb-3">Find answers to common questions about our YouTube to MP3 converter.</p>
            <Link href="/faq" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View FAQ
            </Link>
          </div>
        )}

        {currentPage !== "contact" && (
          <div className="p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </h3>
            <p className="text-gray-600 mb-3">
              Need help? Contact our support team for assistance with our YouTube to MP3 converter.
            </p>
            <Link href="/contact" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
