import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="flex items-center">
            <span className="text-blue-600 text-2xl font-bold">YT2MP3</span>
          </div>
          <p className="mt-2 text-gray-600">Convert YouTube videos to MP3 easily and for free.</p>
        </div>
        <nav className="w-full md:w-1/3 mb-6 md:mb-0" aria-label="Footer navigation - Quick links">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/youtube-to-mp3" className="text-gray-600 hover:text-blue-600 transition-colors">
                YouTube to MP3
              </Link>
            </li>
            <li>
              <Link href="/youtube-shorts-to-mp3" className="text-gray-600 hover:text-blue-600 transition-colors">
                YouTube Shorts to MP3
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="w-full md:w-1/3" aria-label="Footer navigation - Features">
          <h2 className="text-lg font-semibold mb-2">Popular Features</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/youtube-to-mp3" className="text-gray-600 hover:text-blue-600 transition-colors">
                YouTube to MP3
              </Link>
            </li>
            <li>
              <Link href="/youtube-shorts-to-mp3" className="text-gray-600 hover:text-blue-600 transition-colors">
                YouTube Shorts Converter
              </Link>
            </li>
            <li>
              <Link href="/youtube-to-mp3#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                High Quality MP3 Audio
              </Link>
            </li>
            <li>
              <Link href="/youtube-to-mp3#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                Fast MP3 Downloads
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} YT2MP3 - YouTube to MP3 Converter. All rights reserved.</p>
      </div>
    </footer>
  )
}
