import { Search, Download, Music } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50" id="how-it-works">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How to Convert YouTube to MP3</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Search className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find Your YouTube Video</h3>
            <p className="text-gray-600">Copy the YouTube video or Shorts URL you want to convert to MP3</p>
          </div>
          <div className="flex flex-col items-center">
            <Download className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Convert YouTube to MP3</h3>
            <p className="text-gray-600">Paste the URL and click the convert button to extract MP3 audio</p>
          </div>
          <div className="flex flex-col items-center">
            <Music className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enjoy Your MP3 Audio</h3>
            <p className="text-gray-600">Download and listen to your MP3 file from YouTube anywhere, anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
