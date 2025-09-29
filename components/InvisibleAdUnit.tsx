"use client"

import { useEffect, useRef, useState } from "react"
import ClientOnly from "./ClientOnly"

interface InvisibleAdUnitProps {
  adKey?: string
  width?: number
  height?: number
  className?: string
}

export default function InvisibleAdUnit({
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
  className = "",
}: InvisibleAdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed">("loading")
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || scriptLoadedRef.current) return

    // Check if script already exists
    const existingScript = document.querySelector(`script[data-ad-key="${adKey}"]`)
    if (existingScript) {
      setAdStatus("loaded")
      return
    }

    // Set up ad options
    if (typeof window !== "undefined") {
      ;(window as any).atOptions = {
        key: adKey,
        format: "iframe",
        height: height,
        width: width,
        params: {},
      }
    }

    // Create ad script
    const script = document.createElement("script")
    script.setAttribute("data-ad-key", adKey)
    script.type = "text/javascript"
    script.async = true
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

    script.onload = () => {
      setAdStatus("loaded")
      scriptLoadedRef.current = true
    }

    script.onerror = () => {
      setAdStatus("failed")
      // Don't show any error - just fail silently
    }

    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [adKey, height, width])

  return (
    <ClientOnly fallback={<div style={{ width: `${width}px`, height: `${height}px`, margin: "0 auto" }} />}>
      <div
        ref={containerRef}
        className={`ad-container ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: "0 auto",
          // No visible styling - completely invisible when ads don't load
        }}
        role="complementary"
        aria-label="Advertisement"
        data-ad-status={adStatus}
        data-ad-key={adKey}
      >
        {/* No fallback content - completely invisible when ads fail */}
      </div>
    </ClientOnly>
  )
}
