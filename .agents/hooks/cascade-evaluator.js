#!/usr/bin/env node
/**
 * ==============================================================================
 * 🌌 CASCADE EVALUATION LOOP (Knowledge Graph & Impact Scoping)
 * ==============================================================================
 * Maps modified files to their dependent downstream consumers using dynamic
 * workspace dependency topology (or MCP graph queries). Prevents full monorepo
 * rescans by dispatching targeted medical diagnostics exclusively to affected nodes.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Fallback heuristic rules for when no dynamic workspaces are discovered
export const TOPOLOGY_RULES = [
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
 * Discovers monorepo package directories and builds a dependency DAG.
 * @param {string} rootDir
 * @returns {object|null} { dirToName, nameToDir, dependentsOf } or null if not a monorepo
 */
export function discoverWorkspaceTopology(rootDir = process.cwd()) {
  const root = path.resolve(rootDir);
  const candidateRoots = ['apps', 'packages', 'libs', 'services', 'modules'];
  const pkgDirs = [];

  for (const cand of candidateRoots) {
    const parent = path.join(root, cand);
    if (fs.existsSync(parent) && fs.statSync(parent).isDirectory()) {
      const children = fs.readdirSync(parent);
      for (const child of children) {
        const fullChild = path.join(parent, child);
        const pkgJson = path.join(fullChild, 'package.json');
        if (fs.existsSync(pkgJson)) {
          pkgDirs.push({
            relPath: path.posix.join(cand, child),
            fullPath: fullChild,
            pkgJsonPath: pkgJson
          });
        }
      }
    }
  }

  if (pkgDirs.length === 0) {
    return null;
  }

  const dirToName = new Map();
  const nameToDir = new Map();
  const pkgDeps = new Map();

  for (const item of pkgDirs) {
    try {
      const data = JSON.parse(fs.readFileSync(item.pkgJsonPath, 'utf-8'));
      const pkgName = data.name || path.basename(item.relPath);
      dirToName.set(item.relPath, pkgName);
      nameToDir.set(pkgName, item.relPath);

      const allDeps = {
        ...(data.dependencies || {}),
        ...(data.devDependencies || {}),
        ...(data.peerDependencies || {})
      };
      pkgDeps.set(pkgName, Object.keys(allDeps));
    } catch {}
  }

  // Build dependentsOf graph: depName -> Set of packageNames that import it
  const dependentsOf = new Map();
  for (const [pkgName, deps] of pkgDeps.entries()) {
    for (const dep of deps) {
      if (nameToDir.has(dep)) {
        if (!dependentsOf.has(dep)) dependentsOf.set(dep, new Set());
        dependentsOf.get(dep).add(pkgName);
      }
    }
  }

  return { dirToName, nameToDir, dependentsOf };
}

/**
 * Calculates downstream affected projects based on changed file paths.
 * Uses dynamic workspace topology if available, with seamless fallback to static rules.
 * @param {string[]} changedFiles
 * @param {string} rootDir
 * @returns {string[]} Set of affected packages/apps
 */
export function calculateAffectedNodes(changedFiles = [], rootDir = process.cwd()) {
  const affected = new Set();
  const topology = discoverWorkspaceTopology(rootDir);

  if (topology && topology.dirToName.size > 0) {
    // Dynamic DAG resolution
    for (const file of changedFiles) {
      const normalized = file.replace(/^\.\//, '').replace(/\\/g, '/');

      // Find which package owns this file
      let matchedRelDir = null;
      let matchedPkgName = null;

      for (const [relDir, pkgName] of topology.dirToName.entries()) {
        if (normalized === relDir || normalized.startsWith(relDir + '/')) {
          matchedRelDir = relDir;
          matchedPkgName = pkgName;
          break;
        }
      }

      if (matchedRelDir && matchedPkgName) {
        // The package itself is affected
        affected.add(matchedRelDir);

        // Transitively find all dependents
        const queue = [matchedPkgName];
        const visited = new Set([matchedPkgName]);

        while (queue.length > 0) {
          const current = queue.shift();
          const dependents = topology.dependentsOf.get(current) || [];
          for (const depName of dependents) {
            if (!visited.has(depName)) {
              visited.add(depName);
              const depDir = topology.nameToDir.get(depName);
              if (depDir) affected.add(depDir);
              queue.push(depName);
            }
          }
        }
      }
    }
  }

  // Fallback to static heuristic rules if dynamic didn't match anything
  if (affected.size === 0) {
    for (const file of changedFiles) {
      const normalized = file.replace(/^\.\//, '').replace(/\\/g, '/');
      for (const rule of TOPOLOGY_RULES) {
        if (rule.sourceMatch.test(normalized)) {
          for (const target of rule.affects) {
            affected.add(target);
          }
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
