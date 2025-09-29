import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import WorkingAdUnit from "@/components/WorkingAdUnit"

export const metadata: Metadata = {
  title: "Ad Debug - Detailed Logging",
  description: "Debug ad loading with detailed logging and error reporting",
}

export default function AdDebugPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Ad Debug - Detailed Logging</h1>
          
          <div className="space-y-8">
            {/* Working Ad Tests with Detailed Logging */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Working Ad Tests with Debug Logging</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 1: Rectangle Ad (300x250)</h3>
                  <WorkingAdUnit 
                    adSlot="debug-1" 
                    adFormat="rectangle" 
                    width={300} 
                    height={250} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 2: Banner Ad (728x90)</h3>
                  <WorkingAdUnit 
                    adSlot="debug-2" 
                    adFormat="horizontal" 
                    width={728} 
                    height={90} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 3: Mobile Ad (320x50)</h3>
                  <WorkingAdUnit 
                    adSlot="debug-3" 
                    adFormat="horizontal" 
                    width={320} 
                    height={50} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Manual Network Test */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Manual Network Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                Test the ad network URLs directly in your browser:
              </p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border">
                  <div className="font-mono text-sm">
                    <div>HighPerformanceFormat:</div>
                    <div className="text-blue-600">
                      <a 
                        href="//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        //www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-mono text-sm">
                    <div>RevenueCPMGate:</div>
                    <div className="text-blue-600">
                      <a 
                        href="//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        //pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser Console Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Browser Console Debug</h3>
              <div className="text-sm space-y-2">
                <div><strong>1. Open Browser Console:</strong> Press F12 or right-click → Inspect → Console</div>
                <div><strong>2. Look for these messages:</strong></div>
                <div className="ml-4 space-y-1">
                  <div>• 🚀 Starting ad load for slot: [slot-name]</div>
                  <div>• ✅ Network online</div>
                  <div>• 🔍 Testing for ad blocker...</div>
                  <div>• 🔄 Attempting HighPerformanceFormat...</div>
                  <div>• 🔄 Attempting RevenueCPMGate...</div>
                </div>
                <div><strong>3. Check for errors:</strong> Look for ❌ or ⏰ messages</div>
                <div><strong>4. Network tab:</strong> Check if scripts are actually loading</div>
              </div>
            </div>

            {/* Common Issues and Solutions */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Common Issues and Solutions</h3>
              <div className="text-sm space-y-3">
                <div>
                  <strong>Issue:</strong> "Ad blocker detected"<br/>
                  <strong>Solution:</strong> Disable ad blocker for this site or whitelist the domain
                </div>
                <div>
                  <strong>Issue:</strong> "Network timeout"<br/>
                  <strong>Solution:</strong> Check if ad network URLs are accessible from your location
                </div>
                <div>
                  <strong>Issue:</strong> "Script error"<br/>
                  <strong>Solution:</strong> Check browser console for CORS or security errors
                </div>
                <div>
                  <strong>Issue:</strong> "All ad networks failed"<br/>
                  <strong>Solution:</strong> Try different network or check firewall settings
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
