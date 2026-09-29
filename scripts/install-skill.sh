#!/bin/bash
# ==============================================================================
# 🛡️ LT. CMDR. WORF'S AUTOMATED SKILL AUDITOR & INSTALLER
# ==============================================================================
# Description: Enforces security protocols by auditing third-party skills for 
#              prompt injection, malicious command executions, and credential 
#              exfiltration risks prior to copying them to .agents/skills/.
# ==============================================================================

set -e

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

# Run our JavaScript deterministic lifecycle auditor
node .agents/hooks/skill-lifecycle-auditor.js "$SKILL_SOURCE"

echo -e "${GREEN}${BOLD}✅ [WORF]: Skill '$SKILL_NAME' passed tactical security evaluation.${NC}"
exit 0
