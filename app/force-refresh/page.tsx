"use client"

import { useEffect } from "react"

export default function ForceRefreshPage() {
  useEffect(() => {
    // Force a hard refresh to clear cache
    if (typeof window !== 'undefined') {
      // Clear any cached CSS
      const links = document.querySelectorAll('link[rel="stylesheet"]')
      links.forEach(link => {
        const href = link.getAttribute('href')
        if (href) {
          link.setAttribute('href', href + '?v=' + Date.now())
        }
      })
      
      // Show a message
      alert('Cache cleared! Please check if styling is now working.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Cache Cleared!</h1>
        <p className="text-xl mb-8">If you can see this styled page, CSS is working correctly.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-500 p-4 rounded-lg">
            <div className="text-2xl mb-2">🔴</div>
            <div className="font-bold">Red</div>
          </div>
          <div className="bg-green-500 p-4 rounded-lg">
            <div className="text-2xl mb-2">🟢</div>
            <div className="font-bold">Green</div>
          </div>
          <div className="bg-yellow-500 p-4 rounded-lg">
            <div className="text-2xl mb-2">🟡</div>
            <div className="font-bold">Yellow</div>
          </div>
          <div className="bg-pink-500 p-4 rounded-lg">
            <div className="text-2xl mb-2">🩷</div>
            <div className="font-bold">Pink</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Go to Main Page
          </a>
          <a 
            href="/css-test" 
            className="block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Go to CSS Test Page
          </a>
        </div>
      </div>
    </div>
  )
}
