#!/bin/bash
# ==============================================================================
# 🚀 STNG-FRAMEWORK SETUP & INITIALIZATION
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🛸 Initializing STNG-Framework Enterprise environment..."

# Make all scripts executable
chmod +x "$FRAMEWORK_ROOT/scripts/"*.sh "$FRAMEWORK_ROOT/.agents/hooks/"*.js 2>/dev/null || true

# Test core hooks
echo "🛡️  Validating Worf Security Shield..."
node "$FRAMEWORK_ROOT/.agents/hooks/worf-security-shield.js" --test

echo "🩺  Validating Dr. Crusher Medical Health Check..."
node "$FRAMEWORK_ROOT/.agents/hooks/crusher-health-check.js" --test

echo "📜  Initializing Captain's Log..."
node "$FRAMEWORK_ROOT/.agents/hooks/captains-log-writer.js" --test

echo "🎉 STNG-Framework environment ready. Starship Enterprise is fully operational."
