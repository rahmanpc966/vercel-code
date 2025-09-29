"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FixedVisibleAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  adKey?: string
  width?: number
  height?: number
}

export default function FixedVisibleAdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  testMode = false,
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
}: FixedVisibleAdUnitProps) {
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

    const loadAd = async () => {
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

          // Load actual ad script
          loadAdScript()
        }, 100)
      } catch (error) {
        setAdStatus("failed")
        setAdError("Ad loading error")
      }
    }

    const loadAdScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[data-ad-key="${adKey}"]`)
      if (existingScript) {
        setAdStatus("loaded")
        return
      }

      // Set global options for HighPerformanceFormat
      if (typeof window !== "undefined") {
        ;(window as any).atOptions = {
          key: adKey,
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }
      }

      // Create and load ad script
      const script = document.createElement("script")
      script.setAttribute("data-ad-key", adKey)
      script.type = "text/javascript"
      script.async = true
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

      script.onload = () => {
        setAdStatus("loaded")
        scriptLoadedRef.current = true
      }

      script.onerror = (error) => {
        setAdStatus("failed")
        setAdError("Failed to load ad script")
        console.error("Ad script error:", error)
      }

      // Timeout after 10 seconds
      const timeout = setTimeout(() => {
        if (adStatus === "loading") {
          setAdStatus("failed")
          setAdError("Ad script loading timeout")
        }
      }, 10000)

      script.onload = () => {
        clearTimeout(timeout)
        setAdStatus("loaded")
        scriptLoadedRef.current = true
      }

      document.head.appendChild(script)
    }

    loadAd()
  }, [isVisible, adKey, width, height, adStatus])

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
            <div>Ad Key: {adKey.slice(0, 8)}...</div>
            {adError && <div className="text-red-600 mt-1">Error: {adError}</div>}
          </div>

          {adStatus === "loading" && (
            <div className="animate-pulse">
              <div className="bg-gray-300 h-4 w-24 rounded mx-auto"></div>
            </div>
          )}

          {adStatus === "loaded" && (
            <div className="bg-green-50 p-4 rounded border">
              <div className="text-green-700 font-medium">✓ Ad Loaded Successfully</div>
              <div className="text-xs text-green-600 mt-1">Real ad content should be displayed here</div>
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
        </div>
      </Card>
    </div>
  )
}
