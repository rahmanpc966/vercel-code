import Link from "next/link"
import Script from "next/script"

interface AdvancedSEOContentProps {
  currentPage?: string
}

export default function AdvancedSEOContent({ currentPage = "home" }: AdvancedSEOContentProps) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <article>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Complete Guide to YouTube to MP3 Conversion in 2024
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  Converting YouTube videos to MP3 has become an essential skill for music lovers, podcast enthusiasts,
                  and content creators worldwide. Our comprehensive{" "}
                  <Link href="/youtube-to-mp3" className="text-blue-600 hover:underline font-semibold">
                    YouTube to MP3 converter
                  </Link>{" "}
                  provides the most reliable, fast, and high-quality audio extraction service available online.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Why Choose Professional YouTube to MP3 Conversion?</h3>
                <p className="mb-4">
                  Professional YouTube to MP3 conversion ensures optimal audio quality, faster processing times, and
                  compatibility across all devices. Unlike basic converters, our advanced algorithm preserves the
                  original audio fidelity while optimizing file size for efficient storage and streaming.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg my-6">
                  <h4 className="text-xl font-semibold mb-3 text-blue-800">🎵 Pro Tip for Best Results</h4>
                  <p className="text-blue-700">
                    For optimal audio quality, always convert from the highest resolution YouTube video available. Our
                    converter automatically detects and extracts the best available audio stream, ensuring crystal-clear
                    MP3 output up to 320kbps.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Advanced YouTube to MP3 Conversion Features</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>
                    <strong>Batch Processing:</strong> Convert multiple YouTube videos simultaneously
                  </li>
                  <li>
                    <strong>Quality Selection:</strong> Choose from 128kbps, 192kbps, or 320kbps output
                  </li>
                  <li>
                    <strong>Metadata Preservation:</strong> Automatic title, artist, and album information
                  </li>
                  <li>
                    <strong>Format Flexibility:</strong> Support for MP3, M4A, and WAV formats
                  </li>
                  <li>
                    <strong>Mobile Optimization:</strong> Seamless conversion on smartphones and tablets
                  </li>
                  <li>
                    <strong>Privacy Protection:</strong> No data logging or personal information storage
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">YouTube Shorts to MP3: The Complete Solution</h3>
                <p className="mb-4">
                  With the explosive growth of YouTube Shorts, our{" "}
                  <Link href="/youtube-shorts-to-mp3" className="text-blue-600 hover:underline font-semibold">
                    YouTube Shorts to MP3 converter
                  </Link>{" "}
                  has become indispensable for extracting audio from vertical videos. Whether it's trending music, viral
                  sounds, or educational content, convert any YouTube Short to MP3 in seconds.
                </p>

                <div className="bg-green-50 p-6 rounded-lg my-6">
                  <h4 className="text-xl font-semibold mb-3 text-green-800">✅ Quality Guarantee</h4>
                  <p className="text-green-700">
                    Every conversion is processed through our premium audio enhancement engine, ensuring noise
                    reduction, volume normalization, and optimal frequency response for the best listening experience
                    across all devices.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Legal and Ethical YouTube to MP3 Conversion</h3>
                <p className="mb-4">
                  Understanding the legal aspects of YouTube to MP3 conversion is crucial. Our service promotes
                  responsible usage by encouraging users to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Convert only content you have permission to use</li>
                  <li>Respect copyright laws and fair use guidelines</li>
                  <li>Support content creators through official channels</li>
                  <li>Use converted audio for personal, educational, or transformative purposes</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Technical Excellence in Audio Conversion</h3>
                <p className="mb-4">Our YouTube to MP3 converter utilizes cutting-edge audio processing technology:</p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">🔧 Advanced Algorithms</h5>
                    <p className="text-sm text-gray-600">
                      Machine learning-powered audio extraction for superior quality
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">⚡ Lightning Speed</h5>
                    <p className="text-sm text-gray-600">
                      Optimized servers ensure conversion completion in under 30 seconds
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">🛡️ Security First</h5>
                    <p className="text-sm text-gray-600">
                      SSL encryption and automatic file deletion for maximum privacy
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">📱 Universal Access</h5>
                    <p className="text-sm text-gray-600">
                      Compatible with all browsers, devices, and operating systems
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Navigation */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  <Link href="/youtube-to-mp3" className="block text-blue-600 hover:underline">
                    → YouTube to MP3 Converter
                  </Link>
                  <Link href="/youtube-shorts-to-mp3" className="block text-blue-600 hover:underline">
                    → YouTube Shorts Converter
                  </Link>
                  <Link href="/faq" className="block text-blue-600 hover:underline">
                    → Frequently Asked Questions
                  </Link>
                  <Link href="/contact" className="block text-blue-600 hover:underline">
                    → Technical Support
                  </Link>
                </nav>
              </div>

              {/* Popular Searches */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Popular Searches</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>YouTube to MP3 320kbps</span>
                    <span className="text-blue-600">🔥</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convert YouTube Shorts</span>
                    <span className="text-blue-600">📈</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free YouTube Converter</span>
                    <span className="text-blue-600">⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YouTube Audio Extractor</span>
                    <span className="text-blue-600">🎵</span>
                  </div>
                </div>
              </div>

              {/* Conversion Stats */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-800">Conversion Statistics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Daily Conversions</span>
                    <span className="font-semibold">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Quality</span>
                    <span className="font-semibold">256kbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Speed</span>
                    <span className="font-semibold">15 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HowTo Schema */}
      <Script id="howto-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Convert YouTube Videos to MP3",
          description: "Step-by-step guide to convert YouTube videos to high-quality MP3 files",
          image: "https://yt2mate.pro/og-image.jpg",
          totalTime: "PT2M",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: "0",
          },
          supply: [
            {
              "@type": "HowToSupply",
              name: "YouTube Video URL",
            },
            {
              "@type": "HowToSupply",
              name: "Internet Connection",
            },
          ],
          tool: [
            {
              "@type": "HowToTool",
              name: "YT2MP3 Converter",
            },
          ],
          step: [
            {
              "@type": "HowToStep",
              name: "Copy YouTube URL",
              text: "Navigate to YouTube and copy the URL of the video you want to convert",
              image: "https://yt2mate.pro/step1.jpg",
              url: "https://yt2mate.pro/youtube-to-mp3#step1",
            },
            {
              "@type": "HowToStep",
              name: "Paste URL in Converter",
              text: "Paste the YouTube URL into the YT2MP3 converter input field",
              image: "https://yt2mate.pro/step2.jpg",
              url: "https://yt2mate.pro/youtube-to-mp3#step2",
            },
            {
              "@type": "HowToStep",
              name: "Click Convert",
              text: "Click the 'Convert to MP3' button to start the conversion process",
              image: "https://yt2mate.pro/step3.jpg",
              url: "https://yt2mate.pro/youtube-to-mp3#step3",
            },
            {
              "@type": "HowToStep",
              name: "Download MP3",
              text: "Once conversion is complete, click the download button to save your MP3 file",
              image: "https://yt2mate.pro/step4.jpg",
              url: "https://yt2mate.pro/youtube-to-mp3#step4",
            },
          ],
        })}
      </Script>
    </section>
  )
}
