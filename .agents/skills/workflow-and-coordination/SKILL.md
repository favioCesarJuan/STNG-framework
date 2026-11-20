---
name: workflow-and-coordination
description: Multi-agent Bridge and Lower-Deck coordination, SDD Cold Review gating, strict TDD workflows, task tracking, and isolated Simulation Sandbox test runners orchestrated by LeadAIOrchestrator and TestAutomationRunner.
---

# Workflow, Task Coordination & Test Execution

## Architecture: Bridge vs. Lower Deck & Simulation Sandbox
- **Bridge Roles (Long-Context Authority & Design)**:
  - `Human / Product Owner` (Naval: `Captain`): Strategic direction, requirements, and final sign-off.
  - `LeadAIOrchestrator` (Naval: `First Officer`): Plans checklists (`tasks.md`), drafts Vital Logic specs, arbitrates findings, and dispatches subagents.
- **Lower-Deck Squadron (Stateless Zero-Context Ephemeral Subagents)**:
  - `MetaCriticEvaluator` (Naval: `Lower-Deck Evaluator`): Executes stateless Zero-Context Cold Reviews (`Paraphraser` -> `Critic` -> `Verifier`) before Vital Logic code is written.
  - `TestAutomationRunner` (Naval: `Lower-Deck Runner`): Executes unit tests, linters, dry-runs, and hook self-tests inside the isolated **Simulation Sandbox** (`Sim Deck`).

---

## 1. Dual-Track Development Workflow
- **Vital Logic (SDD + Cold Review + Strict TDD)**:
  - Required for new features, architectural changes, auth/security flows, DB/schema changes, and multi-package refactors:
  - Flow: `Draft Spec -> Zero-Context Cold Review (Lower-Deck Evaluator) -> Human Sign-Off (APPROVED) -> Strict TDD in Simulation Sandbox (Red -> Green -> Refactor)`.
  - Zero pull requests merged without automated regression tests proving expected behavior.
- **Fast Path (UI & Static Styling)**:
  - Exempt from Zero-Context Cold Review and Test-First for visual CSS layout, copy changes, translation files, and type definitions (conserves tokens).
  - Validated by static CI pipelines: `check-types`, `lint`, and `build`.

---

## 2. Dynamic Subagent Dispatch Protocol
- Dynamically choose between **In-Line Bridge Phases** (for quick sequential fixes) and **Isolated Lower-Deck Subagents** (`invoke_subagent`):
  - Zero-context spec reviews: MUST run as an isolated, read-only `MetaCriticEvaluator` subagent (Gate 1 Paraphraser on `FAST_ECONOMY`, Gate 2 Critic & Gate 3 Verifier on cross-model `HIGH_REASONING` when available).
  - Heavy suites / simulation runs: Delegated to `TestAutomationRunner` (`FAST_ECONOMY`) inside the **Simulation Sandbox / Sim Deck**.
  - Complex algorithmic modeling: Delegated to `SystemsLogicAnalyst` (`HIGH_REASONING`).
  - Deep UX & layout drafting: Delegated to `DesignSystemEnforcer` (`HIGH_REASONING` / `FAST_ECONOMY`).
- Record spec lifecycle and delegation milestones via `.agents/hooks/audit-log-writer.js`.
