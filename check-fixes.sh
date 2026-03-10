#!/bin/bash
# Check if custom fixes are properly applied

echo "=== Craft Agents Custom Fixes Status ==="
echo ""

cd /DATA/craft-agents-oss

# Check 1: CONFIG_DIR export
echo "[1/4] Checking CONFIG_DIR export..."
if grep -q "export \* from './paths.ts';" packages/shared/src/config/index.ts; then
    echo "      ✓ CONFIG_DIR is exported"
else
    echo "      ✗ CONFIG_DIR export missing"
fi

# Check 2: File path validation
echo "[2/4] Checking file path validation..."
if grep -q "CONFIG_DIR" packages/server-core/src/handlers/utils.ts; then
    echo "      ✓ CONFIG_DIR added to allowed directories"
else
    echo "      ✗ CONFIG_DIR not in allowed directories"
fi

# Check 3: Global error handlers
echo "[3/4] Checking global error handlers..."
if grep -q "uncaughtException" packages/server/src/index.ts; then
    echo "      ✓ Global error handlers present"
else
    echo "      ✗ Global error handlers missing"
fi

# Check 4: forceAbort try-catch
echo "[4/4] Checking forceAbort error handling..."
COUNT=$(grep -c "try {" packages/server-core/src/sessions/SessionManager.ts || echo "0")
if [ "$COUNT" -ge "4" ]; then
    echo "      ✓ forceAbort calls wrapped in try-catch"
else
    echo "      ✗ forceAbort protection incomplete ($COUNT/4 found)"
fi

echo ""
echo "=== Git Status ==="
git status --short

echo ""
echo "=== Recent Commits ==="
git log --oneline -5
