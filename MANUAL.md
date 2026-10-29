# 🛸 STNG-Framework: Universal Master Operating Manual

> **Purpose:** Comprehensive reference and universal configuration guide for human engineers and any Artificial Intelligence Agent or Model (Claude, OpenAI GPT, DeepSeek, Qwen/Ollama, Gemini, Cursor, Copilot, Cline, Continue.dev, Roo Code, etc.).
> **Compatibility:** Tool and platform agnostic. If an AI tool does not natively read `Agents.md`, this manual and the generated instruction bridges route all directives to any runtime environment.
> **Language:** **English (Default)** | [Español](MANUAL.es.md)

---

## 🧭 Quick Table of Contents
1. [What is STNG-Framework and its Core Philosophy?](#1-what-is-stng-framework)
2. [Configuration Bridge Map per AI Environment](#2-configuration-bridge-map-per-ai-environment)
3. [The Dual-Layer Crew Architecture](#3-the-dual-layer-crew-architecture)
4. [The 5 Inviolable Prime Directives](#4-the-5-inviolable-prime-directives)
5. [Integration Guide per AI Assistant or Frontier Model](#5-integration-guide-per-ai-assistant)
6. [Unified Starfleet CLI (`stng`)](#6-unified-starfleet-cli-stng)
7. [Lifecycle-Aware Tactical Advisor (`stng advise`)](#7-lifecycle-aware-tactical-advisor-stng-advise)
8. [Consulted Framework Updater with Quadruple Security Gate (`stng update`)](#8-consulted-framework-updater-with-quadruple-security-gate-stng-update)
9. [Deterministic Model Hooks & Health Checkers](#9-deterministic-model-hooks--health-checkers)
10. [Token Economics & Cognitive Language Protocol](#10-token-economics--cognitive-language-protocol)
11. [Tactical Security Hardening & GitHub Security Lab](#11-tactical-security-hardening--github-security-lab)
12. [Physical Crew Dossiers (`.agents/crew/`)](#12-physical-crew-dossiers-agentscrew)

---

## 1. What is STNG-Framework?

STNG-Framework is a **deterministic governance engine for software projects and monorepos** augmented by Artificial Intelligence.

Unlike standard approaches based on "hoping the LLM remembers prompt rules", STNG combines:
1. **Explicit, immutable rules** structured for LLM working context.
2. **Deterministic Node.js executable hooks** that physically intercept destructive actions before they hit the OS.
3. **Asymmetric token economics** (cost-efficient models for mechanical tasks and frontier reasoning models for architecture).
4. **Lifecycle-aware advisory** tailored to project maturity (Greenfield, In-Construction, Maintenance).
5. **Consulted, non-automated framework updates** requiring human confirmation and passing a Quadruple Security Gate in quarantine.

---

## 2. Configuration Bridge Map per AI Environment

Not all AI tools consume the same configuration file. STNG-Framework provides native out-of-the-box compatibility:

| Generated Bridge | Target AI Engine / Tool | Primary Purpose |
| :--- | :--- | :--- |
| `Agents.md` | **Gemini CLI / Antigravity / Google Agent Toolkit** | Master crew hierarchy and deterministic model hooks. |
| `CLAUDE.md` | **Anthropic Claude Code / Claude Desktop / Projects** | Project directives, test scripts, and First Officer persona. |
| `.cursorrules` | **Cursor IDE / Composer** | Persistent code health, Ponytail minimalism, and no-polling rules. |
| `.windsurfrules` | **Windsurf (Codeium Cascade)** | Engineering boundaries and Starfleet deterministic guardrails. |
| `.copilot-instructions.md` | **GitHub Copilot Chat & Completion** | Inline code generation guidelines and test requirements. |
| `rules.md` | **Ollama / Roo Code / Cline / Local Models** | Zero-dependency pure Markdown directives. |
| `MANUAL.md` | **Human Engineer / Any LLM (Universal)** | Comprehensive master operating manual in English. |
| `MANUAL.es.md` | **Human Engineer / Any LLM (Universal)** | Comprehensive master operating manual in Spanish. |

---

## 3. The Dual-Layer Crew Architecture

STNG-Framework implements a **Dual-Layer Persona Architecture**. The Star Trek: TNG narrative ensures contextual empathy and memorability, while each officer maps 1-to-1 to a formal enterprise corporate title:

| Starfleet Officer | Corporate Title | Recommended Model | Core Responsibility |
| :--- | :--- | :--- | :--- |
| **Captain Jean-Luc Picard** | `The Captain / Product Owner` | **Human Engineer (You)** | Supreme approval, business vision, and executive directives. |
| **Cmdr. William T. Riker** | `LeadAIOrchestrator` | Gemini 3.1 Pro / Claude Sonnet | Phased execution, crew coordination, and `tasks.md` management. |
| **Lt. Cmdr. Data** | `SystemsLogicAnalyst` | Gemini 3.1 Pro / Claude Sonnet | Algorithmic modeling, DDD, state machines, and mathematical rigor. |
| **Lt. Cmdr. Geordi La Forge**| `ArchitectureLead` | Gemini 3.1 Pro / Claude Sonnet | Monorepo pipelines, CI/CD, package boundaries, and mentorship. |
| **Lt. Cmdr. Worf** | `SecurityGuardrail` | Gemini 3.1 Pro / Flash | Tactical OS shields, Semgrep AST code scans, and Node CVE baseline. |
| **Counselor Deanna Troi** | `DesignSystemEnforcer` | Gemini 3.1 Pro / Flash | UX/UI empathy, WCAG AAA accessibility, fluid motion, and clean styling. |
| **Dr. Beverly Crusher** | `QualityHealthAuditor` | Gemini 3.1 Pro / Flash | Code health, Ponytail Protocol (anti-bloat), and zero continuous polling. |
| **Ensign Wesley Crusher** | `TestAutomationRunner` | Gemini 3.8 Flash / Claude Haiku | Fast script execution, unit test suites, linters, and verification. |
| **Computer** | `RuntimeEnvironment` | Bash / OS Runtime | Deterministic output telemetry, process lifecycle, and CLI bridge. |
| **Q (The Q Continuum)** | `MetaCriticEvaluator` | Gemini 3.1 Pro / o1 / R1 | Omniscient external evaluation, timeline audits, bias trials, chaos checks. |

---

## 4. The 5 Inviolable Prime Directives

1. **The Ponytail Protocol (Radical Minimalism)**:
   - Introducing new dependencies without Captain approval is strictly prohibited.
   - Always prefer Node.js native standard modules (`node:fs`, `node:path`, `node:child_process`).
2. **Zero Continuous Polling**:
   - `setInterval` or continuous polling loops against network APIs are forbidden. Use reactive events or explicit on-demand queries.
3. **Dual Workflow (Strict TDD vs. Fast Path)**:
   - **Mandatory TDD (Test-First)**: Core domain logic, state machines, synchronization, and financial calculations.
   - **Fast Path**: UI views, cosmetic styling, and copy changes bypass Test-First and are validated via linters and CI.
4. **Adaptive Styling Hygiene**:
   - Default: Pure CSS Modules (`*.module.css`) on Web, `StyleSheet.create` on React Native.
   - Tailwind utility bloat is prohibited unless `ALLOW_TAILWIND=true` is declared in the project profile.
5. **Cognitive Language Protocol (30%-50% Token Savings)**:
   - **Inbound:** Receives questions in the Captain's native language (e.g. Spanish).
   - **Internal Reasoning:** Conducts Chain-of-Thought, AST parsing, and subagent handoffs in **English** (exploiting BPE token compression).
   - **Outbound:** Delivers final reports and summaries in the Captain's language.

---

## 5. Integration Guide per AI Assistant

### Anthropic Claude Code / Claude Desktop:
- Claude automatically detects [`CLAUDE.md`](./CLAUDE.md) at root.
- Prompt: *"Follow CLAUDE.md directives and assume the role of First Officer Riker."*

### Cursor IDE or Windsurf:
- Cursor consumes [`.cursorrules`](./.cursorrules); Windsurf consumes [`.windsurfrules`](./.windsurfrules).
- Code generation automatically adheres to the Ponytail Protocol and zero-polling rules.

### Local Models on Ollama / vLLM (Qwen, DeepSeek, Mistral):
- Point your system prompt to [`rules.md`](./rules.md).
- The model operates in **Quarantine Mode**: tight responses (< 50 lines), zero unauthorized library hallucinations.

### Gemini CLI / Google Antigravity:
- Automatically loads [`Agents.md`](./Agents.md) and executes hooks registered in [`.agents/hooks.json`](./.agents/hooks.json).

---

## 6. Unified Starfleet CLI (`stng`)

The `stng` CLI provides end-to-end operational control:

```bash
# Initialize Starfleet governance in the current workspace
stng init

# Lifecycle-aware interactive advisor (Greenfield / Active / Maintenance)
stng advise
stng advise --yes

# Consulted upstream framework updater with Quadruple Security Gate
stng update --check
stng update

# Run zero-dependency governance verification test suite
stng test

# Self-test Lt. Cmdr. Worf's Tactical Security Shield
stng shield

# Self-test Dr. Crusher's Code Health & Ponytail Diagnostician
stng health

# Reset editing circuit breaker counter
stng circuit:reset

# Inspect forensic telemetry in Captain's Log
stng log:stats
```

---

## 7. Lifecycle-Aware Tactical Advisor (`stng advise`)

The `stng advise` engine inspects workspace topology and tailors advice according to project maturity:

* **Greenfield (Brand New / From Scratch)**:
  - Recommends clean modular architecture in `src/`, Biome or ESLint with strict TypeScript, and a native test runner from day one.
* **In-Construction (Active Development)**:
  - Diagnoses gaps in real-time (missing test suite, missing MCP triad, unhooked pre-commit checks).
  - Recommends binding `scripts/pre-commit.sh` and configuring Indispensable MCPs (Context7, Codebase Memory, GitHub).
* **Maintenance (Mature / Legacy / Production)**:
  - Prioritizes regression defense, Semgrep AST scans, Node.js CVE baseline compliance, and zero-breaking-change refactoring.

The resulting diagnostic profile is persisted to `.agents/project-profile.json`.

---

## 8. Consulted Framework Updater with Quadruple Security Gate (`stng update`)

Framework updates are **NEVER silent or automated**. They require explicit interactive confirmation and must pass the Quadruple Security Gate in an isolated quarantine directory:

```
                      [stng update]
                            │
                            ▼
               [Confirm download? (y/N)]
                            │ (Yes)
                            ▼
               [Download to Quarantine Sandbox]
                            │
      ┌─────────────────────┴─────────────────────┐
      ▼                     ▼                     ▼
[Worf Shield]        [Semgrep SAST]        [SkillSpector]
(No rm -rf /         (No polling or        (Vulnerabilities
 injections)          token leaks)          & Jailbreaks)
      │                     │                     │
      └─────────────────────┬─────────────────────┘
                            ▼
                 [Node.js CVE Baseline]
                            │
                            ▼
               [Apply update? (y/N)]
                            │ (Yes)
                            ▼
             [Atomic Backup + Live Apply]
```

1. **Worf Security Shield**: Verifies that incoming files do not contain destructive shell patterns or unauthorized system path writes.
2. **Semgrep SAST**: Scans against `.agents/rules/semgrep-starfleet.yml` preventing continuous polling loops, command injections, or exposed API credentials.
3. **NVIDIA SkillSpector**: Vets skill safety scores (Score >= 85) and eliminates prompt injection patterns.
4. **Node.js Runtime CVE Baseline**: Assesses host runtime posture against known security advisories.

If any gate fails, the update is immediately aborted and the project remains unaffected.

---

## 9. Deterministic Model Hooks & Health Checkers

Located in `.agents/hooks/` and registered in `.agents/hooks.json`:
- `worf-security-shield.js`: Intercepts `run_command` and `write_to_file` before execution.
- `crusher-health-check.js`: Post-invocation medical diagnostics checking for anti-bloat and polling violations.
- `captains-log-writer.js`: Immutable audit telemetry written to `.agents/captains_log.json`.
- `skill-lifecycle-auditor.js`: Vets skill imports prior to activation.
- `cascade-evaluator.js`: Resolves dependency DAGs in monorepos.
- `circuit-breaker.js`: Trips after 5 consecutive failing edits to prevent LLM loop traps.

---

## 10. Token Economics & Cognitive Language Protocol

Model routing configured in [`config/models.config.json`](./config/models.config.json):
* **High-Order Reasoning Tier (80% of crew)**: Claude 3.5/3.7 Sonnet, Gemini 3.1 Pro, o1, DeepSeek-R1, Qwen 72B.
* **Fast Economy Tier (Wesley Crusher / Tests / Linters)**: Gemini 3.8 Flash, Claude 3.5 Haiku, GPT-4o-mini, Qwen 7B.

---

## 11. Tactical Security Hardening & GitHub Security Lab

Hardened following official **[GitHub Security Lab](https://github.com/GitHubSecurityLab/gh-secure)** guidelines:
1. **Private Vulnerability Reporting**: Secure disclosure via [Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new).
2. **Push Protection & Secret Scanning**: Real-time blocking of secret leaks.
3. **Dependabot Automated Updates**: Proactive supply chain vulnerability patching.
4. **CodeQL Semantic Static Analysis**: CI-powered security scanning.
5. **Runtime Worf Shield**: OS command execution boundaries.
6. **Formal Security Policy**: Full triage protocol in [`SECURITY.md`](./SECURITY.md).

---

## 12. Physical Crew Dossiers (`.agents/crew/`)

Every Starfleet officer has a dedicated structured Markdown dossier in `.agents/crew/`:
- `riker-orchestrator.md`: Lead AI Orchestrator & Executive Coordinator.
- `data-systems-logic.md`: Systems Logic & DDD Architecture Analyst.
- `geordi-architect.md`: Chief Architecture Lead & Monorepo Specialist.
- `worf-security.md`: Tactical Security Guardrail & Perimeter Defense.
- `troi-ux-docs.md`: Design System Enforcer, Accessibility & Empathy.
- `crusher-health.md`: Quality Health Auditor & Ponytail Custodian.
- `wesley-runner.md`: Test Automation Runner & Fast Script Executor.
- `q-meta-critic.md`: Meta-Critic Evaluator & Q Continuum Overseer.

*Enterprise cleared for warp. Make it so!*
