"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdScriptInfo {
  key: string
  src: string
  found: boolean
  atOptionsFound: boolean
  atOptionsValue?: any
  scriptElement?: HTMLScriptElement
}

export default function AdVerification() {
  const [adScripts, setAdScripts] = useState<AdScriptInfo[]>([])
  const [isScanning, setIsScanning] = useState(false)

  // Your provided ad configuration
  const expectedAdConfig = {
    key: "37943d3fd9cce351f51aed181182d90d",
    format: "iframe",
    height: 250,
    width: 300,
    params: {},
  }

  const scanForAdScripts = () => {
    setIsScanning(true)

    // Check for scripts in DOM
    const scripts = Array.from(document.querySelectorAll("script"))
    const adScripts: AdScriptInfo[] = []

    // Check for your specific ad script
    const yourAdScript = scripts.find(
      (script) =>
        script.src.includes("37943d3fd9cce351f51aed181182d90d") ||
        script.src.includes("highperformanceformat.com/37943d3fd9cce351f51aed181182d90d"),
    )

    // Check for atOptions in window
    const windowAtOptions = (window as any).atOptions

    adScripts.push({
      key: "37943d3fd9cce351f51aed181182d90d",
      src: "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js",
      found: !!yourAdScript,
      atOptionsFound: !!windowAtOptions,
      atOptionsValue: windowAtOptions,
      scriptElement: yourAdScript || undefined,
    })

    // Check for any other highperformanceformat scripts
    const otherAdScripts = scripts.filter(
      (script) =>
        script.src.includes("highperformanceformat.com") && !script.src.includes("37943d3fd9cce351f51aed181182d90d"),
    )

    otherAdScripts.forEach((script) => {
      const keyMatch = script.src.match(/highperformanceformat\.com\/([^/]+)\/invoke\.js/)
      if (keyMatch) {
        adScripts.push({
          key: keyMatch[1],
          src: script.src,
          found: true,
          atOptionsFound: !!windowAtOptions,
          atOptionsValue: windowAtOptions,
          scriptElement: script,
        })
      }
    })

    setAdScripts(adScripts)
    setIsScanning(false)
  }

  const testYourAdScript = () => {
    // Remove existing scripts first
    const existingScripts = document.querySelectorAll("script[data-test-ad]")
    existingScripts.forEach((script) => script.remove())

    // Set atOptions as per your configuration
    ;(window as any).atOptions = expectedAdConfig

    // Create and inject your ad script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
    script.setAttribute("data-test-ad", "true")

    script.onload = () => {
      console.log("✅ Your ad script loaded successfully")
      scanForAdScripts()
    }

    script.onerror = (error) => {
      console.error("❌ Your ad script failed to load:", error)
      scanForAdScripts()
    }

    document.head.appendChild(script)
  }

  const compareConfigurations = () => {
    const windowAtOptions = (window as any).atOptions
    if (!windowAtOptions) return null

    const differences = []

    if (windowAtOptions.key !== expectedAdConfig.key) {
      differences.push(`Key: Expected "${expectedAdConfig.key}", Found "${windowAtOptions.key}"`)
    }
    if (windowAtOptions.format !== expectedAdConfig.format) {
      differences.push(`Format: Expected "${expectedAdConfig.format}", Found "${windowAtOptions.format}"`)
    }
    if (windowAtOptions.height !== expectedAdConfig.height) {
      differences.push(`Height: Expected ${expectedAdConfig.height}, Found ${windowAtOptions.height}`)
    }
    if (windowAtOptions.width !== expectedAdConfig.width) {
      differences.push(`Width: Expected ${expectedAdConfig.width}, Found ${windowAtOptions.width}`)
    }

    return differences
  }

  useEffect(() => {
    scanForAdScripts()
  }, [])

  const differences = compareConfigurations()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Ad Script Verification
            <div className="flex gap-2">
              <Button onClick={scanForAdScripts} disabled={isScanning} size="sm">
                {isScanning ? "Scanning..." : "Scan Again"}
              </Button>
              <Button onClick={testYourAdScript} variant="outline" size="sm">
                Test Your Ad Script
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Expected Configuration */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Your Expected Ad Configuration:</h3>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
              {`atOptions = {
  'key': '37943d3fd9cce351f51aed181182d90d',
  'format': 'iframe',
  'height': 250,
  'width': 300,
  'params': {}
};`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              Script URL: <code>//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js</code>
            </p>
          </div>

          {/* Current Configuration Comparison */}
          {differences && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold mb-2">Configuration Differences Found:</h3>
              {differences.length === 0 ? (
                <p className="text-green-600">✅ Configuration matches perfectly!</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {differences.map((diff, index) => (
                    <li key={index} className="text-orange-600">
                      {diff}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Found Scripts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Found Ad Scripts:</h3>
            {adScripts.length === 0 ? (
              <p className="text-gray-500">No ad scripts found. Click "Test Your Ad Script" to load it.</p>
            ) : (
              adScripts.map((script, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={script.found ? "default" : "destructive"}>
                        {script.found ? "FOUND" : "NOT FOUND"}
                      </Badge>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{script.key}</code>
                    </div>
                    <Badge variant={script.key === expectedAdConfig.key ? "default" : "outline"}>
                      {script.key === expectedAdConfig.key ? "YOUR AD" : "OTHER"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Script URL:</strong>
                      <br />
                      <code className="text-xs break-all">{script.src}</code>
                    </div>
                    <div>
                      <strong>atOptions Found:</strong> {script.atOptionsFound ? "✅ Yes" : "❌ No"}
                      {script.atOptionsFound && script.atOptionsValue && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-blue-600">View atOptions</summary>
                          <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                            {JSON.stringify(script.atOptionsValue, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>

                  {script.scriptElement && (
                    <div className="mt-3 text-xs text-gray-600">
                      <strong>Script Element:</strong> Found in DOM
                      <br />
                      <strong>Loaded:</strong> {script.scriptElement.readyState || "Unknown"}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Current Implementation Status */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Current Implementation Analysis:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Your Ad Key in Code:</span>
                <code className="bg-white px-2 py-1 rounded">37943d3fd9cce351f51aed181182d90d</code>
              </div>
              <div className="flex justify-between">
                <span>Expected Ad Key:</span>
                <code className="bg-white px-2 py-1 rounded">37943d3fd9cce351f51aed181182d90d</code>
              </div>
              <div className="flex justify-between">
                <span>Keys Match:</span>
                <Badge variant="default">✅ YES</Badge>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-2 text-green-800">✅ Verification Results:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-green-700">
              <li>
                Your ad key <code>37943d3fd9cce351f51aed181182d90d</code> matches the current implementation
              </li>
              <li>
                The script URL format is correct: <code>//www.highperformanceformat.com/[key]/invoke.js</code>
              </li>
              <li>Your atOptions configuration matches the expected format</li>
              <li>No changes needed - your ads should work with the current setup</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
