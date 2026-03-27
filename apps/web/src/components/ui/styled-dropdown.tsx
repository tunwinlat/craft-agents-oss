/**
 * Styled Dropdown Components
 *
 * Web-compatible implementation using Radix UI primitives
 */

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Re-export Radix primitives
export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger
export const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent
export const DropdownMenuContent = DropdownMenuPrimitive.Content
export const DropdownMenuItem = DropdownMenuPrimitive.Item
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator
export const DropdownMenuShortcut = ({ children }: { children?: React.ReactNode }) => (
  <span className="ml-auto text-xs tracking-widest opacity-60">{children}</span>
)

interface StyledContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
  minWidth?: string
}

// Styled versions for Craft UI
export const StyledDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  StyledContentProps
>(({ children, className, minWidth, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={4}
        className={cn(
          "z-[9999] overflow-hidden rounded-md border border-foreground/10 bg-background p-1 text-foreground shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          minWidth || "min-w-[200px]",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
})
StyledDropdownMenuContent.displayName = "StyledDropdownMenuContent"

export function StyledDropdownMenuItem({ 
  children, 
  className,
  ...props 
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-foreground/10 focus:bg-foreground/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export function StyledDropdownMenuSubTrigger({ 
  children, 
  className,
  ...props 
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-foreground/10 focus:bg-foreground/10 data-[state=open]:bg-foreground/10",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export function StyledDropdownMenuSubContent({ 
  children, 
  className,
  ...props 
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        className={cn(
          "z-[9999] min-w-[200px] overflow-hidden rounded-md border border-foreground/10 bg-background p-1 text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  )
}

export function StyledDropdownMenuSeparator({ 
  className 
}: { className?: string }) {
  return (
    <DropdownMenuPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-foreground/10", className)} />
  )
}
