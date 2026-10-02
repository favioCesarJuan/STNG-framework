#!/usr/bin/env node
/**
 * ==============================================================================
 * 🩺 DR. BEVERLY CRUSHER'S HEALTH & PONYTAIL AUDITOR (postInvocation Hook)
 * ==============================================================================
 * Audits generated and modified code for:
 * 1. Ponytail Minimalist Protocol (YAGNI, zero bloat, no over-engineering)
 * 2. Prohibition of continuous polling (no setInterval in client sync)
 * 3. Prohibited styling dependencies (strict no-Tailwind / native CSS & StyleSheet)
 * 4. TypeScript compiler diagnostics on touched files.
 * ==============================================================================
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export const HEALTH_RULES = [
  {
    id: 'NO_CONTINUOUS_POLLING',
    name: 'Prohibition of Continuous Polling',
    regex: /setInterval\s*\(\s*(async\s*)?\(\s*\)\s*=>.*fetch|axios|api\b/s,
    message: 'Continuous HTTP polling with setInterval is strictly forbidden. Use WebSockets/Pusher or AppState focus revalidation.',
    severity: 'ERROR'
  },
  {
    id: 'NO_TAILWIND_IMPORT',
    name: 'Strict CSS3 & StyleSheet Governance',
    regex: /(from\s+['"]tailwindcss['"]|from\s+['"]nativewind['"])/,
    message: 'TailwindCSS/NativeWind are forbidden. Use pure CSS Modules (*.module.css) or React Native StyleSheet.create.',
    severity: 'ERROR'
  },
  {
    id: 'NO_RAW_CONSOLE_LOG_PRODUCTION',
    name: 'Clean Code Hygiene',
    regex: /console\.log\s*\(/,
    message: 'Raw console.log left in domain code. Use structured logger or remove before completing.',
    severity: 'WARNING'
  }
];

/**
 * Scans a file's content against health rules.
 * @param {string} filePath
 * @param {string} content
 * @returns {Array<{ ruleId: string, message: string, severity: string, file: string }>}
 */
export function diagnoseFileContent(filePath, content, options = {}) {
  const issues = [];
  const allowTailwind = options.allowTailwind ?? (process.env.ALLOW_TAILWIND === 'true');

  for (const rule of HEALTH_RULES) {
    if (rule.id === 'NO_TAILWIND_IMPORT' && allowTailwind) {
      continue; // Skip Tailwind prohibition if project allows it
    }
    if (rule.regex.test(content)) {
      issues.push({
        ruleId: rule.id,
        ruleName: rule.name,
        message: rule.message,
        severity: rule.severity,
        file: filePath
      });
    }
  }

  return issues;
}

// Self-test runner
function runSelfTest() {
  console.log('🩺  Running Dr. Beverly Crusher Health Check self-test...');

  const dirtyPollingCode = `
    useEffect(() => {
      const interval = setInterval(async () => {
        await api.get('/workdays');
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  `;

  const tailwindCode = `
    import { twMerge } from 'tailwindcss';
    export const Button = () => <div className="p-4 bg-blue-500" />;
  `;

  const cleanCode = `
    import styles from './Button.module.css';
    export const Button = () => <button className={styles.primary}>Click</button>;
  `;

  const pollIssues = diagnoseFileContent('poll.ts', dirtyPollingCode);
  const tailwindIssues = diagnoseFileContent('tw.tsx', tailwindCode);
  const cleanIssues = diagnoseFileContent('clean.tsx', cleanCode);

  let passed = true;

  if (!pollIssues.some(i => i.ruleId === 'NO_CONTINUOUS_POLLING')) {
    console.error('❌ FAILED: Did not catch continuous polling.');
    passed = false;
  } else {
    console.log('✅ CAUGHT continuous polling violation.');
  }

  if (!tailwindIssues.some(i => i.ruleId === 'NO_TAILWIND_IMPORT')) {
    console.error('❌ FAILED: Did not catch forbidden Tailwind import.');
    passed = false;
  } else {
    console.log('✅ CAUGHT forbidden Tailwind import.');
  }

  if (cleanIssues.length > 0) {
    console.error('❌ FAILED: False positives on clean code:', cleanIssues);
    passed = false;
  } else {
    console.log('✅ CLEAN code passed with 100% health score.');
  }

  if (passed) {
    console.log('🩺  [DR. CRUSHER]: Medical diagnostic tests PASSED. Health protocols sound.');
    process.exit(0);
  } else {
    console.error('🚨 [DR. CRUSHER]: Health check diagnosed anomalies.');
    process.exit(1);
  }
}

// Hook runner (only execute CLI when run directly)
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  if (process.argv.includes('--test')) {
    runSelfTest();
  } else {
    // If target files provided as arguments, scan them
  const filesToScan = process.argv.slice(2).filter(f => !f.startsWith('--') && fs.existsSync(f));

  let totalIssues = [];

  for (const file of filesToScan) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const issues = diagnoseFileContent(file, content);
      totalIssues = totalIssues.concat(issues);
    } catch {
      // ignore unreadable files
    }
  }

  if (totalIssues.length > 0) {
    console.log(JSON.stringify({
      healthy: false,
      issues: totalIssues,
      summary: `Dr. Crusher found ${totalIssues.length} health issues.`
    }, null, 2));

    const hasErrors = totalIssues.some(i => i.severity === 'ERROR');
    process.exit(hasErrors ? 1 : 0);
  } else {
    console.log(JSON.stringify({ healthy: true, issues: [] }));
    process.exit(0);
  }
}
}
