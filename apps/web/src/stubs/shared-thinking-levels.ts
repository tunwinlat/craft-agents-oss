// Stub for @craft-agent/shared/agent/thinking-levels

export type ThinkingLevel = 'none' | 'minimal' | 'normal' | 'deep'

export interface ThinkingLevelConfig {
  label: string
  description: string
}

export const THINKING_LEVELS: Record<ThinkingLevel, ThinkingLevelConfig> = {
  none: {
    label: 'None',
    description: 'No thinking steps',
  },
  minimal: {
    label: 'Minimal',
    description: 'Minimal thinking',
  },
  normal: {
    label: 'Normal',
    description: 'Normal thinking',
  },
  deep: {
    label: 'Deep',
    description: 'Deep thinking',
  },
}

export const DEFAULT_THINKING_LEVEL: ThinkingLevel = 'normal'
