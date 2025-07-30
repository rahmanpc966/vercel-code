import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import dynamic from "next/dynamic"

const AdVerification = dynamic(() => import("@/components/AdVerification"), { ssr: false })

export const metadata: Metadata = {
  title: "Ad Verification - YT2MP3",
  description: "Verify ad script configuration and implementation",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Ad Script Verification</h1>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">What This Tool Does:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Scans your website for existing ad scripts</li>
            <li>Compares your provided ad configuration with current implementation</li>
            <li>Tests if your ad script loads correctly</li>
            <li>Identifies any configuration mismatches</li>
            <li>Provides recommendations for optimization</li>
          </ul>
        </div>

        <AdVerification />
      </main>

      <Footer />
    </div>
  )
}
