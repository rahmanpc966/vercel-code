"use client"

import { useState } from "react"

export default function DomainForSale() {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('teamlumina66@gmail.com')
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Hide after 2 seconds
    } catch (err) {
      console.error('Failed to copy email:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'teamlumina66@gmail.com'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
          {/* Domain Name */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            yt2mate.pro
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
            Premium Domain for Sale
          </h2>
          
          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            This premium domain is perfect for YouTube conversion services, 
            music platforms, or any multimedia business. 
            <span className="text-yellow-300 font-semibold"> High commercial value</span> and 
            <span className="text-green-300 font-semibold"> excellent SEO potential</span>.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Brand</h3>
              <p className="text-white/70">Memorable and brandable domain name</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">SEO Ready</h3>
              <p className="text-white/70">Perfect for YouTube-related businesses</p>
              </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">High Value</h3>
              <p className="text-white/70">Excellent commercial potential</p>
              </div>
              </div>

          {/* Copy Success Notification */}
          {copySuccess && (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
              <div className="flex items-center space-x-2">
                <span className="text-xl">✓</span>
                <span className="font-semibold">Email copied to clipboard!</span>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
              <p className="text-white/80 mb-6">Interested in this premium domain? Get in touch with us:</p>
              
              <div className="bg-white/20 rounded-xl p-6 border border-white/30">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-3xl">📧</span>
                  <div>
                    <p className="text-white/70 text-sm">Email Address</p>
                    <a 
                      href="mailto:teamlumina66@gmail.com"
                      className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors duration-300"
                    >
                      teamlumina66@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:teamlumina66@gmail.com?subject=Domain Inquiry - yt2mate.pro&body=Hello, I am interested in purchasing the domain yt2mate.pro. Please provide more information about pricing and availability."
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Email Inquiry
                  </a>
                  
                  <button 
                    onClick={handleCopyEmail}
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/30"
                  >
                    {copySuccess ? '✓ Copied!' : 'Copy Email'}
                  </button>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>

    </div>
  )
}