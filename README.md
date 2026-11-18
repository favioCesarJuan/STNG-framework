# STNG-framework (Deterministic Governance Core)

> **Core Runtime for AI Coding Agents** — Deterministic pre-tool/post-edit hooks, edit circuit-breaker, skill security scanner, audit ledger, and workspace impact scoping. Zero external runtime dependencies (Node.js `>=18.0.0` stdlib only).

For multi-stack project scaffolding, archetype detection, interactive setup, and governance drift auditing (`doctor`), see the companion CLI repository: **ISS-Enterprise**.

---

## 30-Second Quickstart Demo

Run the reproducible demo in under 1 second with zero dependencies:

```bash
node examples/quickstart-demo.js
# Or with optional Starfleet crew labels (0 extra output tokens):
node examples/quickstart-demo.js --theme=starfleet
```

Run the full unit test suite (27 tests):

```bash
node --test
```

---

## Implemented Architecture & Modules

| Module | Path | Purpose |
| :--- | :--- | :--- |
| Pre-Tool Shell Guard | `.agents/hooks/pre-tool-shell-guard.js` | Blocks destructive shell commands (`rm -rf /`, `curl \| bash`, `chmod 777`, `DROP DATABASE`) and writes to `/etc`, `/root`, `.ssh/`, `.env.production`. |
| Edit Circuit Breaker | `.agents/hooks/edit-circuit-breaker.js` | Halts execution if the same file is edited >5 times within 10 minutes. |
| Post-Edit Policy Check | `.agents/hooks/post-edit-policy-check.js` | Flags `setInterval` HTTP polling (`ERROR`), forbidden Tailwind imports (`ERROR` unless `ALLOW_TAILWIND=true`), and `console.log` (`WARNING`). |
| Audit Log Writer | `.agents/hooks/audit-log-writer.js` | Appends structured JSON and Markdown records to `.agents/audit_log.json` and `.agents/audit_log.md`. |
| Skill Security Scanner | `.agents/hooks/skill-security-scanner.js` | Scans `SKILL.md` files for prompt injection, credential harvesting, and C2 exfiltration (built-in regex engine + optional `skillspector` CLI). |
| Monorepo Cascade Scope | `.agents/hooks/monorepo-cascade-scope.js` | Computes downstream affected workspace packages from `package.json` DAG (with heuristic fallback). |
| Node CVE Baseline Check | `scripts/node-runtime-cve-check.js` | Verifies local Node.js version against embedded LTS security baselines (offline, no network calls). |
| Semgrep SAST Rules | `.semgrep.yml` | Static rules (`gov-*`) for continuous polling, `node:` import prefix, `exec` command injection, `eval`, and hardcoded secrets. |

---

## Optional Starfleet Theme (`--theme=starfleet`)

By default, all files, hooks, logs, and CLI outputs use **standard functional naming** (`theme: "standard"`).
If you prefer Star Trek: The Next Generation crew aliases, enable `--theme=starfleet` or set `AGENT_THEME=starfleet` in `.agents/.env`.

**Token Impact:** `0` extra output tokens when `Zero Theatrical Filler` is active—labels simply swap `[SECURITY GUARD]` <-> `[WORF / TASHA SECURITY SHIELD]` and ISO timestamps <-> `Stardate`.

| Standard Role | Optional Starfleet Alias | Project Responsibility |
| :--- | :--- | :--- |
| Human / Product Owner | Captain Jean-Luc Picard | Project authority, requirements, sign-off |
| Lead AI Orchestrator | Cmdr. William T. Riker | Task decomposition, subagent dispatch |
| Systems & Logic Analyst | Lt. Cmdr. Data | Algorithms, state machines, workspace DAG |
| Architecture Lead | Lt. Cmdr. Geordi La Forge | Monorepo boundaries, build & CI pipelines |
| Security Guardrail | Lt. Cmdr. Worf / Lt. Tasha Yar | Pre-tool shell/path guard, Semgrep SAST, skill scan |
| Quality & Health Auditor | Dr. Beverly Crusher | Post-edit policy check, YAGNI minimalism |
| Design System & UX | Counselor Deanna Troi | CLI ergonomics, WCAG accessibility, styling policy |
| Test Automation Runner | Ensign Wesley Crusher | Fast unit tests, linters, subagent execution |
| Meta-Critic Evaluator | Q | Adversarial edge-case review, doc-to-code parity |

---

## CLI Usage

```bash
node ./bin/stng.js help
node ./bin/stng.js init --theme=standard
node ./bin/stng.js guard --test
node ./bin/stng.js policy --test
node ./bin/stng.js audit-stats
node ./bin/stng.js demo
```

---

## Status & Roadmap Honesty
- **Implemented & Tested:** All 6 hook modules, Node CVE baseline check, `.semgrep.yml` rules, programmatic API (`index.js`), and `stng` CLI.
- **Experimental / External Tooling:** `skillspector` CLI integration and Semgrep CI scanning require those external binaries to be installed; otherwise built-in JS/Node checks run automatically.
