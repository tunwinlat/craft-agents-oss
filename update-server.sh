#!/bin/bash
# Craft Agents Server Update Script with Custom Fixes Preservation

set -e

CRAFT_DIR="/DATA/craft-agents-oss"
BACKUP_TAG="backup-$(date +%Y%m%d-%H%M%S)"

echo "=== Craft Agents Server Update Script ==="
echo ""

# Check if running as craft user or root
if [ "$EUID" -ne 0 ] && [ "$USER" != "craft" ]; then 
   echo "Please run as root or craft user"
   exit 1
fi

cd "$CRAFT_DIR"

# Step 1: Create backup tag
echo "[1/7] Creating backup tag: $BACKUP_TAG"
git tag "$BACKUP_TAG"

# Step 2: Stop the server
echo "[2/7] Stopping Craft Agents server..."
sudo systemctl stop craft-agents || true

# Step 3: Export current fixes as patch
echo "[3/7] Exporting custom fixes to patch file..."
git diff HEAD > "/tmp/craft-agents-fixes-${BACKUP_TAG}.patch"
echo "      Patch saved to: /tmp/craft-agents-fixes-${BACKUP_TAG}.patch"

# Step 4: Instructions for manual update
echo ""
echo "[4/7] Manual Step Required:"
echo "      Now you need to download and extract the new Craft Agents version."
echo "      Options:"
echo "      A) Download new release tarball and extract over $CRAFT_DIR"
echo "      B) Git pull if tracking upstream repo"
echo "      C) Copy files from new release"
echo ""
read -p "Have you updated the files? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Update cancelled. Rolling back..."
    git reset --hard "$BACKUP_TAG"
    git tag -d "$BACKUP_TAG"
    sudo systemctl start craft-agents
    echo "Rolled back to original state."
    exit 1
fi

# Step 5: Re-apply fixes
echo "[5/7] Re-applying custom fixes..."
if git apply "/tmp/craft-agents-fixes-${BACKUP_TAG}.patch" --check 2>/dev/null; then
    git apply "/tmp/craft-agents-fixes-${BACKUP_TAG}.patch"
    echo "      ✓ Fixes applied successfully"
else
    echo "      ⚠️  Some fixes could not be auto-applied (conflicts detected)"
    echo "      Attempting 3-way merge..."
    if git apply "/tmp/craft-agents-fixes-${BACKUP_TAG}.patch" --3way 2>/dev/null; then
        echo "      ✓ Fixes applied with 3-way merge"
    else
        echo "      ❌ Manual resolution required"
        echo ""
        echo "      Check git status and resolve conflicts, then:"
        echo "      1. Review conflicts: git status"
        echo "      2. Fix files manually"
        echo "      3. Mark resolved: git add <file>"
        echo "      4. Complete: git commit -m 'Resolved update conflicts'"
        echo ""
        exit 1
    fi
fi

# Step 6: Reinstall dependencies if needed
echo "[6/9] Checking dependencies..."
if [ -f "bun.lock" ]; then
    echo "      Reinstalling dependencies with bun..."
    bun install || {
        echo "      ⚠️  bun install failed, trying npm..."
        npm install
    }
fi

# Step 7: Build pi-agent-server for Kimi/Pi AI support
echo "[7/9] Building pi-agent-server..."
cd "$CRAFT_DIR/packages/pi-agent-server"
if bun run build 2>/dev/null; then
    echo "      ✓ pi-agent-server built successfully"
else
    echo "      ⚠️  pi-agent-server build failed (Kimi models may not work)"
fi
cd "$CRAFT_DIR"

# Step 8: Verify builds
echo "[8/9] Verifying builds..."
if [ -f "$CRAFT_DIR/packages/pi-agent-server/dist/index.js" ]; then
    echo "      ✓ pi-agent-server: OK"
else
    echo "      ✗ pi-agent-server: MISSING"
fi

# Step 9: Start server
echo "[9/9] Starting Craft Agents server..."
sudo systemctl start craft-agents
sleep 2

# Verify
echo ""
echo "=== Update Complete ==="
echo "Checking server status..."
sudo systemctl status craft-agents --no-pager | head -10

echo ""
echo "To rollback if needed:"
echo "  cd $CRAFT_DIR"
echo "  git reset --hard $BACKUP_TAG"
echo "  sudo systemctl restart craft-agents"
