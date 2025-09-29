import Script from "next/script"

export default function TechnicalSpecs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Specifications & Performance</h2>
          <p className="text-xl text-gray-600">
            Advanced technology powering the world's most reliable YouTube to MP3 converter
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Audio Quality Specs */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Audio Quality Standards</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Maximum Bitrate</span>
                  <span className="text-green-600 font-bold">320 kbps</span>
                </div>
                <p className="text-sm text-gray-600">
                  Industry-leading audio quality with lossless conversion technology
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Sample Rate</span>
                  <span className="text-green-600 font-bold">44.1 kHz</span>
                </div>
                <p className="text-sm text-gray-600">CD-quality sampling rate for professional audio output</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Audio Channels</span>
                  <span className="text-green-600 font-bold">Stereo</span>
                </div>
                <p className="text-sm text-gray-600">Full stereo separation with spatial audio preservation</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Dynamic Range</span>
                  <span className="text-green-600 font-bold">96 dB</span>
                </div>
                <p className="text-sm text-gray-600">
                  Professional-grade dynamic range for optimal listening experience
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Average Conversion Speed</span>
                  <span className="text-blue-600 font-bold">15 seconds</span>
                </div>
                <p className="text-sm text-gray-600">Lightning-fast processing with optimized server infrastructure</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Success Rate</span>
                  <span className="text-blue-600 font-bold">99.8%</span>
                </div>
                <p className="text-sm text-gray-600">Industry-leading reliability with advanced error handling</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Maximum Video Length</span>
                  <span className="text-blue-600 font-bold">3 hours</span>
                </div>
                <p className="text-sm text-gray-600">Support for long-form content including podcasts and lectures</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Concurrent Users</span>
                  <span className="text-blue-600 font-bold">10,000+</span>
                </div>
                <p className="text-sm text-gray-600">
                  Scalable architecture handling thousands of simultaneous conversions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Supported Input & Output Formats</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-green-800">Input Sources</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  YouTube Videos (all resolutions)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  YouTube Shorts (vertical videos)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  YouTube Music Videos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  YouTube Playlists (individual videos)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Live Stream Recordings
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-purple-800">Output Formats</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  MP3 (128, 192, 320 kbps)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  M4A (AAC encoding)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  WAV (uncompressed)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  OGG (open source)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  FLAC (lossless compression)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Browser Compatibility */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Universal Compatibility</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🌐</div>
              <h4 className="font-semibold">Chrome</h4>
              <p className="text-sm text-gray-600">v90+</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🦊</div>
              <h4 className="font-semibold">Firefox</h4>
              <p className="text-sm text-gray-600">v88+</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🧭</div>
              <h4 className="font-semibold">Safari</h4>
              <p className="text-sm text-gray-600">v14+</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold">Mobile</h4>
              <p className="text-sm text-gray-600">All devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Schema */}
      <Script id="technical-specs-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "YouTube to MP3 Converter Technical Specifications",
          description:
            "Comprehensive technical specifications and performance metrics for professional YouTube to MP3 conversion",
          author: {
            "@type": "Organization",
            name: "YT2MP3 Technical Team",
          },
          publisher: {
            "@type": "Organization",
            name: "YT2MP3",
            logo: {
              "@type": "ImageObject",
              url: "https://yt2mate.pro/logo.svg",
            },
          },
          datePublished: "2024-01-01",
          dateModified: new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://yt2mate.pro/#technical-specs",
          },
        })}
      </Script>
    </section>
  )
}
