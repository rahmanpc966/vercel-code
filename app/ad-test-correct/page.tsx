import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import CorrectAdUnit from "@/components/CorrectAdUnit"
import AdDebugger from "@/components/AdDebugger"

export const metadata: Metadata = {
  title: "Ad Test - Correct Implementation",
  description: "Testing the correct ad implementation with both HighPerformanceFormat and RevenueCPMGate",
}

export default function AdTestCorrectPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Ad Test - Correct Implementation</h1>
          
          <div className="space-y-8">
            {/* Test 1: Standard Rectangle Ad */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Test 1: Standard Rectangle Ad (300x250)</h2>
              <CorrectAdUnit 
                adSlot="test-1" 
                adFormat="rectangle" 
                width={300} 
                height={250} 
                testMode={true}
                className="mx-auto"
              />
            </div>

            {/* Test 2: Banner Ad */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Test 2: Banner Ad (728x90)</h2>
              <CorrectAdUnit 
                adSlot="test-2" 
                adFormat="horizontal" 
                width={728} 
                height={90} 
                testMode={true}
                className="mx-auto"
              />
            </div>

            {/* Test 3: Mobile Banner */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Test 3: Mobile Banner (320x50)</h2>
              <CorrectAdUnit 
                adSlot="test-3" 
                adFormat="horizontal" 
                width={320} 
                height={50} 
                testMode={true}
                className="mx-auto"
              />
            </div>

            {/* Manual Implementation Test */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Test 4: Manual Implementation (Your Provided Code)</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  This is the exact implementation from your provided code:
                </p>
                <div className="bg-white p-4 rounded border text-left">
                  <pre className="text-xs overflow-x-auto">
{`<script type="text/javascript">
  atOptions = {
    'key' : '37943d3fd9cce351f51aed181182d90d',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js"></script>
<script async="async" data-cfasync="false" src="//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js"></script>
<div id="container-e4386a13de3b837cb97ad9287321b380"></div>`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Debug Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
              <div className="text-sm space-y-2">
                <div><strong>HighPerformanceFormat:</strong> Uses atOptions and iframe format</div>
                <div><strong>RevenueCPMGate:</strong> Uses container div with specific ID</div>
                <div><strong>Both networks:</strong> Load simultaneously for maximum revenue</div>
                <div><strong>Ad Blocker Detection:</strong> Tests for blocked ads</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Ad Debugger */}
      <AdDebugger />
    </div>
  )
}
