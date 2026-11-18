/**
 * ==============================================================================
 * STNG-FRAMEWORK: CORE GOVERNANCE RUNTIME API ENTRYPOINT
 * ==============================================================================
 * Exposes deterministic model hooks, security guards, policy checks, circuit
 * breakers, skill scanners, and monorepo cascade scoping.
 * ==============================================================================
 */

export { evaluateSecurity } from './.agents/hooks/pre-tool-shell-guard.js';
export {
  checkFilePolicy,
  POLICY_RULES,
  diagnoseFileContent,
  HEALTH_RULES
} from './.agents/hooks/post-edit-policy-check.js';
export {
  appendAuditLog,
  formatAuditTimestamp,
  appendLogEntry,
  calculateStardate
} from './.agents/hooks/audit-log-writer.js';
export {
  scanSkillSecurity,
  verifySkillIntegrity,
  auditSkillPath,
  auditWithSkillSpector,
  SUSPICIOUS_PATTERNS
} from './.agents/hooks/skill-security-scanner.js';
export {
  calculateAffectedNodes,
  discoverWorkspaceTopology,
  TOPOLOGY_RULES
} from './.agents/hooks/monorepo-cascade-scope.js';
export {
  evaluateCircuit,
  resetCircuit
} from './.agents/hooks/edit-circuit-breaker.js';
export { auditNodeRuntime, SECURE_BASELINE } from './scripts/node-runtime-cve-check.js';
export { runFrameworkUpdate, getInstalledVersion } from './scripts/framework-updater.js';
export { runLifecycleAdvisor, detectProjectLifecycle, PROJECT_LIFECYCLE } from './scripts/interactive-advisor.js';
export { displayLogStats, runInit, printCrewThemeNotice } from './bin/stng.js';
