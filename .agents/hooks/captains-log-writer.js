#!/usr/bin/env node
/**
 * ==============================================================================
 * 📜 THE CAPTAIN'S LOG WRITER (Immutable Multi-Agent Ledger)
 * ==============================================================================
 * Appends structured execution records to .agents/captains_log.json and
 * generates a human-readable markdown transcript at .agents/captains_log.md.
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const LOG_JSON = path.resolve('.agents/captains_log.json');
const LOG_MD = path.resolve('.agents/captains_log.md');

/**
 * Calculates a thematic Star Trek Stardate based on timestamp.
 * Formula: 41000 + (year - 2024)*1000 + (day_of_year / 365)*1000
 */
export function calculateStardate(date = new Date()) {
  const year = date.getUTCFullYear();
  const start = new Date(Date.UTC(year, 0, 0));
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const stardate = 41000 + (year - 2024) * 1000 + (dayOfYear / 365) * 1000;
  return stardate.toFixed(1);
}

/**
 * Appends a log entry to both JSON and Markdown representations.
 * @param {object} entry
 */
export function appendLogEntry(entry) {
  const dir = path.dirname(LOG_JSON);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const now = new Date();
  const stardate = calculateStardate(now);

  const fullEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    stardate,
    timestamp: now.toISOString(),
    from: entry.from || 'Jean-Luc Picard (The Captain)',
    to: entry.to || 'William T. Riker (First Officer)',
    mission: entry.mission || 'General operational duty',
    healthStatus: entry.healthStatus || 'HEALTHY',
    securityStatus: entry.securityStatus || 'SECURE',
    details: entry.details || '',
    filesTouched: entry.filesTouched || []
  };

  // 1. Update JSON
  let logs = [];
  if (fs.existsSync(LOG_JSON)) {
    try {
      logs = JSON.parse(fs.readFileSync(LOG_JSON, 'utf-8'));
    } catch {
      logs = [];
    }
  }
  logs.push(fullEntry);
  fs.writeFileSync(LOG_JSON, JSON.stringify(logs, null, 2), 'utf-8');

  // 2. Append Markdown
  const mdHeader = !fs.existsSync(LOG_MD)
    ? `# 📜 The Captain's Log (Enterprise Multi-Agent Ledger)\n\n> "Space: the final frontier. These are the voyages of the Starship Enterprise..."\n\n---\n\n`
    : '';

  const mdEntry = `### 🌟 Stardate ${fullEntry.stardate} - ${fullEntry.timestamp}
- **From**: \`${fullEntry.from}\` ➔ **To**: \`${fullEntry.to}\`
- **Mission**: ${fullEntry.mission}
- **Security (Worf)**: \`${fullEntry.securityStatus}\` | **Health (Crusher)**: \`${fullEntry.healthStatus}\`
${fullEntry.filesTouched.length > 0 ? `- **Files Touched**: ${fullEntry.filesTouched.map(f => `\`${f}\``).join(', ')}` : ''}
${fullEntry.details ? `\n> ${fullEntry.details.replace(/\n/g, '\n> ')}\n` : ''}
---
`;

  fs.appendFileSync(LOG_MD, mdHeader + mdEntry, 'utf-8');
  return fullEntry;
}

// Self-test or CLI runner
if (process.argv.includes('--test')) {
  console.log('📜  Running Captain\'s Log self-test...');
  const entry = appendLogEntry({
    from: 'Capitán Jean-Luc Picard',
    to: 'Comandante William T. Riker',
    mission: 'Initialize STNG-framework core telemetry',
    healthStatus: 'HEALTHY (100%)',
    securityStatus: 'TACTICAL SHIELDS UP',
    details: 'System bootstrapped with deterministic hooks and consolidated skills.',
    filesTouched: ['.agents/hooks.json', '.agents/hooks/captains-log-writer.js']
  });

  if (fs.existsSync(LOG_JSON) && fs.existsSync(LOG_MD)) {
    console.log(`✅ Captain's Log recorded entry: ${entry.id} (Stardate ${entry.stardate})`);
    console.log('📜  [COMPUTER]: Captain\'s Log self-test PASSED.');
    process.exit(0);
  } else {
    console.error('🚨 Failed to write Captain\'s Log files.');
    process.exit(1);
  }
}
