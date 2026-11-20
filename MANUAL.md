# STNG-framework Operational Manual

> **Structured Tactical Node Governance (`stng-governance-core` v2.1.0)** — Zero-dependency deterministic governance runtime for Node.js `>=18.0.0`.

---

## 1. Boundary with ISS-Enterprise
- **STNG-framework** owns the deterministic runtime core: `.agents/hooks/`, `.agents/rules/`, `.agents/skills/`, `.semgrep.yml`, `scripts/node-runtime-cve-check.js`, and programmatic ESM exports in `index.js`.
- **ISS-Enterprise** (*Intelligent Stack Scaffolding for Enterprise*) is the flexible scaffolding and lifecycle CLI that interviews users about context/domain, detects project stacks, allocates multi-model fleets, and deploys these canonical hooks into target repositories.

---

## 2. Programmatic ESM API (`index.js`)
```js
import {
  evaluateSecurity,
  evaluateCircuit,
  resetCircuit,
  checkFilePolicy,
  diagnoseFileContent,
  evaluateKissHeuristics,
  POLICY_RULES,
  HEALTH_RULES,
  KISS_DEFAULTS,
  KISS_RULES,
  appendAuditLog,
  appendLogEntry,
  formatAuditTimestamp,
  formatMissionClock,
  computeMissionDateCode,
  SPEC_AUDIT_EVENTS,
  scanSkillSecurity,
  verifySkillIntegrity,
  auditSkillPath,
  auditWithSkillSpector,
  SUSPICIOUS_PATTERNS,
  calculateAffectedNodes,
  discoverWorkspaceTopology,
  TOPOLOGY_RULES,
  auditNodeRuntime,
  SECURE_BASELINE,
  runFrameworkUpdate,
  getInstalledVersion,
  runLifecycleAdvisor,
  detectProjectLifecycle,
  PROJECT_LIFECYCLE,
  resolveThemeMode,
  loadThemeConfig,
  getHookLabel,
  getZoneName,
  getRoleAlias,
  ROLES_CATALOG,
  displayLogStats,
  runInit,
  printCrewThemeNotice,
  printThemeNotice
} from 'stng-framework';
```

---

## 3. CLI Reference (`bin/stng.js`)
- `stng init [--provider=auto|gemini|claude|openai|deepseek|ollama] [--theme=standard|naval|local] [--allow-tailwind] [--force]` — Deploys `.agents/`, `scripts/`, `config/models.config.json`, `config/providers.json`, `.mcp/mcp-servers.config.json`, AI instruction bridges, and arms `git config core.hooksPath .agents/git-hooks`.
- `stng theme` — Displays active theme mode, resolved config source, Deck zones (`Bridge`, `Lower Deck`, `Sim`), and full role mappings.
- `stng guard` (alias: `shield`) — Runs `.agents/hooks/pre-tool-shell-guard.js --test`.
- `stng policy` (alias: `health`) — Runs `.agents/hooks/post-edit-policy-check.js --test`.
- `stng scan-skill <path>` — Scans a skill directory or `SKILL.md` for prompt injection overrides, credential harvesting, and C2 exfiltration.
- `stng cve-check` — Verifies host Node.js version against embedded CVE baselines (including Node 24 LTS & v18 EOL advisories).
- `stng circuit:reset` — Resets `.agents/.circuit_state.json`.
- `stng audit-stats` (alias: `log`, `log --stats`) — Prints `.agents/audit_log.json` summary including Cold Review `PASS` / `ABORT` telemetry.
- `stng advise [--yes]` — Evaluates repository lifecycle stage (`greenfield`, `construction`, `maintenance`) and writes `.agents/project-profile.json`.
- `stng update [--check] [--yes]` — Evaluates upstream updates inside a quarantined Quadruple Security Gate before applying.
- `stng demo` — Runs `examples/quickstart-demo.js`.
- `stng test` — Runs `node --test` inside the active Simulation Sandbox (`Sim Deck`).

---

## 4. Environment & Rigidity Configuration (`.agents/.env`)
- `AGENT_THEME=standard|naval|local` — Controls hook prefixes (`[SECURITY GUARD]` / `[SECURITY OFFICER]` / local override), simulation environment labels (`Simulation Sandbox` / `Sim Deck` / local override), and audit clock formatting (`ISO-8601` vs `Mission YYYY.DDD`).
- `AGENT_THEME_FILE=/abs/or/rel/path.json` — Optional explicit path to a private local theme JSON file (implies `local` mode when set).
- `SHIELD_RIGIDITY=standard|strict|fast-track` — Sets guardrail enforcement level:
  - `standard`: Blocks destructive shell commands and protected path writes; flags `setInterval` polling and disallowed Tailwind imports as `ERROR`.
  - `strict`: Adds blocks for `git push --force` / `--force-with-lease` and `git reset --hard`.
  - `fast-track`: Downgrades blocks and policy `ERROR`s to advisory `WARNING`s.
- `ALLOW_TAILWIND=true|false` — Permits or forbids `tailwindcss` / `nativewind` imports in `post-edit-policy-check.js`.

---

