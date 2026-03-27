import { useEffect, useState } from 'react'
import { WebRpcClient } from '@/lib/rpc'
import { CHANNEL_MAP } from '@/transport/channel-map'
import { buildClientApi } from '@/transport/build-api'
import { useConnection } from '@/contexts/ConnectionContext'

// Electron-specific stubs that should not make RPC calls
const ELECTRON_STUBS = {
  // Update/check stubs
  getUpdateInfo: async () => ({ version: '0.0.0', updateAvailable: false, releaseDate: new Date().toISOString() }),
  checkForUpdates: async () => ({ version: '0.0.0', updateAvailable: false }),
  installUpdate: async () => {},
  dismissUpdate: async () => {},
  getDismissedUpdateVersion: async () => null,
  
  // Window state stubs - both names needed
  getWindowFocusState: async () => ({ isFocused: document.hasFocus() }),
  getFocusState: async () => ({ isFocused: document.hasFocus() }),
  isFocused: async () => document.hasFocus(),
  
  // Badge stubs
  refreshBadge: async () => {},
  setBadgeCount: async () => {},
  
  // Notification stubs
  getNotificationsEnabled: async () => false,
  setNotificationsEnabled: async () => {},
  
  // System stubs
  getSystemWarnings: async () => [],
  getVersions: async () => ({ node: 'web', electron: 'web', app: 'web' }),
}

export function useIpc() {
  const { url, token, setStatus, setError } = useConnection()
  const [apiReady, setApiReady] = useState(false)

  useEffect(() => {
    if (!url) return

    const client = new WebRpcClient(url, { token: token || undefined })
    
    client.connect().then(() => {
      setStatus('Connected')
      const api = buildClientApi(client as any, CHANNEL_MAP, () => true, ELECTRON_STUBS)
      
      // Additional stubs for methods not in channel map or needing special handling
      ;(api as any).getSystemWarnings = async () => []
      ;(api as any).openUrl = async (url: string) => window.open(url, '_blank')
      ;(api as any).showInFolder = async () => console.log('showInFolder not supported in web')
      ;(api as any).readFileDataUrl = async () => 'data:text/plain;base64,RHJhZyBhbmQgZHJvcCBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZCBvbiB3ZWI=' 
      ;(api as any).openFileDialog = async () => ({ canceled: true, filePaths: [] })
      
      // Export to window so legacy components pick it up
      ;(window as any).electronAPI = api
      setApiReady(true)

    }).catch(err => {
      console.error('Failed to connect WebSocket', err)
      setStatus('Error')
      setError(err instanceof Error ? err.message : String(err))
    })

    return () => {
      client.destroy()
      setApiReady(false)
      delete (window as any).electronAPI
    }
  }, [url, token, setStatus, setError])

  return apiReady
}
