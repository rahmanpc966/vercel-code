"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VisibleAdUnitProps {
  slot: string
  size?: "banner" | "rectangle" | "leaderboard" | "mobile"
  className?: string
  testMode?: boolean
}

type AdStatus = "loading" | "loaded" | "failed" | "blocked"

const VisibleAdUnit: React.FC<VisibleAdUnitProps> = ({ slot, size = "banner", className = "", testMode = false }) => {
  const [adStatus, setAdStatus] = useState<AdStatus>("loading")
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)

  const sizeConfig = {
    banner: { width: 728, height: 90, class: "w-full max-w-[728px] h-[90px]" },
    rectangle: { width: 300, height: 250, class: "w-[300px] h-[250px]" },
    leaderboard: { width: 970, height: 90, class: "w-full max-w-[970px] h-[90px]" },
    mobile: { width: 320, height: 50, class: "w-full max-w-[320px] h-[50px]" },
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
          setIsAdBlockerDetected(true)
          setAdStatus("blocked")
        }
        document.body.removeChild(testAd)
      }, 100)
    }

    detectAdBlocker()

    // Simulate ad loading in test mode
    if (testMode) {
      const timer = setTimeout(() => {
        const random = Math.random()
        if (random > 0.7) {
          setAdStatus("failed")
        } else if (random > 0.3) {
          setAdStatus("loaded")
        } else {
          setAdStatus("blocked")
          setIsAdBlockerDetected(true)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }

    // Real ad loading logic would go here
    // For now, simulate loading
    const timer = setTimeout(() => {
      if (!isAdBlockerDetected) {
        setAdStatus("loaded")
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [testMode, isAdBlockerDetected])

  const getStatusBadge = () => {
    const badges = {
      loading: (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Loading
        </Badge>
      ),
      loaded: (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Ad Loaded
        </Badge>
      ),
      failed: <Badge variant="destructive">Ad Failed</Badge>,
      blocked: (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Ad Blocked
        </Badge>
      ),
    }
    return badges[adStatus]
  }

  const getFallbackContent = () => {
    if (adStatus === "loading") {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-gray-600">Loading advertisement...</span>
        </div>
      )
    }

    if (adStatus === "blocked") {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🚫</div>
          <h3 className="font-semibold text-gray-700 mb-2">Ad Blocked</h3>
          <p className="text-sm text-gray-500">
            Please consider disabling your ad blocker to support our free service.
          </p>
        </div>
      )
    }

    if (adStatus === "failed") {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📢</div>
          <h3 className="font-semibold text-gray-700 mb-2">Advertisement</h3>
          <p className="text-sm text-gray-500">
            This space is reserved for advertisements to support our free service.
          </p>
        </div>
      )
    }

    // Ad loaded successfully
    return (
      <div className="text-center p-4">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="font-semibold text-gray-700 mb-2">Ad Space</h3>
        <p className="text-sm text-gray-500">Advertisement would appear here</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-2 right-2 z-10">{getStatusBadge()}</div>

      <Card className={`${currentSize.class} border-2 border-dashed border-gray-300 bg-gray-50`}>
        <CardContent className="p-0 h-full flex items-center justify-center">
          <div ref={adRef} className="w-full h-full flex items-center justify-center" data-ad-slot={slot}>
            {getFallbackContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VisibleAdUnit
