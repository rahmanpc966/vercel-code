import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import dynamic from "next/dynamic"

const AdTester = dynamic(() => import("@/components/AdTester"), { ssr: false })
const AdUnit = dynamic(() => import("@/components/AdUnit"), { ssr: false })

// Disable static prerender for this route
const disableStaticPrerender = "force-dynamic"

export const metadata: Metadata = {
  title: "Ad Testing Dashboard - YT2MP3",
  description: "Test and monitor ad loading status",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Ad Loading Test Dashboard</h1>

        {/* Ad Tester Component */}
        <AdTester />

        {/* Test Ad Units */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Live Ad Units (Test Mode)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Standard Ad (300x250)</h3>
              <AdUnit testMode={true} />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Large Ad (728x90)</h3>
              <AdUnit testMode={true} width={728} height={90} />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Mobile Ad (320x50)</h3>
              <AdUnit testMode={true} width={320} height={50} />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Testing Instructions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Click "Run Ad Tests" to perform comprehensive ad loading tests</li>
            <li>Check the status indicators to see if ads are loading properly</li>
            <li>The system will automatically detect ad blockers</li>
            <li>Test mode shows detailed loading information and timing</li>
            <li>Green status = ads loading successfully</li>
            <li>Red/Orange status = ads blocked or failed to load</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
