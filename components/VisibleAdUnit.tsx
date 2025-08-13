"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface VisibleAdUnitProps {
  size?: "banner" | "rectangle" | "leaderboard" | "mobile"
  className?: string
  testMode?: boolean
}

export default function VisibleAdUnit({ size = "banner", className = "", testMode = false }: VisibleAdUnitProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed" | "blocked">("loading")
  const [isVisible, setIsVisible] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    banner: "w-full h-24 max-w-[728px]",
    rectangle: "w-full h-64 max-w-[300px]",
    leaderboard: "w-full h-24 max-w-[970px]",
    mobile: "w-full h-20 max-w-[320px]",
  }

  const statusColors = {
    loading: "bg-yellow-100 text-yellow-800 border-yellow-200",
    loaded: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    blocked: "bg-orange-100 text-orange-800 border-orange-200",
  }

  const statusMessages = {
    loading: "Loading advertisement...",
    loaded: "Advertisement loaded successfully",
    failed: "Advertisement failed to load",
    blocked: "Advertisement blocked by browser",
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Simulate ad loading
          const timer = setTimeout(() => {
            // In test mode or if no real ad network, show failed state
            if (testMode || typeof window !== "undefined") {
              // Check if ad blocker might be present
              const testAd = document.createElement("div")
              testAd.innerHTML = "&nbsp;"
              testAd.className = "adsbox"
              document.body.appendChild(testAd)

              setTimeout(() => {
                const isBlocked = testAd.offsetHeight === 0
                document.body.removeChild(testAd)
                setAdStatus(isBlocked ? "blocked" : "failed")
              }, 100)
            }
          }, 1500)

          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [testMode])

  return (
    <div ref={adRef} className={`relative ${sizeClasses[size]} mx-auto ${className}`}>
      <Card className="w-full h-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-4 relative">
        {/* Status Badge */}
        <Badge variant="outline" className={`absolute top-2 right-2 text-xs ${statusColors[adStatus]}`}>
          {adStatus === "loading" && (
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-1" />
          )}
          {adStatus.charAt(0).toUpperCase() + adStatus.slice(1)}
        </Badge>

        {/* Ad Content */}
        <div className="text-center">
          {adStatus === "loading" && (
            <>
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-600">Loading advertisement...</p>
            </>
          )}

          {(adStatus === "failed" || adStatus === "blocked") && (
            <>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-700 mb-1">Advertisement</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {adStatus === "blocked"
                  ? "This space is reserved for advertisements. Please consider disabling your ad blocker to support our free service."
                  : "This space is reserved for advertisements to support our free service."}
              </p>
            </>
          )}

          {adStatus === "loaded" && (
            <div className="text-center">
              <div className="w-full h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-medium text-gray-700">Sample Advertisement</span>
              </div>
              <p className="text-xs text-gray-500">Advertisement loaded successfully</p>
            </div>
          )}
        </div>

        {/* Debug Info (only in test mode) */}
        {testMode && (
          <div className="absolute bottom-1 left-1 text-xs text-gray-400 bg-white px-1 rounded">
            {size} | {adStatus}
          </div>
        )}
      </Card>
    </div>
  )
}
