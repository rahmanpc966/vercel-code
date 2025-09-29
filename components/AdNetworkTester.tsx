"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NetworkTestResult {
  url: string
  status: "testing" | "success" | "failed" | "timeout"
  responseTime?: number
  error?: string
}

export default function AdNetworkTester() {
  const [testResults, setTestResults] = useState<NetworkTestResult[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const testUrls = [
    "https://www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js",
    "https://pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js",
    "https://www.googletagservices.com/tag/js/gpt.js", // Google AdSense for comparison
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", // Google AdSense for comparison
  ]

  const testNetworkConnectivity = async () => {
    setIsTesting(true)
    const results: NetworkTestResult[] = []

    for (const url of testUrls) {
      const result: NetworkTestResult = {
        url,
        status: "testing"
      }
      results.push(result)
      setTestResults([...results])

      try {
        const startTime = Date.now()
        
        // Test with fetch first
        const response = await fetch(url, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-cache"
        })
        
        const responseTime = Date.now() - startTime
        
        result.status = "success"
        result.responseTime = responseTime
        
      } catch (error) {
        result.status = "failed"
        result.error = error instanceof Error ? error.message : "Unknown error"
      }

      setTestResults([...results])
    }

    setIsTesting(false)
  }

  const testScriptLoading = async () => {
    setIsTesting(true)
    const results: NetworkTestResult[] = []

    for (const url of testUrls) {
      const result: NetworkTestResult = {
        url,
        status: "testing"
      }
      results.push(result)
      setTestResults([...results])

      try {
        const startTime = Date.now()
        
        // Test actual script loading
        const script = document.createElement("script")
        script.src = url
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
        
        // Clean up
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        
      } catch (error) {
        result.status = "failed"
        result.error = error instanceof Error ? error.message : "Unknown error"
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Ad Network Connectivity Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testNetworkConnectivity} disabled={isTesting}>
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
                    <span className="text-sm font-mono">{result.url}</span>
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

          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-semibold mb-2">Diagnostic Information:</h4>
            <div className="text-sm space-y-1">
              <div><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'Server-side'}</div>
              <div><strong>Online Status:</strong> {typeof window !== 'undefined' ? (navigator.onLine ? "Online" : "Offline") : 'Unknown'}</div>
              <div><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</div>
              <div><strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'Unknown'}</div>
              <div><strong>Ad Blocker Detected:</strong> {typeof window !== 'undefined' ? (document.querySelector('.adsbox') ? "Unknown" : "Testing...") : 'Unknown'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
