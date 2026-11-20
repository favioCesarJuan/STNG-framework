#!/usr/bin/env node
/**
 * ==============================================================================
 * STNG-CLI: DETERMINISTIC GOVERNANCE RUNTIME & HOOKS RUNNER
 * ==============================================================================
 *   stng init [--provider=...] [--theme=standard|naval|local] [--allow-tailwind]
 *   stng guard | shield
 *   stng policy | health
 *   stng theme
 *   stng circuit:reset
 *   stng audit-stats | log [--stats]
 *   stng demo
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  resolveThemeMode,
  loadThemeConfig,
  ROLES_CATALOG,
  getRoleAlias,
  getZoneName,
  getHookLabel
} from '../.agents/hooks/theme-loader.js';

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

const CLI_DIR = path.resolve(new URL('.', import.meta.url).pathname, '..');
const TARGET_DIR = process.cwd();

const args = process.argv.slice(2);
const command = args[0] || 'init';

/**
 * Prints active theme summary and mapped roles.
 * @param {string} [activeTheme]
 * @param {{ rootDir?: string }} [options]
 */
export function printCrewThemeNotice(activeTheme = 'standard', options = {}) {
  const cfg = loadThemeConfig({ theme: activeTheme, rootDir: options.rootDir || TARGET_DIR });
  console.log(`\n${CYAN}${BOLD}[THEME MODE: ${cfg.mode.toUpperCase()} — ${cfg.name}]${NC}`);
  console.log(`   Zones: Bridge="${cfg.zones.bridge}" | Lower Deck="${cfg.zones.lowerDeck}" | Sim="${cfg.zones.simBay}"`);
  if (cfg.mode === 'standard') {
    console.log(`   Default technical role titles active (0 extra output tokens).`);
    console.log(`   Switch to public-domain Naval Command via ${BOLD}--theme=naval${NC}, or load a private local file via ${BOLD}--theme=local${NC}.`);
  } else if (cfg.mode === 'naval') {
    console.log(`   Public-domain Naval Command aliases active (Bridge + Lower Deck + Sim Deck, 0 extra tokens).`);
    console.log(`   Switch back anytime with ${BOLD}--theme=standard${NC}, or activate private local overrides via ${BOLD}--theme=local${NC}.`);
  } else {
    console.log(`   Private local theme resolved at runtime (source: ${cfg.source}). Never written into tracked Git files.`);
  }
  console.log(`   Role Mapping:`);
  for (const role of ROLES_CATALOG) {
    const alias = getRoleAlias(role.key, { theme: cfg.mode, rootDir: options.rootDir || TARGET_DIR });
    console.log(`     - ${role.standardRole.padEnd(28)} -> ${alias.padEnd(26)} [${role.deck}]`);
  }
}

export const printThemeNotice = printCrewThemeNotice;

function printHeader() {
  console.log(`\n${CYAN}${BOLD}STNG-FRAMEWORK: STRUCTURED TACTICAL NODE GOVERNANCE${NC}`);
  console.log(`${BOLD}------------------------------------------------------------${NC}`);
}

function printUsage() {
  console.log(`\n${BOLD}Usage:${NC}`);
  console.log(`  stng init [options]       Deploy deterministic hooks, rules, and bridges`);
  console.log(`  stng guard                Run pre-tool shell & path guard self-test (alias: shield)`);
  console.log(`  stng policy               Run post-edit policy check self-test (alias: health)`);
  console.log(`  stng theme                Show active theme mode, zones (Bridge/Lower Deck/Sim), and roles`);
  console.log(`  stng scan-skill <path>    Scan a skill directory or SKILL.md for injection/exfiltration`);
  console.log(`  stng cve-check            Verify host Node.js runtime against embedded CVE baselines`);
  console.log(`  stng circuit:reset        Reset edit circuit breaker counters`);
  console.log(`  stng audit-stats          Display audit log telemetry (alias: log --stats)`);
  console.log(`  stng advise               Lifecycle-aware interactive advisor`);
  console.log(`  stng update [--check]     Consulted, security-gated update from upstream`);
  console.log(`  stng demo                 Run <60s live guardrail demonstration`);
  console.log(`  stng test                 Run native automated test suite in Sim sandbox`);
  console.log(`\n${BOLD}Options for init:${NC}`);
  console.log(`  --provider=<name>         Pre-set primary AI (gemini, claude, openai, deepseek, ollama)`);
  console.log(`  --theme=<standard|naval|local>  Agent identity theme (default: standard)`);
  console.log(`  --allow-tailwind          Permit TailwindCSS in style governance`);
  console.log(`  --force                   Overwrite existing template configurations\n`);
}

