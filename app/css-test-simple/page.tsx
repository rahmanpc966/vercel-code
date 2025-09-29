export default function CSSSimpleTest() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CSS Test</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 h-16 rounded flex items-center justify-center">
            <span className="text-white font-bold">Red</span>
          </div>
          <div className="bg-green-500 h-16 rounded flex items-center justify-center">
            <span className="text-white font-bold">Green</span>
          </div>
          <div className="bg-yellow-500 h-16 rounded flex items-center justify-center">
            <span className="text-white font-bold">Yellow</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600">
          If you can see colored boxes and proper styling, CSS is working correctly.
        </p>
      </div>
    </div>
  )
}
