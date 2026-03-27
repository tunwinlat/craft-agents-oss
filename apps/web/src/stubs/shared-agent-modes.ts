// Stub for @craft-agent/shared/agent/modes

export type PermissionMode = 'ask' | 'allow-all' | 'read-only'

export interface PermissionModeState {
  permissionMode: PermissionMode
  modeVersion: number
  changedAt: number
  changedBy: string
}

export const PERMISSION_MODE_CONFIG: Record<PermissionMode, { label: string; description: string }> = {
  ask: {
    label: 'Ask',
    description: 'Ask for permission before each action',
  },
  'allow-all': {
    label: 'Allow All',
    description: 'Allow all actions without asking',
  },
  'read-only': {
    label: 'Read Only',
    description: 'Only allow read operations',
  },
}
