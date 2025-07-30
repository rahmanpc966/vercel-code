"use client"

import { useEffect, useState } from "react"
import ImprovedAdUnit from "./ImprovedAdUnit"

interface AdPlacement {
  id: string
  position: "top" | "middle" | "bottom" | "sidebar"
  width: number
  height: number
  priority: number
}

const AD_PLACEMENTS: AdPlacement[] = [
  { id: "hero-banner", position: "top", width: 728, height: 90, priority: 1 },
  { id: "content-middle", position: "middle", width: 300, height: 250, priority: 2 },
  { id: "sidebar-top", position: "sidebar", width: 300, height: 250, priority: 3 },
  { id: "content-bottom", position: "bottom", width: 728, height: 90, priority: 4 },
]

interface AdPlacementOptimizerProps {
  position: "top" | "middle" | "bottom" | "sidebar"
  className?: string
}

export default function AdPlacementOptimizer({ position, className }: AdPlacementOptimizerProps) {
  const [selectedAd, setSelectedAd] = useState<AdPlacement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Select best ad for position and device
    const availableAds = AD_PLACEMENTS.filter((ad) => ad.position === position)

    if (availableAds.length === 0) return

    // Mobile optimization
    if (isMobile) {
      const mobileAd = availableAds.find((ad) => ad.width <= 320) || availableAds[0]
      setSelectedAd({
        ...mobileAd,
        width: Math.min(mobileAd.width, 320),
        height: mobileAd.height,
      })
    } else {
      // Desktop - use highest priority ad
      const desktopAd = availableAds.sort((a, b) => a.priority - b.priority)[0]
      setSelectedAd(desktopAd)
    }
  }, [position, isMobile])

  if (!selectedAd) return null

  return (
    <div className={`ad-placement ad-placement-${position} ${className || ""}`}>
      <ImprovedAdUnit
        width={selectedAd.width}
        height={selectedAd.height}
        lazy={position !== "top"} // Don't lazy load above-fold ads
        refreshInterval={position === "sidebar" ? 30 : 0} // Refresh sidebar ads
        className="mx-auto"
      />
    </div>
  )
}
