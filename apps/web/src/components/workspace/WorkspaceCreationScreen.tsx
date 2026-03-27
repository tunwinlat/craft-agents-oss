import { useState, useEffect, useCallback, useMemo } from "react"
import { X } from "lucide-react"
import { motion } from "motion/react"
// Stubbed for web - @paper-design/shaders-react has import issues
// import { Dithering } from "@paper-design/shaders-react"
const Dithering = ({ className }: { className?: string }) => (
  <div className={className} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
)
import { FullscreenOverlayBase } from "@craft-agent/ui"
import { cn } from "@/lib/utils"
import { overlayTransitionIn } from "@/lib/animations"
import { AddWorkspaceStep_Choice } from "./AddWorkspaceStep_Choice"
import { AddWorkspaceStep_CreateNew } from "./AddWorkspaceStep_CreateNew"
import { AddWorkspaceStep_OpenFolder } from "./AddWorkspaceStep_OpenFolder"
import type { Workspace } from "@shared/types"
import { toast } from "sonner"

type CreationStep = 'choice' | 'create' | 'open'

interface WorkspaceCreationScreenProps {
  /** Callback when a workspace is created successfully */
  onWorkspaceCreated: (workspace: Workspace) => void
  /** Callback when the screen is dismissed */
  onClose: () => void
  className?: string
}

/**
 * WorkspaceCreationScreen - Full-screen overlay for creating workspaces
 *
 * Obsidian-style flow:
 * 1. Choice: Create new workspace OR Open existing folder
 * 2a. Create: Enter name + choose location (default or custom)
 * 2b. Open: Browse folder OR create new folder at location
 */
export function WorkspaceCreationScreen({
  onWorkspaceCreated,
  onClose,
  className,
}: WorkspaceCreationScreenProps) {
  const [step, setStep] = useState<CreationStep>('choice')
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(onClose, 300)
  }, [onClose])

  const handleCreated = useCallback((workspace: Workspace) => {
    onWorkspaceCreated(workspace)
  }, [onWorkspaceCreated])

  return (
    <FullscreenOverlayBase
      isOpen={!isExiting}
      onClose={handleClose}
      className={cn("bg-black/95", className)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background shader effect */}
        <Dithering className="absolute inset-0 opacity-30" />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={overlayTransitionIn}
          className="relative z-10 w-full max-w-lg p-8"
        >
          {step === 'choice' && (
            <AddWorkspaceStep_Choice
              onCreateNew={() => setStep('create')}
              onOpenExisting={() => setStep('open')}
              onCancel={handleClose}
            />
          )}
          {step === 'create' && (
            <AddWorkspaceStep_CreateNew
              onBack={() => setStep('choice')}
              onCreated={handleCreated}
            />
          )}
          {step === 'open' && (
            <AddWorkspaceStep_OpenFolder
              onBack={() => setStep('choice')}
              onCreated={handleCreated}
            />
          )}
        </motion.div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </FullscreenOverlayBase>
  )
}
