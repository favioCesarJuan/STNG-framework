#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Initializing STNG-Framework Governance Runtime..."

chmod +x "$FRAMEWORK_ROOT/scripts/"*.sh "$FRAMEWORK_ROOT/.agents/hooks/"*.js 2>/dev/null || true

echo "Validating pre-tool shell & path guard..."
node "$FRAMEWORK_ROOT/.agents/hooks/pre-tool-shell-guard.js" --test

echo "Validating post-edit policy check..."
node "$FRAMEWORK_ROOT/.agents/hooks/post-edit-policy-check.js" --test

echo "Validating audit log writer..."
node "$FRAMEWORK_ROOT/.agents/hooks/audit-log-writer.js" --test

echo "STNG-Framework governance runtime ready."
