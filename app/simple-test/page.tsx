export default function SimpleTestPage() {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>
        Simple CSS Test
      </h1>
      
      <div style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        This should have a blue background with white text
      </div>
      
      <div className="bg-red-500 text-white p-4 rounded">
        This should be red with Tailwind CSS
      </div>
      
      <div className="bg-green-500 text-white p-4 rounded mt-4">
        This should be green with Tailwind CSS
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-500 text-white p-4 rounded">Blue</div>
        <div className="bg-purple-500 text-white p-4 rounded">Purple</div>
      </div>
    </div>
  )
}
