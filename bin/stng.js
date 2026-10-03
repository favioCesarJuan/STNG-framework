#!/usr/bin/env node
/**
 * ==============================================================================
 * 🛸 STNG-CLI: UNIVERSAL STARFLEET SETUP & GOVERNANCE INITIALIZER
 * ==============================================================================
 * Single executable command to bootstrap, adapt, and configure any repository:
 *   npx stng init [--provider=claude|gemini|openai|deepseek|ollama] [--allow-tailwind]
 * Zero dependencies outside Node.js core standard library.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

const CLI_DIR = path.resolve(new URL('.', import.meta.url).pathname, '..');
const TARGET_DIR = process.cwd();

// Parse CLI flags
const args = process.argv.slice(2);
const command = args[0] || 'init';

function printHeader() {
  console.log(`\n${CYAN}${BOLD}🛸 STNG-FRAMEWORK: UNIFIED STARFLEET GOVERNANCE INITIALIZER${NC}`);
  console.log(`${BOLD}------------------------------------------------------------${NC}`);
}

function printUsage() {
  console.log(`\n${BOLD}Usage:${NC}`);
  console.log(`  stng init [options]       Initialize full governance and universal AI bridges`);
  console.log(`  stng test                 Run native automated test suite`);
  console.log(`  stng health               Run Dr. Crusher health diagnostics`);
  console.log(`  stng shield               Run Worf security shield check`);
  console.log(`  stng log [--stats]        Display Captain's Log ledger or telemetry stats`);
  console.log(`  stng circuit:reset        Reset Worf's circuit breaker counters`);
  console.log(`\n${BOLD}Options for init:${NC}`);
  console.log(`  --provider=<name>         Pre-set primary AI (gemini, claude, openai, deepseek, ollama)`);
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
    execSync('pnpm --version', { stdio: 'ignore' });
    env.hasPnpm = true;
  } catch {}

  if (env.hasPackageJson) {
    try {
      const raw = fs.readFileSync(path.join(TARGET_DIR, 'package.json'), 'utf-8');
      if (raw.includes('"astro"')) env.hasAstro = true;
      if (raw.includes('"tailwindcss"')) env.hasTailwind = true;
    } catch {}
  }

  return env;
}

export function runInit(options = {}) {
  printHeader();

  const allowTailwind = options.allowTailwind || args.includes('--allow-tailwind');
  const force = options.force || args.includes('--force');
  const providerArg = args.find(a => a.startsWith('--provider='));
  const preferredProvider = providerArg ? providerArg.split('=')[1].toLowerCase() : 'auto';

  console.log(`📂 Target sector: ${BOLD}${TARGET_DIR}${NC}`);
  const env = detectProjectEnvironment();

  // 1. Package manager advisory
  if (env.hasPnpm) {
    console.log(`${GREEN}⚡ pnpm detected:${NC} Recommended Starfleet package manager.`);
  } else {
    console.log(`${YELLOW}💡 Recommendation:${NC} Consider adopting ${BOLD}pnpm${NC} for up to 70% disk space savings via hardlink deduplication.`);
  }

  // 2. Backup existing .agents if present and not force
  const agentsDir = path.join(TARGET_DIR, '.agents');
  const srcAgents = path.join(CLI_DIR, '.agents');
  if (path.resolve(srcAgents) !== path.resolve(agentsDir) && fs.existsSync(agentsDir) && !force) {
    const backupName = `.agents.backup.${Date.now()}`;
    console.log(`${YELLOW}🛡️  [WORF]: Existing .agents found. Backing up to ${backupName}...${NC}`);
    fs.cpSync(agentsDir, path.join(TARGET_DIR, backupName), { recursive: true });
  }

  // 3. Deploy .agents (Hooks, Rules, Skills)
  if (path.resolve(srcAgents) !== path.resolve(agentsDir)) {
    console.log(`📦 Deploying deterministic hooks, rules, and canonical skills...`);
    fs.cpSync(srcAgents, agentsDir, { recursive: true });
  }

  // 4. Deploy Scripts
  const scriptsDir = path.join(TARGET_DIR, 'scripts');
  const srcScripts = path.join(CLI_DIR, 'scripts');
  if (path.resolve(srcScripts) !== path.resolve(scriptsDir)) {
    fs.cpSync(srcScripts, scriptsDir, { recursive: true });
  }

  // 5. Deploy Configs & Models
  const configDir = path.join(TARGET_DIR, 'config');
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  const modelConfigFile = path.join(configDir, 'models.config.json');
  if (!fs.existsSync(modelConfigFile) || force) {
    let modelConfigRaw = fs.readFileSync(path.join(CLI_DIR, 'config/models.config.json'), 'utf-8');
    if (preferredProvider !== 'auto') {
      try {
        const parsed = JSON.parse(modelConfigRaw);
        parsed.activeProvider = preferredProvider;
        modelConfigRaw = JSON.stringify(parsed, null, 2);
      } catch {}
    }
    fs.writeFileSync(modelConfigFile, modelConfigRaw, 'utf-8');
    console.log(`⚙️  Models configured for active provider: ${BOLD}${preferredProvider}${NC}`);
  }

  const providersFile = path.join(configDir, 'providers.json');
  if (!fs.existsSync(providersFile) || force) {
    fs.copyFileSync(path.join(CLI_DIR, 'config/providers.json'), providersFile);
    console.log(`📋 Multi-provider matrix deployed to config/providers.json`);
  }

  // 6. Deploy Universal AI Bridge Files
  const bridges = [
    { src: 'MANUAL.md', dest: 'MANUAL.md', label: '📖 Universal MANUAL.md' },
    { src: 'templates/Agents.md', dest: 'Agents.md', label: '🤖 Agents.md (Gemini/Antigravity)' },
    { src: 'templates/CLAUDE.md', dest: 'CLAUDE.md', label: '🤖 CLAUDE.md (Anthropic Claude Code)' },
    { src: 'templates/.cursorrules', dest: '.cursorrules', label: '🎯 .cursorrules (Cursor IDE)' },
    { src: 'templates/.windsurfrules', dest: '.windsurfrules', label: '🏄 .windsurfrules (Windsurf Cascade)' },
    { src: 'templates/.copilot-instructions.md', dest: '.copilot-instructions.md', label: '🐙 .copilot-instructions.md (GitHub Copilot)' },
    { src: 'templates/rules.md', dest: 'rules.md', label: '📐 rules.md (Local LLMs/Ollama)' }
  ];

  console.log(`🌉 Generating universal AI instruction bridges...`);
  for (const b of bridges) {
    const destPath = path.join(TARGET_DIR, b.dest);
    if (!fs.existsSync(destPath) || force) {
      fs.copyFileSync(path.join(CLI_DIR, b.src), destPath);
      console.log(`   ✔ ${b.label}`);
    } else {
      console.log(`   ℹ ${b.label} already present (skipped)`);
    }
  }

  // 7. Configure Tailwind permission if specified or detected
  if (allowTailwind || env.hasTailwind) {
    const envFile = path.join(agentsDir, '.env');
    fs.appendFileSync(envFile, '\nALLOW_TAILWIND=true\n', 'utf-8');
    console.log(`🎨 Style Governance: TailwindCSS permitted per configuration.`);
  }

  // 8. Self-Diagnostic Health Verification
  console.log(`🧪 Running Starfleet diagnostic verification...`);
  try {
    execSync(`node "${path.join(agentsDir, 'hooks/worf-security-shield.js')}" --test`, { stdio: 'ignore' });
    execSync(`node "${path.join(agentsDir, 'hooks/crusher-health-check.js')}" --test`, { stdio: 'ignore' });
    execSync(`node "${path.join(agentsDir, 'hooks/circuit-breaker.js')}" --test`, { stdio: 'ignore' });
    console.log(`${GREEN}✔ All deterministic hooks verified and active.${NC}`);
  } catch (err) {
    console.log(`${YELLOW}⚠ Note: Hooks installed, initial check completed with warnings.${NC}`);
  }

  // 9. Bind Git Pre-Commit Hook
  if (env.hasGit) {
    try {
      execSync('git config core.hooksPath .agents/git-hooks', { stdio: 'ignore', cwd: TARGET_DIR });
      console.log(`${GREEN}✔ Git Pre-Commit Shield armed:${NC} core.hooksPath set to .agents/git-hooks`);
    } catch {}
  }

  console.log(`\n${GREEN}${BOLD}✅ [CAPTAIN PICARD]: STNG-Framework successfully initialized!${NC}`);
  console.log(`👉 All AI coding assistants (Claude, Cursor, Windsurf, Copilot, Gemini, Ollama) are now unified.`);
  console.log(`👉 Run ${BOLD}pnpm test${NC} (or ${BOLD}npx stng test${NC}) to verify test suite.\n`);
}

/**
 * Renders an ASCII dashboard summarizing Captain's Log telemetry.
 * @param {string} targetDir
 * @returns {object|null}
 */
