"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdNetworkManager, AdAnalytics } from "@/lib/production-ad-config"

interface AdRevenueOptimizerProps {
  className?: string
}

export default function AdRevenueOptimizer({ className = "" }: AdRevenueOptimizerProps) {
  const [analytics, setAnalytics] = useState<any>({})
  const [networkStatuses, setNetworkStatuses] = useState<Record<string, boolean>>({})
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string[]>([])

  const adManager = AdNetworkManager.getInstance()
  const analyticsManager = AdAnalytics.getInstance()

  useEffect(() => {
    const updateData = () => {
      setAnalytics(analyticsManager.getAnalytics())
      setNetworkStatuses(adManager.getAllNetworkStatuses())
      generateOptimizationSuggestions()
    }

    updateData()
    const interval = setInterval(updateData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const generateOptimizationSuggestions = () => {
    const suggestions: string[] = []
    const analytics = analyticsManager.getAnalytics()
    const networkStatuses = adManager.getAllNetworkStatuses()

    // Check ad blocker detection rate
    const adBlockerData = analytics.ad_blocker_detection
    if (adBlockerData) {
      const total = adBlockerData.detected + adBlockerData.notDetected
      const blockedRate = (adBlockerData.detected / total) * 100
      
      if (blockedRate > 50) {
        suggestions.push(`High ad blocker rate (${blockedRate.toFixed(1)}%) - Consider implementing alternative monetization`)
      }
    }

    // Check network availability
    const availableNetworks = Object.values(networkStatuses).filter(status => status).length
    if (availableNetworks === 0) {
      suggestions.push("No ad networks available - Check network connectivity and ad network status")
    } else if (availableNetworks === 1) {
      suggestions.push("Limited ad network availability - Consider adding more ad networks")
    }

    // Check fallback usage
    const fallbackKeys = Object.keys(analytics).filter(key => key.startsWith('fallback_'))
    if (fallbackKeys.length > 0) {
      const totalFallbacks = fallbackKeys.reduce((sum, key) => sum + (analytics[key] || 0), 0)
      if (totalFallbacks > 10) {
        suggestions.push(`High fallback usage (${totalFallbacks}) - Optimize ad loading strategy`)
      }
    }

    // Check ad loading success rates
    const loadingKeys = Object.keys(analytics).filter(key => key.startsWith('ad_loading_'))
    if (loadingKeys.length > 0) {
      loadingKeys.forEach(key => {
        const data = analytics[key]
        if (data && data.attempts > 0) {
          const successRate = (data.successes / data.attempts) * 100
          if (successRate < 50) {
            const networkName = key.replace('ad_loading_', '')
            suggestions.push(`Low success rate for ${networkName} (${successRate.toFixed(1)}%) - Check network configuration`)
          }
        }
      })
    }

    setOptimizationSuggestions(suggestions)
  }

  const getNetworkStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getNetworkStatusIcon = (status: boolean) => {
    return status ? "✅" : "❌"
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Network Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(networkStatuses).map(([network, status]) => (
              <div key={network} className="text-center p-4 border rounded">
                <div className="text-2xl mb-2">{getNetworkStatusIcon(status)}</div>
                <div className="font-semibold">{network}</div>
                <Badge className={getNetworkStatusColor(status)}>
                  {status ? "Available" : "Unavailable"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Ad Blocker Detection */}
            {analytics.ad_blocker_detection && (
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2">Ad Blocker Detection</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {analytics.ad_blocker_detection.detected}
                    </div>
                    <div className="text-sm text-gray-600">Blocked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.ad_blocker_detection.notDetected}
                    </div>
                    <div className="text-sm text-gray-600">Not Blocked</div>
                  </div>
                </div>
              </div>
            )}

            {/* Ad Loading Performance */}
            {Object.keys(analytics).filter(key => key.startsWith('ad_loading_')).map(key => {
              const data = analytics[key]
              const networkName = key.replace('ad_loading_', '')
              const successRate = data.attempts > 0 ? (data.successes / data.attempts) * 100 : 0
              const avgLoadTime = data.successes > 0 ? data.totalTime / data.successes : 0

              return (
                <div key={key} className="p-4 bg-gray-50 rounded">
                  <h4 className="font-semibold mb-2">{networkName} Performance</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{data.attempts}</div>
                      <div className="text-sm text-gray-600">Total Attempts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{successRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{avgLoadTime.toFixed(0)}ms</div>
                      <div className="text-sm text-gray-600">Avg Load Time</div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Fallback Usage */}
            {Object.keys(analytics).filter(key => key.startsWith('fallback_')).length > 0 && (
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2">Fallback Usage</h4>
                <div className="space-y-2">
                  {Object.keys(analytics).filter(key => key.startsWith('fallback_')).map(key => {
                    const placement = key.replace('fallback_', '')
                    const count = analytics[key]
                    return (
                      <div key={key} className="flex justify-between">
                        <span>{placement}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      {optimizationSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {optimizationSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <span className="text-yellow-600">💡</span>
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                // Reset all network statuses
                Object.keys(networkStatuses).forEach(network => {
                  adManager.markNetworkUnavailable(network)
                })
                setNetworkStatuses({})
              }}
              variant="outline"
            >
              Reset Network Status
            </Button>
            <Button 
              onClick={() => {
                // Clear analytics
                setAnalytics({})
              }}
              variant="outline"
            >
              Clear Analytics
            </Button>
            <Button 
              onClick={() => {
                // Export analytics data
                const data = JSON.stringify(analytics, null, 2)
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'ad-analytics.json'
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Export Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
