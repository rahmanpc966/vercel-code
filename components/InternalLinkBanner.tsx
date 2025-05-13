import Link from "next/link"

export default function InternalLinkBanner() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg my-6">
      <h3 className="text-lg font-semibold mb-2">Popular Conversion Tools</h3>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/youtube-to-mp3"
          className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          YouTube to MP3
        </Link>
        <Link
          href="/youtube-shorts-to-mp3"
          className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Shorts to MP3
        </Link>
        <Link
          href="/youtube-to-mp3#features"
          className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Features
        </Link>
        <Link
          href="/youtube-to-mp3#how-it-works"
          className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="/faq"
          className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          FAQ
        </Link>
      </div>
    </div>
  )
}
