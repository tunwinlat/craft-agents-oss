// Web stub for electron-log/renderer

const logger = {
  debug: (...args: unknown[]) => console.debug(...args),
  info: (...args: unknown[]) => console.info(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
}

export const searchLog = {
  debug: (...args: unknown[]) => console.debug('[search]', ...args),
  info: (...args: unknown[]) => console.info('[search]', ...args),
  warn: (...args: unknown[]) => console.warn('[search]', ...args),
  error: (...args: unknown[]) => console.error('[search]', ...args),
}

export default logger
