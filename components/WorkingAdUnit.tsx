"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WorkingAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  width?: number
  height?: number
}

export default function WorkingAdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  testMode = false,
  width = 300,
  height = 250,
}: WorkingAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked" | "testing">("loading")
  const [adError, setAdError] = useState<string>("")
  const [debugInfo, setDebugInfo] = useState<string[]>([])
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

    const loadAdsWithDetailedLogging = async () => {
      const debugLog: string[] = []
      
      try {
        debugLog.push(`🚀 Starting ad load for slot: ${adSlot}`)
        setDebugInfo(debugLog)

        // Check network status
        if (!navigator.onLine) {
          debugLog.push("❌ Network offline")
          setAdStatus("failed")
          setAdError("Network offline")
          setDebugInfo([...debugLog])
          return
        }

        debugLog.push("✅ Network online")
        setDebugInfo([...debugLog])

        // Check for ad blocker with detailed detection
        const adBlockerDetected = await detectAdBlockerDetailed(debugLog)
        if (adBlockerDetected) {
          debugLog.push("🚫 Ad blocker detected")
          setAdStatus("blocked")
          setAdError("Ad blocker detected")
          setDebugInfo([...debugLog])
          return
        }

        debugLog.push("✅ No ad blocker detected")
        setDebugInfo([...debugLog])

        // Try loading ads with detailed logging
        const success = await tryLoadAdsWithLogging(debugLog)
        
        if (success) {
          debugLog.push("✅ Ads loaded successfully")
          setAdStatus("loaded")
        } else {
          debugLog.push("❌ All ad networks failed")
          setAdStatus("failed")
          setAdError("All ad networks failed to load")
        }
        
        setDebugInfo([...debugLog])
      } catch (error) {
        debugLog.push(`❌ Error: ${error}`)
        setAdStatus("failed")
        setAdError(`Ad loading error: ${error}`)
        setDebugInfo([...debugLog])
      }
    }

    const detectAdBlockerDetailed = async (debugLog: string[]): Promise<boolean> => {
      try {
        debugLog.push("🔍 Testing for ad blocker...")
        
        // Method 1: Test element creation
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        const isBlocked = testAd.offsetHeight === 0
        document.body.removeChild(testAd)
        
        debugLog.push(`🔍 Ad blocker test result: ${isBlocked ? "BLOCKED" : "NOT BLOCKED"}`)
        
        // Method 2: Test fetch to ad domains
        try {
          const testUrl = "https://www.googletagservices.com/tag/js/gpt.js"
          await fetch(testUrl, { method: "HEAD", mode: "no-cors" })
          debugLog.push("✅ Ad domain fetch successful")
        } catch (error) {
          debugLog.push("❌ Ad domain fetch failed - likely blocked")
          return true
        }
        
        return isBlocked
      } catch {
        debugLog.push("❌ Ad blocker detection failed")
        return true
      }
    }

    const tryLoadAdsWithLogging = async (debugLog: string[]): Promise<boolean> => {
      // Strategy 1: Try HighPerformanceFormat with detailed logging
      try {
        debugLog.push("🔄 Attempting HighPerformanceFormat...")
        const hpfSuccess = await loadHighPerformanceFormatWithLogging(debugLog)
        if (hpfSuccess) {
          debugLog.push("✅ HighPerformanceFormat loaded successfully")
          return true
        }
      } catch (error) {
        debugLog.push(`❌ HighPerformanceFormat failed: ${error}`)
      }

      // Strategy 2: Try RevenueCPMGate with detailed logging
      try {
        debugLog.push("🔄 Attempting RevenueCPMGate...")
        const rcgSuccess = await loadRevenueCPMGateWithLogging(debugLog)
        if (rcgSuccess) {
          debugLog.push("✅ RevenueCPMGate loaded successfully")
          return true
        }
      } catch (error) {
        debugLog.push(`❌ RevenueCPMGate failed: ${error}`)
      }

      return false
    }

    const loadHighPerformanceFormatWithLogging = async (debugLog: string[]): Promise<boolean> => {
      return new Promise((resolve) => {
        debugLog.push("📝 Setting atOptions...")
        
        // Set atOptions
        if (typeof window !== "undefined") {
          ;(window as any).atOptions = {
            key: "37943d3fd9cce351f51aed181182d90d",
            format: "iframe",
            height: height,
            width: width,
            params: {},
          }
          debugLog.push("✅ atOptions set successfully")
        }

        debugLog.push("📡 Creating script element...")
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
        script.setAttribute("data-ad-key", "37943d3fd9cce351f51aed181182d90d")

        const timeout = setTimeout(() => {
          debugLog.push("⏰ HighPerformanceFormat timeout (5s)")
          resolve(false)
          if (script.parentNode) script.parentNode.removeChild(script)
        }, 5000)

        script.onload = () => {
          clearTimeout(timeout)
          debugLog.push("✅ HighPerformanceFormat script loaded")
          resolve(true)
        }

        script.onerror = (error) => {
          clearTimeout(timeout)
          debugLog.push(`❌ HighPerformanceFormat script error: ${error}`)
          resolve(false)
        }

        debugLog.push("📡 Appending script to head...")
        document.head.appendChild(script)
        setDebugInfo([...debugLog])
      })
    }

    const loadRevenueCPMGateWithLogging = async (debugLog: string[]): Promise<boolean> => {
      return new Promise((resolve) => {
        debugLog.push("📡 Creating RevenueCPMGate script...")
        
        const script = document.createElement("script")
        script.async = true
        script.setAttribute("data-cfasync", "false")
        script.src = "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"

        const timeout = setTimeout(() => {
          debugLog.push("⏰ RevenueCPMGate timeout (5s)")
          resolve(false)
          if (script.parentNode) script.parentNode.removeChild(script)
        }, 5000)

        script.onload = () => {
          clearTimeout(timeout)
          debugLog.push("✅ RevenueCPMGate script loaded")
          
          // Create container
          if (adRef.current) {
            const container = document.createElement("div")
            container.id = `container-e4386a13de3b837cb97ad9287321b380-${adSlot}`
            container.style.width = `${width}px`
            container.style.height = `${height}px`
            container.style.margin = "0 auto"
            adRef.current.appendChild(container)
            debugLog.push("✅ RevenueCPMGate container created")
          }
          
          resolve(true)
        }

        script.onerror = (error) => {
          clearTimeout(timeout)
          debugLog.push(`❌ RevenueCPMGate script error: ${error}`)
          resolve(false)
        }

        debugLog.push("📡 Appending RevenueCPMGate script...")
        document.head.appendChild(script)
        setDebugInfo([...debugLog])
      })
    }

    loadAdsWithDetailedLogging()
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
      case "testing":
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

          {testMode && debugInfo.length > 0 && (
            <div className="mt-2 text-xs text-gray-500 max-h-32 overflow-y-auto">
              <div className="font-semibold">Debug Log:</div>
              {debugInfo.map((log, index) => (
                <div key={index} className="text-left">{log}</div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
