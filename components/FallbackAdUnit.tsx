"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FallbackAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  width?: number
  height?: number
}

export default function FallbackAdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  testMode = false,
  width = 300,
  height = 250,
}: FallbackAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked" | "fallback">("loading")
  const [adError, setAdError] = useState<string>("")
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline">("online")
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

    const loadAdsWithFallback = async () => {
      try {
        // Check network status
        setNetworkStatus(navigator.onLine ? "online" : "offline")
        
        if (!navigator.onLine) {
          setAdStatus("failed")
          setAdError("Network offline")
          return
        }

        // Check for ad blocker
        const adBlockerDetected = await detectAdBlocker()
        if (adBlockerDetected) {
          setAdStatus("blocked")
          setAdError("Ad blocker detected")
          return
        }

        // Try to load ads with multiple strategies
        const success = await tryLoadAds()
        
        if (success) {
          setAdStatus("loaded")
        } else {
          // Fallback to showing a support message
          setAdStatus("fallback")
        }
      } catch (error) {
        setAdStatus("failed")
        setAdError(`Ad loading error: ${error}`)
      }
    }

    const detectAdBlocker = async (): Promise<boolean> => {
      try {
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        const isBlocked = testAd.offsetHeight === 0
        document.body.removeChild(testAd)
        
        return isBlocked
      } catch {
        return true
      }
    }

    const tryLoadAds = async (): Promise<boolean> => {
      // Strategy 1: Try HighPerformanceFormat
      try {
        const hpfSuccess = await loadHighPerformanceFormat()
        if (hpfSuccess) return true
      } catch (error) {
        console.log("HighPerformanceFormat failed:", error)
      }

      // Strategy 2: Try RevenueCPMGate
      try {
        const rcgSuccess = await loadRevenueCPMGate()
        if (rcgSuccess) return true
      } catch (error) {
        console.log("RevenueCPMGate failed:", error)
      }

      // Strategy 3: Try Google AdSense (if available)
      try {
        const adsenseSuccess = await loadGoogleAdSense()
        if (adsenseSuccess) return true
      } catch (error) {
        console.log("Google AdSense failed:", error)
      }

      return false
    }

    const loadHighPerformanceFormat = async (): Promise<boolean> => {
      return new Promise((resolve) => {
        // Set atOptions
        if (typeof window !== "undefined") {
          ;(window as any).atOptions = {
            key: "37943d3fd9cce351f51aed181182d90d",
            format: "iframe",
            height: height,
            width: width,
            params: {},
          }
        }

        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
        script.setAttribute("data-ad-key", "37943d3fd9cce351f51aed181182d90d")

        const timeout = setTimeout(() => {
          resolve(false)
          if (script.parentNode) script.parentNode.removeChild(script)
        }, 5000)

        script.onload = () => {
          clearTimeout(timeout)
          console.log("✅ HighPerformanceFormat loaded")
          resolve(true)
        }

        script.onerror = () => {
          clearTimeout(timeout)
          resolve(false)
        }

        document.head.appendChild(script)
      })
    }

    const loadRevenueCPMGate = async (): Promise<boolean> => {
      return new Promise((resolve) => {
        const script = document.createElement("script")
        script.async = true
        script.setAttribute("data-cfasync", "false")
        script.src = "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"

        const timeout = setTimeout(() => {
          resolve(false)
          if (script.parentNode) script.parentNode.removeChild(script)
        }, 5000)

        script.onload = () => {
          clearTimeout(timeout)
          console.log("✅ RevenueCPMGate loaded")
          
          // Create container
          if (adRef.current) {
            const container = document.createElement("div")
            container.id = `container-e4386a13de3b837cb97ad9287321b380-${adSlot}`
            container.style.width = `${width}px`
            container.style.height = `${height}px`
            container.style.margin = "0 auto"
            adRef.current.appendChild(container)
          }
          
          resolve(true)
        }

        script.onerror = () => {
          clearTimeout(timeout)
          resolve(false)
        }

        document.head.appendChild(script)
      })
    }

    const loadGoogleAdSense = async (): Promise<boolean> => {
      return new Promise((resolve) => {
        // This would require a real AdSense client ID
        // For now, just return false
        resolve(false)
      })
    }

    loadAdsWithFallback()
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
      case "fallback":
        return "bg-purple-100 text-purple-800"
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
            <div>Network: {networkStatus}</div>
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
                Ad networks working properly
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

          {adStatus === "fallback" && (
            <div className="bg-purple-50 p-4 rounded border">
              <div className="text-purple-700 font-medium">💡 Support Our Site</div>
              <div className="text-xs text-purple-600 mt-1">
                Please consider disabling ad blocker to support our free service
              </div>
            </div>
          )}

          {testMode && (
            <div className="mt-2 text-xs text-gray-500">
              <div>🔧 Test Mode Active</div>
              <div>• Network: {networkStatus}</div>
              <div>• Slot: {adSlot}</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
