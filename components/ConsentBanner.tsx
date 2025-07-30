"use client"

import { useState, useEffect } from "react"
import { useAdManager } from "./AdManager"
import { Button } from "@/components/ui/button"

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const { consentGiven, setConsent } = useAdManager()

  useEffect(() => {
    // Show banner if no consent decision has been made
    const hasDecided = localStorage.getItem("ad-consent") !== null
    setShowBanner(!hasDecided)
  }, [])

  const handleAccept = () => {
    setConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    setConsent(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies and show ads to keep our service free. By continuing, you agree to our use of cookies and
            personalized ads.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
