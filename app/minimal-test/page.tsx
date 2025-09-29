export default function MinimalTest() {
  return (
    <html>
      <head>
        <title>Minimal CSS Test</title>
      </head>
      <body>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#3b82f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              CSS Test Page
            </h1>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#ef4444',
                height: '4rem',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Red
              </div>
              <div style={{
                backgroundColor: '#10b981',
                height: '4rem',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Green
              </div>
              <div style={{
                backgroundColor: '#f59e0b',
                height: '4rem',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Yellow
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              If you can see this styled content, the basic HTML/CSS is working.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
