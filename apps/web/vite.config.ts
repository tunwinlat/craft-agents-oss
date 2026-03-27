import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../..')

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Local paths
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      
      // @config/* paths (longest first)
      '@config/theme': path.resolve(rootDir, 'packages/shared/src/config/theme.ts'),
      '@config/llm-connections': path.resolve(rootDir, 'packages/shared/src/config/llm-connections.ts'),
      '@config/models': path.resolve(rootDir, 'packages/shared/src/config/models.ts'),
      '@config': path.resolve(__dirname, './src/config'),
      
      // @craft-agent/core/* paths (longest first)
      '@craft-agent/core/types': path.resolve(rootDir, 'packages/core/src/types/index.ts'),
      '@craft-agent/core/utils': path.resolve(rootDir, 'packages/core/src/utils/index.ts'),
      '@craft-agent/core': path.resolve(rootDir, 'packages/core/src/index.ts'),
      
      // @craft-agent/shared/* paths (longest first)
      '@craft-agent/shared/protocol': path.resolve(rootDir, 'packages/shared/src/protocol/index.ts'),
      '@craft-agent/shared/agent/mode-types': path.resolve(rootDir, 'packages/shared/src/agent/mode-types.ts'),
      '@craft-agent/shared/agent/modes': path.resolve(rootDir, 'packages/shared/src/agent/mode-types.ts'),
      '@craft-agent/shared/agent/thinking-levels': path.resolve(rootDir, 'packages/shared/src/agent/thinking-levels.ts'),
      '@craft-agent/shared/auth/types': path.resolve(rootDir, 'packages/shared/src/auth/types.ts'),
      '@craft-agent/shared/config/types': path.resolve(rootDir, 'packages/shared/src/config/types.ts'),
      '@craft-agent/shared/config': path.resolve(rootDir, 'packages/shared/src/config/index.ts'),
      '@craft-agent/shared/credentials/types': path.resolve(rootDir, 'packages/shared/src/credentials/types.ts'),
      '@craft-agent/shared/sources/types': path.resolve(rootDir, 'packages/shared/src/sources/types.ts'),
      '@craft-agent/shared/skills/types': path.resolve(rootDir, 'packages/shared/src/skills/types.ts'),
      '@craft-agent/shared/statuses': path.resolve(rootDir, 'packages/shared/src/statuses/index.ts'),
      '@craft-agent/shared/labels': path.resolve(rootDir, 'packages/shared/src/labels/index.ts'),
      '@craft-agent/shared/docs/doc-links': path.resolve(rootDir, 'packages/shared/src/docs/doc-links.ts'),
      '@craft-agent/shared/views': path.resolve(rootDir, 'packages/shared/src/views/index.ts'),
      '@craft-agent/shared/utils/workspace-slug': path.resolve(rootDir, 'packages/shared/src/utils/workspace-slug.ts'),
      '@craft-agent/shared/utils/icon-constants': path.resolve(rootDir, 'packages/shared/src/utils/icon-constants.ts'),
      '@craft-agent/shared/utils/toolNames': path.resolve(rootDir, 'packages/shared/src/utils/toolNames.ts'),
      '@craft-agent/shared/utils': path.resolve(rootDir, 'packages/shared/src/utils/index.ts'),
      '@craft-agent/shared/icons': path.resolve(rootDir, 'packages/shared/src/icons/index.ts'),
      '@craft-agent/shared/search': path.resolve(rootDir, 'packages/shared/src/search/index.ts'),
      '@craft-agent/shared/colors': path.resolve(rootDir, 'packages/shared/src/colors/index.ts'),
      '@craft-agent/shared/agent': path.resolve(rootDir, 'packages/shared/src/agent/index.ts'),
      '@craft-agent/shared/mentions': path.resolve(rootDir, 'packages/shared/src/mentions/index.ts'),
      '@craft-agent/shared/validation': path.resolve(rootDir, 'packages/shared/src/validation/index.ts'),
      '@craft-agent/shared/branding': path.resolve(rootDir, 'packages/shared/src/branding.ts'),
      '@craft-agent/shared/feature-flags': path.resolve(rootDir, 'packages/shared/src/feature-flags.ts'),
      '@craft-agent/shared/automations': path.resolve(rootDir, 'packages/shared/src/automations/index.ts'),
      '@craft-agent/shared': path.resolve(rootDir, 'packages/shared/src/index.ts'),
      
      // Stub packages with complex dependencies
      '@craft-agent/ui': path.resolve(__dirname, './src/stubs/packages-ui.tsx'),
      '@craft-agent/server-core/transport': path.resolve(rootDir, 'packages/server-core/src/transport/index.ts'),
    },
    preserveSymlinks: true,
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: [
      '@craft-agent/core',
      '@craft-agent/shared',
      '@craft-agent/ui',
      '@craft-agent/server-core',
      '@tiptap/extension-task-list',
      '@tiptap/extension-task-item',
      '@tiptap/extension-file-handler',
      '@tiptap/extension-image',
      '@tiptap/extension-mathematics',
      '@tiptap/suggestion',
    ],
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@tiptap/core',
      '@tiptap/react',
      '@tiptap/pm/state',
      '@tiptap/pm/view',
      '@radix-ui/react-tooltip',
      'zod',
      'shiki',
      'clsx',
      'katex',
    ],
    esbuildOptions: {
      resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
    },
  },
})
