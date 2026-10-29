/**
 * ==============================================================================
 * 🛸 STNG-FRAMEWORK: CORE PROGRAMMATIC API ENTRYPOINT
 * ==============================================================================
 * Exposes core Starfleet governance, deterministic hooks, security shields,
 * and health checkers for programmatic monorepo and agent integration.
 * ==============================================================================
 */

export { evaluateSecurity } from './.agents/hooks/worf-security-shield.js';
export { diagnoseFileContent, HEALTH_RULES } from './.agents/hooks/crusher-health-check.js';
export { appendLogEntry, calculateStardate } from './.agents/hooks/captains-log-writer.js';
export { auditSkillPath, auditWithSkillSpector, SUSPICIOUS_PATTERNS } from './.agents/hooks/skill-lifecycle-auditor.js';
export { calculateAffectedNodes, discoverWorkspaceTopology } from './.agents/hooks/cascade-evaluator.js';
export { evaluateCircuit, resetCircuit } from './.agents/hooks/circuit-breaker.js';
export { auditNodeRuntime, SECURE_BASELINE } from './scripts/worf-node-audit.js';
export { runFrameworkUpdate, getInstalledVersion } from './scripts/stng-updater.js';
export { runLifecycleAdvisor, detectProjectLifecycle, PROJECT_LIFECYCLE } from './scripts/interactive-advisor.js';
export { displayLogStats, runInit } from './bin/stng.js';
