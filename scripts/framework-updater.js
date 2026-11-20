#!/usr/bin/env node
/**
 * ==============================================================================
 * FRAMEWORK UPDATER (Consulted & Security-Gated Quarantine Pipeline)
 * ==============================================================================
 * Safely updates governance hooks, rules, and skills with:
 * 1. Non-intrusive drift detection.
 * 2. Mandatory interactive confirmation (never silent).
 * 3. Quadruple Security Gate in isolated quarantine:
 *    - Pre-Tool Shell & Path Guard
 *    - Semgrep SAST (.semgrep.yml)
 *    - Skill Security Scanner
 *    - Node.js Runtime CVE Baseline Check
 * 4. Automatic backup + atomic rollback on verification failure.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline';
import { execFileSync, spawnSync } from 'node:child_process';
import { evaluateSecurity } from '../.agents/hooks/pre-tool-shell-guard.js';
import { verifySkillIntegrity } from '../.agents/hooks/skill-security-scanner.js';
import { auditNodeRuntime } from './node-runtime-cve-check.js';

const UPSTREAM_REPO = 'https://github.com/favioCesarJuan/STNG-framework.git';

/** @param {string} query @returns {Promise<string>} */
function promptUser(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

/** @param {string} targetDir @returns {string} */
export function getInstalledVersion(targetDir) {
  const lockFile = path.join(targetDir, '.agents/framework-lock.json');
  if (fs.existsSync(lockFile)) {
    try {
      const lock = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
      return lock.version || '1.0.0';
    } catch { /* fallback: invalid framework-lock.json */ }
  }
  const pkgFile = path.join(targetDir, 'package.json');
  if (fs.existsSync(pkgFile)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
      if (pkg.name === 'stng-framework') return pkg.version || '1.0.0';
    } catch { /* fallback: invalid package.json */ }
  }
  return '1.0.0';
}

/**
 * Evaluates a quarantined update candidate against the 4 security gates.
 * @param {string} quarantinedDir
 * @returns {Promise<{ passed: boolean, gateResults: import('../types/index.d.ts').SecurityGateOutcome[] }>}
 */
export async function runQuadrupleSecurityGate(quarantinedDir) {
  /** @type {import('../types/index.d.ts').SecurityGateOutcome[]} */
  const gateResults = [];

  // Gate 1: Shell & Path Guard
  let gate1Passed = true;
  let gate1Details = 'All command patterns and file paths nominal.';
  try {
    const files = fs.readdirSync(quarantinedDir, { recursive: true });
    for (const f of files) {
      const rel = f.toString();
      const full = path.join(quarantinedDir, rel);
      // Skip dependencies, VCS, self-test fixtures, and test suites that intentionally contain attack patterns
      if (
        rel.startsWith('node_modules/') ||
        rel.startsWith('.git/') ||
        rel.startsWith('test/') ||
        rel.startsWith('examples/') ||
        rel.endsWith('pre-tool-shell-guard.js')
      ) continue;
      if (fs.existsSync(full) && fs.statSync(full).isFile() && (full.endsWith('.js') || full.endsWith('.sh'))) {
        const content = fs.readFileSync(full, 'utf-8');
        const scanContent = full.endsWith('.sh')
          ? content.split(/\r?\n/).filter(l => !l.trim().startsWith('#')).join('\n')
          : content;
        const verdict = evaluateSecurity({ tool: 'run_command', args: { CommandLine: scanContent } });
        if (!verdict.allowed) {
          gate1Passed = false;
          gate1Details = verdict.reason || 'Blocked by pre-tool security guard.';
          break;
        }
      }
    }
  } catch (err) {
    gate1Passed = false;
    gate1Details = err instanceof Error ? err.message : String(err);
  }
  gateResults.push({ gate: 'Pre-Tool Shell & Path Guard', passed: gate1Passed, details: gate1Details });

  // Gate 2: Semgrep AST Static Analysis
  let gate2Passed = true;
  let gate2Details = 'Semgrep AST rules evaluated.';
  const semgrepRule = fs.existsSync(path.join(quarantinedDir, '.semgrep.yml'))
    ? path.join(quarantinedDir, '.semgrep.yml')
    : path.join(quarantinedDir, '.agents/rules/semgrep-governance.yml');
  const hasSemgrep = spawnSync('which', ['semgrep'], { encoding: 'utf-8' }).status === 0;

  if (hasSemgrep && fs.existsSync(semgrepRule)) {
    const semRun = spawnSync('semgrep', ['scan', '--config', semgrepRule, '--error', '--disable-version-check', '--metrics=off', quarantinedDir], {
      encoding: 'utf-8',
      timeout: 15000
    });
    if (semRun.status !== 0) {
      gate2Passed = false;
      gate2Details = semRun.stderr || semRun.stdout || 'Semgrep identified blocking violations.';
    } else {
      gate2Details = 'Semgrep AST verified: 0 blocking findings.';
    }
  } else {
    gate2Details = 'Semgrep CLI not detected locally; skipped external AST scan.';
  }
  gateResults.push({ gate: 'Semgrep AST Code Analysis', passed: gate2Passed, details: gate2Details });

  // Gate 3: Skill Security Scanner
  let gate3Passed = true;
  let gate3Details = 'All canonical skills verified.';
  const skillsDir = path.join(quarantinedDir, '.agents/skills');
  if (fs.existsSync(skillsDir)) {
    const dirs = fs.readdirSync(skillsDir);
    for (const d of dirs) {
      const skillPath = path.join(skillsDir, d);
      if (fs.existsSync(skillPath) && fs.statSync(skillPath).isDirectory()) {
        const spector = verifySkillIntegrity(skillPath, { minScore: 85 });
        if (!spector.passed || spector.score < 85) {
          gate3Passed = false;
          gate3Details = `Skill '${d}' failed security score (${spector.score}/100 < 85)`;
          break;
        }
      }
    }
  }
  gateResults.push({ gate: 'Skill Security & Integrity Scanner', passed: gate3Passed, details: gate3Details });

  // Gate 4: Node.js Runtime CVE Baseline
  const nodeAudit = await auditNodeRuntime();
  const gate4Passed = nodeAudit.ok;
  const gate4Details = nodeAudit.ok
    ? `Host Node.js runtime (${nodeAudit.currentVersion}) verified secure.`
    : nodeAudit.findings.join('; ');
  gateResults.push({ gate: 'Node.js Runtime CVE Baseline', passed: gate4Passed, details: gate4Details });

  const allPassed = gateResults.every(g => g.passed);
  return { passed: allPassed, gateResults };
}

