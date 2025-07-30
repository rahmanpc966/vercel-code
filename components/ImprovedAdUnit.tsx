"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import AdFallback from "./AdFallback"
import ClientOnly from "./ClientOnly"

interface ImprovedAdUnitProps {
  adKey?: string
  width?: number
  height?: number
  className?: string
  testMode?: boolean
  lazy?: boolean
  refreshInterval?: number
  fallbackContent?: React.ReactNode
}

export default function ImprovedAdUnit({
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
  className = "",
  testMode = false,
  lazy = true,
  refreshInterval = 0,
  fallbackContent,
}: ImprovedAdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"idle" | "loading" | "loaded" | "failed" | "blocked">("idle")
  const [loadTime, setLoadTime] = useState<number>(0)
  const [error, setError] = useState<string>("")
  const [refreshCount, setRefreshCount] = useState(0)
  const scriptLoadedRef = useRef(false)
  const startTimeRef = useRef<number>(0)
  const refreshTimerRef = useRef<NodeJS.Timeout>()

  // Intersection observer for lazy loading
  const isIntersecting = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: "100px",
  })

  // Enhanced ad blocker detection
  const detectAdBlocker = useCallback(async (): Promise<boolean> => {
    try {
      // Method 1: Test fetch to ad domain
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      await fetch("https://www.googletagservices.com/tag/js/gpt.js", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      // Method 2: DOM-based detection
      const testElement = document.createElement("div")
      testElement.innerHTML = "&nbsp;"
      testElement.className = "adsbox ad-banner"
      testElement.style.position = "absolute"
      testElement.style.left = "-10000px"
      testElement.style.height = "1px"
      document.body.appendChild(testElement)

      const isBlocked = testElement.offsetHeight === 0 || window.getComputedStyle(testElement).display === "none"

      document.body.removeChild(testElement)
      return isBlocked
    } catch {
      return true
    }
  }, [])

  // Load ad with multiple fallback strategies
  const loadAd = useCallback(async () => {
    if (scriptLoadedRef.current && refreshCount === 0) return

    startTimeRef.current = Date.now()
    setAdStatus("loading")
    setError("")

    // Check for ad blocker first
    const isBlocked = await detectAdBlocker()
    if (isBlocked) {
      setAdStatus("blocked")
      setError("Ad blocker detected")
      return
    }

    // Primary ad network
    const loadPrimaryAd = (): Promise<boolean> => {
      return new Promise((resolve) => {
        const script = document.createElement("script")
        script.setAttribute("data-ad-key", `${adKey}-${refreshCount}`)
        script.type = "text/javascript"
        script.async = true
        script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

        // Set global options
        ;(window as any).atOptions = {
          key: adKey,
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }

        const timeout = setTimeout(() => {
          resolve(false)
          if (script.parentNode) script.parentNode.removeChild(script)
        }, 5000) // Reduced timeout

        script.onload = () => {
          clearTimeout(timeout)
          resolve(true)
        }

        script.onerror = () => {
          clearTimeout(timeout)
          resolve(false)
        }

        document.head.appendChild(script)
      })
    }

    // Try primary ad network
    const primarySuccess = await loadPrimaryAd()

    if (primarySuccess) {
      setAdStatus("loaded")
      setLoadTime(Date.now() - startTimeRef.current)
      scriptLoadedRef.current = true
    } else {
      // Fallback strategies could go here
      setAdStatus("failed")
      setError("Failed to load ad from primary network")
      setLoadTime(Date.now() - startTimeRef.current)
    }
  }, [adKey, height, width, refreshCount])

  // Setup refresh interval
  useEffect(() => {
    if (refreshInterval > 0 && adStatus === "loaded") {
      refreshTimerRef.current = setTimeout(() => {
        setRefreshCount((prev) => prev + 1)
        scriptLoadedRef.current = false
      }, refreshInterval * 1000)
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [refreshInterval, adStatus])

  // Load ad when component mounts or becomes visible
  useEffect(() => {
    if (lazy && !isIntersecting) return
    if (adStatus === "idle" || refreshCount > 0) {
      loadAd()
    }
  }, [lazy, isIntersecting, loadAd, adStatus, refreshCount])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [])

  const log = (message: string, data?: any) => {
    if (testMode) {
      console.log(`[ImprovedAdUnit-${adKey.slice(0, 8)}] ${message}`, data || "")
    }
  }

  useEffect(() => {
    log(`Status changed to: ${adStatus}`, { loadTime, error, refreshCount })
  }, [adStatus, loadTime, error, refreshCount])

  return (
    <ClientOnly
      fallback={
        <div
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
          minHeight: `${height}px`, // Prevent layout shift
        }}
        role="complementary"
        aria-label="Advertisement"
        data-ad-status={adStatus}
        data-ad-key={adKey}
        data-refresh-count={refreshCount}
      >
        {/* Status indicator for test mode */}
        {testMode && (
          <div className="absolute top-0 right-0 z-10 bg-black text-white text-xs px-2 py-1 rounded-bl">
            {adStatus.toUpperCase()}
            {loadTime > 0 && ` (${loadTime}ms)`}
            {refreshCount > 0 && ` R${refreshCount}`}
          </div>
        )}

        {/* Loading state */}
        {adStatus === "loading" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              // No visible loading indicator
            }}
            aria-live="polite"
            aria-hidden="true"
          />
        )}

        {/* Failed/Blocked states */}
        {(adStatus === "failed" || adStatus === "blocked") &&
          (fallbackContent || (
            <AdFallback
              width={width}
              height={height}
              message={adStatus === "blocked" ? "Ad Blocked" : "Advertisement"}
              error={testMode ? error : undefined}
            />
          ))}

        {/* Lazy loading placeholder */}
        {lazy && !isIntersecting && adStatus === "idle" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              // No visible placeholder
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </ClientOnly>
  )
}
