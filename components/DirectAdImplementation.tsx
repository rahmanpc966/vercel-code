"use client"

import { useEffect, useRef } from "react"

interface DirectAdImplementationProps {
  width?: number
  height?: number
  className?: string
}

export default function DirectAdImplementation({
  width = 300,
  height = 250,
  className = ""
}: DirectAdImplementationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is the EXACT implementation from your provided code
    const loadAds = () => {
      // Set atOptions exactly as in your provided code
      if (typeof window !== "undefined") {
        ;(window as any).atOptions = {
          key: "37943d3fd9cce351f51aed181182d90d",
          format: "iframe",
          height: height,
          width: width,
          params: {},
        }
      }

      // Load HighPerformanceFormat script
      const hpfScript = document.createElement("script")
      hpfScript.type = "text/javascript"
      hpfScript.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
      document.head.appendChild(hpfScript)

      // Load RevenueCPMGate script
      const rcgScript = document.createElement("script")
      rcgScript.async = true
      rcgScript.setAttribute("data-cfasync", "false")
      rcgScript.src = "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"
      document.head.appendChild(rcgScript)

      // Create the container div
      if (containerRef.current) {
        const container = document.createElement("div")
        container.id = "container-e4386a13de3b837cb97ad9287321b380"
        container.style.width = `${width}px`
        container.style.height = `${height}px`
        container.style.margin = "0 auto"
        containerRef.current.appendChild(container)
      }
    }

    loadAds()
  }, [width, height])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ width: `${width}px`, height: `${height}px`, margin: "0 auto" }}
    >
      {/* The container div will be inserted here by the script */}
    </div>
  )
}
