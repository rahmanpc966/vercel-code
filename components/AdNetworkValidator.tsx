"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NetworkTestResult {
  url: string
  name: string
  status: "testing" | "success" | "failed" | "timeout"
  responseTime?: number
  error?: string
  accessible: boolean
}

export default function AdNetworkValidator() {
  const [testResults, setTestResults] = useState<NetworkTestResult[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [overallStatus, setOverallStatus] = useState<"unknown" | "accessible" | "blocked" | "mixed">("unknown")

  const testUrls = [
    {
      url: "https://www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js",
      name: "HighPerformanceFormat",
      key: "37943d3fd9cce351f51aed181182d90d"
    },
    {
      url: "https://pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js",
      name: "RevenueCPMGate",
      key: "e4386a13de3b837cb97ad9287321b380"
    },
    {
      url: "https://www.googletagservices.com/tag/js/gpt.js",
      name: "Google AdSense (Reference)",
      key: "gpt"
    }
  ]

  const testAllNetworks = async () => {
    setIsTesting(true)
    const results: NetworkTestResult[] = []

    for (const testUrl of testUrls) {
      const result: NetworkTestResult = {
        url: testUrl.url,
        name: testUrl.name,
        status: "testing",
        accessible: false
      }
      results.push(result)
      setTestResults([...results])

      try {
        const startTime = Date.now()
        
        // Test 1: Basic fetch
        const response = await fetch(testUrl.url, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-cache"
        })
        
        const responseTime = Date.now() - startTime
        
        result.status = "success"
        result.responseTime = responseTime
        result.accessible = true
        
      } catch (error) {
        result.status = "failed"
        result.error = error instanceof Error ? error.message : "Network error"
        result.accessible = false
      }

      setTestResults([...results])
    }

    // Determine overall status
    const accessibleCount = results.filter(r => r.accessible).length
    if (accessibleCount === 0) {
      setOverallStatus("blocked")
    } else if (accessibleCount === results.length) {
      setOverallStatus("accessible")
    } else {
      setOverallStatus("mixed")
    }

    setIsTesting(false)
  }

  const testScriptLoading = async () => {
    setIsTesting(true)
    const results: NetworkTestResult[] = []

    for (const testUrl of testUrls) {
      const result: NetworkTestResult = {
        url: testUrl.url,
        name: testUrl.name,
        status: "testing",
        accessible: false
      }
      results.push(result)
      setTestResults([...results])

      try {
        const startTime = Date.now()
        
        // Test actual script loading
        const script = document.createElement("script")
        script.src = testUrl.url
        script.async = true
        
        const loadPromise = new Promise((resolve, reject) => {
          script.onload = () => resolve(true)
          script.onerror = () => reject(new Error("Script failed to load"))
          
          // Timeout after 10 seconds
          setTimeout(() => reject(new Error("Script loading timeout")), 10000)
        })

        document.head.appendChild(script)
        await loadPromise
        
        const responseTime = Date.now() - startTime
        
        result.status = "success"
        result.responseTime = responseTime
        result.accessible = true
        
        // Clean up
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        
      } catch (error) {
        result.status = "failed"
        result.error = error instanceof Error ? error.message : "Script loading failed"
        result.accessible = false
      }

      setTestResults([...results])
    }

    setIsTesting(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "testing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅"
      case "failed":
        return "❌"
      case "testing":
        return "⏳"
      default:
        return "❓"
    }
  }

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case "accessible":
        return "bg-green-100 text-green-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "mixed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Ad Network Validator
            <Badge className={getOverallStatusColor()}>
              {overallStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testAllNetworks} disabled={isTesting}>
              {isTesting ? "Testing..." : "Test Network Connectivity"}
            </Button>
            <Button onClick={testScriptLoading} disabled={isTesting} variant="outline">
              {isTesting ? "Testing..." : "Test Script Loading"}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results:</h3>
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-2">
                    <span>{getStatusIcon(result.status)}</span>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-semibold">{result.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.responseTime && `${result.responseTime}ms`}
                    {result.error && (
                      <div className="text-red-600 text-xs mt-1">{result.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations based on results */}
          {overallStatus === "blocked" && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">🚫 All Ad Networks Blocked</h4>
              <div className="text-sm text-red-700 space-y-1">
                <div>• Check if you're using an ad blocker</div>
                <div>• Verify network firewall settings</div>
                <div>• Try from a different network (mobile data)</div>
                <div>• Check if your ISP blocks ad domains</div>
              </div>
            </div>
          )}

          {overallStatus === "mixed" && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Partial Network Access</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <div>• Some ad networks are accessible</div>
                <div>• Check which specific networks are blocked</div>
                <div>• Consider using only accessible networks</div>
              </div>
            </div>
          )}

          {overallStatus === "accessible" && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ All Networks Accessible</h4>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Ad networks are reachable</div>
                <div>• Check ad blocker settings</div>
                <div>• Verify ad keys are valid and active</div>
              </div>
            </div>
          )}

          {/* Manual URL Testing */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🔗 Manual URL Testing</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <div>Click these links to test ad network accessibility:</div>
              <div className="space-y-1">
                <div>
                  <a 
                    href="https://www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HighPerformanceFormat Script
                  </a>
                </div>
                <div>
                  <a 
                    href="https://pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    RevenueCPMGate Script
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
