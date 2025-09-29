"use client"

import { useEffect, useRef, useState } from "react"
import AdFallback from "./AdFallback"
import ClientOnly from "./ClientOnly"

interface AdUnitProps {
  adKey?: string
  width?: number
  height?: number
  className?: string
  testMode?: boolean
}

export default function AdUnit({
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
  className = "",
  testMode = false,
}: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [loadTime, setLoadTime] = useState<number>(0)
  const [error, setError] = useState<string>("")
  const scriptLoadedRef = useRef(false)
  const startTimeRef = useRef<number>(0)

  // Enhanced logging for test mode
  const log = (message: string, data?: any) => {
    if (testMode) {
      console.log(`[AdUnit-${adKey.slice(0, 8)}] ${message}`, data || "")
    }
  }

  useEffect(() => {
    startTimeRef.current = Date.now()
    log("Starting ad loading process")

    // Skip if we're in development and ads should be skipped
    const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost"
    const skipAds = isDevelopment && localStorage.getItem("SKIP_ADS") === "true"

    if (skipAds) {
      log("Skipping ads (SKIP_ADS enabled)")
      setAdStatus("blocked")
      setError("Development mode - ads skipped")
      return
    }

    // Check if container is valid
    if (!containerRef.current) {
      log("Container ref is not available")
      setAdStatus("failed")
      setError("Container not found")
      return
    }

    // Prevent duplicate script loading
    if (scriptLoadedRef.current) {
      log("Script already loaded, skipping")
      return
    }

    // Check if script already exists globally
    const existingScript = document.querySelector(`script[data-ad-key="${adKey}"]`)
    if (existingScript) {
      log("Script already exists in DOM")
      setAdStatus("loaded")
      setLoadTime(Date.now() - startTimeRef.current)
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
        log("Set atOptions", (window as any).atOptions)
      }

      // Create ad script with better error handling
      const script = document.createElement("script")
      script.setAttribute("data-ad-key", adKey)
      script.type = "text/javascript"
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

      log("Created script element", { src: script.src })

      // Set up event handlers
      script.onload = () => {
        const duration = Date.now() - startTimeRef.current
        log(`Ad script loaded successfully in ${duration}ms`)
        setAdStatus("loaded")
        setLoadTime(duration)
        scriptLoadedRef.current = true
      }

      script.onerror = (errorEvent) => {
        const duration = Date.now() - startTimeRef.current
        const errorMsg = `Script failed to load (${duration}ms) - likely blocked by ad blocker or DNS issue`
        log("Ad script error", errorEvent)
        setAdStatus("blocked")
        setError(errorMsg)
        setLoadTime(duration)
        scriptLoadedRef.current = false
      }

      // Add timeout for loading
      const timeout = setTimeout(() => {
        if (adStatus === "loading") {
          const duration = Date.now() - startTimeRef.current
          const timeoutMsg = `Ad script loading timeout after ${duration}ms`
          log("Ad script timeout")
          setAdStatus("failed")
          setError(timeoutMsg)
          setLoadTime(duration)
        }
      }, 10000) // 10 second timeout

      // Append script to head
      document.head.appendChild(script)
      log("Script appended to head")

      // Cleanup function
      return () => {
        clearTimeout(timeout)
        if (script.parentNode) {
          script.parentNode.removeChild(script)
          log("Script removed from DOM")
        }
      }
    } catch (error) {
      const errorMsg = `Error setting up ad script: ${error}`
      log("Setup error", error)
      setAdStatus("failed")
      setError(errorMsg)
    }
  }, [adKey, height, width, testMode])

  // Status indicator for test mode
  const StatusIndicator = () => {
    if (!testMode) return null

    return (
      <div className="absolute top-0 right-0 z-10 bg-black text-white text-xs px-2 py-1 rounded-bl">
        {adStatus.toUpperCase()} {loadTime > 0 && `(${loadTime}ms)`}
      </div>
    )
  }

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
        data-ad-status={adStatus}
        data-ad-key={adKey}
      >
        <StatusIndicator />

        {(adStatus === "failed" || adStatus === "blocked") && (
          <AdFallback
            width={width}
            height={height}
            message={adStatus === "blocked" ? "Ad Blocked" : "Advertisement"}
            error={testMode ? error : undefined}
          />
        )}

        {adStatus === "loading" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              // No visible content while loading
            }}
            aria-live="polite"
            aria-hidden="true"
          />
        )}
      </div>
    </ClientOnly>
  )
}
