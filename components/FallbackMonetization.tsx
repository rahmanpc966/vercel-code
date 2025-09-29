"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FallbackMonetizationProps {
  className?: string
}

export default function FallbackMonetization({ className = "" }: FallbackMonetizationProps) {
  const [donationAmount, setDonationAmount] = useState<number>(5)
  const [showDonationForm, setShowDonationForm] = useState(false)

  const handleDonation = () => {
    // In production, integrate with payment processor (Stripe, PayPal, etc.)
    console.log(`Donation amount: $${donationAmount}`)
    // For demo purposes, show success message
    alert(`Thank you for your $${donationAmount} donation! This helps keep our service free.`)
    setShowDonationForm(false)
  }

  const handlePremiumUpgrade = () => {
    // In production, redirect to premium subscription page
    console.log("Premium upgrade requested")
    alert("Premium features coming soon! This will include faster conversions, higher quality, and priority support.")
  }

  const handleAffiliateClick = (affiliate: string) => {
    // In production, track affiliate clicks and redirect to affiliate links
    console.log(`Affiliate click: ${affiliate}`)
    alert(`Redirecting to ${affiliate}...`)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Support Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-2xl">💡</div>
            <h3 className="text-xl font-semibold text-gray-800">
              Support Our Free Service
            </h3>
            <p className="text-gray-600">
              Our YouTube to MP3 converter is completely free to use. Help us keep it running by supporting our service.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Donation Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💝</span>
            <span>One-Time Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[5, 10, 25, 50].map((amount) => (
              <Button
                key={amount}
                variant={donationAmount === amount ? "default" : "outline"}
                onClick={() => setDonationAmount(amount)}
                className="w-full"
              >
                ${amount}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="flex-1 px-3 py-2 border rounded-md"
              placeholder="Custom amount"
              min="1"
            />
            <Button onClick={() => setShowDonationForm(true)}>
              Donate
            </Button>
          </div>

          {showDonationForm && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Donation Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold">${donationAmount}</span>
                </div>
                <div className="text-sm text-gray-600">
                  In production, this would integrate with Stripe, PayPal, or other payment processors.
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleDonation} className="flex-1">
                    Complete Donation
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDonationForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>⭐</span>
            <span>Premium Features</span>
            <Badge className="bg-yellow-100 text-yellow-800">Coming Soon</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-green-600">🚀 Faster Conversions</h4>
                <p className="text-sm text-gray-600">Priority processing for premium users</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-blue-600">🎵 Higher Quality</h4>
                <p className="text-sm text-gray-600">Up to 320kbps MP3 output</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-purple-600">📱 Mobile App</h4>
                <p className="text-sm text-gray-600">Dedicated mobile app access</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-orange-600">🛠️ Priority Support</h4>
                <p className="text-sm text-gray-600">24/7 customer support</p>
              </div>
            </div>
            <Button onClick={handlePremiumUpgrade} className="w-full">
              Upgrade to Premium - $9.99/month
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Affiliate Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🛒</span>
            <span>Recommended Tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => handleAffiliateClick("Audio Editing Software")}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Professional Audio Editing</h4>
                  <p className="text-sm text-gray-600">Edit your converted MP3s with professional tools</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Affiliate</Badge>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => handleAffiliateClick("Cloud Storage")}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-gray-600">Store your converted files securely in the cloud</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Affiliate</Badge>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => handleAffiliateClick("Music Streaming")}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Music Streaming Services</h4>
                  <p className="text-sm text-gray-600">Discover new music on premium streaming platforms</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Affiliate</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📢</span>
            <span>Share Our Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Help us grow by sharing our YouTube to MP3 converter with your friends and followers.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  const url = window.location.origin
                  const text = "Check out this amazing YouTube to MP3 converter!"
                  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
                  window.open(shareUrl, '_blank')
                }}
              >
                Share on Twitter
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const url = window.location.origin
                  const text = "Check out this amazing YouTube to MP3 converter!"
                  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                  window.open(shareUrl, '_blank')
                }}
              >
                Share on Facebook
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const url = window.location.origin
                  const text = "Check out this amazing YouTube to MP3 converter!"
                  navigator.clipboard.writeText(`${text} ${url}`)
                  alert("Link copied to clipboard!")
                }}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
