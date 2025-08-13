"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VisibleAdUnitProps {
  showFallback?: boolean
  testMode?: boolean
  className?: string
  size?: "banner" | "rectangle" | "leaderboard" | "mobile"
}

export default function VisibleAdUnit({
  showFallback = true,
  testMode = false,
  className = "",
  size = "banner",
}: VisibleAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [adBlockerDetected, setAdBlockerDetected] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const sizeConfig = {
    banner: { width: "728px", height: "90px", class: "w-full max-w-3xl h-24" },
    rectangle: { width: "300px", height: "250px", class: "w-80 h-64" },
    leaderboard: { width: "970px", height: "90px", class: "w-full max-w-5xl h-24" },
    mobile: { width: "320px", height: "50px", class: "w-full max-w-sm h-14" },
  }

  const currentSize = sizeConfig[size]

  useEffect(() => {
    // Detect ad blocker
    const detectAdBlocker = () => {
      const testAd = document.createElement("div")
      testAd.innerHTML = "&nbsp;"
      testAd.className = "adsbox"
      testAd.style.position = "absolute"
      testAd.style.left = "-10000px"
      document.body.appendChild(testAd)

      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlockerDetected(true)
          setAdStatus("blocked")
        }
        document.body.removeChild(testAd)
      }, 100)
    }

    detectAdBlocker()

    // Simulate ad loading in test mode
    if (testMode) {
      timeoutRef.current = setTimeout(() => {
        setAdStatus(Math.random() > 0.3 ? "loaded" : "failed")
      }, 2000)
    } else {
      // Real ad loading logic would go here
      // For now, we'll simulate based on ad blocker detection
      timeoutRef.current = setTimeout(() => {
        if (!adBlockerDetected) {
          // Try to load real ads here
          setAdStatus("loaded") // This would be set by actual ad loading
        } else {
          setAdStatus("blocked")
        }
      }, 3000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [testMode, adBlockerDetected])

  const getStatusColor = () => {
    switch (adStatus) {
      case "loading":
        return "bg-yellow-500"
      case "loaded":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "blocked":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = () => {
    switch (adStatus) {
      case "loading":
        return "Loading Ad..."
      case "loaded":
        return "Ad Loaded"
      case "failed":
        return "Ad Failed"
      case "blocked":
        return "Ad Blocked"
      default:
        return "Unknown"
    }
  }

  if (adStatus === "loaded" && !testMode) {
    // This is where the actual ad would be rendered
    return (
      <div className={`flex justify-center ${className}`}>
        <div
          ref={adRef}
          className={`${currentSize.class} bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center`}
          style={{ minWidth: currentSize.width, minHeight: currentSize.height }}
        >
          {/* Real ad content would be injected here by ad network */}
          <div className="text-center p-4">
            <div className="text-sm text-gray-600 mb-2">Advertisement</div>
            <div className="w-full h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-semibold">
              Your Ad Here
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!showFallback && adStatus !== "loaded") {
    return null
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Card className={`${currentSize.class} border-dashed border-2`}>
        <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={`${getStatusColor()} text-white border-0`}>
              {getStatusText()}
            </Badge>
          </div>

          {adStatus === "loading" && (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600">Loading advertisement...</p>
            </div>
          )}

          {adStatus === "blocked" && (
            <div className="space-y-2">
              <div className="text-orange-500 text-2xl">🚫</div>
              <p className="text-sm text-gray-600">Ad blocked by browser</p>
              <p className="text-xs text-gray-500">Please consider disabling your ad blocker to support us</p>
            </div>
          )}

          {adStatus === "failed" && (
            <div className="space-y-2">
              <div className="text-red-500 text-2xl">❌</div>
              <p className="text-sm text-gray-600">Advertisement failed to load</p>
              <p className="text-xs text-gray-500">Please refresh the page or try again later</p>
            </div>
          )}

          {testMode && adStatus === "loaded" && (
            <div className="space-y-2">
              <div className="text-green-500 text-2xl">✅</div>
              <p className="text-sm text-gray-600">Test ad loaded successfully</p>
              <div className="w-full h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center text-white text-sm font-medium">
                Sample Advertisement
              </div>
            </div>
          )}

          <div className="mt-2 text-xs text-gray-400">
            Ad Space ({currentSize.width} × {currentSize.height})
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
