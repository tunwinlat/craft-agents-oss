import React from 'react'

export default function AppTest() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      background: '#1a1a2e',
      color: '#eee',
      minHeight: '100vh'
    }}>
      <h1>Craft Agent Web</h1>
      <p>If you can see this, React is working!</p>
      <button 
        onClick={() => alert('Clicked!')}
        style={{
          padding: '10px 20px',
          background: '#4a9eff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Button
      </button>
    </div>
  )
}
