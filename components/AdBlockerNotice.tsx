"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function AdBlockerNotice() {
  const [adBlockerDetected, setAdBlockerDetected] = useState(false)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Check if user has already dismissed the notice
        const dismissed = localStorage.getItem("ad-blocker-notice-dismissed")
        if (dismissed) return

        // Method 1: DOM-based detection
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox ad-banner advertisement"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        testAd.style.height = "1px"
        document.body.appendChild(testAd)

        const isBlocked = testAd.offsetHeight === 0 || window.getComputedStyle(testAd).display === "none"
        document.body.removeChild(testAd)

        if (isBlocked) {
          setAdBlockerDetected(true)
          setShowNotice(true)
        }
      } catch {
        // If any error occurs, assume ad blocker is present
        setAdBlockerDetected(true)
        setShowNotice(true)
      }
    }

    // Delay detection to avoid false positives
    const timer = setTimeout(detectAdBlocker, 2000)
    return () => clearTimeout(timer)
  }, [])

  const dismissNotice = () => {
    setShowNotice(false)
    localStorage.setItem("ad-blocker-notice-dismissed", "true")
  }

  if (!showNotice || !adBlockerDetected) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">🚫</span>
            <h3 className="font-semibold text-gray-900">Ad Blocker Detected</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            We noticed you're using an ad blocker. Ads help us keep YT2MP3 free for everyone. Please consider disabling
            your ad blocker for our site.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={dismissNotice} variant="outline">
              Got it
            </Button>
            <Button
              size="sm"
              onClick={() => {
                window.open(
                  "https://help.getadblock.com/support/solutions/articles/6000055743-how-to-disable-adblock-on-specific-sites",
                  "_blank",
                )
              }}
            >
              Learn How
            </Button>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={dismissNotice} className="ml-2 h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

