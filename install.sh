#!/bin/bash
# ==============================================================================
# 🛸 STNG-FRAMEWORK ONE-LINE INSTALLER & ENGINE ADOPTER
# ==============================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/favioCesarJuan/STNG-framework/main/install.sh | bash
#   or: bash install.sh
# ==============================================================================

set -e

REPO_URL="https://github.com/favioCesarJuan/STNG-framework.git"
TEMP_DIR=$(mktemp -d -t stng-install-XXXXXX)

echo "🛸 [FIRST OFFICER RIKER]: Initiating STNG-Framework installation protocol..."

echo "⏳ Downloading framework assets from GitHub..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" >/dev/null 2>&1

echo "📦 Installing .agents/ hooks, rules, and canonical skills..."
mkdir -p .agents
cp -r "$TEMP_DIR/.agents/"* .agents/

echo "📜 Installing operational scripts..."
mkdir -p scripts
cp -r "$TEMP_DIR/scripts/"* scripts/
chmod +x scripts/*.sh .agents/hooks/*.js 2>/dev/null || true

# Check if project already has templates, otherwise offer templates
if [ ! -f "Agents.md" ]; then
  echo "📋 Setting up default Agents.md..."
  cp "$TEMP_DIR/templates/Agents.md" ./Agents.md
fi

if [ ! -f "rules.md" ]; then
  echo "📐 Setting up default rules.md..."
  cp "$TEMP_DIR/templates/rules.md" ./rules.md
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo "🧪 Running initial diagnostic health check..."
node .agents/hooks/worf-security-shield.js --test >/dev/null
node .agents/hooks/crusher-health-check.js --test >/dev/null

echo "✅ [CAPTAIN PICARD]: STNG-Framework successfully installed and operational."
echo "👉 Run 'node .agents/hooks/captains-log-writer.js --test' to verify telemetry."
