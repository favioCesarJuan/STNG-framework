#!/bin/bash
# ==============================================================================
# 🛡️ LT. CMDR. WORF & DR. CRUSHER PRE-COMMIT VALIDATION PROTOCOL
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🛡️  [WORF]: Engaging tactical pre-commit security shields..."
node "$FRAMEWORK_ROOT/.agents/hooks/worf-security-shield.js" --test

echo "🩺  [CRUSHER]: Running medical health and Ponytail compliance check..."
node "$FRAMEWORK_ROOT/.agents/hooks/crusher-health-check.js" --test

echo "📜  [COMPUTER]: Recording audit status to Captain's Log..."
node "$FRAMEWORK_ROOT/.agents/hooks/captains-log-writer.js" --test >/dev/null

echo "✅ [FIRST OFFICER RIKER]: All pre-commit validation checks PASSED. Enterprise cleared for warp."
exit 0
