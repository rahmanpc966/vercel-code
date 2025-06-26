"use client"

import { useEffect, useRef, useState } from "react"
import AdFallback from "./AdFallback"
import ClientOnly from "./ClientOnly"

interface AdUnitProps {
  adKey?: string
  width?: number
  height?: number
  className?: string
}

export default function AdUnit({
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
  className = "",
}: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Skip if we're in development and ads should be skipped
    const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost"
    const skipAds = isDevelopment && localStorage.getItem("SKIP_ADS") === "true"

    if (skipAds) {
      setAdStatus("blocked")
      return
    }

    // Check if container is valid
    if (!containerRef.current) {
      console.warn("[AdUnit] Container ref is not available")
      setAdStatus("failed")
      return
    }

    // Prevent duplicate script loading
    if (scriptLoadedRef.current) {
      return
    }

    // Check if script already exists globally
    const existingScript = document.querySelector(`script[data-ad-key="${adKey}"]`)
    if (existingScript) {
      setAdStatus("loaded")
      return
    }

    // Set up global ad options
    try {
      if (typeof window !== "undefined") {
        ;(window as any).atOptions = {
          key: adKey,
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }
      }

      // Create ad script with better error handling
      const script = document.createElement("script")
      script.setAttribute("data-ad-key", adKey)
      script.type = "text/javascript"
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

      // Set up event handlers
      script.onload = () => {
        console.log("[AdUnit] Ad script loaded successfully")
        setAdStatus("loaded")
        scriptLoadedRef.current = true
      }

      script.onerror = (error) => {
        console.warn("[AdUnit] Ad script failed to load:", error)
        setAdStatus("blocked")
        scriptLoadedRef.current = false
      }

      // Add timeout for loading
      const timeout = setTimeout(() => {
        if (adStatus === "loading") {
          console.warn("[AdUnit] Ad script loading timeout")
          setAdStatus("failed")
        }
      }, 10000) // 10 second timeout

      // Append script to head
      document.head.appendChild(script)

      // Cleanup function
      return () => {
        clearTimeout(timeout)
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    } catch (error) {
      console.error("[AdUnit] Error setting up ad script:", error)
      setAdStatus("failed")
    }
  }, [adKey, height, width, adStatus])

  return (
    <ClientOnly
      fallback={
        <div
          className={`ad-container ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "4px",
          }}
        >
          <span style={{ color: "#6c757d", fontSize: "14px" }}>Loading...</span>
        </div>
      }
    >
      <div
        ref={containerRef}
        className={`ad-container ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: "0 auto",
          position: "relative",
        }}
        role="complementary"
        aria-label="Advertisement"
      >
        {(adStatus === "failed" || adStatus === "blocked") && (
          <AdFallback width={width} height={height} message={adStatus === "blocked" ? "Ad Blocked" : "Advertisement"} />
        )}
        {adStatus === "loading" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: "4px",
              color: "#6c757d",
              fontSize: "14px",
            }}
            aria-live="polite"
          >
            Loading advertisement...
          </div>
        )}
      </div>
    </ClientOnly>
  )
}