/**
 * Runs a consulted, quarantined framework update workflow.
 * @param {string} [targetDir]
 * @param {import('../types/index.d.ts').FrameworkUpdateOptions} [options]
 * @returns {Promise<import('../types/index.d.ts').FrameworkUpdateResult>}
 */
export async function runFrameworkUpdate(targetDir = process.cwd(), options = {}) {
  const root = path.resolve(targetDir);
  const currentVersion = getInstalledVersion(root);

  console.log(`\n\x1b[36m\x1b[1mSTNG-FRAMEWORK: CONSULTED FRAMEWORK UPDATER\x1b[0m`);
  console.log(`Target: \x1b[33m${root}\x1b[0m | Installed Version: \x1b[32mv${currentVersion}\x1b[0m\n`);

  const quarantineDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stng-update-'));
  const source = options.source || UPSTREAM_REPO;

  try {
    console.log(`Inspecting upstream repository for updates...`);
    if (fs.existsSync(source) && fs.statSync(source).isDirectory()) {
      fs.cpSync(source, quarantineDir, {
        recursive: true,
        filter: (srcPath) => {
          const base = path.basename(srcPath);
          return base !== 'node_modules' && base !== '.git' && !base.startsWith('.agents.backup.');
        }
      });
    } else {
      execFileSync('git', ['clone', '--depth', '1', source, quarantineDir], { stdio: 'ignore' });
    }

    const upstreamPkg = JSON.parse(fs.readFileSync(path.join(quarantineDir, 'package.json'), 'utf-8'));
    const upstreamVersion = upstreamPkg.version || '1.0.0';

    console.log(`Upstream Version Detected: \x1b[32mv${upstreamVersion}\x1b[0m`);

    if (options.checkOnly) {
      if (currentVersion === upstreamVersion) {
        console.log(`Framework is up to date.`);
      } else {
        console.log(`Update available: v${currentVersion} -> v${upstreamVersion}. Run 'stng update' to apply.`);
      }
      return { updateAvailable: currentVersion !== upstreamVersion, currentVersion, upstreamVersion };
    }

    let proceedDownload = options.yes;
    if (!proceedDownload) {
      const answer = await promptUser(`\nDownload and evaluate update v${upstreamVersion} in quarantine? [y/N]: `);
      proceedDownload = /^s|y|yes|si$/i.test(answer);
    }

    if (!proceedDownload) {
      console.log(`\n[CANCELLED]: Update aborted by user. Project untouched.\n`);
      return { aborted: true };
    }

    console.log(`\nRunning Quadruple Security Gate in quarantine...`);
    const securityEvaluation = await runQuadrupleSecurityGate(quarantineDir);

    for (const g of securityEvaluation.gateResults) {
      console.log(`  ${g.passed ? '\x1b[32m[PASSED]' : '\x1b[31m[BLOCKED]'} \x1b[1m${g.gate}\x1b[0m: ${g.details}`);
    }

    if (!securityEvaluation.passed) {
      console.error(`\n[STATUS: RED]: Upstream update failed security gate. Aborted.\n`);
      return { aborted: true, reason: 'SECURITY_GATE_FAILED' };
    }

    console.log(`\n\x1b[32m\x1b[1m[STATUS: GREEN]: Update passed all security gates.\x1b[0m`);

    let proceedApply = options.yes;
    if (!proceedApply) {
      const answer = await promptUser(`\nApply update while preserving local configuration? [y/N]: `);
      proceedApply = /^s|y|yes|si$/i.test(answer);
    }

    if (!proceedApply) {
      console.log(`\n[CANCELLED]: Update not applied.\n`);
      return { aborted: true };
    }

    const backupDir = path.join(root, `.agents.backup.${Date.now()}`);
    const localAgents = path.join(root, '.agents');
    if (fs.existsSync(localAgents)) {
      console.log(`Creating backup at: \x1b[33m${path.basename(backupDir)}\x1b[0m...`);
      fs.cpSync(localAgents, backupDir, { recursive: true });
    }

    console.log(`Applying updates to .agents/...`);
    const components = ['hooks', 'rules', 'roles'];
    for (const comp of components) {
      const srcComp = path.join(quarantineDir, '.agents', comp);
      const destComp = path.join(localAgents, comp);
      if (fs.existsSync(srcComp)) {
        if (!fs.existsSync(destComp)) fs.mkdirSync(destComp, { recursive: true });
        fs.cpSync(srcComp, destComp, { recursive: true });
      }
    }

    const srcSkills = path.join(quarantineDir, '.agents/skills');
    const destSkills = path.join(localAgents, 'skills');
    if (fs.existsSync(srcSkills)) {
      if (!fs.existsSync(destSkills)) fs.mkdirSync(destSkills, { recursive: true });
      const skillDirs = fs.readdirSync(srcSkills);
      for (const sd of skillDirs) {
        fs.cpSync(path.join(srcSkills, sd), path.join(destSkills, sd), { recursive: true });
      }
    }

    const srcScripts = path.join(quarantineDir, 'scripts');
    const destScripts = path.join(root, 'scripts');
    if (fs.existsSync(srcScripts)) {
      if (!fs.existsSync(destScripts)) fs.mkdirSync(destScripts, { recursive: true });
      fs.cpSync(srcScripts, destScripts, { recursive: true });
    }

    const lockData = {
      framework: 'STNG-Framework',
      version: upstreamVersion,
      updatedAt: new Date().toISOString(),
      installedAt: fs.existsSync(path.join(localAgents, 'framework-lock.json'))
        ? JSON.parse(fs.readFileSync(path.join(localAgents, 'framework-lock.json'), 'utf-8')).installedAt
        : new Date().toISOString(),
      securityAudit: 'PASSED_QUADRUPLE_GATE'
    };
    fs.writeFileSync(path.join(localAgents, 'framework-lock.json'), JSON.stringify(lockData, null, 2), 'utf-8');

    console.log(`Verifying post-update integrity...`);
    try {
      execFileSync(process.execPath, [path.join(localAgents, 'hooks/pre-tool-shell-guard.js'), '--test'], { stdio: 'ignore' });
      execFileSync(process.execPath, [path.join(localAgents, 'hooks/post-edit-policy-check.js'), '--test'], { stdio: 'ignore' });
      console.log(`\n\x1b[32m\x1b[1m[OK]: STNG-Framework updated to v${upstreamVersion}.\x1b[0m\n`);
      return { success: true, version: upstreamVersion, backupDir };
    } catch (testErr) {
      console.error(`\n[POST-TEST FAILED]: Initiating atomic rollback...`);
      if (fs.existsSync(backupDir)) {
        fs.rmSync(localAgents, { recursive: true, force: true });
        fs.cpSync(backupDir, localAgents, { recursive: true });
        console.log(`Rollback completed from backup.`);
      }
      const errMsg = testErr instanceof Error ? testErr.message : String(testErr);
      return { success: false, rollback: true, error: errMsg };
    }
  } finally {
    if (fs.existsSync(quarantineDir)) {
      fs.rmSync(quarantineDir, { recursive: true, force: true });
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const checkOnly = process.argv.includes('--check');
  const autoYes = process.argv.includes('--yes') || process.argv.includes('-y');
  const srcArg = process.argv.find(a => a.startsWith('--source='));
  const source = srcArg ? srcArg.slice('--source='.length) : null;
  const targetArg = process.argv.slice(2).find(a => !a.startsWith('-')) || process.cwd();

  runFrameworkUpdate(targetArg, { checkOnly, yes: autoYes, source }).then(res => {
    if (res.aborted || res.success === false) {
      process.exit(1);
    }
    process.exit(0);
  });
}
