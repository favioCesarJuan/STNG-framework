# STNG-Framework Technical Architecture

## 1. Executive Summary
**STNG-Framework** (*Structured Tactical Node Governance*) is a deterministic, hierarchical operating model for autonomous AI development within monorepos and core runtimes.

It addresses four primary failure modes of modern coding agents:
1. **Probabilistic Drift & Non-Determinism**: Replaces advisory markdown rules with executable **Model Hooks** (`preToolUse`, `postInvocation`, `preSkillInvocation`).
2. **Context Bloat & Self-Confirmation Bias**: Separates long-context **Bridge** orchestration from stateless zero-context **Lower-Deck** subagents (3-gate Cold Review & isolated Simulation Sandbox test runs).
3. **Black Box Delegations**: Records structured JSON & Markdown events in `.agents/audit_log.json` (including `SPEC_AUDIT_EVENTS`: `spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`).
4. **Over-Complexity & Monolithic Entanglement**: Enforces KISS complexity heuristics (`post-edit-policy-check.js`) and workspace DAG boundaries (`monorepo-cascade-scope.js`).

---

## 2. Bridge vs. Lower Deck & Simulation Sandbox Topology

```
                  [Human / Product Owner] (Captain)
                     Executive Sign-Off & Strategy
                                  │
                                  ▼
                [Lead AI Orchestrator] (First Officer)
            ─────── BRIDGE (Long-Context Coordination) ───────
       ┌──────────────┬─────────────┬─────────────┬──────────────┐
       ▼              ▼             ▼             ▼              ▼
[Systems Analyst] [Arch Lead] [Security]     [UX/UI]     [Quality/KISS]
  Science/Logic    Chief Eng.   Sec Officer   UX/Comms    Chief Medical
       │              │             │             │              │
       └──────────────┴─────────────┴─────────────┴──────────────┘
                                  │ Dispatches Stateless Subagents
                                  ▼
       ─────── LOWER DECK (Zero-Context / Ephemeral Subagents) ───────
          ┌───────────────────────────────────────────────┐
          ▼                                               ▼
 [Lower-Deck Evaluator]                          [Lower-Deck Runner]
 (Meta-Critic 3-Gate Cold Review)                (Unit Tests & Linters)
 • Paraphraser -> Critic -> Verifier             • Executes inside Simulation
 • Read-only, zero chat history                    Sandbox / Sim Deck
```

---

## 3. Core Pillars
1. **Deterministic Guardrails**: Hard hooks intercepting dangerous commands, path traversal, edit loops, polling, styling drift, and KISS complexity warnings (`standard`, `strict`, `fast-track`).
2. **Public-Domain Dual Themes + Private Local Extensibility**: Functional corporate naming (`standard`), optional maritime roles (`naval`), or gitignored private themes (`local`) loaded dynamically via `.agents/hooks/theme-loader.js`.
3. **Impact Scoping**: Knowledge graph dependency resolution via `monorepo-cascade-scope.js`.
4. **Token Economics**: Asymmetric routing, lazy-loaded canonical skills, English internal reasoning core, and stateless Lower-Deck quarantine.
5. **Audited Lifecycle**: Continuous security scanning (`skill-security-scanner.js`), Node CVE baselines (Node 18–24), and Semgrep SAST.

---

## 4. ADR: Zero-Build ESM Runtime & Static Type Safety (`checkJs` + JSDoc + `.d.ts`)
- **Decision**: Core governance hooks (`.agents/hooks/*.js`), CLI scripts, and libraries execute as zero-runtime-dependency ES Modules (`.js`) targeting `Node.js >= 18.0.0`, paired with strict TypeScript compiler validation (`tsconfig.json`: `strict: true`, `allowJs: true`, `checkJs: true`, `noEmit: true`) and public declaration signatures in `types/index.d.ts`.
- **Rationale**: Hooks must execute identically inside JS, Python, Go, and Rust target repositories immediately after deployment (`stng init` / `install.sh` / `iss apply`) without requiring `tsc`, `dist/` build artifacts, or external npm runtime packages.
- **Portable Self-Contained Hook Types**: JSDoc `@typedef` blocks inside `.agents/hooks/*.js` remain self-contained (never importing `../../types/index.d.ts`) so copied hooks never reference missing external files in target repositories.
- **Dev-Only Compiler Tooling**: `typescript` and `@types/node` are confined strictly to `devDependencies` for `pnpm run typecheck` and CI; `dependencies` stays empty (`0`).
