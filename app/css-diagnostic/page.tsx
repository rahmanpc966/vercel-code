"use client"

import { useEffect, useState } from "react"

export default function CSSDiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState<any>({})
  const [cssLoaded, setCssLoaded] = useState(false)

  useEffect(() => {
    const runDiagnostics = () => {
      const results: any = {}

      // Check if we're in browser
      if (typeof window === 'undefined') {
        setDiagnostics({ error: 'Server-side rendering' })
        return
      }

      // Check CSS files
      const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      results.cssFiles = cssLinks.map(link => ({
        href: link.getAttribute('href'),
        loaded: link.sheet !== null
      }))

      // Check if Tailwind classes work
      const testElement = document.createElement('div')
      testElement.className = 'bg-red-500 w-4 h-4'
      testElement.style.position = 'absolute'
      testElement.style.left = '-9999px'
      document.body.appendChild(testElement)
      
      const computedStyle = window.getComputedStyle(testElement)
      const backgroundColor = computedStyle.backgroundColor
      document.body.removeChild(testElement)
      
      results.tailwindWorking = backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)'
      results.backgroundColor = backgroundColor

      // Check for CSS errors
      const originalError = console.error
      const errors: string[] = []
      console.error = (...args) => {
        errors.push(args.join(' '))
        originalError.apply(console, args)
      }

      setTimeout(() => {
        results.errors = errors
        setDiagnostics(results)
        console.error = originalError
      }, 1000)

      // Check if CSS is loaded
      const checkCSSLoaded = () => {
        const testDiv = document.createElement('div')
        testDiv.className = 'bg-blue-500'
        testDiv.style.position = 'absolute'
        testDiv.style.left = '-9999px'
        document.body.appendChild(testDiv)
        
        const style = window.getComputedStyle(testDiv)
        const bgColor = style.backgroundColor
        
        document.body.removeChild(testDiv)
        
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
          setCssLoaded(true)
        }
      }

      checkCSSLoaded()
    }

    runDiagnostics()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">CSS Diagnostic Report</h1>
        
        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Status</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${cssLoaded ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>CSS Loaded: {cssLoaded ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${diagnostics.tailwindWorking ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Tailwind Working: {diagnostics.tailwindWorking ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* CSS Files */}
        {diagnostics.cssFiles && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">CSS Files</h2>
            <div className="space-y-2">
              {diagnostics.cssFiles.map((file: any, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <div className={`w-3 h-3 rounded-full ${file.loaded ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">{file.href}</span>
                  <span className="text-xs text-gray-500">({file.loaded ? 'Loaded' : 'Not Loaded'})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {diagnostics.errors && diagnostics.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Errors Found</h2>
            <div className="space-y-2">
              {diagnostics.errors.map((error: string, index: number) => (
                <div key={index} className="text-red-700 bg-red-100 p-2 rounded text-sm">
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Tests */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Visual Tests</h2>
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
            If you can see colored boxes above, Tailwind CSS is working.
          </p>
        </div>

        {/* Browser Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>User Agent:</strong> {navigator.userAgent}
            </div>
            <div>
              <strong>Viewport:</strong> {window.innerWidth}x{window.innerHeight}
            </div>
            <div>
              <strong>Protocol:</strong> {window.location.protocol}
            </div>
            <div>
              <strong>Host:</strong> {window.location.host}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
