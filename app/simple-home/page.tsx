export default function SimpleHome() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          YT2MP3 - YouTube to MP3 Converter
        </h1>
        <p className="text-gray-600 mb-6">
          Convert your favorite YouTube videos to high-quality MP3 files instantly.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <input 
            type="text" 
            placeholder="Paste YouTube URL here..." 
            className="w-full p-2 border rounded mb-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Convert to MP3
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          If you can see this styled content, the basic functionality is working.
        </p>
      </div>
    </div>
  )
}
