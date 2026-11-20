/**
 * Type declarations for STNG-Framework (Structured Tactical Node Governance).
 * Zero-build runtime: implementation lives in ES modules with strict JSDoc + checkJs.
 */

export type ThemeMode = 'standard' | 'naval' | 'local';
export type ShieldRigidity = 'standard' | 'strict' | 'fast-track';

export interface ThemeOptions {
  theme?: ThemeMode | string;
  themeFile?: string;
  rootDir?: string;
  args?: string[];
}

export interface RoleDefinition {
  key: string;
  standardRole: string;
  navalAlias: string;
  deck: string;
  responsibility: string;
}

export interface BaseThemeConfig {
  name: string;
  zones: Record<string, string>;
  labels: Record<string, string>;
  defaults: {
    from: string;
    to: string;
  };
  clockPrefix: string | null;
}

export interface ThemeConfig extends BaseThemeConfig {
  roles: Record<string, string>;
  mode: ThemeMode;
  source: string;
}

export interface SecurityPayload {
  tool?: string;
  args?: {
    CommandLine?: string;
    command?: string;
    cmd?: string;
    TargetFile?: string;
    Path?: string;
    path?: string;
    file?: string;
    target_file?: string;
  };
}

export interface SecurityEvaluationOptions {
  rigidity?: ShieldRigidity | string;
}

export interface SecurityVerdict {
  allowed: boolean;
  reason?: string;
  warning?: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  regex: RegExp;
  message: string;
  severity: string;
}

export interface KissRule {
  id: string;
  name: string;
  message: string;
  severity: string;
}

export interface KissConfig {
  maxFileLines?: number;
  maxControlNesting?: number;
  maxParams?: number;
  maxFunctionLines?: number;
}

export interface PolicyCheckOptions extends KissConfig {
  allowTailwind?: boolean;
  rigidity?: string;
  strictConsoleLog?: boolean;
  enableKiss?: boolean;
}

export interface PolicyViolation {
  ruleId: string;
  ruleName: string;
  message: string;
  severity: string;
  file: string;
}

export type KissViolation = PolicyViolation;
export type PolicyCheckResult = PolicyViolation[];
export type KissReport = KissViolation[];
export type HealthDiagnosis = PolicyCheckResult;

export interface SpecAuditMeta {
  specId?: string | null;
  gate?: string | null;
  verdict?: string | null;
  reviewerModel?: string | null;
  crossModel?: boolean;
}

export interface AuditEntryInput {
  from?: string;
  to?: string;
  event?: string;
  mission?: string;
  healthStatus?: string;
  securityStatus?: string;
  details?: string;
  filesTouched?: string[];
  specMeta?: SpecAuditMeta;
}

export interface AuditLogEntry {
  id: string;
  epochMs: number;
  timestamp: string;
  from: string;
  to: string;
  event: string;
  mission: string;
  healthStatus: string;
  securityStatus: string;
  details: string;
  filesTouched: string[];
  missionClock?: string;
  specMeta?: SpecAuditMeta;
}

export type AppendAuditOptions = ThemeOptions;

export interface AuditLogStats {
  total: number;
  roleCounts: Record<string, number>;
  securityBlocks: number;
  policyWarnings: number;
  coldReviewPasses: number;
  coldReviewAborts: number;
}

export interface SkillSuspiciousPattern {
  pattern: RegExp;
  risk: string;
  label: string;
}

export interface SkillFinding {
  file: string;
  risk: string;
  label: string;
  message?: string;
}

export interface SkillScanResult {
  passed: boolean;
  findings: SkillFinding[];
}

export interface SkillIntegrityResult {
  passed: boolean;
  score: number;
  engine: string;
  findings: SkillFinding[];
}

export interface TopologyRule {
  sourceMatch: RegExp;
  affects: string[];
}

export interface WorkspaceTopology {
  dirToName: Map<string, string>;
  nameToDir: Map<string, string>;
  dependentsOf: Map<string, Set<string>>;
}

export type CascadeScope = string[];

export interface CircuitPayload {
  tool?: string;
  args?: {
    TargetFile?: string;
    target_file?: string;
    file?: string;
    path?: string;
  };
}

export interface CircuitBreakerOptions {
  rootDir?: string;
  maxThreshold?: number;
  windowMs?: number;
}

export interface CircuitState {
  targets: Record<string, number[]>;
}

export interface CircuitEvaluationResult {
  allowed: boolean;
  reason?: string;
  count: number;
}

export interface NodeBaselineEntry {
  min: string;
  eol?: boolean;
  cves: string[];
}

export type NodeBaseline = Record<string, NodeBaselineEntry>;

export interface NodeRuntimeAudit {
  ok: boolean;
  currentVersion: string;
  findings: string[];
  eolWarning: string | null;
}

export interface LifecycleGaps {
  hasTests: boolean;
  hasLinter: boolean;
  hasMcp: boolean;
  hasCrew: boolean;
  hasSemgrep: boolean;
  hasGitHooks: boolean;
}

