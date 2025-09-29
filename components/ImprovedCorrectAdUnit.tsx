"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdManager from "@/lib/ad-manager"

interface ImprovedCorrectAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  width?: number
  height?: number
}

export default function ImprovedCorrectAdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  testMode = false,
  width = 300,
  height = 250,
}: ImprovedCorrectAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [adError, setAdError] = useState<string>("")
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const adManager = AdManager.getInstance()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const loadAds = async () => {
      try {
        // Check for ad blocker first
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        setTimeout(async () => {
          if (testAd.offsetHeight === 0) {
            setAdStatus("blocked")
            setAdError("Ad blocker detected")
            document.body.removeChild(testAd)
            return
          }
          document.body.removeChild(testAd)

          // Load ads using the ad manager
          await loadAdsWithManager()
        }, 100)
      } catch (error) {
        setAdStatus("failed")
        setAdError("Ad loading error")
      }
    }

    const loadAdsWithManager = async () => {
      try {
        // Set atOptions for this specific ad
        adManager.setAtOptions(width, height)

        // Load HighPerformanceFormat script (global, only once)
        const hpfSuccess = await adManager.loadHighPerformanceFormatScript()
        
        // Load RevenueCPMGate script (global, only once)
        const rcgSuccess = await adManager.loadRevenueCPMGateScript()

        // Create RevenueCPMGate container for this ad instance
        if (rcgSuccess && adRef.current) {
          adManager.createRevenueCPMGateContainer(adSlot, width, height, adRef.current)
        }

        // Determine overall status
        if (hpfSuccess && rcgSuccess) {
          setAdStatus("loaded")
          console.log(`✅ Ad ${adSlot} loaded successfully with both networks`)
        } else if (hpfSuccess || rcgSuccess) {
          setAdStatus("loaded")
          console.log(`✅ Ad ${adSlot} loaded with partial success`)
        } else {
          setAdStatus("failed")
          setAdError("Both ad networks failed to load")
        }
      } catch (error) {
        setAdStatus("failed")
        setAdError(`Ad loading error: ${error}`)
      }
    }

    loadAds()
  }, [isVisible, width, height, adSlot])

  const getAdDimensions = () => {
    switch (adFormat) {
      case "rectangle":
        return "w-80 h-60"
      case "vertical":
        return "w-40 h-80"
      case "horizontal":
        return "w-full h-24"
      default:
        return "w-80 h-60"
    }
  }

  const getStatusColor = () => {
    switch (adStatus) {
      case "loading":
        return "bg-blue-100 text-blue-800"
      case "loaded":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "blocked":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div ref={adRef} className={`${className} ${getAdDimensions()}`}>
      <Card className="w-full h-full flex flex-col items-center justify-center p-4 border-2 border-dashed">
        <div className="text-center space-y-2">
          <Badge className={getStatusColor()}>Ad Status: {adStatus.charAt(0).toUpperCase() + adStatus.slice(1)}</Badge>

          <div className="text-sm text-gray-600">
            <div>Slot: {adSlot}</div>
            <div>Format: {adFormat}</div>
            <div>Size: {width}x{height}</div>
            {adError && <div className="text-red-600 mt-1">Error: {adError}</div>}
          </div>

          {adStatus === "loading" && (
            <div className="animate-pulse">
              <div className="bg-gray-300 h-4 w-24 rounded mx-auto"></div>
            </div>
          )}

          {adStatus === "loaded" && (
            <div className="bg-green-50 p-4 rounded border">
              <div className="text-green-700 font-medium">✓ Ads Loaded Successfully</div>
              <div className="text-xs text-green-600 mt-1">
                HighPerformanceFormat + RevenueCPMGate
              </div>
            </div>
          )}

          {adStatus === "failed" && (
            <div className="bg-red-50 p-4 rounded border">
              <div className="text-red-700 font-medium">✗ Ad Failed</div>
              <div className="text-xs text-red-600 mt-1">No ad content available</div>
            </div>
          )}

          {adStatus === "blocked" && (
            <div className="bg-orange-50 p-4 rounded border">
              <div className="text-orange-700 font-medium">🚫 Ad Blocked</div>
              <div className="text-xs text-orange-600 mt-1">Ad blocker is preventing ads from loading</div>
            </div>
          )}

          {testMode && (
            <div className="mt-2 text-xs text-gray-500">
              <div>🔧 Test Mode Active</div>
              <div>• HighPerformanceFormat: {width}x{height}</div>
              <div>• RevenueCPMGate: Container-based</div>
              <div>• Slot: {adSlot}</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
