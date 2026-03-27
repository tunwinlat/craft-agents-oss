/**
 * Build the client API proxy.
 *
 * Replaces the 329-line preload. The ElectronAPI TypeScript interface still
 * enforces types at compile time — this proxy provides runtime dispatch.
 */

import type { RpcClient } from '@craft-agent/server-core/transport'
import type { ElectronAPI } from "@shared/types"

// ---------------------------------------------------------------------------
// Channel map entry
// ---------------------------------------------------------------------------

export type ChannelMapEntry =
  | { type: 'invoke'; channel: string; transform?: (result: any) => any }
  | { type: 'listener'; channel: string }

export type ChannelMap = Record<string, ChannelMapEntry>

// Stub handlers for Electron-specific features not available in web mode
const DEFAULT_STUB_HANDLERS: Record<string, (...args: any[]) => any> = {
  // Update/check stubs
  getUpdateInfo: async () => ({ version: '0.0.0', updateAvailable: false }),
  checkForUpdates: async () => ({ version: '0.0.0', updateAvailable: false }),
  
  // Window state stubs
  getFocusState: async () => ({ isFocused: true }),
  isFocused: async () => true,
  
  // Badge stubs
  refreshBadge: async () => {},
  setBadgeCount: async () => {},
  
  // Notification stubs
  getNotificationsEnabled: async () => false,
  setNotificationsEnabled: async () => {},
}

// ---------------------------------------------------------------------------
// Proxy builder
// ---------------------------------------------------------------------------

export function buildClientApi(
  client: RpcClient,
  channelMap: ChannelMap,
  isChannelAvailable?: (channel: string) => boolean,
  stubHandlers: Record<string, (...args: any[]) => any> = DEFAULT_STUB_HANDLERS,
): ElectronAPI {
  const api: Record<string, any> = {}
  const nested: Record<string, Record<string, any>> = {}

  for (const [key, entry] of Object.entries(channelMap)) {
    // Check if there's a stub handler for this method
    const stubFn = stubHandlers[key]
    
    let fn: (...a: any[]) => any
    if (stubFn) {
      // Use stub instead of RPC call
      fn = stubFn
    } else if (entry.type === 'listener') {
      fn = (cb: (...args: any[]) => void) => client.on(entry.channel, cb)
    } else if (entry.transform) {
      const t = entry.transform
      fn = async (...args: any[]) => t(await client.invoke(entry.channel, ...args))
    } else {
      fn = (...args: any[]) => client.invoke(entry.channel, ...args)
    }

    // Dotted keys like "browserPane.create" become nested: api.browserPane.create
    const dotIdx = key.indexOf('.')
    if (dotIdx !== -1) {
      const ns = key.slice(0, dotIdx)
      const method = key.slice(dotIdx + 1)
      if (!nested[ns]) nested[ns] = {}
      nested[ns][method] = fn
    } else {
      api[key] = fn
    }
  }

  // Attach nested namespaces as plain objects
  for (const [ns, methods] of Object.entries(nested)) {
    api[ns] = methods
  }

  // Expose channel availability check for GUI-aware code
  api.isChannelAvailable = isChannelAvailable ?? (() => true)

  return api as ElectronAPI
}
