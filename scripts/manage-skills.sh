#!/bin/bash
# ==============================================================================
# 🔄 SKILL LIFECYCLE & SYNTHESIZER MANAGER (Worf & Geordi)
# ==============================================================================
# Commands:
#   audit <path>     - Audits a local skill or remote repository
#   list             - Lists all 7 canonical skills and their status
#   check-updates    - Checks for upstream skill modifications
# ==============================================================================

ACTION="${1:-list}"

case "$ACTION" in
  audit)
    if [ -z "$2" ]; then
      echo "Usage: $0 audit <path-to-skill>"
      exit 1
    fi
    node .agents/hooks/skill-lifecycle-auditor.js "$2"
    ;;
  list)
    echo "🛸 Canonical Skills in STNG-Framework:"
    ls -1 .agents/skills/
    ;;
  check-updates)
    echo "🔍 [WORF]: Scanning upstream skills for version drift..."
    node .agents/hooks/skill-lifecycle-auditor.js --test
    ;;
  *)
    echo "Unknown action: $ACTION. Supported: audit, list, check-updates"
    exit 1
    ;;
esac
