"use client"

import { useState, useEffect } from "react"

export default function AdDebugger() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") {
      return
    }

    const checkAdStatus = () => {
      const info = {
        timestamp: new Date().toISOString(),
        skipAds: process.env.SKIP_ADS,
        nodeEnv: process.env.NODE_ENV,
        windowAtOptions: (window as any).atOptions,
        adScripts: Array.from(document.querySelectorAll('script[src*="highperformanceformat"]')).length,
        adContainers: document.querySelectorAll(".ad-container").length,
        networkStatus: navigator.onLine ? "online" : "offline",
      }
      setDebugInfo(info)
    }

    checkAdStatus()
    const interval = setInterval(checkAdStatus, 5000)

    return () => clearInterval(interval)
  }, [])

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-red-600"
      >
        AD DEBUG
      </button>

      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-black text-white p-4 rounded-lg shadow-xl max-w-sm text-xs">
          <h3 className="font-bold mb-2">Ad Debug Info</h3>
          <pre className="whitespace-pre-wrap overflow-auto max-h-64">{JSON.stringify(debugInfo, null, 2)}</pre>
          <button
            onClick={() => {
              // Test ad loading
              const testAd = () => {
                console.log("Testing ad load...")
                const script = document.createElement("script")
                script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
                script.onload = () => console.log("Test ad script loaded")
                script.onerror = (e) => console.error("Test ad script failed:", e)
                document.head.appendChild(script)
              }
              testAd()
            }}
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Ad Load
          </button>
        </div>
      )}
    </div>
  )
}