## 5. Zero-Context Cold Review (`Lower Deck`) & SDD (`templates/spec.md`)
Vital Logic changes (features, architecture, auth/security, schemas, multi-package refactors) follow `.agents/skills/adversarial-meta-review/SKILL.md`:
1. Draft spec from `templates/spec.md` (`status: DRAFT`, `track: VITAL_LOGIC`, exact `target_files`).
2. Dispatch stateless **Lower-Deck** subagents with zero prior conversation history:
   - **Gate 1 — Lower-Deck Paraphraser (`FAST_ECONOMY`)**: Summarizes objective, scope, non-goals, and verification solely from the written spec (`ABORT: AMBIGUOUS_SPEC` on gaps).
   - **Gate 2 — Lower-Deck Critic (`HIGH_REASONING`, cross-model preferred)**: Applies the Heilmeier 6-point checklist, KISS/YAGNI/DRY review, failure modes, and ADR parity (`ABORT: DESIGN_GAP` on blockers).
   - **Gate 3 — Lower-Deck Verifier (`Read-Only`)**: Confirms existing paths/symbols and `NEW` tags match repository reality (`ABORT: NOT_READY` vs `PASS: READY_FOR_SIGN_OFF`).
3. Log lifecycle checkpoints in `.agents/audit_log.json` using `SPEC_AUDIT_EVENTS` (`spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`).
4. Promote `status: APPROVED` by `Human / Product Owner` before writing production code.

---

## 6. KISS Simplicity Rules & Default Thresholds (`post-edit-policy-check.js`)
Enforced via `evaluateKissHeuristics` alongside `.agents/rules/kiss-simplicity-protocol.md`:
- `KISS_EXCESSIVE_FILE_LENGTH` (`WARNING`): `> 400` non-empty lines (`KISS_DEFAULTS.maxFileLines`).
- `KISS_DEEP_NESTING` (`WARNING`): control-flow depth `> 4` (`KISS_DEFAULTS.maxControlNesting`).
- `KISS_EXCESSIVE_PARAMS` (`WARNING`): positional parameters `> 5` (`KISS_DEFAULTS.maxParams`).
- `KISS_LONG_FUNCTION` (`WARNING`): single function length `> 80` lines (`KISS_DEFAULTS.maxFunctionLines`).
- `KISS_SWALLOWED_ERROR` (`WARNING`): undocumented bare empty `catch {}` block (documented `catch { /* reason */ }` is allowed).

Comments and string/template literals are stripped before `NO_CONTINUOUS_POLLING`, parameter, nesting, and function-length checks; `NO_RAW_CONSOLE_LOG_PRODUCTION` exempts CLI/script directories (`bin/`, `examples/`, `scripts/`, `cli.js`, `themes.js`, `auditor.js`).

---

## 7. Private Local Theme Setup (Outside Git)
Keep custom personal or project-specific themes out of version control by creating an untracked JSON file at any lookup location:
1. Path in `AGENT_THEME_FILE`
2. `<projectRoot>/.agents/theme.local.json`
3. `<projectRoot>/.agent-theme.local.json` (or parent workspace directory up to 3 levels up)
4. `~/.config/agent-governance/theme.local.json`

Schema template (only override keys you want to customize; missing keys inherit from `naval`):
```json
{
  "name": "Custom Local Theme",
  "clockPrefix": "Cycle",
  "zones": {
    "bridge": "DeckAlpha",
    "lowerDeck": "SubDeck",
    "simBay": "SimArena"
  },
  "labels": {
    "guard": "[ALPHA GUARD]",
    "policy": "[ALPHA POLICY]",
    "scanner": "[ALPHA SCANNER]",
    "circuit": "[ALPHA CIRCUIT BREAKER]",
    "cascade": "[ALPHA CASCADE SCOPE]",
    "audit": "[ALPHA AUDIT]",
    "cve": "[ALPHA CVE CHECK]",
    "sim": "[SIM-ARENA]"
  },
  "defaults": { "from": "Lead", "to": "Orchestrator" },
  "roles": {
    "productOwner": "Owner",
    "orchestrator": "AlphaLead",
    "testRunner": "SubDeck Runner",
    "metaCritic": "SubDeck Evaluator"
  }
}
```
Activate at runtime via `AGENT_THEME=local` or `--theme=local`. Both `.agents/theme.local.json` and `.agent-theme.local.json` are listed in `.gitignore`.

---

## 8. Zero-Build ESM Runtime & Static Type Safety (`tsc --noEmit`)
Core hooks and CLIs run as native ESM JavaScript (`.js`) across `Node.js 18–24` with **0 external runtime dependencies** and zero compilation steps, while remaining strictly type-checked via `tsconfig.json` (`strict: true`, `allowJs: true`, `checkJs: true`, `noEmit: true`), JSDoc, and [types/index.d.ts](types/index.d.ts):
- Hooks in `.agents/hooks/*.js` use self-contained JSDoc annotations so they stay portable when copied standalone into Python, Go, or Rust repositories.
- `typescript` and `@types/node` live strictly in `devDependencies` (`pnpm run typecheck`); `node --test` and `install.sh` never require `pnpm install`.
