"use client"

import { useEffect, useRef } from "react"

interface AdUnitProps {
  className?: string
  adKey?: string
  width?: number
  height?: number
}

export default function AdUnit({
  className = "",
  adKey = "37943d3fd9cce351f51aed181182d90d",
  width = 300,
  height = 250,
}: AdUnitProps) {
  const adContainerRef = useRef<HTMLDivElement>(null)
  const adScriptLoaded = useRef(false)

  useEffect(() => {
    // Skip during development if needed
    if (process.env.NODE_ENV === "development" && process.env.SKIP_ADS === "true") {
      return
    }

    if (!adScriptLoaded.current) {
      // Create the first script (options)
      const optionsScript = document.createElement("script")
      optionsScript.type = "text/javascript"
      optionsScript.text = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `

      // Create the second script (invoke)
      const invokeScript = document.createElement("script")
      invokeScript.type = "text/javascript"
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`

      // Add scripts to the container
      if (adContainerRef.current) {
        adContainerRef.current.appendChild(optionsScript)
        adContainerRef.current.appendChild(invokeScript)
        adScriptLoaded.current = true
      }
    }

    return () => {
      // Cleanup if needed
    }
  }, [adKey, height, width])

  return (
    <div
      ref={adContainerRef}
      className={`ad-container ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, margin: "0 auto" }}
    >
      {/* Ad will be inserted here by the scripts */}
    </div>
  )
}
