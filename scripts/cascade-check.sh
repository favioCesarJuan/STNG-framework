#!/bin/bash
set -e

CHANGED_FILES=$(git status --porcelain | awk '{print $2}')

if [ -z "$CHANGED_FILES" ]; then
  echo "[CASCADE SCOPE]: No changed files detected in workspace."
  exit 0
fi

echo "[CASCADE SCOPE]: Computing cascade impact across monorepo topology..."
node .agents/hooks/monorepo-cascade-scope.js $CHANGED_FILES
