import { Search, Download, Music } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50" id="how-it-works" aria-labelledby="how-it-works-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="how-it-works-heading" className="text-3xl font-bold text-center mb-12">
          How to Convert YouTube to MP3
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Search className="w-12 h-12 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Find Your YouTube Video</h3>
            <p className="text-gray-600">
              Copy the{" "}
              <a href="/youtube-to-mp3" className="text-blue-600 hover:underline">
                YouTube video
              </a>{" "}
              or{" "}
              <a href="/youtube-shorts-to-mp3" className="text-blue-600 hover:underline">
                Shorts URL
              </a>{" "}
              you want to convert to MP3
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Download className="w-12 h-12 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Convert YouTube to MP3</h3>
            <p className="text-gray-600">Paste the URL and click the convert button to extract MP3 audio</p>
          </div>
          <div className="flex flex-col items-center">
            <Music className="w-12 h-12 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Enjoy Your MP3 Audio</h3>
            <p className="text-gray-600">Download and listen to your MP3 file from YouTube anywhere, anytime</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help? Check our{" "}
            <a href="/faq" className="text-blue-600 hover:underline">
              FAQ section
            </a>{" "}
            or{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
