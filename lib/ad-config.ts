// Ad Network Configuration
export const AD_CONFIG = {
  // HighPerformanceFormat Configuration
  HIGH_PERFORMANCE_FORMAT: {
    enabled: true,
    baseUrl: "https://www.highperformanceformat.com",
    defaultKey: "37943d3fd9cce351f51aed181182d90d",
    timeout: 10000,
  },
  
  // Google AdSense Configuration
  ADSENSE: {
    enabled: false, // Set to true when you have real AdSense client ID
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1234567890123456",
    baseUrl: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  },
  
  // Ad Blocker Detection
  AD_BLOCKER_DETECTION: {
    enabled: true,
    testUrls: [
      "https://www.googletagservices.com/tag/js/gpt.js",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ],
    timeout: 3000,
  },
  
  // Development Settings
  DEVELOPMENT: {
    skipAds: process.env.NODE_ENV === "development" && process.env.SKIP_ADS === "true",
    testMode: process.env.NODE_ENV === "development",
  }
}

// Ad Placement Configuration
export const AD_PLACEMENTS = {
  HOMEPAGE: {
    hero: { width: 728, height: 90, format: "horizontal" },
    middle: { width: 300, height: 250, format: "rectangle" },
    footer: { width: 728, height: 90, format: "horizontal" },
  },
  CONTENT_PAGES: {
    sidebar: { width: 300, height: 250, format: "rectangle" },
    inline: { width: 300, height: 250, format: "rectangle" },
  }
}

// Get ad key from environment or use default
export const getAdKey = (): string => {
  return process.env.NEXT_PUBLIC_AD_KEY || AD_CONFIG.HIGH_PERFORMANCE_FORMAT.defaultKey
}

// Check if ads should be loaded
export const shouldLoadAds = (): boolean => {
  if (AD_CONFIG.DEVELOPMENT.skipAds) return false
  if (typeof window === "undefined") return false
  return true
}
