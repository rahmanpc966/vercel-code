"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VisibleAdUnitProps {
  adSlot?: string
  adSize?: "banner" | "rectangle" | "leaderboard" | "mobile"
  className?: string
  showFallback?: boolean
  testMode?: boolean
}

export default function VisibleAdUnit({
  adSlot = "1234567890",
  adSize = "banner",
  className = "",
  showFallback = true,
  testMode = false,
}: VisibleAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false)

  // Ad size configurations
  const adSizes = {
    banner: { width: 728, height: 90, className: "w-full max-w-[728px] h-[90px]" },
    rectangle: { width: 300, height: 250, className: "w-[300px] h-[250px]" },
    leaderboard: { width: 970, height: 90, className: "w-full max-w-[970px] h-[90px]" },
    mobile: { width: 320, height: 50, className: "w-full max-w-[320px] h-[50px]" },
  }

  const currentSize = adSizes[adSize]

  useEffect(() => {
    // Simulate ad loading process
    const loadAd = async () => {
      try {
        // Check for ad blocker
        const adBlockTest = document.createElement("div")
        adBlockTest.innerHTML = "&nbsp;"
        adBlockTest.className = "adsbox"
        document.body.appendChild(adBlockTest)

        setTimeout(() => {
          const isBlocked = adBlockTest.offsetHeight === 0
          document.body.removeChild(adBlockTest)

          if (isBlocked) {
            setIsAdBlockerDetected(true)
            setAdStatus("blocked")
          } else {
            // Simulate ad loading delay
            setTimeout(
              () => {
                if (testMode) {
                  setAdStatus("loaded")
                } else {
                  // In production, this would be determined by actual ad loading
                  setAdStatus(Math.random() > 0.3 ? "loaded" : "failed")
                }
              },
              1000 + Math.random() * 2000,
            )
          }
        }, 100)
      } catch (error) {
        setAdStatus("failed")
      }
    }

    loadAd()
  }, [testMode])

  const getStatusBadge = () => {
    const badges = {
      loading: (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Loading...
        </Badge>
      ),
      loaded: (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Ad Loaded
        </Badge>
      ),
      failed: (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Ad Failed
        </Badge>
      ),
      blocked: (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Ad Blocked
        </Badge>
      ),
    }
    return badges[adStatus]
  }

  const getFallbackContent = () => {
    if (adStatus === "blocked" && isAdBlockerDetected) {
      return (
        <div className="text-center p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="text-orange-600 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-orange-800 mb-1">Ad Blocker Detected</h3>
          <p className="text-sm text-orange-600">
            Please consider disabling your ad blocker to support our free service.
          </p>
        </div>
      )
    }

    if (adStatus === "failed") {
      return (
        <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">Advertisement</h3>
          <p className="text-sm text-gray-500">
            This space is reserved for advertisements to support our free service.
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className={`relative ${className}`}>
      <Card className={`${currentSize.className} mx-auto relative overflow-hidden`}>
        {/* Status Badge */}
        <div className="absolute top-2 right-2 z-10">{getStatusBadge()}</div>

        {/* Ad Content Area */}
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          {adStatus === "loading" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading advertisement...</p>
            </div>
          )}

          {adStatus === "loaded" && !testMode && (
            <div className="w-full h-full">
              {/* This is where the actual ad would be inserted */}
              <div
                id={`ad-${adSlot}`}
                className="w-full h-full"
                data-ad-slot={adSlot}
                data-ad-size={`${currentSize.width}x${currentSize.height}`}
              >
                {/* Placeholder for actual ad content */}
                <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📢</div>
                    <p className="text-sm font-medium text-gray-700">Advertisement Space</p>
                    <p className="text-xs text-gray-500">Ad Slot: {adSlot}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adStatus === "loaded" && testMode && (
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm font-medium text-green-700">Test Ad - Working!</p>
                <p className="text-xs text-green-600">
                  Size: {adSize} ({currentSize.width}x{currentSize.height})
                </p>
              </div>
            </div>
          )}

          {(adStatus === "failed" || adStatus === "blocked") && showFallback && getFallbackContent()}
        </div>
      </Card>
    </div>
  )
}
