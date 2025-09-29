"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"

interface VisibleAdUnitProps {
  adSlot: string
  adSize?: "leaderboard" | "rectangle" | "banner" | "skyscraper" | "mobile-banner"
  className?: string
  style?: React.CSSProperties
  showFallback?: boolean
  testMode?: boolean
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

// Generate unique ID for each ad unit
let adUnitCounter = 0

export default function VisibleAdUnit({
  adSlot,
  adSize = "rectangle",
  className = "",
  style = {},
  showFallback = true,
  testMode = false,
}: VisibleAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"idle" | "loading" | "loaded" | "failed" | "blocked">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const [adInitialized, setAdInitialized] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const insRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const adUnitId = useRef<string>(`ad-unit-${++adUnitCounter}`)

  // Get ad dimensions based on size
  const getAdConfig = useCallback(() => {
    switch (adSize) {
      case "leaderboard":
        return { width: "728", height: "90", format: "auto" }
      case "rectangle":
        return { width: "300", height: "250", format: "auto" }
      case "banner":
        return { width: "468", height: "60", format: "auto" }
      case "skyscraper":
        return { width: "160", height: "600", format: "auto" }
      case "mobile-banner":
        return { width: "320", height: "50", format: "auto" }
      default:
        return { width: "300", height: "250", format: "auto" }
    }
  }, [adSize])

  // Check for ad blocker
  const checkAdBlocker = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const testElement = document.createElement("div")
        testElement.innerHTML = "&nbsp;"
        testElement.className = "adsbox"
        testElement.style.cssText = "position:absolute;left:-10000px;top:-10000px;width:1px;height:1px;"

        document.body.appendChild(testElement)

        setTimeout(() => {
          const isBlocked = testElement.offsetHeight === 0 || testElement.offsetWidth === 0

          try {
            document.body.removeChild(testElement)
          } catch (e) {
            // Element might already be removed
          }

          resolve(isBlocked)
        }, 100)
      } catch (error) {
        resolve(false) // If error occurs, assume not blocked
      }
    })
  }, [])

  // Initialize intersection observer
  useEffect(() => {
    if (!adRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    observerRef.current.observe(adRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [isVisible])

  // Load and initialize ad
  useEffect(() => {
    if (!isVisible || adInitialized || testMode) return

    const loadAd = async () => {
      setAdStatus("loading")

      try {
        // Check for ad blocker first
        const isBlocked = await checkAdBlocker()
        if (isBlocked) {
          setAdStatus("blocked")
          return
        }

        // Initialize adsbygoogle array
        if (typeof window !== "undefined") {
          window.adsbygoogle = window.adsbygoogle || []

          // Load AdSense script if not already loaded
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement("script")
            script.async = true
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
            script.crossOrigin = "anonymous"

            script.onload = () => {
              initializeAd()
            }

            script.onerror = () => {
              setAdStatus("failed")
            }

            document.head.appendChild(script)
          } else {
            // Script already loaded, initialize ad immediately
            initializeAd()
          }
        }
      } catch (error) {
        console.error("Ad loading error:", error)
        setAdStatus("failed")
      }
    }

    const initializeAd = () => {
      try {
        if (!adInitialized) {
          setAdInitialized(true)

          // Wait a bit for the ins element to be in DOM
          setTimeout(() => {
            if (insRef.current) {
              window.adsbygoogle.push({})
              setAdStatus("loaded")
            } else {
              setAdStatus("failed")
            }
          }, 100)
        }
      } catch (error) {
        console.error("Ad initialization error:", error)
        setAdStatus("failed")
        setAdInitialized(false)
      }
    }

    loadAd()
  }, [isVisible, adInitialized, checkAdBlocker, testMode])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const adConfig = getAdConfig()

  const containerStyle: React.CSSProperties = {
    width: `${adConfig.width}px`,
    height: `${adConfig.height}px`,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  }

  const renderFallback = () => {
    if (!showFallback) return null

    const fallbackStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      backgroundColor: "#f8f9fa",
      border: "2px dashed #dee2e6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#6c757d",
      fontSize: "14px",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      padding: "20px",
      boxSizing: "border-box",
    }

    switch (adStatus) {
      case "loading":
        return (
          <div style={fallbackStyle}>
            <div>⏳ Loading Advertisement...</div>
            <div style={{ fontSize: "12px", marginTop: "5px", opacity: 0.7 }}>Please wait</div>
          </div>
        )

      case "blocked":
        return (
          <div style={{ ...fallbackStyle, backgroundColor: "#fff3cd", borderColor: "#ffeaa7", color: "#856404" }}>
            <div>🚫 Ad Blocked</div>
            <div style={{ fontSize: "12px", marginTop: "5px" }}>Please disable your ad blocker to support our site</div>
          </div>
        )

      case "failed":
        return (
          <div style={{ ...fallbackStyle, backgroundColor: "#f8d7da", borderColor: "#f5c6cb", color: "#721c24" }}>
            <div>⚠️ Advertisement Unavailable</div>
            <div style={{ fontSize: "12px", marginTop: "5px" }}>Unable to load advertisement</div>
          </div>
        )

      default:
        return null
    }
  }

  // Test mode rendering
  if (testMode) {
    return (
      <div
        ref={adRef}
        className={`visible-ad-unit test-mode ${className}`}
        style={containerStyle}
        data-testid="visible-ad-unit"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#e3f2fd",
            border: "2px solid #2196f3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#1976d2",
            fontSize: "14px",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div>🧪 Test Ad Unit</div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>Slot: {adSlot}</div>
          <div style={{ fontSize: "12px" }}>
            Size: {adSize} ({adConfig.width}x{adConfig.height})
          </div>
          <div style={{ fontSize: "12px" }}>Status: {adStatus}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={adRef}
      className={`visible-ad-unit ${className}`}
      style={containerStyle}
      data-ad-status={adStatus}
      data-ad-slot={adSlot}
      data-testid="visible-ad-unit"
    >
      {/* Always render the ins element when visible, before initialization */}
      {isVisible && !testMode && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-1234567890123456"
          data-ad-slot={adSlot}
          data-ad-format={adConfig.format}
          data-full-width-responsive="true"
          key={adUnitId.current}
        />
      )}

      {/* Show fallback content when needed */}
      {(adStatus === "loading" || adStatus === "blocked" || adStatus === "failed" || adStatus === "idle") &&
        renderFallback()}
    </div>
  )
}
