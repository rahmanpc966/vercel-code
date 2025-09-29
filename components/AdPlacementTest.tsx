"use client"

import { useEffect, useState } from "react"
import { PRODUCTION_AD_CONFIG } from "@/lib/production-ad-config"

export default function AdPlacementTest() {
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    const testPlacementConfig = () => {
      const results: string[] = []
      
      // Test different placements
      const testPlacements = ["hero", "sidebar", "footer", "inline", "content"]
      
      testPlacements.forEach(placement => {
        try {
          const configs = PRODUCTION_AD_CONFIG.AD_PLACEMENTS
          let found = false
          
          for (const pageType in configs) {
            const pageConfig = configs[pageType as keyof typeof configs]
            if (pageConfig && placement in pageConfig) {
              found = true
              const config = pageConfig[placement as keyof typeof pageConfig]
              results.push(`✅ ${placement}: Found in ${pageType} - ${JSON.stringify(config)}`)
              break
            }
          }
          
          if (!found) {
            results.push(`❌ ${placement}: Not found in any page type`)
          }
        } catch (error) {
          results.push(`❌ ${placement}: Error - ${error}`)
        }
      })
      
      setTestResults(results)
    }

    testPlacementConfig()
  }, [])

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Ad Placement Configuration Test</h3>
      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="text-sm font-mono">
            {result}
          </div>
        ))}
      </div>
    </div>
  )
}
