"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdTestResult {
  timestamp: string
  adKey: string
  status: "loading" | "loaded" | "failed" | "blocked" | "timeout"
  loadTime?: number
  error?: string
  scriptExists: boolean
  containerExists: boolean
  windowAtOptions: boolean
  networkOnline: boolean
}

export default function AdTester() {
  const [testResults, setTestResults] = useState<AdTestResult[]>([])
  const [isTestingAds, setIsTestingAds] = useState(false)
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean | null>(null)

  // Test if ad blocker is present
  const detectAdBlocker = async (): Promise<boolean> => {
    try {
      // Method 1: Try to fetch a known ad URL
      const testUrl = "https://www.googletagservices.com/tag/js/gpt.js"
      const response = await fetch(testUrl, { mode: "no-cors" })

      // Method 2: Check for common ad blocker indicators
      const adBlockerTests = [
        () => window.getComputedStyle(document.createElement("div")).getPropertyValue("display") === "none",
        () => !!(window as any).uBlock,
        () => !!(window as any).AdBlock,
        () => !!(window as any).adblockDetector,
      ]

      // Method 3: Create a test ad element
      const testAd = document.createElement("div")
      testAd.innerHTML = "&nbsp;"
      testAd.className = "adsbox"
      testAd.style.position = "absolute"
      testAd.style.left = "-10000px"
      document.body.appendChild(testAd)

      const isHidden = window.getComputedStyle(testAd).display === "none" || testAd.offsetHeight === 0

      document.body.removeChild(testAd)

      return (
        isHidden ||
        adBlockerTests.some((test) => {
          try {
            return test()
          } catch {
            return false
          }
        })
      )
    } catch {
      return true // Assume blocked if fetch fails
    }
  }

  // Test individual ad loading
  const testAdLoading = (adKey: string): Promise<AdTestResult> => {
    return new Promise((resolve) => {
      const startTime = Date.now()
      const result: AdTestResult = {
        timestamp: new Date().toISOString(),
        adKey,
        status: "loading",
        scriptExists: false,
        containerExists: false,
        windowAtOptions: !!(window as any).atOptions,
        networkOnline: navigator.onLine,
      }

      // Check if script already exists
      const existingScript = document.querySelector(`script[data-ad-key="${adKey}"]`)
      result.scriptExists = !!existingScript

      // Check if container exists
      const container = document.querySelector(`.ad-container`)
      result.containerExists = !!container

      if (existingScript) {
        result.status = "loaded"
        result.loadTime = 0
        resolve(result)
        return
      }
      // Set up ad options
      ;(window as any).atOptions = {
        key: adKey,
        format: "iframe",
        height: 250,
        width: 300,
        params: {},
      }

      // Create test script
      const script = document.createElement("script")
      script.setAttribute("data-ad-key", adKey)
      script.type = "text/javascript"
      script.async = true
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`

      // Set timeout
      const timeout = setTimeout(() => {
        result.status = "timeout"
        result.loadTime = Date.now() - startTime
        result.error = "Script loading timeout (10s)"
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        resolve(result)
      }, 10000)

      script.onload = () => {
        clearTimeout(timeout)
        result.status = "loaded"
        result.loadTime = Date.now() - startTime
        resolve(result)
      }

      script.onerror = (error) => {
        clearTimeout(timeout)
        result.status = "failed"
        result.loadTime = Date.now() - startTime
        result.error = `Script error: ${error}`
        resolve(result)
      }

      // Try to load the script
      try {
        document.head.appendChild(script)
      } catch (error) {
        clearTimeout(timeout)
        result.status = "failed"
        result.error = `Failed to append script: ${error}`
        resolve(result)
      }
    })
  }

  // Run comprehensive ad tests
  const runAdTests = async () => {
    setIsTestingAds(true)
    const results: AdTestResult[] = []

    // Test ad blocker detection
    const adBlockerResult = await detectAdBlocker()
    setAdBlockerDetected(adBlockerResult)

    // Test different ad keys
    const adKeys = [
      "37943d3fd9cce351f51aed181182d90d", // Main ad key
      "test-key-1", // Test key to see failure
    ]

    for (const adKey of adKeys) {
      const result = await testAdLoading(adKey)
      if (adBlockerResult) {
        result.status = "blocked"
        result.error = "Ad blocker detected"
      }
      results.push(result)
    }

    setTestResults(results)
    setIsTestingAds(false)
  }

  // Check current ad status
  const getCurrentAdStatus = () => {
    const adContainers = document.querySelectorAll(".ad-container")
    const adScripts = document.querySelectorAll("script[data-ad-key]")
    const atOptions = (window as any).atOptions

    return {
      containerCount: adContainers.length,
      scriptCount: adScripts.length,
      hasAtOptions: !!atOptions,
      atOptionsValue: atOptions,
      adBlockerDetected,
    }
  }

  const [currentStatus, setCurrentStatus] = useState(getCurrentAdStatus())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(getCurrentAdStatus())
    }, 2000)

    return () => clearInterval(interval)
  }, [adBlockerDetected])

  // Auto-detect ad blocker on mount
  useEffect(() => {
    detectAdBlocker().then(setAdBlockerDetected)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "loaded":
        return "bg-green-500"
      case "loading":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      case "blocked":
        return "bg-orange-500"
      case "timeout":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Ad Loading Status Monitor
            <Button onClick={runAdTests} disabled={isTestingAds}>
              {isTestingAds ? "Testing..." : "Run Ad Tests"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Current Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentStatus.containerCount}</div>
              <div className="text-sm text-gray-600">Ad Containers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentStatus.scriptCount}</div>
              <div className="text-sm text-gray-600">Ad Scripts</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{currentStatus.hasAtOptions ? "✓" : "✗"}</div>
              <div className="text-sm text-gray-600">atOptions Set</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">
                {adBlockerDetected === null ? "?" : adBlockerDetected ? "🚫" : "✅"}
              </div>
              <div className="text-sm text-gray-600">Ad Blocker</div>
            </div>
          </div>

          {/* Ad Blocker Status */}
          {adBlockerDetected !== null && (
            <div
              className={`p-4 rounded-lg mb-4 ${adBlockerDetected ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">{adBlockerDetected ? "🚫" : "✅"}</span>
                <span className="font-semibold">
                  {adBlockerDetected ? "Ad Blocker Detected" : "No Ad Blocker Detected"}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-600">
                {adBlockerDetected
                  ? "Ads will be blocked and fallback content will be shown."
                  : "Ads should load normally if the ad server is reachable."}
              </p>
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Results</h3>
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                      <span className="font-mono text-sm">{result.adKey}</span>
                    </div>
                    {result.loadTime && <span className="text-sm text-gray-500">{result.loadTime}ms</span>}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>Script Exists: {result.scriptExists ? "✓" : "✗"}</div>
                    <div>Container: {result.containerExists ? "✓" : "✗"}</div>
                    <div>atOptions: {result.windowAtOptions ? "✓" : "✗"}</div>
                    <div>Online: {result.networkOnline ? "✓" : "✗"}</div>
                  </div>

                  {result.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Debug Information */}
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Debug Information</summary>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(
                  {
                    currentStatus,
                    userAgent: navigator.userAgent,
                    location: window.location.href,
                    timestamp: new Date().toISOString(),
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}
