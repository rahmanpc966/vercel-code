"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

interface VisibleAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  adLayout?: string
  adLayoutKey?: string
  className?: string
  style?: React.CSSProperties
  testMode?: boolean
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function VisibleAdUnit({
  adSlot,
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  className = "",
  style = {},
  testMode = false,
}: VisibleAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [isVisible, setIsVisible] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer to detect when ad comes into view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observerRef.current?.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (adRef.current) {
      observerRef.current.observe(adRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const loadAd = async () => {
      try {
        // Check if AdSense script is loaded
        if (typeof window !== "undefined") {
          // Initialize adsbygoogle array if it doesn't exist
          window.adsbygoogle = window.adsbygoogle || []

          // Load AdSense script if not already loaded
          if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const script = document.createElement("script")
            script.async = true
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
            script.crossOrigin = "anonymous"
            document.head.appendChild(script)

            script.onload = () => {
              pushAd()
            }
            script.onerror = () => {
              setAdStatus("failed")
            }
          } else {
            pushAd()
          }
        }
      } catch (error) {
        console.error("Ad loading error:", error)
        setAdStatus("failed")
      }
    }

    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          // Check if ad blocker is present
          const adBlockTest = document.createElement("div")
          adBlockTest.innerHTML = "&nbsp;"
          adBlockTest.className = "adsbox"
          document.body.appendChild(adBlockTest)

          setTimeout(() => {
            if (adBlockTest.offsetHeight === 0) {
              setAdStatus("blocked")
            } else {
              window.adsbygoogle.push({})
              setAdStatus("loaded")
            }
            document.body.removeChild(adBlockTest)
          }, 100)
        }
      } catch (error) {
        console.error("Ad push error:", error)
        setAdStatus("failed")
      }
    }

    loadAd()
  }, [isVisible])

  const getAdStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: "block",
      minHeight: "250px",
      width: "100%",
      ...style,
    }

    if (adStatus === "blocked" || adStatus === "failed") {
      return {
        ...baseStyles,
        backgroundColor: "#f3f4f6",
        border: "2px dashed #d1d5db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
        fontSize: "14px",
        fontFamily: "system-ui, sans-serif",
      }
    }

    return baseStyles
  }

  const renderAdContent = () => {
    if (adStatus === "blocked") {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div>🚫 Ad Blocked</div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>Please disable your ad blocker to support our site</div>
        </div>
      )
    }

    if (adStatus === "failed") {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div>⚠️ Ad Failed</div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>Advertisement could not be loaded</div>
        </div>
      )
    }

    if (adStatus === "loading") {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div>⏳ Loading Ad...</div>
        </div>
      )
    }

    return null
  }

  if (testMode) {
    return (
      <div ref={adRef} className={`visible-ad-unit test-mode ${className}`} style={getAdStyles()}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div>🧪 Test Ad Unit</div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>
            Slot: {adSlot} | Status: {adStatus}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={adRef} className={`visible-ad-unit ${className}`} style={getAdStyles()}>
      {(adStatus === "blocked" || adStatus === "failed" || adStatus === "loading") && renderAdContent()}
      {adStatus === "loaded" && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1234567890123456"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={adLayout}
          data-ad-layout-key={adLayoutKey}
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
