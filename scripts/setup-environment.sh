#!/bin/bash
# ==============================================================================
# 🚀 STNG-FRAMEWORK SETUP & INITIALIZATION
# ==============================================================================

set -e

echo "🛸 Initializing STNG-Framework Enterprise environment..."

# Make all scripts executable
chmod +x scripts/*.sh .agents/hooks/*.js 2>/dev/null || true

# Test core hooks
echo "🛡️  Validating Worf Security Shield..."
node .agents/hooks/worf-security-shield.js --test

echo "🩺  Validating Dr. Crusher Medical Health Check..."
node .agents/hooks/crusher-health-check.js --test

echo "📜  Initializing Captain's Log..."
node .agents/hooks/captains-log-writer.js --test

echo "🎉 STNG-Framework environment ready. Starship Enterprise is fully operational."
