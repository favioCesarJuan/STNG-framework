#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "[SECURITY GUARD]: Running pre-commit shell & path guard..."
node "$FRAMEWORK_ROOT/.agents/hooks/pre-tool-shell-guard.js" --test

STAGED_FILES=()
if command -v git >/dev/null 2>&1 && git -C "$FRAMEWORK_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  while IFS= read -r file; do
    if [ -n "$file" ] && [ -f "$FRAMEWORK_ROOT/$file" ]; then
      STAGED_FILES+=("$FRAMEWORK_ROOT/$file")
    fi
  done < <(git -C "$FRAMEWORK_ROOT" diff --cached --name-only --diff-filter=ACMR)
fi

if [ "${#STAGED_FILES[@]}" -gt 0 ]; then
  echo "[POLICY CHECK]: Scanning ${#STAGED_FILES[@]} staged file(s)..."
  node "$FRAMEWORK_ROOT/.agents/hooks/post-edit-policy-check.js" "${STAGED_FILES[@]}"
  for f in "${STAGED_FILES[@]}"; do
    case "$f" in
      */.agents/skills/*)
        echo "[SKILL SCANNER]: Auditing staged skills..."
        node "$FRAMEWORK_ROOT/.agents/hooks/skill-security-scanner.js" "$FRAMEWORK_ROOT/.agents/skills"
        break
        ;;
    esac
  done
else
  echo "[POLICY CHECK]: Running post-edit policy check self-test..."
  node "$FRAMEWORK_ROOT/.agents/hooks/post-edit-policy-check.js" --test
fi

echo "[NODE CVE CHECK]: Verifying Node.js host runtime baseline..."
node "$FRAMEWORK_ROOT/scripts/node-runtime-cve-check.js" --test

if command -v semgrep >/dev/null 2>&1 && [ -f "$FRAMEWORK_ROOT/.semgrep.yml" ]; then
  echo "[SAST]: Running Semgrep AST code scan..."
  semgrep scan --config "$FRAMEWORK_ROOT/.semgrep.yml" --error --disable-version-check --metrics=off "$FRAMEWORK_ROOT"
fi

echo "[AUDIT LOG]: Verifying audit log writer..."
node "$FRAMEWORK_ROOT/.agents/hooks/audit-log-writer.js" --test >/dev/null

if [ -x "$FRAMEWORK_ROOT/node_modules/.bin/tsc" ] && [ -f "$FRAMEWORK_ROOT/tsconfig.json" ]; then
  echo "[TYPECHECK]: Running TypeScript static check (tsc --noEmit)..."
  "$FRAMEWORK_ROOT/node_modules/.bin/tsc" --noEmit -p "$FRAMEWORK_ROOT/tsconfig.json"
fi

echo "[OK]: All pre-commit validation checks PASSED."
exit 0
