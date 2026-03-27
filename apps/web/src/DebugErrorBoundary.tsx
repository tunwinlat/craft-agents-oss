import React from 'react'

interface State {
  error: Error | null
}

export class DebugErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DebugErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ 
          padding: '40px', 
          fontFamily: 'monospace', 
          background: '#1a1a2e',
          color: '#ff6b6b',
          minHeight: '100vh',
          whiteSpace: 'pre-wrap'
        }}>
          <h1 style={{ color: '#ff6b6b' }}>React Render Error</h1>
          <p style={{ color: '#fff' }}>{this.state.error.message}</p>
          <h3 style={{ color: '#4ecdc4', marginTop: 20 }}>Stack trace:</h3>
          <pre style={{ fontSize: '12px', color: '#aaa' }}>{this.state.error.stack}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
