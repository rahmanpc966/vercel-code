"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AD_CONFIG, getAdKey, shouldLoadAds } from "@/lib/ad-config"
import AdManager from "@/lib/ad-manager"

interface AdDebugInfo {
  adBlockerDetected: boolean
  networkStatus: "online" | "offline"
  adScriptsLoaded: number
  adContainersFound: number
  atOptionsSet: boolean
  environment: string
  shouldLoadAds: boolean
  adKey: string
  errors: string[]
}

export default function AdDebugger() {
  const [debugInfo, setDebugInfo] = useState<AdDebugInfo>({
    adBlockerDetected: false,
    networkStatus: "online",
    adScriptsLoaded: 0,
    adContainersFound: 0,
    atOptionsSet: false,
    environment: "unknown",
    shouldLoadAds: false,
    adKey: "",
    errors: []
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateDebugInfo = () => {
      const adManager = AdManager.getInstance()
      const debugInfo = adManager.getDebugInfo()
      
      const info: AdDebugInfo = {
        adBlockerDetected: false,
        networkStatus: navigator.onLine ? "online" : "offline",
        adScriptsLoaded: debugInfo.scriptsLoaded.length,
        adContainersFound: debugInfo.containersCreated.length,
        atOptionsSet: debugInfo.atOptionsSet,
        environment: process.env.NODE_ENV || "unknown",
        shouldLoadAds: shouldLoadAds(),
        adKey: getAdKey(),
        errors: []
      }

      // Test ad blocker detection
      try {
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        setTimeout(() => {
          info.adBlockerDetected = testAd.offsetHeight === 0
          document.body.removeChild(testAd)
        }, 100)
      } catch (error) {
        info.errors.push(`Ad blocker test failed: ${error}`)
      }

      setDebugInfo(info)
    }

    updateDebugInfo()
    const interval = setInterval(updateDebugInfo, 2000)
    return () => clearInterval(interval)
  }, [])

  const testAdLoading = async () => {
    const adKey = getAdKey()
    
    // Remove existing test scripts
    const existingScripts = document.querySelectorAll("script[data-test-ad]")
    existingScripts.forEach(script => script.remove())

    // Set atOptions
    ;(window as any).atOptions = {
      key: adKey,
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    }

    // Create test script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = `${AD_CONFIG.HIGH_PERFORMANCE_FORMAT.baseUrl}/${adKey}/invoke.js`
    script.setAttribute("data-test-ad", "true")

    script.onload = () => {
      console.log("✅ Test ad script loaded successfully")
      alert("✅ Ad script loaded successfully!")
    }

    script.onerror = () => {
      console.error("❌ Test ad script failed to load")
      alert("❌ Ad script failed to load. Check console for details.")
    }

    document.head.appendChild(script)
  }

  const getStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
        >
          🐛 Debug Ads
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Ad Debugger
            <Button 
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Ad Blocker:</span>
              <Badge className={getStatusColor(!debugInfo.adBlockerDetected)}>
                {debugInfo.adBlockerDetected ? "Detected" : "None"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Network:</span>
              <Badge className={getStatusColor(debugInfo.networkStatus === "online")}>
                {debugInfo.networkStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Scripts:</span>
              <Badge className={getStatusColor(debugInfo.adScriptsLoaded > 0)}>
                {debugInfo.adScriptsLoaded}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Containers:</span>
              <Badge className={getStatusColor(debugInfo.adContainersFound > 0)}>
                {debugInfo.adContainersFound}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>atOptions:</span>
              <Badge className={getStatusColor(debugInfo.atOptionsSet)}>
                {debugInfo.atOptionsSet ? "Set" : "Not Set"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Should Load:</span>
              <Badge className={getStatusColor(debugInfo.shouldLoadAds)}>
                {debugInfo.shouldLoadAds ? "Yes" : "No"}
              </Badge>
            </div>
          </div>

          <div className="text-xs">
            <div><strong>Environment:</strong> {debugInfo.environment}</div>
            <div><strong>Ad Key:</strong> {debugInfo.adKey.slice(0, 8)}...</div>
          </div>

          {debugInfo.errors.length > 0 && (
            <div className="text-xs text-red-600">
              <strong>Errors:</strong>
              {debugInfo.errors.map((error, index) => (
                <div key={index}>• {error}</div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={testAdLoading} size="sm" variant="outline">
              Test Ad
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              size="sm" 
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}