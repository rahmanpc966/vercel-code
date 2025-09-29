"use client"

import { useState, useEffect } from "react"

export default function DomainForSale() {
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    offer: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          offer: '',
          message: ''
        })
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false)
          setSubmitStatus('')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
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

          {/* Contact Button */}
          <button 
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Contact Us for Price
          </button>

          {/* Contact Info */}
          <div className="mt-8 text-white/60">
            <p className="text-sm">Interested? Get in touch with us</p>
            <p className="text-lg font-semibold text-white mt-2">teamlumina66@gmail.com</p>
              </div>
            </div>
          </div>

      {/* Beautiful Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          ></div>
          
          {/* Popup Content */}
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            {/* Popup Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Domain Inquiry</h3>
              <p className="text-gray-600">Get in touch about yt2mate.pro</p>
        </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
        </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Offer (Optional)</label>
                <input 
                  type="text" 
                  name="offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your offer amount"
                />
        </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea 
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell us about your interest in this domain..."
                ></textarea>
        </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  ✅ Your inquiry has been received! We will contact you soon at {formData.email}.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  ❌ There was an error sending your inquiry. Please try again or contact us directly at teamlumina66@gmail.com.
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>

            {/* Direct Contact */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">Or contact us directly:</p>
              <a 
                href="mailto:teamlumina66@gmail.com"
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                teamlumina66@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}