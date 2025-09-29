"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AdManagerContextType {
  adBlockerDetected: boolean | null
  consentGiven: boolean
  setConsent: (consent: boolean) => void
  refreshAllAds: () => void
}

const AdManagerContext = createContext<AdManagerContextType | null>(null)

export function AdManagerProvider({ children }: { children: React.ReactNode }) {
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean | null>(null)
  const [consentGiven, setConsentGiven] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Detect ad blocker on mount
  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        document.body.appendChild(testAd)

        const isBlocked = testAd.offsetHeight === 0
        document.body.removeChild(testAd)

        setAdBlockerDetected(isBlocked)
      } catch {
        setAdBlockerDetected(true)
      }
    }

    detectAdBlocker()
  }, [])

  // Check for existing consent
  useEffect(() => {
    const consent = localStorage.getItem("ad-consent")
    setConsentGiven(consent === "true")
  }, [])

  const setConsent = (consent: boolean) => {
    setConsentGiven(consent)
    localStorage.setItem("ad-consent", consent.toString())
  }

  const refreshAllAds = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <AdManagerContext.Provider
      value={{
        adBlockerDetected,
        consentGiven,
        setConsent,
        refreshAllAds,
      }}
    >
      {children}
    </AdManagerContext.Provider>
  )
}

export function useAdManager() {
  const context = useContext(AdManagerContext)
  if (!context) {
    throw new Error("useAdManager must be used within AdManagerProvider")
  }
  return context
}
