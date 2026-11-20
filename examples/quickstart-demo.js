#!/usr/bin/env node
/**
 * ==============================================================================
 * STNG-FRAMEWORK: 30-SECOND REPRODUCIBLE GOVERNANCE DEMO
 * ==============================================================================
 * Demonstrates in <1s without external dependencies:
 * 1. Pre-tool shell guard blocking `rm -rf /` and protected path writes.
 * 2. Post-edit policy check catching continuous `setInterval` polling.
 * 3. Audit log writer recording structured JSON + Markdown ledger in a temp dir.
 * 4. Optional `--theme=standard|naval|local` toggle (zero extra output tokens).
 * ==============================================================================
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { evaluateSecurity } from '../.agents/hooks/pre-tool-shell-guard.js';
import { checkFilePolicy } from '../.agents/hooks/post-edit-policy-check.js';
import { appendAuditLog, formatMissionClock } from '../.agents/hooks/audit-log-writer.js';
import { resolveThemeMode, getHookLabel, getZoneName } from '../.agents/hooks/theme-loader.js';

const explicitThemeArg = process.argv.find(a => a.startsWith('--theme='));
const theme = resolveThemeMode(process.argv.slice(2));
if (explicitThemeArg) {
  process.env.AGENT_THEME = theme;
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stng-demo-'));

try {
  console.log(`\n=== ${getHookLabel('sim')} STNG-FRAMEWORK QUICKSTART DEMO (theme=${theme}, env=${getZoneName('simBay')}) ===\n`);

  // 1. Pre-tool shell guard
  const blockedCmd = evaluateSecurity({ tool: 'run_command', args: { CommandLine: 'rm -rf /' } });
  const blockedPath = evaluateSecurity({ tool: 'write_to_file', args: { TargetFile: '/etc/shadow' } });
  const allowedCmd = evaluateSecurity({ tool: 'run_command', args: { CommandLine: 'npm test' } });

  console.log('1. Pre-Tool Shell & Path Guard:');
  console.log(`   - "rm -rf /"    -> allowed=${blockedCmd.allowed} (${blockedCmd.reason})`);
  console.log(`   - "/etc/shadow" -> allowed=${blockedPath.allowed} (${blockedPath.reason})`);
  console.log(`   - "npm test"    -> allowed=${allowedCmd.allowed}\n`);

  // 2. Post-edit policy check
  const dirtySample = `setInterval(async () => { await fetch('/api/status'); }, 2000);`;
  const policyIssues = checkFilePolicy('src/poller.ts', dirtySample);
  console.log('2. Post-Edit Policy Check:');
  console.log(`   - Scanned src/poller.ts -> ${policyIssues.length} issue(s): [${policyIssues[0]?.ruleId}] ${policyIssues[0]?.message}\n`);

  // 3. Immutable Audit Log Writer
  const entry = appendAuditLog({
    event: 'demo_guardrail_block',
    mission: 'Block destructive command and continuous polling in quickstart demo',
    securityStatus: blockedCmd.allowed ? 'ALLOW' : 'BLOCKED',
    healthStatus: policyIssues.length > 0 ? 'POLICY_VIOLATION' : 'HEALTHY',
    filesTouched: ['src/poller.ts'],
    details: blockedCmd.reason
  }, { rootDir: tmpDir });

  console.log('3. Audit Log Written:');
  console.log(`   - JSON: ${path.join(tmpDir, '.agents/audit_log.json')}`);
  console.log(`   - MD:   ${path.join(tmpDir, '.agents/audit_log.md')}`);
  console.log(`   - Entry ID: ${entry.id} | Timestamp: ${entry.missionClock ? formatMissionClock() : entry.timestamp}\n`);
  console.log(`=== ${getHookLabel('sim')} DEMO COMPLETE (<1s, 0 external dependencies) ===\n`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
