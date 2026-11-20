# STNG-framework (*Structured Tactical Node Governance*)

> **Deterministic Core Runtime for AI Coding Agents** — Pre-tool shell/path guards, edit circuit-breaker, post-edit policy & KISS heuristics, SDD Zero-Context Cold Review (`Lower Deck`), immutable audit ledger, skill security scanner, and monorepo workspace cascade scoping. Zero external runtime dependencies (`Node.js >= 18.0.0` stdlib only).

For interactive project discovery, multi-stack scaffolding, heterogeneous model fleet orchestration, and governance drift auditing (`iss doctor`), use the companion CLI repository: **ISS-Enterprise** (*Intelligent Stack Scaffolding for Enterprise*).

---

## 30-Second Quickstart Demo (Simulation Sandbox)

Run the reproducible demo in under 1 second with zero external dependencies:

```bash
node examples/quickstart-demo.js
# Public-domain Naval Command theme (Bridge / Lower Deck / Sim Deck):
node examples/quickstart-demo.js --theme=naval
# Private local theme resolved dynamically from untracked JSON outside Git:
node examples/quickstart-demo.js --theme=local
```

Run the full native unit test suite (and optional static TypeScript check):

```bash
node --test
pnpm run typecheck   # Strict tsc --noEmit verification via JSDoc + types/index.d.ts
```

---

## Architecture: Bridge vs. Lower Deck vs. Simulation Sandbox

- **Bridge (`BRIDGE`)**: Long-context governance roles (`Human / Product Owner`, `Lead AI Orchestrator`, `Systems & Logic Analyst`, `Architecture Lead`, `Security Guardrail`, `UX & Comms`, `Quality & Health Auditor`).
- **Lower Deck (`LOWER_DECK`)**: Stateless zero-context ephemeral subagents preventing confirmation bias and main-context bloat:
  - **Lower-Deck Evaluator (`meta-critic-evaluator`)**: 3-gate Zero-Context Cold Review pipeline (`Paraphraser` -> `Critic` -> `Verifier`) against SDD specs (`templates/spec.md`).
  - **Lower-Deck Runner (`test-automation-runner`)**: Fast-economy unit test, linter, and dry-run verification runner.
- **Simulation Sandbox (`simBay`)**: Isolated execution zone (`Simulation Sandbox` in `standard`, `Sim Deck` in `naval`, or custom local label under `--theme=local`) used for demos, `--dry-run`, and hook `--test` self-tests.

---

## Implemented Architecture & Modules

| Module | Path | Purpose |
| :--- | :--- | :--- |
| Theme Loader | `.agents/hooks/theme-loader.js` | Resolves `standard`, `naval`, or untracked `local` themes, deck zones (`Bridge` / `Lower Deck` / `Sim Deck`), hook labels, and Mission Clock formatting. |
| Pre-Tool Shell Guard | `.agents/hooks/pre-tool-shell-guard.js` | Normalizes paths against traversal and blocks destructive shell commands (`rm -rf /`, `curl \| bash`, `chmod 777`, `DROP DATABASE`) and writes to `/etc`, `/root`, `.ssh/`, `.env.production`. Supports `SHIELD_RIGIDITY=standard \| strict \| fast-track`. |
| Edit Circuit Breaker | `.agents/hooks/edit-circuit-breaker.js` | Halts execution if the same file is edited >5 times within 10 minutes (`preToolUse`). |
| Post-Edit Policy & KISS Check | `.agents/hooks/post-edit-policy-check.js` | Strips comments/string literals, exempts CLI `console.log`, flags `setInterval` HTTP polling (`ERROR`), forbidden Tailwind imports (`ERROR` unless `ALLOW_TAILWIND=true`), and KISS warnings (`KISS_DEEP_NESTING`, `KISS_EXCESSIVE_PARAMS`, `KISS_LONG_FUNCTION`, `KISS_EXCESSIVE_FILE_LENGTH`, `KISS_SWALLOWED_ERROR`). |
| Audit Log Writer | `.agents/hooks/audit-log-writer.js` | Appends structured JSON and Markdown records (including SDD `SPEC_AUDIT_EVENTS`: `spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`) to `.agents/audit_log.json` and `.agents/audit_log.md`. |
| Zero-Context Cold Review | `.agents/skills/adversarial-meta-review/SKILL.md` | Stateless **Lower-Deck** 3-gate Pass/Abort rubric (`references/cold-review-rubric.md`) and SDD `templates/spec.md` for Vital Logic changes. |
| KISS Simplicity Protocol | `.agents/rules/kiss-simplicity-protocol.md` | Operational simplicity guidelines pairing cleanly with `.agents/skills/code-health-and-minimalism/SKILL.md`. |
| Skill Security Scanner | `.agents/hooks/skill-security-scanner.js` | Scans `SKILL.md` files for prompt injection overrides, credential harvesting, and C2 exfiltration (`preSkillInvocation`), plus optional `skillspector` CLI integration. |
| Monorepo Cascade Scope | `.agents/hooks/monorepo-cascade-scope.js` | Computes downstream affected workspace packages from `package.json` dependency DAG (with heuristic fallback). |
| Node CVE Baseline Check | `scripts/node-runtime-cve-check.js` | Verifies local Node.js version (including Node 24 LTS & v18 EOL advisories) against embedded baselines offline. |
| Semgrep SAST Rules | `.semgrep.yml` | Static rules (`gov-*`) for continuous polling, `node:` import prefix, `exec` command injection, `eval`, and hardcoded secrets. |