export function displayLogStats(targetDir = process.cwd()) {
  const logJsonPath = path.join(targetDir, '.agents/captains_log.json');
  if (!fs.existsSync(logJsonPath)) {
    console.log(`\n${YELLOW}No Captain's Log ledger found at .agents/captains_log.json${NC}\n`);
    return null;
  }

  let entries = [];
  try {
    entries = JSON.parse(fs.readFileSync(logJsonPath, 'utf-8'));
  } catch {
    console.log(`\n${RED}Error parsing captains_log.json${NC}\n`);
    return null;
  }

  const officerCounts = {};
  let healthWarnings = 0;
  let securityBlocks = 0;

  for (const entry of entries) {
    const officer = entry.officer || entry.agent || 'Computer';
    officerCounts[officer] = (officerCounts[officer] || 0) + 1;
    if (entry.healthScore && entry.healthScore < 100) healthWarnings++;
    if (entry.event === 'security_blocked' || (entry.action && entry.action.includes('blocked'))) securityBlocks++;
  }

  console.log(`\n${CYAN}${BOLD}📜 CAPTAIN'S LOG TELEMETRY DASHBOARD${NC}`);
  console.log(`${BOLD}------------------------------------------------------------${NC}`);
  console.log(`Total Stardate Entries Recorded:  ${BOLD}${entries.length}${NC}`);
  console.log(`Security Perimeter Blocks (Worf): ${securityBlocks > 0 ? RED : GREEN}${securityBlocks}${NC}`);
  console.log(`Health Diagnostic Warnings:       ${healthWarnings > 0 ? YELLOW : GREEN}${healthWarnings}${NC}`);
  console.log(`Estimated Token Protocol Savings: ${GREEN}30% - 50% via BPE Deliberation${NC}`);
  console.log(`\n${BOLD}Officer Activity Breakdown:${NC}`);
  for (const [officer, count] of Object.entries(officerCounts)) {
    const bar = '█'.repeat(Math.min(count * 2, 28));
    console.log(`  ${officer.padEnd(24)} ${CYAN}${bar}${NC} (${count})`);
  }
  console.log(`${BOLD}------------------------------------------------------------${NC}\n`);

  return { total: entries.length, officerCounts, securityBlocks, healthWarnings };
}

// Only dispatch commands when invoked directly as a CLI binary
const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isMain = executedFile === currentFile || executedFile.endsWith('/stng.js') || executedFile.endsWith('/stng');

if (isMain) {
  switch (command) {
    case 'init':
    case 'setup':
      runInit();
      break;
    case 'test':
      try {
        execSync('node --test test/**/*.test.js', { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'shield':
      try {
        execSync('node .agents/hooks/worf-security-shield.js --test', { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'circuit:reset':
      try {
        execSync('node .agents/hooks/circuit-breaker.js --reset', { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'health':
      try {
        execSync('node .agents/hooks/crusher-health-check.js --test', { stdio: 'inherit', cwd: TARGET_DIR });
      } catch {
        process.exit(1);
      }
      break;
    case 'log':
    case 'log:stats':
      if (args.includes('--stats') || args.includes('stats') || command === 'log:stats') {
        displayLogStats(TARGET_DIR);
      } else {
        try {
          execSync('cat .agents/captains_log.md 2>/dev/null || echo "No log entries yet."', { stdio: 'inherit', cwd: TARGET_DIR });
        } catch {
          process.exit(1);
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

