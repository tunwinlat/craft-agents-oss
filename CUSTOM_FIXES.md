# Custom Fixes for Craft Agents Headless Server

This document tracks all custom modifications made to the Craft Agents codebase for your ZimaOS deployment.

## Version Information

**Base Version:** v0.7.2 (merged from upstream)  
**Custom Commit:** 7c2783c - Merge upstream v0.7.2 with custom fixes preserved  
**Fork:** https://github.com/tunwinlat/craft-agents-oss

## Current Fixes (Applied)

### 1. File Access Fix - CRAFT_CONFIG_DIR Support
**Problem:** When workspaces are symlinked from `/DATA/craft/.craft-agent/` to `/DATA/.craft-agent/`, the file path validation rejected access because the resolved path was outside the home directory.

**Files Modified:**
- `packages/server-core/src/handlers/utils.ts` - Added `CONFIG_DIR` to allowed directories
- `packages/shared/src/config/index.ts` - Export `CONFIG_DIR` from `paths.ts`

**Impact:** Automations, skills, and config files now load correctly through symlinks.

### 2. SDK Abort Error Handling
**Problem:** When requesting credentials (API keys), the `forceAbort()` call crashed the server with "Operation aborted" error from Claude SDK.

**Files Modified:**
- `packages/server/src/index.ts` - Global error handlers for uncaught exceptions/unhandled rejections
- `packages/server-core/src/sessions/SessionManager.ts` - Wrapped all `forceAbort()` calls in try-catch

**Impact:** Server no longer crashes when saving credentials or during auth flows.

### 3. Sharp Library Compatibility
**Problem:** System has libvips 8.10.6, incompatible with sharp 0.34.5/0.28.3.

**Solution:** Downgraded to sharp 0.26.3

**Impact:** Image processing works correctly.

### 4. Pi Agent Server Build (for Kimi/Pi AI models)
**Problem:** v0.7.2 added native Kimi (Coding) model support via `@mariozechner/pi-ai`, but the `pi-agent-server` package needs to be built before use. Without building, you get error: "piServerPath not configured. Cannot spawn Pi subprocess."

**Solution:** Build the `pi-agent-server` package:
```bash
cd /DATA/craft-agents-oss/packages/pi-agent-server
bun run build
```

Or run the helper script:
```bash
./build-servers.sh
```

**Impact:** Kimi (Coding) model and other Pi AI models work natively.

## Update Workflow

When a new Craft Agents version is released:

### Option A: Rebase Approach (Recommended)

```bash
cd /DATA/craft-agents-oss

# 1. Tag current state
git tag backup-before-update

# 2. Download and extract new version over existing files
# (Or git pull if using the upstream repo)

# 3. Check for conflicts
git status

# 4. Review and resolve any conflicts in modified files
# Our changes are minimal and usually don't conflict with upstream

# 5. Test the server
sudo systemctl restart craft-agents

# 6. If issues, rollback
git reset --hard backup-before-update
sudo systemctl restart craft-agents
```

### Option B: Patch Approach

```bash
cd /DATA/craft-agents-oss

# 1. Create patch from current fixes
git diff HEAD > ~/craft-agents-custom-fixes.patch

# 2. Download new version

# 3. Apply patch (may need manual resolution)
git apply ~/craft-agents-custom-fixes.patch --3way

# 4. Check status and resolve conflicts
git status
```

### Option C: Manual Re-application

Keep this file handy and manually re-apply the changes after each update:

1. Edit `packages/shared/src/config/index.ts` - Add `export * from './paths.ts';`
2. Edit `packages/server-core/src/handlers/utils.ts` - Add `CONFIG_DIR` to imports and allowedDirs
3. Edit `packages/server/src/index.ts` - Add global error handlers at top
4. Edit `packages/server-core/src/sessions/SessionManager.ts` - Wrap 4x `forceAbort()` calls

## Quick Rollback

If something breaks after update:

```bash
cd /DATA/craft-agents-oss
git log --oneline -5          # Find last working commit
git reset --hard <commit>     # Rollback to that commit
sudo systemctl restart craft-agents
```

## Testing After Update

1. Check server starts: `sudo systemctl status craft-agents`
2. Check logs: `tail -50 /var/log/craft-agents.log`
3. Test automations are visible in UI
4. Test file access: Try reading a file through the app
5. Test credentials: Try using a source that needs API key

## File Inventory

| File | Lines Changed | Description |
|------|---------------|-------------|
| `packages/shared/src/config/index.ts` | +1 line | Export CONFIG_DIR |
| `packages/server-core/src/handlers/utils.ts` | +3 lines | Allow CONFIG_DIR access |
| `packages/server/src/index.ts` | +11 lines | Global error handlers |
| `packages/server-core/src/sessions/SessionManager.ts` | +28 lines | Safe forceAbort handling |
