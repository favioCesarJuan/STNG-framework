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
SKILL_NAME=$(basename "$SKILL_SOURCE" | sed 's/\.git$//')

echo -e "${CYAN}${BOLD}🛡️  Lt. Cmdr. Worf has been summoned to audit skill: $SKILL_NAME${NC}"
echo -e "Target path for audit: ${BOLD}$SKILL_SOURCE${NC}"
echo -e "------------------------------------------------------------"

# 1. Run deterministic JavaScript lifecycle auditor
echo -e "${YELLOW}⚡ [WORF]: Running Starfleet deterministic skill lifecycle audit...${NC}"
node "$FRAMEWORK_ROOT/.agents/hooks/skill-lifecycle-auditor.js" "$SKILL_SOURCE"

# 2. Run deep inspection with NVIDIA SkillSpector if installed
if command -v skillspector >/dev/null 2>&1; then
  echo -e "${YELLOW}🔬 [WORF]: Engaging NVIDIA SkillSpector deep taint & security scan...${NC}"
  skillspector scan "$SKILL_SOURCE" --min-score 85
  echo -e "${GREEN}✅ [WORF]: NVIDIA SkillSpector certified skill safety (Score >= 85).${NC}"
else
  echo -e "${CYAN}ℹ️  [WORF]: NVIDIA SkillSpector CLI not installed locally. Native Starfleet audit passed.${NC}"
fi

echo -e "${GREEN}${BOLD}✅ [WORF]: Skill '$SKILL_NAME' passed tactical security evaluation.${NC}"
exit 0