export interface LifecycleDetection {
  inferredStage: string;
  commitCount: number;
  hasPkg: boolean;
  hasPy: boolean;
  hasGo: boolean;
  hasRust: boolean;
  hasGit: boolean;
  gaps: LifecycleGaps;
}

export interface LifecycleRecommendation {
  category: string;
  title: string;
  details: string;
}

export interface LifecycleResult {
  evaluatedAt: string;
  lifecycleStage: string;
  targetDir: string;
  metrics: {
    commitCount: number;
    gaps: LifecycleGaps;
  };
  recommendations: LifecycleRecommendation[];
}

export interface SecurityGateOutcome {
  gate: string;
  passed: boolean;
  details: string;
}

export interface FrameworkUpdateOptions {
  source?: string | null;
  checkOnly?: boolean;
  yes?: boolean;
}

export interface FrameworkUpdateResult {
  updateAvailable?: boolean;
  currentVersion?: string;
  upstreamVersion?: string;
  aborted?: boolean;
  reason?: string;
  success?: boolean;
  version?: string;
  backupDir?: string;
  rollback?: boolean;
  error?: string;
}

export interface InitOptions {
  allowTailwind?: boolean;
  force?: boolean;
  theme?: string;
}

export const ROLES_CATALOG: RoleDefinition[];
export const POLICY_RULES: PolicyRule[];
export const HEALTH_RULES: PolicyRule[];
export const KISS_DEFAULTS: Required<KissConfig>;
export const KISS_RULES: KissRule[];
export const SPEC_AUDIT_EVENTS: {
  SPEC_DRAFTED: string;
  COLD_REVIEW_ABORT: string;
  COLD_REVIEW_PASS: string;
  SPEC_APPROVED: string;
};
export const SUSPICIOUS_PATTERNS: SkillSuspiciousPattern[];
export const TOPOLOGY_RULES: TopologyRule[];
export const SECURE_BASELINE: NodeBaseline;
export const PROJECT_LIFECYCLE: {
  GREENFIELD: string;
  IN_CONSTRUCTION: string;
  MAINTENANCE: string;
};

export function evaluateSecurity(
  payload?: SecurityPayload,
  options?: SecurityEvaluationOptions
): SecurityVerdict;

export function checkFilePolicy(
  filePath: string,
  content: string,
  options?: PolicyCheckOptions
): PolicyCheckResult;
export const diagnoseFileContent: typeof checkFilePolicy;

export function evaluateKissHeuristics(
  filePath: string,
  content?: string,
  options?: KissConfig
): KissReport;

export function appendAuditLog(
  entry?: AuditEntryInput,
  options?: AppendAuditOptions
): AuditLogEntry;
export const appendLogEntry: typeof appendAuditLog;

export function formatAuditTimestamp(date?: Date, options?: ThemeOptions): string;
export function formatMissionClock(date?: Date, options?: ThemeOptions): string;
export function computeMissionDateCode(date?: Date): string;

export function resolveThemeMode(args?: string[], options?: ThemeOptions): ThemeMode;
export function loadThemeConfig(options?: ThemeOptions): ThemeConfig;
export function getHookLabel(labelKey: string, options?: ThemeOptions): string;
export function getZoneName(zoneKey: string, options?: ThemeOptions): string;
export function getRoleAlias(roleKey: string, options?: ThemeOptions): string;

export function scanSkillSecurity(targetPath: string): SkillScanResult;
export const auditSkillPath: typeof scanSkillSecurity;

export function verifySkillIntegrity(
  targetPath: string,
  options?: { minScore?: number }
): SkillIntegrityResult;
export const auditWithSkillSpector: typeof verifySkillIntegrity;

export function discoverWorkspaceTopology(rootDir?: string): WorkspaceTopology | null;
export function calculateAffectedNodes(changedFiles?: string[], rootDir?: string): CascadeScope;

export function evaluateCircuit(
  payload?: CircuitPayload,
  options?: CircuitBreakerOptions
): CircuitEvaluationResult;
export function resetCircuit(rootDir?: string): void;

export function auditNodeRuntime(options?: { version?: string }): Promise<NodeRuntimeAudit>;
export function getInstalledVersion(targetDir: string): string;
export function runFrameworkUpdate(
  targetDir?: string,
  options?: FrameworkUpdateOptions
): Promise<FrameworkUpdateResult>;

export function detectProjectLifecycle(targetDir?: string): LifecycleDetection;
export function runLifecycleAdvisor(
  targetDir?: string,
  options?: { yes?: boolean }
): Promise<LifecycleResult>;

export function displayLogStats(targetDir?: string): AuditLogStats | null;
export function runInit(options?: InitOptions): void;
export function printCrewThemeNotice(
  activeTheme?: string,
  options?: { rootDir?: string }
): void;
export const printThemeNotice: typeof printCrewThemeNotice;
