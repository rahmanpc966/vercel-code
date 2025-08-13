"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface VisibleAdUnitProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  adClient?: string
  className?: string
  style?: React.CSSProperties
  testMode?: boolean
}

export default function VisibleAdUnit({
  adSlot,
  adFormat = "auto",
  adClient = "ca-pub-1234567890123456",
  className = "",
  style = {},
  testMode = false,
}: VisibleAdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
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

    const loadAd = async () => {
      try {
        // Check if AdSense is available
        if (typeof window !== "undefined") {
          // Simulate ad loading
          const adBlockerDetected = !window.navigator.onLine || document.querySelector("[data-ad-client]") === null

          if (testMode) {
            // In test mode, randomly succeed or fail
            const shouldFail = Math.random() > 0.7
            setTimeout(() => {
              setAdStatus(shouldFail ? "failed" : "loaded")
            }, 1000)
          } else if (adBlockerDetected) {
            setAdStatus("blocked")
          } else {
            // Try to load the actual ad
            setTimeout(() => {
              setAdStatus("loaded")
            }, 2000)
          }
        }
      } catch (error) {
        console.error("Ad loading error:", error)
        setAdStatus("failed")
      }
    }

    loadAd()
  }, [isVisible, testMode])

  const getAdDimensions = () => {
    switch (adFormat) {
      case "rectangle":
        return { width: "300px", height: "250px" }
      case "vertical":
        return { width: "160px", height: "600px" }
      case "horizontal":
        return { width: "728px", height: "90px" }
      default:
        return { width: "100%", height: "250px" }
    }
  }

  const dimensions = getAdDimensions()

  const renderAdContent = () => {
    switch (adStatus) {
      case "loading":
        return (
          <div className="flex items-center justify-center h-full bg-gray-100 animate-pulse">
            <div className="text-gray-500 text-sm">Loading Ad...</div>
          </div>
        )

      case "loaded":
        return (
          <div className="flex items-center justify-center h-full bg-green-50 border border-green-200">
            <div className="text-center">
              <div className="text-green-600 font-medium">✓ Ad Loaded</div>
              <div className="text-xs text-gray-500 mt-1">Slot: {adSlot}</div>
            </div>
          </div>
        )

      case "failed":
        return (
          <div className="flex items-center justify-center h-full bg-red-50 border border-red-200">
            <div className="text-center">
              <div className="text-red-600 font-medium">✗ Ad Failed</div>
              <div className="text-xs text-gray-500 mt-1">Slot: {adSlot}</div>
            </div>
          </div>
        )

      case "blocked":
        return (
          <div className="flex items-center justify-center h-full bg-yellow-50 border border-yellow-200">
            <div className="text-center">
              <div className="text-yellow-600 font-medium">⚠ Ad Blocked</div>
              <div className="text-xs text-gray-500 mt-1">AdBlocker Detected</div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      ref={adRef}
      className={`ad-unit ${className}`}
      style={{
        ...dimensions,
        ...style,
        minHeight: dimensions.height,
        display: "block",
      }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-testid="visible-ad-unit"
    >
      <Card className="h-full w-full">{renderAdContent()}</Card>
    </div>
  )
}
