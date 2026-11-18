#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "[SECURITY GUARD]: Running pre-commit shell & path guard..."
node "$FRAMEWORK_ROOT/.agents/hooks/pre-tool-shell-guard.js" --test

echo "[POLICY CHECK]: Running post-edit policy check..."
node "$FRAMEWORK_ROOT/.agents/hooks/post-edit-policy-check.js" --test

echo "[NODE CVE CHECK]: Verifying Node.js host runtime baseline..."
node "$FRAMEWORK_ROOT/scripts/node-runtime-cve-check.js" --test

if command -v semgrep >/dev/null 2>&1; then
  echo "[SAST]: Running Semgrep AST code scan..."
  semgrep scan --config "$FRAMEWORK_ROOT/.semgrep.yml" --error --disable-version-check --metrics=off "$FRAMEWORK_ROOT"
fi

echo "[AUDIT LOG]: Verifying audit log writer..."
node "$FRAMEWORK_ROOT/.agents/hooks/audit-log-writer.js" --test >/dev/null

echo "[OK]: All pre-commit validation checks PASSED."
exit 0
