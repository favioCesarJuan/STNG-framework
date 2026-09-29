#!/usr/bin/env node
/**
 * ==============================================================================
 * 🌌 CASCADE EVALUATION LOOP (Knowledge Graph & Impact Scoping)
 * ==============================================================================
 * Maps modified files to their dependent downstream consumers using project
 * dependency topology (or MCP graph queries). Prevents full monorepo rescans
 * by dispatching targeted medical diagnostics exclusively to affected nodes.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Mock or heuristic dependency mapping for monorepo topology
const TOPOLOGY_RULES = [
  {
    sourceMatch: /^packages\/shared-types\//,
    affects: ['apps/web', 'apps/mobile', 'apps/api', 'apps/landing', 'apps/extension']
  },
  {
    sourceMatch: /^packages\/shared-utils\//,
    affects: ['apps/web', 'apps/mobile', 'apps/api']
  },
  {
    sourceMatch: /^packages\/ui-tokens\//,
    affects: ['apps/web', 'apps/mobile', 'apps/landing']
  },
  {
    sourceMatch: /^apps\/api\//,
    affects: ['apps/api']
  },
  {
    sourceMatch: /^apps\/mobile\//,
    affects: ['apps/mobile']
  },
  {
    sourceMatch: /^apps\/web\//,
    affects: ['apps/web']
  }
];

/**
 * Calculates downstream affected projects based on changed file paths.
 * @param {string[]} changedFiles
 * @returns {string[]} Set of affected packages/apps
 */
export function calculateAffectedNodes(changedFiles = []) {
  const affected = new Set();

  for (const file of changedFiles) {
    const normalized = file.replace(/^\.\//, '');
    for (const rule of TOPOLOGY_RULES) {
      if (rule.sourceMatch.test(normalized)) {
        for (const target of rule.affects) {
          affected.add(target);
        }
      }
    }
  }

  return Array.from(affected);
}

// Self-test runner
if (process.argv.includes('--test')) {
  console.log('🌌  Running Cascade Evaluator self-test...');

  const sampleChanges = [
    'packages/shared-types/src/workday.ts',
    'apps/mobile/src/screens/PunchScreen.tsx'
  ];

  const affected = calculateAffectedNodes(sampleChanges);

  console.log('Inputs:', sampleChanges);
  console.log('Affected nodes calculated:', affected);

  if (affected.includes('apps/web') && affected.includes('apps/api') && affected.includes('apps/mobile')) {
    console.log('✅ CASCADE: Downstream nodes correctly mapped from shared-types modification.');
    console.log('🌌  [DATA & Q]: Cascade Evaluation self-test PASSED.');
    process.exit(0);
  } else {
    console.error('🚨 FAILED to map cascade impact.');
    process.exit(1);
  }
}
