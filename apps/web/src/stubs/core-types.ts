// Stub for @craft-agent/core/types

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: number
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

export interface Workspace {
  id: string
  name: string
  rootPath?: string
}

export interface StoredAttachment {
  id: string
  name: string
  mimeType: string
  size: number
  path: string
}

export type MessageRole = 'user' | 'assistant' | 'system'

export interface ContentBadge {
  type: string
  value: string
}

export interface ToolDisplayMeta {
  name: string
  icon?: string
}

export interface AnnotationV1 {
  type: string
  content: string
}

export interface TypedError {
  code: string
  message: string
}

export interface TokenUsage {
  input: number
  output: number
}

export interface SessionMetadata {
  id: string
  name?: string
  lastMessageAt?: number
}
