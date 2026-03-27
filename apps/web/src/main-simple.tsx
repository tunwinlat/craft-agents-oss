import React from 'react'
import ReactDOM from 'react-dom/client'

// Simplest possible app to test if React and CSS are working
function SimpleApp() {
  return (
    <div style={{ 
      padding: 40, 
      background: '#1a1a2e',
      color: '#eee',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>Craft Agent Web</h1>
      <p>React is working!</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>
)