---

## Governance Themes: `standard`, `naval` & Private `local`

1. **`standard` (Default)**: Clean corporate engineering terminology (`Simulation Sandbox`, `[SECURITY GUARD]`, ISO-8601 timestamps).
2. **`naval` (`--theme=naval` / `AGENT_THEME=naval`)**: Public-domain maritime hierarchy (`Bridge`, `Lower Deck`, `Sim Deck`, `[SECURITY OFFICER]`, `Mission YYYY.DDD` clock, `0` extra output tokens via `Zero Theatrical Filler`).
3. **`local` (`--theme=local` / `AGENT_THEME=local` / `AGENT_THEME_FILE=<path>`)**: Resolves private labels, roles, and simulation zone names dynamically at runtime without storing private names in committed files. Lookup order:
   1. `AGENT_THEME_FILE` (or `.agents/.env` `AGENT_THEME_FILE`)
   2. `<projectRoot>/.agents/theme.local.json`
   3. `<projectRoot>/.agent-theme.local.json` (and up to 3 parent workspace directories)
   4. `~/.config/agent-governance/theme.local.json`

Example untracked `.agent-theme.local.json` (excluded from Git via `.gitignore`):

```json
{
  "name": "Alpha Private Theme",
  "clockPrefix": "Cycle",
  "zones": { "bridge": "DeckAlpha", "lowerDeck": "SubDeck", "simBay": "SimArena" },
  "labels": { "guard": "[ALPHA GUARD]", "sim": "[SIM-ARENA]" },
  "roles": { "orchestrator": "AlphaLead" }
}
```

| Standard Role | Naval Alias | Deck | Project Responsibility |
| :--- | :--- | :--- | :--- |
| Human / Product Owner | Captain | Bridge | Project authority, requirements, final `APPROVED` sign-off |
| Lead AI Orchestrator | First Officer | Bridge | Task decomposition, subagent dispatch, Cold Review triage |
| Systems & Logic Analyst | Science & Logic Officer | Bridge | Algorithms, finite state machines, workspace DAG |
| Architecture Lead | Chief Engineer | Bridge | Monorepo boundaries, build & CI pipelines |
| Security Guardrail | Security Officer | Bridge | Pre-tool shell/path guard, Semgrep SAST, skill scan |
| Quality & Health Auditor | Chief Medical Officer | Bridge | Post-edit policy check, KISS/YAGNI/DRY/SOLID minimalism |
| Design System & UX | UX & Comms Officer | Bridge | CLI ergonomics, WCAG accessibility, styling policy |
| Test Automation Runner | Lower-Deck Runner | Lower Deck | Stateless tests & simulations in Simulation Sandbox (`Sim Deck`) |
| Meta-Critic Evaluator | Lower-Deck Evaluator | Lower Deck | Zero-context 3-gate Cold Review (`Paraphraser`, `Critic`, `Verifier`) |

---

## CLI Usage (`bin/stng.js`)

```bash
node ./bin/stng.js help
node ./bin/stng.js init [--provider=gemini] [--theme=standard|naval|local] [--allow-tailwind] [--force]
node ./bin/stng.js theme
node ./bin/stng.js guard                  # Pre-tool shell & path guard self-test (alias: shield)
node ./bin/stng.js policy                 # Post-edit policy & KISS self-test (alias: health)
node ./bin/stng.js scan-skill .agents/skills/security-guardrails
node ./bin/stng.js cve-check              # Offline Node.js CVE baseline verification
node ./bin/stng.js circuit:reset          # Clear edit circuit-breaker counters
node ./bin/stng.js audit-stats            # Governance & Cold Review telemetry (alias: log --stats)
node ./bin/stng.js advise                 # Lifecycle-aware repository advisor
node ./bin/stng.js update [--check]       # Security-gated upstream updater
node ./bin/stng.js demo                   # <1s reproducible quickstart demo
node ./bin/stng.js test                   # Run native node --test suite in Simulation Sandbox
```

---

## Architecture Decision: Zero-Build ESM Runtime + Strict JSDoc Type Safety

`STNG-framework` executes natively as zero-runtime-dependency **ES Modules (`.js`)** verified statically by the **TypeScript compiler (`tsc --noEmit`)**:
- **Zero-Build Portability**: Deterministic hooks (`.agents/hooks/*.js`) carry self-contained JSDoc types and run directly across `Node.js 18–24` and inside non-JavaScript target repositories (Python, Go, Rust) without requiring `tsc`, `node_modules`, or a `dist/` build step.
- **Full Static Type Safety**: `tsconfig.json` (`strict: true`, `allowJs: true`, `checkJs: true`, `noEmit: true`) validates all source, CLI, hook, and test files, while `types/index.d.ts` (`"types"` in `package.json`) provides public API IntelliSense.
- **Dev-Only Tooling**: `typescript` and `@types/node` reside strictly in `devDependencies`; runtime `dependencies` remain empty (`0`).

---

## Status & External Tooling
- **Implemented & Tested:** Zero-dep theme loader (`standard` / `naval` / `local`), all 6 hook modules + KISS heuristics, Node CVE baseline check, `.semgrep.yml` rules, programmatic ESM API (`index.js`), and `stng` CLI (`node --test`).
- **Optional External Binaries:** `skillspector` CLI integration and Semgrep CI scanning enhance checks when installed on `PATH`; built-in Node.js checks work offline without them.
