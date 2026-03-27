import React, { useState, useEffect } from 'react'

export function ErrorDebug({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // Capture console errors
    const originalError = console.error
    console.error = (...args: any[]) => {
      setLogs(prev => [...prev, args.map(a => String(a)).join(' ')])
      originalError.apply(console, args)
    }

    // Capture unhandled errors
    const handleError = (e: ErrorEvent) => {
      setError(e.error || new Error(e.message))
      e.preventDefault()
    }

    // Capture promise rejections
    const handleRejection = (e: PromiseRejectionEvent) => {
      setError(new Error(String(e.reason)))
      e.preventDefault()
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      console.error = originalError
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace', color: 'red' }}>
        <h1>Runtime Error:</h1>
        <pre>{error.stack || error.message}</pre>
        <h2>Console Logs:</h2>
        <pre>{logs.join('\n')}</pre>
      </div>
    )
  }

  return <>{children}</>
}
