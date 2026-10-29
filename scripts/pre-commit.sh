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

echo "🛡️  [WORF]: Verifying Node.js host runtime posture against CVEs..."
node "$FRAMEWORK_ROOT/scripts/worf-node-audit.js" --test

if command -v semgrep >/dev/null 2>&1; then
  echo "🛡️  [WORF]: Engaging Semgrep AST tactical code scan..."
  semgrep scan --config "$FRAMEWORK_ROOT/.agents/rules/semgrep-starfleet.yml" --error --disable-version-check --metrics=off "$FRAMEWORK_ROOT"
fi

echo "📜  [COMPUTER]: Recording audit status to Captain's Log..."
node "$FRAMEWORK_ROOT/.agents/hooks/captains-log-writer.js" --test >/dev/null

echo "✅ [FIRST OFFICER RIKER]: All pre-commit validation checks PASSED. Enterprise cleared for warp."
exit 0
