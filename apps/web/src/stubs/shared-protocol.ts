// Stub for @craft-agent/shared/protocol

export const PROTOCOL_VERSION = '1.0.0'

export interface MessageEnvelope {
  id: string
  type: 'handshake' | 'handshake_ack' | 'request' | 'response' | 'event' | 'error'
  protocolVersion?: string
  workspaceId?: string
  token?: string
  clientId?: string
  channel?: string
  args?: unknown[]
  result?: unknown
  error?: {
    code: string
    message: string
    data?: unknown
  }
}

export interface Session {
  id: string
  name?: string
  workspaceId: string
  messages: Message[]
  isProcessing?: boolean
  isFlagged?: boolean
  isArchived?: boolean
  archivedAt?: number
  permissionMode?: string
  thinkingLevel?: string
  lastMessageAt?: number
  hidden?: boolean
  preview?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system' | 'plan'
  content: string | MessageContentBlock[]
  createdAt?: number
  isIntermediate?: boolean
}

export interface MessageContentBlock {
  type: string
  text?: string
}

export interface Workspace {
  id: string
  name: string
  rootPath?: string
  path?: string
}

export interface SessionEvent {
  type: string
  sessionId: string
  [key: string]: unknown
}

export interface FileAttachment {
  name: string
  mimeType: string
  size: number
  data: string
}

export interface StoredAttachment {
  id: string
  name: string
  mimeType: string
  size: number
  path: string
}

export interface UnreadSummary {
  total: number
  byWorkspace: Record<string, number>
}

export interface CreateSessionOptions {
  name?: string
  permissionMode?: string
  thinkingLevel?: string
  enabledSourceSlugs?: string[]
}

export interface PermissionResponseOptions {
  duration?: string
}

export interface CredentialResponse {
  credential: string
}

export interface SessionCommand {
  type: string
  [key: string]: unknown
}

export interface SetupNeeds {
  isFullyConfigured: boolean
  needsAuth: boolean
  needsWorkspace: boolean
}

export interface AuthState {
  isAuthenticated: boolean
  connection?: unknown
}

export const RPC_CHANNELS: Record<string, Record<string, string>> = {}
