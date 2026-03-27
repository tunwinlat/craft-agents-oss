import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as JotaiProvider, useAtomValue } from 'jotai'
// Sentry ignored here to avoid node dependencies in web
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { windowWorkspaceIdAtom } from './atoms/sessions'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import { ConnectionProvider, useConnection } from './contexts/ConnectionContext'
import { LoginScreen } from './components/LoginScreen'
import { useIpc } from './hooks/useIpc'
import { DebugErrorBoundary } from './DebugErrorBoundary'

function RootApp() {
  const workspaceId = useAtomValue(windowWorkspaceIdAtom)
  return (
    <ThemeProvider activeWorkspaceId={workspaceId} defaultMode="dark" defaultColorTheme="default">
      <App />
      <Toaster />
    </ThemeProvider>
  )
}

function Bootstrapper() {
  const { status, connect } = useConnection()
  const apiReady = useIpc()

  if (status !== 'Connected' || !apiReady) {
    return <LoginScreen onLogin={connect} />
  }

  return <RootApp />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DebugErrorBoundary>
      <JotaiProvider>
        <ConnectionProvider>
          <Bootstrapper />
        </ConnectionProvider>
      </JotaiProvider>
    </DebugErrorBoundary>
  </React.StrictMode>
)
