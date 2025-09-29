import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import AdTestClient from "./ad-test-client"

export const metadata: Metadata = {
  title: "Ad Testing Dashboard - YT2MP3",
  description: "Test and debug ad implementations",
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
        <h1 className="text-3xl font-bold mb-8 text-center">Ad Testing Dashboard</h1>

        <div className="mb-8 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">⚠️ Testing Environment</h2>
          <p className="mb-2">This page is for testing ad implementations. Use it to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Test different ad formats and sizes</li>
            <li>Debug ad loading issues</li>
            <li>Verify ad blocker detection</li>
            <li>Monitor ad performance metrics</li>
          </ul>
        </div>

        <AdTestClient />
      </main>

      <Footer />
    </div>
  )
}
