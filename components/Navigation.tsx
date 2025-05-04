import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          {/* Simple text as a fallback */}
          <span className="text-white text-2xl font-bold">YT2MP3</span>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link href="/" className="text-white hover:text-blue-100 transition-colors">
          Home
        </Link>
        <Link href="#faq" className="text-white hover:text-blue-100 transition-colors">
          FAQ
        </Link>
        <Link href="#about" className="text-white hover:text-blue-100 transition-colors">
          About
        </Link>
        <Link href="/contact" className="text-white hover:text-blue-100 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  )
}
