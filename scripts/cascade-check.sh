#!/bin/bash
# ==============================================================================
# 🌌 CASCADE IMPACT CHECKER (Knowledge Graph Dependency Scoping)
# ==============================================================================
# Evaluates which downstream packages are impacted by recent Git modifications.
# ==============================================================================

set -e

CHANGED_FILES=$(git status --porcelain | awk '{print $2}')

if [ -z "$CHANGED_FILES" ]; then
  echo "🌌 [DATA]: No changed files detected in workspace."
  exit 0
fi

echo "🌌 [DATA]: Computing cascade impact across monorepo topology..."
node .agents/hooks/cascade-evaluator.js $CHANGED_FILES
