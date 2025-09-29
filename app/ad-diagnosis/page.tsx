"use client"

import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import AdNetworkTester from "@/components/AdNetworkTester"
import FallbackAdUnit from "@/components/FallbackAdUnit"

export default function AdDiagnosisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Ad Network Diagnosis</h1>
          
          <div className="space-y-8">
            {/* Network Tester */}
            <AdNetworkTester />

            {/* Fallback Ad Tests */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Fallback Ad Tests</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 1: Rectangle Ad (300x250)</h3>
                  <FallbackAdUnit 
                    adSlot="test-1" 
                    adFormat="rectangle" 
                    width={300} 
                    height={250} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 2: Banner Ad (728x90)</h3>
                  <FallbackAdUnit 
                    adSlot="test-2" 
                    adFormat="horizontal" 
                    width={728} 
                    height={90} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Test 3: Mobile Ad (320x50)</h3>
                  <FallbackAdUnit 
                    adSlot="test-3" 
                    adFormat="horizontal" 
                    width={320} 
                    height={50} 
                    testMode={true}
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Manual Script Test */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Manual Script Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                Test the exact scripts from your provided code:
              </p>
              <div className="bg-white p-4 rounded border">
                <pre className="text-xs overflow-x-auto">
{`// Test 1: HighPerformanceFormat
atOptions = {
  'key' : '37943d3fd9cce351f51aed181182d90d',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};

// Test 2: Load scripts manually
const script1 = document.createElement('script');
script1.src = '//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js';
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = '//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js';
document.head.appendChild(script2);`}
                </pre>
              </div>
              <button 
                onClick={() => {
                  if (typeof window === 'undefined') return
                  
                  // Set atOptions
                  (window as any).atOptions = {
                    key: "37943d3fd9cce351f51aed181182d90d",
                    format: "iframe",
                    height: 250,
                    width: 300,
                    params: {},
                  }

                  // Load scripts
                  const script1 = document.createElement('script')
                  script1.src = '//www.highperformanceformat.com/37943d3fd9cce351f51aed181182d90d/invoke.js'
                  script1.onload = () => console.log('✅ HighPerformanceFormat loaded')
                  script1.onerror = () => console.log('❌ HighPerformanceFormat failed')
                  document.head.appendChild(script1)

                  const script2 = document.createElement('script')
                  script2.src = '//pl25914813.revenuecpmgate.com/e4386a13de3b837cb97ad9287321b380/invoke.js'
                  script2.onload = () => console.log('✅ RevenueCPMGate loaded')
                  script2.onerror = () => console.log('❌ RevenueCPMGate failed')
                  document.head.appendChild(script2)
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Manual Script Loading
              </button>
            </div>

            {/* Debug Information */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
              <div className="text-sm space-y-2">
                <div><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</div>
                <div><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'Server-side'}</div>
                <div><strong>Online Status:</strong> {typeof window !== 'undefined' ? (navigator.onLine ? 'Online' : 'Offline') : 'Unknown'}</div>
                <div><strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
