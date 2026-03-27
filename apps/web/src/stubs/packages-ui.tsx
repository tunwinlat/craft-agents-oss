// Stub for packages/ui complex components
import React from 'react'

// Stub for TurnCard
export const TurnCard = () => null
export const UserMessageBubble = () => null

// Stub for ShikiDiffViewer
export const ShikiDiffViewer = () => null
export const getDiffStats = () => ({})

// Stub for UnifiedDiffViewer  
export const UnifiedDiffViewer = () => null
export const getUnifiedDiffStats = () => ({})

// Stub for PDFPreviewOverlay
export const PDFPreviewOverlay = () => null

// Stub for JSONPreviewOverlay
export const JSONPreviewOverlay = () => null

// Stub for ActivityCardsOverlay
export const ActivityCardsOverlay = () => null

// Stub for MultiDiffPreviewOverlay
export const MultiDiffPreviewOverlay = () => null

// Stub for Markdown
export const Markdown = ({ children }: { children?: React.ReactNode }) => <div className="markdown">{children}</div>
export const MemoizedMarkdown = ({ children }: { children?: React.ReactNode }) => <div className="markdown">{children}</div>

// Stub for CodeBlock
export const CodeBlock = () => null
export const InlineCode = ({ children }: { children?: React.ReactNode }) => <code>{children}</code>

// Stub for BrowserShader
export const BrowserShader = () => null

// Stub for ShikiCodeViewer
export const ShikiCodeViewer = () => null

// Stub exports for @pierre/diffs
export const parseDiffFromFile = () => ({})
export const parsePatchFiles = () => ({})
export const DIFFS_TAG_NAME = 'diffs'
export const registerCustomTheme = () => {}
export const resolveTheme = () => ({})

// Tooltip stubs
export const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const TooltipContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

// Other stubs
export const Spinner = () => <div className="animate-spin">Loading...</div>
export const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ')

// Browser components
export const BrowserEmptyStateCard = () => null
export const BrowserControls = () => null

// SessionViewer
export const SessionViewer = () => null

// Overlay components
export const ImagePreviewOverlay = () => null
export const CodePreviewOverlay = () => null
export const DocumentFormattedMarkdownOverlay = () => null
export const GenericOverlay = () => null
export const TerminalPreviewOverlay = () => null
export const FullscreenOverlayBase = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const DataTableOverlay = () => null

// Chat components
export const TurnCardActionsMenu = () => null

// Utility functions
export const extractOverlayData = () => null
export const extractOverlayCards = () => []
export const detectLanguage = () => 'typescript'
export const classifyFile = () => 'unknown'
export const getLanguageFromPath = (path: string) => path.split('.').pop() || 'txt'
export const getFileTypeLabel = () => 'File'
export const getFilePreviewType = () => 'unknown'
export const getDiffPreviewType = () => 'unknown'

// Turn/Chat utilities
export const groupMessagesByTurn = (messages: any[]) => messages
export const formatTurnAsMarkdown = () => ''
export const formatActivityAsMarkdown = () => ''
export const parseReadResult = () => null
export const parseBashResult = () => null
export const parseGrepResult = () => null
export const parseGlobResult = () => null
export const getAssistantTurnUiKey = () => ''
export const asRecord = <T,>(obj: T) => obj as Record<string, unknown>
export const getAnnotationNoteText = () => ''
export const isAnnotationFollowUpSent = () => false
export const extractAnnotationSelectedText = () => ''
export const normalizeFollowUpText = (text: string) => text

// Icons
export const Icon_Home = () => null
export const Icon_Folder = () => null
export const FileTypeIcon = () => null

// Components
export const CollapsibleMarkdownProvider = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const PlatformProvider = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const ShikiThemeProvider = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const MarkdownDatatableBlock = () => null
export const MarkdownSpreadsheetBlock = () => null
export const MarkdownImageBlock = () => null
export const ImageCardStack = () => null
export const TiptapMarkdownEditor = () => null
export const FilterableSelectPopover = ({ children }: { children?: React.ReactNode }) => <>{children}</>

// Hooks
export const usePlatform = () => ({ platform: 'web' })

// Dropdown Menu stubs - delegated to Radix UI in styled-dropdown.tsx
// These are re-exported from @/components/ui/styled-dropdown
export { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuShortcut,
  StyledDropdownMenuContent,
  StyledDropdownMenuItem,
  StyledDropdownMenuSeparator,
  StyledDropdownMenuSubTrigger,
  StyledDropdownMenuSubContent
} from '@/components/ui/styled-dropdown'

// Layout constants
export const CHAT_LAYOUT = {}
export const CHAT_CLASSES = {}

// Types
export type SessionViewerProps = any
export type TurnCardProps = any
export type FileDiff = any
export type ActivityItem = any
export type ResponseContent = any
export type RenderMode = 'full' | 'streaming'
export interface MarkdownProps {
  children?: React.ReactNode
  className?: string
}
export type FilePreviewType = 'image' | 'code' | 'pdf' | 'markdown' | 'unknown'
export type BrowserEmptyPromptSample = any

// Turn types
export type Turn = any
export type AssistantTurn = any
export type UserTurn = any
export type SystemTurn = any
export type AuthRequestTurn = any
