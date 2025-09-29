import type { Metadata } from "next"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import AdNetworkValidator from "@/components/AdNetworkValidator"

export const metadata: Metadata = {
  title: "Ad Network Test - Cross-Browser Validation",
  description: "Test ad network accessibility across different browsers and networks",
}

export default function AdNetworkTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#0066FF]">
        <Navigation />
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Ad Network Test - Cross-Browser Validation</h1>
          
          <div className="space-y-8">
            {/* Network Validator */}
            <AdNetworkValidator />

            {/* Cross-Browser Testing Instructions */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Cross-Browser Testing Instructions</h3>
              <div className="text-sm space-y-3">
                <div>
                  <strong>Step 1:</strong> Test in Chrome
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Open Chrome and navigate to this page</li>
                    <li>• Click "Test Network Connectivity"</li>
                    <li>• Note the results</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 2:</strong> Test in Firefox
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Open Firefox and navigate to this page</li>
                    <li>• Click "Test Network Connectivity"</li>
                    <li>• Compare results with Chrome</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 3:</strong> Test in Safari (if on Mac)
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Open Safari and navigate to this page</li>
                    <li>• Click "Test Network Connectivity"</li>
                    <li>• Compare results with other browsers</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 4:</strong> Test on Mobile
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Open mobile browser and navigate to this page</li>
                    <li>• Click "Test Network Connectivity"</li>
                    <li>• Compare results with desktop browsers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Network-Specific Testing */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Network-Specific Testing</h3>
              <div className="text-sm space-y-3">
                <div>
                  <strong>Test 1:</strong> Home Network (WiFi)
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Test from your home WiFi network</li>
                    <li>• Check if ISP blocks ad domains</li>
                    <li>• Note any firewall restrictions</li>
                  </ul>
                </div>
                <div>
                  <strong>Test 2:</strong> Mobile Data
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Disconnect from WiFi</li>
                    <li>• Use mobile data connection</li>
                    <li>• Test ad network accessibility</li>
                  </ul>
                </div>
                <div>
                  <strong>Test 3:</strong> Different Location
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Test from a different network</li>
                    <li>• Check if geographic restrictions apply</li>
                    <li>• Compare results with home network</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Issues and Solutions */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Common Issues and Solutions</h3>
              <div className="text-sm space-y-4">
                <div>
                  <strong>Issue:</strong> All networks show "failed" in all browsers
                  <div className="ml-4 mt-1">
                    <strong>Possible Causes:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• ISP blocking ad domains</li>
                      <li>• Corporate firewall restrictions</li>
                      <li>• DNS-based ad blocking (Pi-hole, etc.)</li>
                      <li>• Ad network servers down</li>
                    </ul>
                    <strong>Solutions:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• Try different DNS servers (8.8.8.8, 1.1.1.1)</li>
                      <li>• Use VPN to test from different location</li>
                      <li>• Check if ad networks are accessible from your region</li>
                      <li>• Contact ISP about ad domain blocking</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <strong>Issue:</strong> Networks work in some browsers but not others
                  <div className="ml-4 mt-1">
                    <strong>Possible Causes:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• Browser-specific ad blocking</li>
                      <li>• Different security settings</li>
                      <li>• CORS policy differences</li>
                    </ul>
                    <strong>Solutions:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• Disable ad blockers in all browsers</li>
                      <li>• Check browser security settings</li>
                      <li>• Update browsers to latest versions</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <strong>Issue:</strong> Networks work but ads still show fallback
                  <div className="ml-4 mt-1">
                    <strong>Possible Causes:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• Invalid ad keys</li>
                      <li>• Ad network account issues</li>
                      <li>• Script loading errors</li>
                    </ul>
                    <strong>Solutions:</strong>
                    <ul className="ml-4 space-y-1">
                      <li>• Verify ad keys are valid and active</li>
                      <li>• Check ad network account status</li>
                      <li>• Review browser console for script errors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Recommendations */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Production Recommendations</h3>
              <div className="text-sm space-y-3">
                <div>
                  <strong>If All Networks Are Blocked:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Implement alternative monetization (donations, premium features)</li>
                    <li>• Use different ad networks that are accessible</li>
                    <li>• Consider server-side ad serving</li>
                    <li>• Add user education about ad blocking</li>
                  </ul>
                </div>
                <div>
                  <strong>If Some Networks Work:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Use only accessible ad networks</li>
                    <li>• Implement fallback for blocked networks</li>
                    <li>• Monitor ad network status regularly</li>
                  </ul>
                </div>
                <div>
                  <strong>If Networks Work But Ads Don't Load:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Check ad network account status</li>
                    <li>• Verify ad keys are correct</li>
                    <li>• Test with different ad placements</li>
                    <li>• Contact ad network support</li>
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
