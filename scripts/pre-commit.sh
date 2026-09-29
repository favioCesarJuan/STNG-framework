#!/bin/bash
# ==============================================================================
# 🛡️ LT. CMDR. WORF & DR. CRUSHER PRE-COMMIT VALIDATION PROTOCOL
# ==============================================================================
# Executes deterministic typechecks, security audits, and health diagnostics.
# ==============================================================================

set -e

echo "🛡️  [WORF]: Engaging tactical pre-commit security shields..."
node .agents/hooks/worf-security-shield.js --test

echo "🩺  [CRUSHER]: Running medical health and Ponytail compliance check..."
node .agents/hooks/crusher-health-check.js --test

echo "📜  [COMPUTER]: Recording audit status to Captain's Log..."
node .agents/hooks/captains-log-writer.js --test >/dev/null

echo "✅ [FIRST OFFICER RIKER]: All pre-commit validation checks PASSED. Enterprise cleared for warp."
exit 0
