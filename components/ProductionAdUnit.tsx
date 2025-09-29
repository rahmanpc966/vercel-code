"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PRODUCTION_AD_CONFIG, AdNetworkManager, AdAnalytics } from "@/lib/production-ad-config"

interface ProductionAdUnitProps {
  adSlot: string
  placement: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  className?: string
  testMode?: boolean
  width?: number
  height?: number
}

export default function ProductionAdUnit({
  adSlot,
  placement,
  adFormat = "auto",
  className = "",
  testMode = false,
  width = 300,
  height = 250,
}: ProductionAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked" | "fallback">("loading")
  const [adError, setAdError] = useState<string>("")
  const [currentNetwork, setCurrentNetwork] = useState<string>("")
  const [loadTime, setLoadTime] = useState<number>(0)
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const adManager = AdNetworkManager.getInstance()
  const analytics = AdAnalytics.getInstance()

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

    const loadProductionAd = async () => {
      const startTime = Date.now()
      
      try {
        // Check network status
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
          analytics.trackAdBlockerDetection(true)
          return
        }

        analytics.trackAdBlockerDetection(false)

        // Try to load ads with production strategy
        const success = await tryLoadProductionAds()
        
        if (success) {
          setAdStatus("loaded")
          setLoadTime(Date.now() - startTime)
          analytics.trackAdLoading(currentNetwork, true, loadTime)
        } else {
          setAdStatus("fallback")
          analytics.trackFallbackUsage(placement)
        }
      } catch (error) {
        setAdStatus("failed")
        setAdError(`Ad loading error: ${error}`)
        analytics.trackAdLoading(currentNetwork, false, Date.now() - startTime)
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

    const tryLoadProductionAds = async (): Promise<boolean> => {
      // Get placement configuration
      const placementConfig = getPlacementConfig(placement)
      if (!placementConfig) return false

      // Try each network in priority order
      for (const networkName of placementConfig.networks) {
        if (adManager.isNetworkAvailable(networkName)) {
          const success = await tryLoadNetworkAd(networkName)
          if (success) {
            setCurrentNetwork(networkName)
            adManager.markNetworkAvailable(networkName)
            return true
          } else {
            adManager.markNetworkUnavailable(networkName)
          }
        }
      }

      // If no networks available, try fallback networks
      for (const fallbackNetwork of PRODUCTION_AD_CONFIG.FALLBACK_NETWORKS) {
        if (fallbackNetwork.enabled) {
          const success = await tryLoadNetworkAd(fallbackNetwork.name)
          if (success) {
            setCurrentNetwork(fallbackNetwork.name)
            return true
          }
        }
      }

      return false
    }

    const tryLoadNetworkAd = async (networkName: string): Promise<boolean> => {
      const network = getNetworkConfig(networkName)
      if (!network) return false

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false)
        }, PRODUCTION_AD_CONFIG.PERFORMANCE.SCRIPT_TIMEOUT)

        if (network.type === "iframe") {
          loadIframeAd(network, resolve, timeout)
        } else if (network.type === "container") {
          loadContainerAd(network, resolve, timeout)
        } else if (network.type === "adsense") {
          loadAdSenseAd(network, resolve, timeout)
        } else {
          clearTimeout(timeout)
          resolve(false)
        }
      })
    }

    const loadIframeAd = (network: any, resolve: (success: boolean) => void, timeout: NodeJS.Timeout) => {
      // Set atOptions for HighPerformanceFormat
      if (typeof window !== "undefined") {
        ;(window as any).atOptions = {
          key: network.key,
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }
      }

      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = network.scriptUrl
      script.setAttribute("data-ad-key", network.key)

      script.onload = () => {
        clearTimeout(timeout)
        resolve(true)
      }

      script.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
      }

      document.head.appendChild(script)
    }

    const loadContainerAd = (network: any, resolve: (success: boolean) => void, timeout: NodeJS.Timeout) => {
      const script = document.createElement("script")
      script.async = true
      script.setAttribute("data-cfasync", "false")
      script.src = network.scriptUrl

      script.onload = () => {
        clearTimeout(timeout)
        
        // Create container
        if (adRef.current) {
          const container = document.createElement("div")
          container.id = `container-${network.key}-${adSlot}`
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
    }

    const loadAdSenseAd = (network: any, resolve: (success: boolean) => void, timeout: NodeJS.Timeout) => {
      // Initialize adsbygoogle array
      if (typeof window !== "undefined") {
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      }

      const script = document.createElement("script")
      script.async = true
      script.src = `${network.scriptUrl}?client=${network.clientId}`

      script.onload = () => {
        clearTimeout(timeout)
        
        // Create AdSense ad
        if (adRef.current) {
          const adElement = document.createElement("ins")
          adElement.className = "adsbygoogle"
          adElement.style.display = "block"
          adElement.setAttribute("data-ad-client", network.clientId)
          adElement.setAttribute("data-ad-slot", adSlot)
          adElement.setAttribute("data-ad-format", "auto")
          adElement.setAttribute("data-full-width-responsive", "true")
          
          adRef.current.appendChild(adElement)
          ;(window as any).adsbygoogle.push({})
        }
        
        resolve(true)
      }

      script.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
      }

      document.head.appendChild(script)
    }

    const getPlacementConfig = (placement: string): any => {
      const configs = PRODUCTION_AD_CONFIG.AD_PLACEMENTS
      for (const pageType in configs) {
        const pageConfig = configs[pageType as keyof typeof configs]
        if (pageConfig && placement in pageConfig) {
          return pageConfig[placement as keyof typeof pageConfig]
        }
      }
      return null
    }

    const getNetworkConfig = (networkName: string): any => {
      const allNetworks = [...PRODUCTION_AD_CONFIG.PRIMARY_NETWORKS, ...PRODUCTION_AD_CONFIG.FALLBACK_NETWORKS]
      return allNetworks.find(network => network.name === networkName)
    }

    loadProductionAd()
  }, [isVisible, width, height, adSlot, placement, retryCount])

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
            <div>Placement: {placement}</div>
            <div>Size: {width}x{height}</div>
            {currentNetwork && <div>Network: {currentNetwork}</div>}
            {loadTime > 0 && <div>Load Time: {loadTime}ms</div>}
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
              <div className="text-xs text-green-600 mt-1">
                {currentNetwork} - Production Ready
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
                {PRODUCTION_AD_CONFIG.UX.FALLBACK_MESSAGE}
              </div>
            </div>
          )}

          {testMode && (
            <div className="mt-2 text-xs text-gray-500">
              <div>🔧 Production Mode Active</div>
              <div>• Network: {currentNetwork || "None"}</div>
              <div>• Placement: {placement}</div>
              <div>• Load Time: {loadTime}ms</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
