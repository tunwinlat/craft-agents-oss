import React, { createContext, useContext, useState, useEffect } from 'react'

type ConnectionStatus = 'Disconnected' | 'Connecting' | 'Connected' | 'Error'

interface ConnectionContextType {
  status: ConnectionStatus
  url: string | null
  token: string | null
  error: string | null
  connect: (url: string, token: string) => void
  disconnect: () => void
  setStatus: (status: ConnectionStatus) => void
  setError: (error: string | null) => void
}

const ConnectionContext = createContext<ConnectionContextType | null>(null)

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ConnectionStatus>('Disconnected')
  const [url, setUrl] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const connect = (newUrl: string, newToken: string) => {
    setUrl(newUrl)
    setToken(newToken)
    setStatus('Connecting')
    setError(null)
  }

  const disconnect = () => {
    setStatus('Disconnected')
    setUrl(null)
    setToken(null)
    setError(null)
  }

  return (
    <ConnectionContext.Provider value={{ status, url, token, error, connect, disconnect, setStatus, setError }}>
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnection() {
  const context = useContext(ConnectionContext)
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
}
