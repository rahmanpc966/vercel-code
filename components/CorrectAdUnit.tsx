"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CorrectAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  width?: number
  height?: number
}

export default function CorrectAdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  testMode = false,
  width = 300,
  height = 250,
}: CorrectAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [adError, setAdError] = useState<string>("")
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const scriptLoadedRef = useRef(false)

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
    if (!isVisible || scriptLoadedRef.current) return

    const loadAds = async () => {
      try {
        // Check for ad blocker first
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        setTimeout(() => {
          if (testAd.offsetHeight === 0) {
            setAdStatus("blocked")
            setAdError("Ad blocker detected")
            document.body.removeChild(testAd)
            return
          }
          document.body.removeChild(testAd)

          // Load both ad networks as per your provided code
          loadHighPerformanceFormatAd()
          loadRevenueCPMGateAd()
        }, 100)
      } catch (error) {
        setAdStatus("failed")
        setAdError("Ad loading error")
      }
    }

    const loadHighPerformanceFormatAd = () => {
      // Set atOptions exactly as in your provided code
      if (typeof window !== "undefined") {
        ;(window as any).atOptions = {
          key: "37943d3fd9cce351f51aed181182d90d",
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }
      }

      // Check if script already exists globally
      const existingScript = document.querySelector('script[src*="highperformanceformat.com"]')
      if (existingScript) {
        console.log("✅ HighPerformanceFormat script already loaded, reusing")
        setAdStatus("loaded")
        scriptLoadedRef.current = true
        return
      }

      // Create and load HighPerformanceFormat script
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
      script.setAttribute("data-ad-key", "37943d3fd9cce351f51aed181182d90d")
      script.setAttribute("data-global-script", "true")

      script.onload = () => {
        console.log("✅ HighPerformanceFormat ad loaded")
        setAdStatus("loaded")
        scriptLoadedRef.current = true
      }

      script.onerror = (error) => {
        console.error("❌ HighPerformanceFormat ad failed:", error)
        setAdStatus("failed")
        setAdError("HighPerformanceFormat ad failed to load")
      }

      document.head.appendChild(script)
    }

    const loadRevenueCPMGateAd = () => {
      // Check if RevenueCPMGate script already exists
      const existingScript = document.querySelector('script[src*="revenuecpmgate.com"]')
      if (existingScript) {
        console.log("✅ RevenueCPMGate script already loaded, reusing")
        // Still create container for this specific ad instance
        createRevenueCPMGateContainer()
        return
      }

      // Create RevenueCPMGate script exactly as in your provided code
      const script = document.createElement("script")
      script.async = true
      script.setAttribute("data-cfasync", "false")
      script.src = "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"
      script.setAttribute("data-global-script", "true")

      script.onload = () => {
        console.log("✅ RevenueCPMGate ad loaded")
        createRevenueCPMGateContainer()
      }

      script.onerror = (error) => {
        console.error("❌ RevenueCPMGate ad failed:", error)
      }

      document.head.appendChild(script)
    }

    const createRevenueCPMGateContainer = () => {
      // Create unique container ID for each ad instance
      const uniqueId = `container-e4386a13de3b837cb97ad9287321b380-${adSlot}`
      
      // Check if container already exists
      if (document.getElementById(uniqueId)) return

      // Create the container div as in your provided code
      const container = document.createElement("div")
      container.id = uniqueId
      container.style.width = `${width}px`
      container.style.height = `${height}px`
      container.style.margin = "0 auto"

      if (adRef.current) {
        adRef.current.appendChild(container)
      }
    }

    loadAds()
  }, [isVisible, width, height])

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
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
