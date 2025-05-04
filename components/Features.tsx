import { CheckCircle, Zap, Lock, Volume2 } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our YouTube to MP3 Converter?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg border">
            <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simply paste the YouTube video or Shorts URL and click convert. Download your MP3 file instantly!
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <Zap className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Conversion</h3>
            <p className="text-gray-600">
              Our advanced YouTube to MP3 converter ensures quick conversion times for both videos and Shorts.
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <Lock className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              We don't store your data. Convert YouTube videos to MP3 with complete privacy.
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <Volume2 className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">High Quality Audio</h3>
            <p className="text-gray-600">
              Get crystal clear MP3 audio from YouTube videos with our high-quality conversion technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
