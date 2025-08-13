import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import dynamic from "next/dynamic"

const AdSettingsDashboard = dynamic(() => import("@/components/AdSettingsDashboard"), { ssr: false })

export const metadata: Metadata = {
  title: "Ad Settings Dashboard - YT2MP3",
  description: "Configure and monitor ad settings",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdSettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <AdSettingsDashboard />
      </main>

      <Footer />
    </div>
  )
}
