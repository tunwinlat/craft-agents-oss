// Stub for @craft-agent/server-core/transport

export interface RpcClient {
  invoke(channel: string, ...args: unknown[]): Promise<unknown>
  on(channel: string, callback: (...args: unknown[]) => void): () => void
  connect(): Promise<string>
  destroy(): void
}

export function serializeEnvelope(envelope: unknown): string {
  return JSON.stringify(envelope)
}

export function deserializeEnvelope(raw: string): unknown {
  return JSON.parse(raw)
}
