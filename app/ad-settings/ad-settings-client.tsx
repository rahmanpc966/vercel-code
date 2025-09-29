"use client"

import dynamic from "next/dynamic"

const AdSettingsDashboard = dynamic(() => import("@/components/AdSettingsDashboard"), { ssr: false })

export default function AdSettingsClient() {
  return <AdSettingsDashboard />
}
