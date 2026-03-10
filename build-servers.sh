#!/bin/bash
# Build agent servers that need compilation
# Run this after installing dependencies or updating Craft Agents

set -e

echo "=== Building Agent Servers ==="

# Build pi-agent-server for Kimi/Pi AI support
echo "[1/2] Building pi-agent-server..."
cd /DATA/craft-agents-oss/packages/pi-agent-server
bun run build

echo "[2/2] Verifying build..."
if [ -f "/DATA/craft-agents-oss/packages/pi-agent-server/dist/index.js" ]; then
    echo "✓ pi-agent-server built successfully"
else
    echo "✗ pi-agent-server build failed"
    exit 1
fi

echo ""
echo "=== Build Complete ==="
echo "You can now restart the Craft Agents server:"
echo "  sudo systemctl restart craft-agents"
