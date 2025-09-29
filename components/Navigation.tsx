import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto" aria-label="Main navigation">
      <div className="flex items-center">
        <Link href="/" className="flex items-center" aria-label="YT2MP3 Home">
          {/* Simple text as a fallback */}
          <span className="text-white text-2xl font-bold">YT2MP3</span>
        </Link>
      </div>
      <ul className="flex gap-6">
        <li>
          <Link href="/" className="text-white hover:text-blue-100 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/youtube-to-mp3" className="text-white hover:text-blue-100 transition-colors">
            YouTube to MP3
          </Link>
        </li>
        <li>
          <Link href="/youtube-shorts-to-mp3" className="text-white hover:text-blue-100 transition-colors">
            Shorts to MP3
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-white hover:text-blue-100 transition-colors">
            FAQ
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white hover:text-blue-100 transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
