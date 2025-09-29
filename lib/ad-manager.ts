// Global Ad Manager to handle multiple ad instances
class AdManager {
  private static instance: AdManager
  private scriptsLoaded: Set<string> = new Set()
  private containersCreated: Set<string> = new Set()

  static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager()
    }
    return AdManager.instance
  }

  // Check if a script is already loaded
  isScriptLoaded(scriptUrl: string): boolean {
    return this.scriptsLoaded.has(scriptUrl)
  }

  // Mark script as loaded
  markScriptLoaded(scriptUrl: string): void {
    this.scriptsLoaded.add(scriptUrl)
  }

  // Check if container already exists
  isContainerCreated(containerId: string): boolean {
    return this.containersCreated.has(containerId)
  }

  // Mark container as created
  markContainerCreated(containerId: string): void {
    this.containersCreated.add(containerId)
  }

  // Load HighPerformanceFormat script (global, only once)
  async loadHighPerformanceFormatScript(): Promise<boolean> {
    const scriptUrl = "//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"
    
    if (this.isScriptLoaded(scriptUrl)) {
      console.log("✅ HighPerformanceFormat script already loaded, reusing")
      return true
    }

    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = scriptUrl
      script.setAttribute("data-ad-key", "37943d3fd9cce351f51aed181182d90d")
      script.setAttribute("data-global-script", "true")

      script.onload = () => {
        console.log("✅ HighPerformanceFormat script loaded globally")
        this.markScriptLoaded(scriptUrl)
        resolve(true)
      }

      script.onerror = (error) => {
        console.error("❌ HighPerformanceFormat script failed:", error)
        resolve(false)
      }

      document.head.appendChild(script)
    })
  }

  // Load RevenueCPMGate script (global, only once)
  async loadRevenueCPMGateScript(): Promise<boolean> {
    const scriptUrl = "//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"
    
    if (this.isScriptLoaded(scriptUrl)) {
      console.log("✅ RevenueCPMGate script already loaded, reusing")
      return true
    }

    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.async = true
      script.setAttribute("data-cfasync", "false")
      script.src = scriptUrl
      script.setAttribute("data-global-script", "true")

      script.onload = () => {
        console.log("✅ RevenueCPMGate script loaded globally")
        this.markScriptLoaded(scriptUrl)
        resolve(true)
      }

      script.onerror = (error) => {
        console.error("❌ RevenueCPMGate script failed:", error)
        resolve(false)
      }

      document.head.appendChild(script)
    })
  }

  // Create RevenueCPMGate container (unique per ad instance)
  createRevenueCPMGateContainer(adSlot: string, width: number, height: number, containerElement: HTMLElement): string {
    const uniqueId = `container-e4386a13de3b837cb97ad9287321b380-${adSlot}`
    
    if (this.isContainerCreated(uniqueId)) {
      console.log(`✅ RevenueCPMGate container ${uniqueId} already exists`)
      return uniqueId
    }

    const container = document.createElement("div")
    container.id = uniqueId
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.margin = "0 auto"

    containerElement.appendChild(container)
    this.markContainerCreated(uniqueId)

    console.log(`✅ RevenueCPMGate container created: ${uniqueId}`)
    return uniqueId
  }

  // Set atOptions for HighPerformanceFormat
  setAtOptions(width: number, height: number): void {
    if (typeof window !== "undefined") {
      ;(window as any).atOptions = {
        key: "37943d3fd9cce351f51aed181182d90d",
        format: "iframe",
        height: height,
        width: width,
        params: {},
      }
      console.log("✅ atOptions set:", (window as any).atOptions)
    }
  }

  // Get debug information
  getDebugInfo() {
    return {
      scriptsLoaded: Array.from(this.scriptsLoaded),
      containersCreated: Array.from(this.containersCreated),
      atOptionsSet: !!(window as any).atOptions,
      atOptionsValue: (window as any).atOptions,
    }
  }
}

export default AdManager