function detectProjectEnvironment() {
  const env = {
    hasPackageJson: fs.existsSync(path.join(TARGET_DIR, 'package.json')),
    hasPnpm: false,
    hasGit: fs.existsSync(path.join(TARGET_DIR, '.git')),
    isMonorepo: fs.existsSync(path.join(TARGET_DIR, 'turbo.json')) || fs.existsSync(path.join(TARGET_DIR, 'pnpm-workspace.yaml')),
    hasAstro: false,
    hasTailwind: false
  };

  try {
    execFileSync('pnpm', ['--version'], { stdio: 'ignore' });
    env.hasPnpm = true;
  } catch { /* fallback: pnpm not installed */ }

  if (env.hasPackageJson) {
    try {
      const raw = fs.readFileSync(path.join(TARGET_DIR, 'package.json'), 'utf-8');
      if (raw.includes('"astro"')) env.hasAstro = true;
      if (raw.includes('"tailwindcss"')) env.hasTailwind = true;
    } catch { /* fallback: unreadable package.json */ }
  }

  return env;
}

/**
 * Initializes STNG governance assets into the current working directory.
 * @param {import('../types/index.d.ts').InitOptions} [options]
 */
export function runInit(options = {}) {
  printHeader();

  const allowTailwind = options.allowTailwind || args.includes('--allow-tailwind');
  const force = options.force || args.includes('--force');
  const theme = options.theme || resolveThemeMode(args);
  const providerArg = args.find(a => a.startsWith('--provider='));
  const preferredProvider = providerArg ? providerArg.split('=')[1].toLowerCase() : 'auto';

  console.log(`Target directory: ${BOLD}${TARGET_DIR}${NC}`);
  const env = detectProjectEnvironment();

  if (env.hasPnpm) {
    console.log(`${GREEN}pnpm detected:${NC} Recommended package manager.`);
  } else {
    console.log(`${YELLOW}Recommendation:${NC} Consider adopting ${BOLD}pnpm${NC} for strict symlink isolation and disk savings.`);
  }

  const agentsDir = path.join(TARGET_DIR, '.agents');
  const srcAgents = path.join(CLI_DIR, '.agents');
  if (path.resolve(srcAgents) !== path.resolve(agentsDir) && fs.existsSync(agentsDir) && !force) {
    const backupName = `.agents.backup.${Date.now()}`;
    console.log(`${YELLOW}Existing .agents found. Backing up to ${backupName}...${NC}`);
    fs.cpSync(agentsDir, path.join(TARGET_DIR, backupName), { recursive: true });
  }

  if (path.resolve(srcAgents) !== path.resolve(agentsDir)) {
    console.log(`Deploying deterministic hooks, rules, and canonical skills...`);
    fs.cpSync(srcAgents, agentsDir, { recursive: true });
  }

  const scriptsDir = path.join(TARGET_DIR, 'scripts');
  const srcScripts = path.join(CLI_DIR, 'scripts');
  if (path.resolve(srcScripts) !== path.resolve(scriptsDir)) {
    fs.cpSync(srcScripts, scriptsDir, { recursive: true });
  }

  const configDir = path.join(TARGET_DIR, 'config');
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  const modelConfigFile = path.join(configDir, 'models.config.json');
  if (!fs.existsSync(modelConfigFile) || force) {
    let modelConfigRaw = fs.readFileSync(path.join(CLI_DIR, 'config/models.config.json'), 'utf-8');
    try {
      const parsed = JSON.parse(modelConfigRaw);
      if (preferredProvider !== 'auto') parsed.activeProvider = preferredProvider;
      parsed.theme = theme;
      modelConfigRaw = JSON.stringify(parsed, null, 2);
    } catch { /* fallback: preserve raw template */ }
    fs.writeFileSync(modelConfigFile, modelConfigRaw, 'utf-8');
    console.log(`Models configured for active provider: ${BOLD}${preferredProvider}${NC} (theme: ${BOLD}${theme}${NC})`);
  }

  const providersFile = path.join(configDir, 'providers.json');
  if (!fs.existsSync(providersFile) || force) {
    fs.copyFileSync(path.join(CLI_DIR, 'config/providers.json'), providersFile);
    console.log(`Multi-provider matrix deployed to config/providers.json`);
  }

  const mcpDir = path.join(TARGET_DIR, '.mcp');
  const srcMcp = path.join(CLI_DIR, '.mcp/mcp-servers.config.json');
  if (fs.existsSync(srcMcp)) {
    if (!fs.existsSync(mcpDir)) fs.mkdirSync(mcpDir, { recursive: true });
    const targetMcp = path.join(mcpDir, 'mcp-servers.config.json');
    if (!fs.existsSync(targetMcp) || force) {
      fs.copyFileSync(srcMcp, targetMcp);
      console.log(`MCP configuration deployed to .mcp/mcp-servers.config.json`);
    }
  }

  const bridges = [
    { src: 'MANUAL.md', dest: 'MANUAL.md', label: 'Universal MANUAL.md' },
    { src: 'templates/Agents.md', dest: 'Agents.md', label: 'Agents.md (Gemini/Antigravity)' },
    { src: 'templates/CLAUDE.md', dest: 'CLAUDE.md', label: 'CLAUDE.md (Anthropic Claude Code)' },
    { src: 'templates/.cursorrules', dest: '.cursorrules', label: '.cursorrules (Cursor IDE)' },
    { src: 'templates/.windsurfrules', dest: '.windsurfrules', label: '.windsurfrules (Windsurf Cascade)' },
    { src: 'templates/.copilot-instructions.md', dest: '.copilot-instructions.md', label: '.copilot-instructions.md (GitHub Copilot)' },
    { src: 'templates/rules.md', dest: 'rules.md', label: 'rules.md (Local LLMs/Ollama)' }
  ];

  console.log(`Generating AI instruction bridges...`);
  for (const b of bridges) {
    const srcPath = path.join(CLI_DIR, b.src);
    const destPath = path.join(TARGET_DIR, b.dest);
    if (!fs.existsSync(srcPath)) continue;
    if (!fs.existsSync(destPath) || force) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   + ${b.label}`);
    } else {
      console.log(`   - ${b.label} already present (skipped)`);
    }
  }

  const envFile = path.join(agentsDir, '.env');
  const envLines = [`AGENT_THEME=${theme}`];
  if (allowTailwind || env.hasTailwind) {
    envLines.push('ALLOW_TAILWIND=true');
    console.log(`Style Governance: TailwindCSS permitted per configuration.`);
  }
  fs.appendFileSync(envFile, `\n${envLines.join('\n')}\n`, 'utf-8');

  console.log(`Running hook verification...`);
  try {
    execFileSync(process.execPath, [path.join(agentsDir, 'hooks/pre-tool-shell-guard.js'), '--test'], { stdio: 'ignore' });
    execFileSync(process.execPath, [path.join(agentsDir, 'hooks/post-edit-policy-check.js'), '--test'], { stdio: 'ignore' });
    execFileSync(process.execPath, [path.join(agentsDir, 'hooks/edit-circuit-breaker.js'), '--test'], { stdio: 'ignore' });
    console.log(`${GREEN}All deterministic hooks verified and active.${NC}`);
  } catch {
    console.log(`${YELLOW}Note: Hooks installed, initial check completed with warnings.${NC}`);
  }

  if (env.hasGit) {
    try {
      execFileSync('git', ['config', 'core.hooksPath', '.agents/git-hooks'], { stdio: 'ignore', cwd: TARGET_DIR });
      console.log(`${GREEN}Git Pre-Commit Guard armed:${NC} core.hooksPath set to .agents/git-hooks`);
    } catch { /* fallback: git config not writable */ }
  }

  printCrewThemeNotice(theme);

  console.log(`\n${GREEN}${BOLD}[OK]: STNG-Framework governance initialized.${NC}`);
  console.log(`Run ${BOLD}pnpm test${NC} (or ${BOLD}npx stng test${NC}) to verify test suite.\n`);
}

/**
 * Displays aggregated audit log telemetry.
 * @param {string} [targetDir]
 * @returns {import('../types/index.d.ts').AuditLogStats | null}
 */
export function displayLogStats(targetDir = process.cwd()) {
  const logJsonPath = path.join(targetDir, '.agents/audit_log.json');

  if (!fs.existsSync(logJsonPath)) {
    console.log(`\n${YELLOW}No audit log ledger found at .agents/audit_log.json${NC}\n`);
    return { total: 0, roleCounts: {}, securityBlocks: 0, policyWarnings: 0, coldReviewPasses: 0, coldReviewAborts: 0 };
  }

  let entries = [];
  try {
    entries = JSON.parse(fs.readFileSync(logJsonPath, 'utf-8'));
  } catch {
    console.log(`\n${RED}Error parsing ${path.basename(logJsonPath)}${NC}\n`);
    return null;
  }

  /** @type {Record<string, number>} */
  const roleCounts = {};
  let policyWarnings = 0;
  let securityBlocks = 0;
  let coldReviewPasses = 0;
  let coldReviewAborts = 0;

  for (const entry of entries) {
    const role = entry.from || entry.officer || entry.agent || 'Runtime';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
    if (entry.healthStatus && entry.healthStatus !== 'HEALTHY' && !String(entry.healthStatus).startsWith('HEALTHY')) policyWarnings++;
    if (entry.event === 'security_blocked' || entry.securityStatus === 'BLOCKED') securityBlocks++;
    if (entry.event === 'cold_review_pass') coldReviewPasses++;
    if (entry.event === 'cold_review_abort') coldReviewAborts++;
  }

  console.log(`\n${CYAN}${BOLD}GOVERNANCE AUDIT LOG TELEMETRY${NC}`);
  console.log(`${BOLD}------------------------------------------------------------${NC}`);
  console.log(`Total Audit Entries Recorded:   ${BOLD}${entries.length}${NC}`);
  console.log(`Security Guardrail Blocks:      ${securityBlocks > 0 ? RED : GREEN}${securityBlocks}${NC}`);
  console.log(`Policy Health Warnings:         ${policyWarnings > 0 ? YELLOW : GREEN}${policyWarnings}${NC}`);
  if (coldReviewPasses + coldReviewAborts > 0) {
    console.log(`Zero-Context Cold Reviews:      ${GREEN}${coldReviewPasses} pass${NC} / ${coldReviewAborts > 0 ? YELLOW : GREEN}${coldReviewAborts} abort${NC}`);
  }
  console.log(`\n${BOLD}Role Activity Breakdown:${NC}`);
  for (const [role, count] of Object.entries(roleCounts)) {
    const bar = '█'.repeat(Math.min(count * 2, 28));
    console.log(`  ${role.padEnd(28)} ${CYAN}${bar}${NC} (${count})`);
  }
  console.log(`${BOLD}------------------------------------------------------------${NC}\n`);

  return { total: entries.length, roleCounts, securityBlocks, policyWarnings, coldReviewPasses, coldReviewAborts };
}

const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isMain = executedFile === currentFile || executedFile.endsWith('/stng.js') || executedFile.endsWith('/stng');

if (isMain) {
  switch (command) {
    case 'init':
    case 'setup':
      runInit();
      break;
    case 'update':
      import('../scripts/framework-updater.js').then(m => {
        const checkOnly = args.includes('--check');
        const autoYes = args.includes('--yes') || args.includes('-y');
        const srcArg = args.find(a => a.startsWith('--source='));
        const source = srcArg ? srcArg.slice('--source='.length) : undefined;
        m.runFrameworkUpdate(TARGET_DIR, { checkOnly, yes: autoYes, source }).then(res => {
          if (res && (res.aborted || res.success === false)) process.exit(1);
        });
      });
      break;
    case 'advise':
    case 'advisor':
      import('../scripts/interactive-advisor.js').then(m => {
        const autoYes = args.includes('--yes') || args.includes('-y');
        m.runLifecycleAdvisor(TARGET_DIR, { yes: autoYes });
      });
      break;
    case 'test':
      try {
        console.log(`${getHookLabel('sim')} Launching automated test suite (${getZoneName('simBay')})...`);
        execFileSync(process.execPath, ['--test'], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'theme': {
      const activeTheme = resolveThemeMode(args.slice(1), { rootDir: TARGET_DIR });
      printCrewThemeNotice(activeTheme, { rootDir: TARGET_DIR });
      break;
    }
    case 'demo':
      try {
        execFileSync(process.execPath, ['examples/quickstart-demo.js'], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'guard':
    case 'shield':
      try {
        execFileSync(process.execPath, ['.agents/hooks/pre-tool-shell-guard.js', '--test'], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'circuit:reset':
      try {
        execFileSync(process.execPath, ['.agents/hooks/edit-circuit-breaker.js', '--reset'], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'policy':
    case 'health':
      try {
        execFileSync(process.execPath, ['.agents/hooks/post-edit-policy-check.js', '--test'], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'scan-skill': {
      const localScanner = path.join(TARGET_DIR, '.agents/hooks/skill-security-scanner.js');
      const scannerPath = fs.existsSync(localScanner)
        ? localScanner
        : path.join(CLI_DIR, '.agents/hooks/skill-security-scanner.js');
      try {
        execFileSync(process.execPath, [scannerPath, ...args.slice(1)], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    }
    case 'cve-check': {
      const localCve = path.join(TARGET_DIR, 'scripts/node-runtime-cve-check.js');
      const cvePath = fs.existsSync(localCve)
        ? localCve
        : path.join(CLI_DIR, 'scripts/node-runtime-cve-check.js');
      try {
        execFileSync(process.execPath, [cvePath, ...args.slice(1)], { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    }
    case 'audit-stats':
    case 'log':
    case 'log:stats':
      if (args.includes('--stats') || args.includes('stats') || command === 'log:stats' || command === 'audit-stats') {
        displayLogStats(TARGET_DIR);
      } else {
        const auditMd = path.join(TARGET_DIR, '.agents/audit_log.md');
        if (fs.existsSync(auditMd)) {
          process.stdout.write(fs.readFileSync(auditMd, 'utf-8'));
        } else {
          console.log('No audit log entries yet.');
        }
      }
      break;
    case '--help':
    case '-h':
    case 'help':
      printHeader();
      printUsage();
      break;
    default:
      console.error(`${RED}Unknown command: ${command}${NC}`);
      printUsage();
      process.exit(1);
  }
}
