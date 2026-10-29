#!/bin/bash
# ==============================================================================
# 🛡️ LT. CMDR. WORF'S AUTOMATED SKILL AUDITOR & INSTALLER
# ==============================================================================
# Description: Enforces security protocols by auditing third-party skills for 
#              prompt injection, malicious command executions, MCP tool poisoning,
#              and credential exfiltration risks prior to copying them to .agents/skills/.
#              Leverages Starfleet Lifecycle Auditor & NVIDIA SkillSpector.
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

if [ -z "$1" ]; then
  echo -e "${RED}${BOLD}🚨 [WORF]: Usage error. Command format is: $0 <path-to-skill-or-repository-url>${NC}"
  exit 1
fi

SKILL_SOURCE="$1"
CLEAN_NAME=$(basename "$SKILL_SOURCE" | sed 's/\.git$//')
SKILL_NAME=$(echo "$CLEAN_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')
TARGET_SKILL_DIR="$FRAMEWORK_ROOT/.agents/skills/$SKILL_NAME"

echo -e "${CYAN}${BOLD}🛡️  Lt. Cmdr. Worf has been summoned to audit skill: $SKILL_NAME${NC}"
echo -e "Target path for audit: ${BOLD}$SKILL_SOURCE${NC}"
echo -e "------------------------------------------------------------"

TEMP_CLONE=""
AUDIT_TARGET="$SKILL_SOURCE"

# Check if source is a remote git URL
if [[ "$SKILL_SOURCE" =~ ^https?:// ]] || [[ "$SKILL_SOURCE" =~ ^git@ ]]; then
  TEMP_CLONE=$(mktemp -d)
  echo -e "${YELLOW}📥 [WORF]: Cloning remote skill into quarantined sandbox: $TEMP_CLONE...${NC}"
  git clone --depth 1 "$SKILL_SOURCE" "$TEMP_CLONE" >/dev/null 2>&1
  AUDIT_TARGET="$TEMP_CLONE"
fi

# 1. Run deterministic JavaScript lifecycle auditor
echo -e "${YELLOW}⚡ [WORF]: Running Starfleet deterministic skill lifecycle audit...${NC}"
node "$FRAMEWORK_ROOT/.agents/hooks/skill-lifecycle-auditor.js" "$AUDIT_TARGET"

# 2. Run deep inspection with NVIDIA SkillSpector if installed
if command -v skillspector >/dev/null 2>&1; then
  echo -e "${YELLOW}🔬 [WORF]: Engaging NVIDIA SkillSpector deep taint & security scan...${NC}"
  skillspector scan "$AUDIT_TARGET" --min-score 85
  echo -e "${GREEN}✅ [WORF]: NVIDIA SkillSpector certified skill safety (Score >= 85).${NC}"
else
  echo -e "${CYAN}ℹ️  [WORF]: NVIDIA SkillSpector CLI not installed locally. Native Starfleet audit passed.${NC}"
fi

# 3. Securely deploy audited skill to .agents/skills/
echo -e "${CYAN}📦 [WORF]: Deploying audited skill to: $TARGET_SKILL_DIR...${NC}"
mkdir -p "$TARGET_SKILL_DIR"

if [ -f "$AUDIT_TARGET" ]; then
  cp "$AUDIT_TARGET" "$TARGET_SKILL_DIR/SKILL.md"
elif [ -d "$AUDIT_TARGET" ]; then
  cp -r "$AUDIT_TARGET/"* "$TARGET_SKILL_DIR/"
fi

# Cleanup temp clone if used
if [ -n "$TEMP_CLONE" ] && [ -d "$TEMP_CLONE" ]; then
  rm -rf "$TEMP_CLONE"
fi

echo -e "${GREEN}${BOLD}✅ [WORF]: Skill '$SKILL_NAME' successfully installed and armed in Starfleet tactical perimeter.${NC}"
exit 0
