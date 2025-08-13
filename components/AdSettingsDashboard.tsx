"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VisibleAdUnit from "./VisibleAdUnit"
import InvisibleAdUnit from "./InvisibleAdUnit"

interface AdConfig {
  key: string
  name: string
  width: number
  height: number
  enabled: boolean
}

const AD_CONFIGS: AdConfig[] = [
  { key: "37943d3fd9cce351f51aed181182d90d", name: "Main Banner", width: 728, height: 90, enabled: true },
  { key: "37943d3fd9cce351f51aed181182d90d", name: "Sidebar", width: 300, height: 250, enabled: true },
  { key: "37943d3fd9cce351f51aed181182d90d", name: "Mobile Banner", width: 320, height: 50, enabled: true },
]

export default function AdSettingsDashboard() {
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean | null>(null)
  const [globalAdStatus, setGlobalAdStatus] = useState<"enabled" | "disabled">("enabled")
  const [testMode, setTestMode] = useState(false)
  const [adConfigs, setAdConfigs] = useState<AdConfig[]>(AD_CONFIGS)

  // Detect ad blocker
  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Method 1: Try to create a test ad element
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox ad-banner"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        testAd.style.height = "1px"
        document.body.appendChild(testAd)

        const isBlocked = testAd.offsetHeight === 0 || window.getComputedStyle(testAd).display === "none"
        document.body.removeChild(testAd)

        // Method 2: Try to fetch ad-related resource
        try {
          await fetch("https://www.googletagservices.com/tag/js/gpt.js", {
            method: "HEAD",
            mode: "no-cors",
            signal: AbortSignal.timeout(3000),
          })
        } catch {
          setAdBlockerDetected(true)
          return
        }

        setAdBlockerDetected(isBlocked)
      } catch {
        setAdBlockerDetected(true)
      }
    }

    detectAdBlocker()
  }, [])

  const getCurrentAdStats = () => {
    const adContainers = document.querySelectorAll(".ad-container")
    const adScripts = document.querySelectorAll("script[data-ad-key]")
    const hasAtOptions = !!(window as any).atOptions

    return {
      containerCount: adContainers.length,
      scriptCount: adScripts.length,
      hasAtOptions,
      atOptionsValue: (window as any).atOptions,
    }
  }

  const [adStats, setAdStats] = useState(getCurrentAdStats())

  useEffect(() => {
    const interval = setInterval(() => {
      setAdStats(getCurrentAdStats())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const testAdScript = () => {
    // Remove existing test scripts
    const existingScripts = document.querySelectorAll("script[data-test-ad]")
    existingScripts.forEach((script) => script.remove())

    // Set atOptions
    ;(window as any).atOptions = {
      key: "37943d3fd9cce351f51aed181182d90d",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    }

    // Create test script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
    script.setAttribute("data-test-ad", "true")

    script.onload = () => {
      console.log("✅ Test ad script loaded successfully")
      alert("✅ Ad script loaded successfully! Check console for details.")
    }

    script.onerror = () => {
      console.error("❌ Test ad script failed to load")
      alert("❌ Ad script failed to load. Likely blocked by ad blocker or network issue.")
    }

    document.head.appendChild(script)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ad Settings Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => setTestMode(!testMode)} variant={testMode ? "default" : "outline"}>
            {testMode ? "Exit Test Mode" : "Enable Test Mode"}
          </Button>
          <Button onClick={testAdScript} variant="outline">
            Test Ad Script
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{adStats.containerCount}</div>
            <div className="text-sm text-gray-600">Ad Containers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{adStats.scriptCount}</div>
            <div className="text-sm text-gray-600">Ad Scripts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{adStats.hasAtOptions ? "✓" : "✗"}</div>
            <div className="text-sm text-gray-600">atOptions Set</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {adBlockerDetected === null ? "?" : adBlockerDetected ? "🚫" : "✅"}
            </div>
            <div className="text-sm text-gray-600">Ad Blocker Status</div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Blocker Warning */}
      {adBlockerDetected && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚫</span>
              <div>
                <h3 className="font-semibold text-red-800">Ad Blocker Detected</h3>
                <p className="text-red-700 text-sm">
                  Ads are being blocked. Users with ad blockers will not see advertisements. Consider showing a message
                  asking users to disable ad blockers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Ad Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Live Ad Units Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Visible Ad Unit (Test)</h3>
              <VisibleAdUnit testMode={testMode} showFallback={true} width={300} height={250} />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Invisible Ad Unit (Current)</h3>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <InvisibleAdUnit width={300} height={250} />
                <p className="text-sm text-gray-500 mt-2">
                  This is your current invisible ad unit. It shows nothing when ads fail to load.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Banner Ad (728x90)</h3>
              <VisibleAdUnit testMode={testMode} showFallback={true} width={728} height={90} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ad Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Current Ad Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Your Ad Key:</h4>
            <code className="bg-white px-3 py-1 rounded border">37943d3fd9cce351f51aed181182d90d</code>

            <h4 className="font-semibold mb-2 mt-4">Script URL:</h4>
            <code className="bg-white px-3 py-1 rounded border text-sm">
              //www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js
            </code>

            <h4 className="font-semibold mb-2 mt-4">Current atOptions:</h4>
            <pre className="bg-white p-3 rounded border text-sm overflow-x-auto">
              {JSON.stringify(
                adStats.atOptionsValue || {
                  key: "37943d3fd9cce351f51aed181182d90d",
                  format: "iframe",
                  height: 250,
                  width: 300,
                  params: {},
                },
                null,
                2,
              )}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <div>
                <h4 className="font-semibold">Switch to Visible Ad Units</h4>
                <p className="text-sm text-gray-600">
                  Replace `InvisibleAdUnit` with `VisibleAdUnit` to show fallback content when ads are blocked. This
                  provides better user experience and shows users that ads support your site.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">💡</span>
              <div>
                <h4 className="font-semibold">Add Ad Blocker Detection</h4>
                <p className="text-sm text-gray-600">
                  Show a polite message to users with ad blockers asking them to disable it to support your site.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-xl">⚠️</span>
              <div>
                <h4 className="font-semibold">Monitor Ad Performance</h4>
                <p className="text-sm text-gray-600">
                  Regularly check this dashboard to ensure ads are loading properly for your users.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
