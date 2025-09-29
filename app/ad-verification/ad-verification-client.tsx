"use client"

import dynamic from "next/dynamic"

const AdVerification = dynamic(() => import("@/components/AdVerification"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
})

export default function AdVerificationClient() {
  return <AdVerification />
}
