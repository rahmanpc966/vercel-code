"use client"

import { useEffect, useState } from "react"

export default function DebugStylingPage() {
  const [cssLoaded, setCssLoaded] = useState(false)
  const [tailwindWorking, setTailwindWorking] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // Check if CSS is loaded
    const checkCSS = () => {
      // Safety check for browser environment
      if (typeof window === 'undefined' || !document) {
        setErrors(prev => [...prev, 'Browser APIs not available during SSR'])
        return
      }

      const testElement = document.createElement('div')
      testElement.className = 'bg-blue-500'
      testElement.style.position = 'absolute'
      testElement.style.left = '-9999px'
      document.body.appendChild(testElement)
      
      const computedStyle = window.getComputedStyle(testElement)
      const backgroundColor = computedStyle.backgroundColor
      
      document.body.removeChild(testElement)
      
      if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        setCssLoaded(true)
        setTailwindWorking(true)
      } else {
        setErrors(prev => [...prev, 'Tailwind CSS not working - bg-blue-500 not applied'])
      }
    }

    // Check for console errors
    const originalError = console.error
    console.error = (...args) => {
      setErrors(prev => [...prev, `Console Error: ${args.join(' ')}`])
      originalError.apply(console, args)
    }

    // Check for CSS loading errors
    const checkForCSSErrors = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]')
      if (links.length === 0) {
        setErrors(prev => [...prev, 'No CSS files found in document'])
      }
    }

    setTimeout(() => {
      checkCSS()
      checkForCSSErrors()
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">CSS Debug Information</h1>
        
        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">CSS Status</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${cssLoaded ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>CSS Loaded: {cssLoaded ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${tailwindWorking ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Tailwind Working: {tailwindWorking ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Elements</h2>
            <div className="space-y-2">
              <div className="bg-blue-500 text-white p-2 rounded">Blue Background Test</div>
              <div className="bg-green-500 text-white p-2 rounded">Green Background Test</div>
              <div className="bg-red-500 text-white p-2 rounded">Red Background Test</div>
            </div>
          </div>
        </div>

        {/* Errors Display */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Errors Found</h2>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="text-red-700 bg-red-100 p-2 rounded">
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browser Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'Server-side'}
            </div>
            <div>
              <strong>Viewport:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown'}
            </div>
            <div>
              <strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'Unknown'}
            </div>
            <div>
              <strong>Host:</strong> {typeof window !== 'undefined' ? window.location.host : 'Unknown'}
            </div>
          </div>
        </div>

        {/* CSS Files Check */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">CSS Files</h2>
          <div className="text-sm">
            {typeof window !== 'undefined' && (
              <div>
                <strong>CSS Links Found:</strong>
                <ul className="mt-2 space-y-1">
                  {Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded">
                      {link.getAttribute('href') || 'No href'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Manual CSS Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manual CSS Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Blue</span>
            </div>
            <div className="bg-green-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Green</span>
            </div>
            <div className="bg-red-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Red</span>
            </div>
            <div className="bg-purple-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Purple</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            If you can see colored boxes above, Tailwind CSS is working correctly.
          </p>
        </div>
      </div>
    </div>
  )
}
