#!/bin/bash
# ==============================================================================
# 🛸 STNG-FRAMEWORK ONE-LINE INSTALLER & ENGINE ADOPTER
# ==============================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/favioCesarJuan/STNG-framework/main/install.sh | bash
#   or: bash install.sh [--backup] [--allow-tailwind]
# ==============================================================================

set -e

REPO_URL="https://github.com/favioCesarJuan/STNG-framework.git"
TEMP_DIR=$(mktemp -d -t stng-install-XXXXXX)

# Color definitions
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}🛸 [FIRST OFFICER RIKER]: Initiating STNG-Framework installation protocol...${NC}"

# Parse optional arguments
BACKUP_EXISTING=true
ALLOW_TAILWIND=false

for arg in "$@"; do
  case $arg in
    --no-backup)
      BACKUP_EXISTING=false
      shift
      ;;
    --allow-tailwind)
      ALLOW_TAILWIND=true
      shift
      ;;
  esac
done

# Check and recommend pnpm if not detected
echo -e "📦 Checking package manager environment..."
if command -v pnpm >/dev/null 2>&1; then
  echo -e "${GREEN}⚡ pnpm detected: Starfleet recommended package manager (saves disk space & ensures hardlink immutability).${NC}"
else
  echo -e "${YELLOW}💡 Recommendation: Consider installing 'pnpm' (npm install -g pnpm).${NC}"
  echo -e "   pnpm shares dependency store across projects, saving up to 70% disk space."
fi

# Backup existing configuration if present
if [ -d ".agents" ] && [ "$BACKUP_EXISTING" = true ]; then
  BACKUP_DIR=".agents.backup.$(date +%Y%m%d%H%M%S)"
  echo -e "${YELLOW}🛡️  [WORF]: Existing .agents directory detected. Backing up to $BACKUP_DIR...${NC}"
  cp -r .agents "$BACKUP_DIR"
fi

echo -e "⏳ Downloading verified framework assets from GitHub..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" >/dev/null 2>&1

echo -e "📦 Installing .agents/ hooks, rules, and canonical skills..."
mkdir -p .agents
cp -r "$TEMP_DIR/.agents/"* .agents/

echo -e "📜 Installing operational scripts..."
mkdir -p scripts
cp -r "$TEMP_DIR/scripts/"* scripts/
chmod +x scripts/*.sh .agents/hooks/*.js 2>/dev/null || true

# Setup configuration and templates
if [ ! -f "config/models.config.json" ]; then
  mkdir -p config
  cp "$TEMP_DIR/config/models.config.json" config/models.config.json
fi

if [ ! -f "Agents.md" ]; then
  echo -e "📋 Setting up default Agents.md..."
  cp "$TEMP_DIR/templates/Agents.md" ./Agents.md
fi

if [ ! -f "rules.md" ]; then
  echo -e "📐 Setting up default rules.md..."
  cp "$TEMP_DIR/templates/rules.md" ./rules.md
fi

if [ "$ALLOW_TAILWIND" = true ]; then
  echo "export ALLOW_TAILWIND=true" >> .agents/.env 2>/dev/null || true
fi

# Cleanup temporary clone
rm -rf "$TEMP_DIR"

echo -e "🧪 Running initial diagnostic health check..."
node .agents/hooks/worf-security-shield.js --test >/dev/null
node .agents/hooks/crusher-health-check.js --test >/dev/null

echo -e "${GREEN}${BOLD}✅ [CAPTAIN PICARD]: STNG-Framework successfully installed and operational.${NC}"
echo -e "👉 Run 'node --test test/**/*.test.js' or 'pnpm test' to verify test suite."
echo -e "👉 Run 'node .agents/hooks/captains-log-writer.js --test' to verify telemetry."
