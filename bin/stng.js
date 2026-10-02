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
  console.log(`  stng log                  Display Captain's Log ledger`);
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
  if (fs.existsSync(agentsDir) && !force) {
    const backupName = `.agents.backup.${Date.now()}`;
    console.log(`${YELLOW}🛡️  [WORF]: Existing .agents found. Backing up to ${backupName}...${NC}`);
    fs.cpSync(agentsDir, path.join(TARGET_DIR, backupName), { recursive: true });
  }

  // 3. Deploy .agents (Hooks, Rules, Skills)
  console.log(`📦 Deploying deterministic hooks, rules, and canonical skills...`);
  fs.cpSync(path.join(CLI_DIR, '.agents'), agentsDir, { recursive: true });

  // 4. Deploy Scripts
  const scriptsDir = path.join(TARGET_DIR, 'scripts');
  fs.cpSync(path.join(CLI_DIR, 'scripts'), scriptsDir, { recursive: true });

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
    console.log(`${GREEN}✔ All deterministic hooks verified and active.${NC}`);
  } catch (err) {
    console.log(`${YELLOW}⚠ Note: Hooks installed, initial check completed with warnings.${NC}`);
  }

  console.log(`\n${GREEN}${BOLD}✅ [CAPTAIN PICARD]: STNG-Framework successfully initialized!${NC}`);
  console.log(`👉 All AI coding assistants (Claude, Cursor, Windsurf, Copilot, Gemini, Ollama) are now unified.`);
  console.log(`👉 Run ${BOLD}pnpm test${NC} (or ${BOLD}npx stng test${NC}) to verify test suite.\n`);
}

// Command dispatcher
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
  case 'health':
    try {
      execSync('node .agents/hooks/crusher-health-check.js --test', { stdio: 'inherit', cwd: TARGET_DIR });
    } catch {
      process.exit(1);
    }
    break;
  case 'log':
    try {
      execSync('cat .agents/captains_log.md 2>/dev/null || echo "No log entries yet."', { stdio: 'inherit', cwd: TARGET_DIR });
    } catch {
      process.exit(1);
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
