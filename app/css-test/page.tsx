import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSS Test - YT2MP3",
  description: "Test page to verify CSS and Tailwind are working",
}

export default function CSSTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          CSS & Tailwind Test Page
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
            <p className="text-gray-600 mb-4">
              This card tests basic Tailwind CSS classes including colors, spacing, and typography.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Test Button
            </button>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive Design</h3>
            <p className="text-gray-600 mb-4">
              This card tests responsive grid layout and mobile-first design principles.
            </p>
            <div className="flex space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Success</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Warning</span>
            </div>
          </div>

          {/* Test Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Animations</h3>
            <p className="text-gray-600 mb-4">
              This card tests CSS animations and transitions using Tailwind utilities.
            </p>
            <div className="animate-pulse bg-purple-100 h-4 rounded mb-2"></div>
            <div className="animate-bounce bg-purple-200 h-4 rounded"></div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">System Status</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">CSS Framework Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Tailwind CSS: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">PostCSS: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Autoprefixer: Active</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Browser Support</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Modern Browsers: Supported</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Mobile Devices: Supported</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Responsive Design: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Test */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Color Palette Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-blue-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Blue</span>
            </div>
            <div className="bg-green-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Green</span>
            </div>
            <div className="bg-red-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Red</span>
            </div>
            <div className="bg-yellow-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Yellow</span>
            </div>
            <div className="bg-purple-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Purple</span>
            </div>
            <div className="bg-pink-500 h-16 rounded flex items-center justify-center">
              <span className="text-white font-bold">Pink</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
