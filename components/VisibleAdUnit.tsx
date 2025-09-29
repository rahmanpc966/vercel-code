"use client"

import { useEffect, useRef, useState } from "react"

interface VisibleAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  fullWidthResponsive?: boolean
  className?: string
}

export default function VisibleAdUnit({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: VisibleAdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [isVisible, setIsVisible] = useState(false)
  const [adInitialized, setAdInitialized] = useState(false)
  const adIdRef = useRef(`ad-${Math.random().toString(36).substr(2, 9)}`)

  // Check if ad blocker is present
  useEffect(() => {
    const checkAdBlocker = () => {
      const testAd = document.createElement("div")
      testAd.innerHTML = "&nbsp;"
      testAd.className = "adsbox ad-placement ad-placeholder"
      testAd.style.cssText = "width: 1px; height: 1px; position: absolute; left: -9999px;"
      document.body.appendChild(testAd)

      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0 || !testAd.offsetParent
        document.body.removeChild(testAd)

        if (isBlocked) {
          setAdStatus("blocked")
        }
      }, 100)
    }

    checkAdBlocker()
  }, [])

  // Intersection Observer to detect when ad is visible
  useEffect(() => {
    if (!adRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(adRef.current)

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current)
      }
    }
  }, [isVisible])

  // Initialize ad when visible
  useEffect(() => {
    if (!isVisible || adInitialized || adStatus === "blocked") return

    const initializeAd = () => {
      try {
        const adElement = document.getElementById(adIdRef.current)
        if (!adElement) {
          console.error("Ad element not found")
          setAdStatus("failed")
          return
        }

        // Check if adsbygoogle is available
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            try {
              ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
              setAdInitialized(true)
              setAdStatus("loaded")
              console.log("Ad initialized successfully:", adIdRef.current)
            } catch (error) {
              console.error("Error pushing to adsbygoogle:", error)
              setAdStatus("failed")
            }
          }, 100)
        } else {
          console.error("adsbygoogle not available")
          setAdStatus("failed")
        }
      } catch (error) {
        console.error("Error initializing ad:", error)
        setAdStatus("failed")
      }
    }

    initializeAd()
  }, [isVisible, adInitialized, adStatus])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const adElement = document.getElementById(adIdRef.current)
      if (adElement) {
        adElement.innerHTML = ""
      }
    }
  }, [])

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      {adStatus === "loading" && (
        <div className="flex items-center justify-center p-8 bg-gray-100 rounded">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading ad...</p>
          </div>
        </div>
      )}

      {adStatus === "blocked" && (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded text-center">
          <p className="text-sm text-yellow-800 font-medium mb-2">Ad Blocked</p>
          <p className="text-xs text-yellow-700">Please disable your ad blocker to support this free service</p>
        </div>
      )}

      {adStatus === "failed" && (
        <div className="p-6 bg-red-50 border border-red-200 rounded text-center">
          <p className="text-sm text-red-800 font-medium">Ad Failed to Load</p>
        </div>
      )}

      {isVisible && adStatus !== "blocked" && (
        <ins
          id={adIdRef.current}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8495407505234893"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      )}
    </div>
  )
}
