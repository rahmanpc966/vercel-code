import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ProductionAdUnit from "@/components/ProductionAdUnit"
import AdRevenueOptimizer from "@/components/AdRevenueOptimizer"
import FallbackMonetization from "@/components/FallbackMonetization"

export const metadata: Metadata = {
  title: "Production Ad System - YT2MP3",
  description: "Production-ready ad system with multiple networks, fallback strategies, and revenue optimization",
}

export default function ProductionAdsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Production Ad System</h1>
          
          <div className="space-y-8">
            {/* Production Ad Units */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Production Ad Units</h2>
              
              {/* Hero Ad */}
              <div>
                <h3 className="text-lg font-medium mb-4">Hero Ad (728x90)</h3>
                <ProductionAdUnit
                  adSlot="hero-001"
                  placement="hero"
                  adFormat="horizontal"
                  width={728}
                  height={90}
                  testMode={true}
                  className="mx-auto"
                />
              </div>

              {/* Rectangle Ads */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Sidebar Ad (300x250)</h3>
                  <ProductionAdUnit
                    adSlot="sidebar-001"
                    placement="sidebar"
                    adFormat="rectangle"
                    width={300}
                    height={250}
                    testMode={true}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Content Ad (300x250)</h3>
                  <ProductionAdUnit
                    adSlot="content-001"
                    placement="inline"
                    adFormat="rectangle"
                    width={300}
                    height={250}
                    testMode={true}
                  />
                </div>
              </div>

              {/* Footer Ad */}
              <div>
                <h3 className="text-lg font-medium mb-4">Footer Ad (728x90)</h3>
                <ProductionAdUnit
                  adSlot="footer-001"
                  placement="footer"
                  adFormat="horizontal"
                  width={728}
                  height={90}
                  testMode={true}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Revenue Optimizer */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Revenue Optimization Dashboard</h2>
              <AdRevenueOptimizer />
            </div>

            {/* Fallback Monetization */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Fallback Monetization Strategies</h2>
              <FallbackMonetization />
            </div>

            {/* Production Configuration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Production Configuration</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded border">
                    <h3 className="font-semibold mb-2">Primary Ad Networks</h3>
                    <ul className="text-sm space-y-1">
                      <li>• HighPerformanceFormat (Priority 1)</li>
                      <li>• RevenueCPMGate (Priority 2)</li>
                      <li>• Google AdSense (Fallback)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white rounded border">
                    <h3 className="font-semibold mb-2">Performance Settings</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Script Timeout: 10 seconds</li>
                      <li>• Retry Attempts: 3</li>
                      <li>• Fallback Delay: 2 seconds</li>
                      <li>• Monitoring Interval: 30 seconds</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-white rounded border">
                  <h3 className="font-semibold mb-2">User Experience Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li>• Graceful degradation</li>
                      <li>• Mobile optimization</li>
                      <li>• Loading indicators</li>
                      <li>• Fallback messages</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• Ad blocker detection</li>
                      <li>• Network status monitoring</li>
                      <li>• Performance analytics</li>
                      <li>• Revenue tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Implementation Guide</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Environment Variables</h3>
                  <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm">
                    <div>NEXT_PUBLIC_AD_KEY=37943d3fd9cce351f51aed181182d90d</div>
                    <div>NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-adsense-id</div>
                    <div>NEXT_PUBLIC_REVENUE_CPM_GATE_KEY=e4386a13de3b837cb97ad9287321b380</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Usage in Components</h3>
                  <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm">
                    <div>{"<ProductionAdUnit"}</div>
                    <div>{"  adSlot=\"hero-001\""}</div>
                    <div>{"  placement=\"hero\""}</div>
                    <div>{"  adFormat=\"horizontal\""}</div>
                    <div>{"  width={728}"}</div>
                    <div>{"  height={90}"}</div>
                    <div>{"  testMode={true}"}</div>
                    <div>{"/>"}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Production Deployment</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Set environment variables in production</li>
                    <li>• Configure ad network accounts</li>
                    <li>• Test ad loading in production environment</li>
                    <li>• Monitor ad performance and revenue</li>
                    <li>• Implement fallback monetization strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
