// Production Ad Configuration
export const PRODUCTION_AD_CONFIG = {
  // Primary Ad Networks (in order of preference)
  PRIMARY_NETWORKS: [
    {
      name: "HighPerformanceFormat",
      key: "37943d3fd9cce351f51aed181182d90d",
      scriptUrl: "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js",
      type: "iframe",
      priority: 1,
      enabled: true
    },
    {
      name: "RevenueCPMGate",
      key: "e4386a13de3b837cb97ad9287321b380",
      scriptUrl: "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js",
      type: "container",
      priority: 2,
      enabled: true
    }
  ],

  // Fallback Ad Networks
  FALLBACK_NETWORKS: [
    {
      name: "Google AdSense",
      clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1234567890123456",
      scriptUrl: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      type: "adsense",
      priority: 3,
      enabled: false // Enable when you have real AdSense client ID
    }
  ],

  // Ad Placements Configuration
  AD_PLACEMENTS: {
    HOMEPAGE: {
      hero: { 
        width: 728, 
        height: 90, 
        format: "horizontal",
        priority: "high",
        networks: ["HighPerformanceFormat", "RevenueCPMGate"]
      },
      middle: { 
        width: 300, 
        height: 250, 
        format: "rectangle",
        priority: "high",
        networks: ["HighPerformanceFormat", "RevenueCPMGate"]
      },
      footer: { 
        width: 728, 
        height: 90, 
        format: "horizontal",
        priority: "medium",
        networks: ["RevenueCPMGate", "HighPerformanceFormat"]
      }
    },
    CONTENT_PAGES: {
      sidebar: { 
        width: 300, 
        height: 250, 
        format: "rectangle",
        priority: "medium",
        networks: ["RevenueCPMGate"]
      },
      inline: { 
        width: 300, 
        height: 250, 
        format: "rectangle",
        priority: "low",
        networks: ["HighPerformanceFormat"]
      }
    }
  },

  // Performance Settings
  PERFORMANCE: {
    SCRIPT_TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    FALLBACK_DELAY: 2000, // 2 seconds
    MONITORING_INTERVAL: 30000, // 30 seconds
    CACHE_DURATION: 300000 // 5 minutes
  },

  // User Experience Settings
  UX: {
    SHOW_FALLBACK_MESSAGE: true,
    FALLBACK_MESSAGE: "Please consider disabling your ad blocker to support our free service",
    SHOW_LOADING_INDICATOR: true,
    GRACEFUL_DEGRADATION: true,
    MOBILE_OPTIMIZATION: true
  },

  // Analytics and Monitoring
  ANALYTICS: {
    TRACK_AD_LOADING: true,
    TRACK_AD_BLOCKER_DETECTION: true,
    TRACK_FALLBACK_USAGE: true,
    TRACK_REVENUE_METRICS: true
  }
}

// Ad Network Status Manager
export class AdNetworkManager {
  private static instance: AdNetworkManager
  private networkStatus: Map<string, boolean> = new Map()
  private loadingAttempts: Map<string, number> = new Map()
  private lastChecked: Map<string, number> = new Map()

  static getInstance(): AdNetworkManager {
    if (!AdNetworkManager.instance) {
      AdNetworkManager.instance = new AdNetworkManager()
    }
    return AdNetworkManager.instance
  }

  // Check if network is available
  isNetworkAvailable(networkName: string): boolean {
    const lastCheck = this.lastChecked.get(networkName) || 0
    const now = Date.now()
    
    // Cache network status for 5 minutes
    if (now - lastCheck > PRODUCTION_AD_CONFIG.PERFORMANCE.CACHE_DURATION) {
      return this.networkStatus.get(networkName) || false
    }
    
    return this.networkStatus.get(networkName) || false
  }

  // Mark network as available
  markNetworkAvailable(networkName: string): void {
    this.networkStatus.set(networkName, true)
    this.lastChecked.set(networkName, Date.now())
    this.loadingAttempts.set(networkName, 0)
  }

  // Mark network as unavailable
  markNetworkUnavailable(networkName: string): void {
    this.networkStatus.set(networkName, false)
    this.lastChecked.set(networkName, Date.now())
  }

  // Get next available network
  getNextAvailableNetwork(placement: string): string | null {
    const placementConfig = this.getPlacementConfig(placement)
    if (!placementConfig) return null

    for (const networkName of placementConfig.networks) {
      if (this.isNetworkAvailable(networkName)) {
        return networkName
      }
    }

    return null
  }

  // Get placement configuration
  private getPlacementConfig(placement: string): any {
    const configs = PRODUCTION_AD_CONFIG.AD_PLACEMENTS
    for (const pageType in configs) {
      const pageConfig = configs[pageType as keyof typeof configs]
      if (pageConfig && placement in pageConfig) {
        return pageConfig[placement as keyof typeof pageConfig]
      }
    }
    return null
  }

  // Get all network statuses
  getAllNetworkStatuses(): Record<string, boolean> {
    const statuses: Record<string, boolean> = {}
    for (const [network, status] of this.networkStatus) {
      statuses[network] = status
    }
    return statuses
  }
}

// Production Ad Analytics
export class AdAnalytics {
  private static instance: AdAnalytics
  private metrics: Map<string, any> = new Map()

  static getInstance(): AdAnalytics {
    if (!AdAnalytics.instance) {
      AdAnalytics.instance = new AdAnalytics()
    }
    return AdAnalytics.instance
  }

  // Track ad loading attempt
  trackAdLoading(networkName: string, success: boolean, loadTime: number): void {
    const key = `ad_loading_${networkName}`
    const current = this.metrics.get(key) || { attempts: 0, successes: 0, totalTime: 0 }
    
    current.attempts++
    if (success) current.successes++
    current.totalTime += loadTime
    
    this.metrics.set(key, current)
  }

  // Track ad blocker detection
  trackAdBlockerDetection(detected: boolean): void {
    const key = "ad_blocker_detection"
    const current = this.metrics.get(key) || { detected: 0, notDetected: 0 }
    
    if (detected) {
      current.detected++
    } else {
      current.notDetected++
    }
    
    this.metrics.set(key, current)
  }

  // Track fallback usage
  trackFallbackUsage(placement: string): void {
    const key = `fallback_${placement}`
    const current = this.metrics.get(key) || 0
    this.metrics.set(key, current + 1)
  }

  // Get analytics data
  getAnalytics(): Record<string, any> {
    const data: Record<string, any> = {}
    for (const [key, value] of this.metrics) {
      data[key] = value
    }
    return data
  }
}
