#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ACTION="${1:-list}"

case "$ACTION" in
  audit)
    if [ -z "$2" ]; then
      echo "Usage: $0 audit <path-to-skill>"
      exit 1
    fi
    node "$FRAMEWORK_ROOT/.agents/hooks/skill-security-scanner.js" "$2"
    ;;
  list)
    echo "Canonical Skills in STNG-Framework:"
    ls -1 "$FRAMEWORK_ROOT/.agents/skills/"
    ;;
  check-updates)
    echo "Running skill security scanner self-test..."
    node "$FRAMEWORK_ROOT/.agents/hooks/skill-security-scanner.js" --test
    ;;
  *)
    echo "Unknown action: $ACTION. Supported: audit, list, check-updates"
    exit 1
    ;;
esac
