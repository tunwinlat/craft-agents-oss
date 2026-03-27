import { useCallback, useRef } from 'react'
import { processEvent } from './processor'
import type { SessionState, StreamingState, AgentEvent, ProcessResult, Effect } from './types'

interface UseEventProcessorReturn {
  processAgentEvent: (
    event: AgentEvent,
    sessionState: SessionState,
    streamingState: StreamingState | null
  ) => ProcessResult
  clearStreamingState: () => void
}

export function useEventProcessor(): UseEventProcessorReturn {
  const streamingStateRef = useRef<StreamingState | null>(null)

  const processAgentEvent = useCallback((
    event: AgentEvent,
    sessionState: SessionState,
    streamingState: StreamingState | null
  ): ProcessResult => {
    const result = processEvent(event, sessionState, streamingState)
    
    // Track streaming state for cleanup
    if (event.type === 'text_delta') {
      streamingStateRef.current = result.streamingState || null
    } else if (event.type === 'text_complete' || event.type === 'error') {
      streamingStateRef.current = null
    }
    
    return result
  }, [])

  const clearStreamingState = useCallback(() => {
    streamingStateRef.current = null
  }, [])

  return {
    processAgentEvent,
    clearStreamingState
  }
}
