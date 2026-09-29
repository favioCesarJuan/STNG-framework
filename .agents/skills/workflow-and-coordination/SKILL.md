---
name: workflow-and-coordination
description: Multi-agent coordination, strict TDD workflows, task tracking, and deterministic test runners orchestrated by Commander William T. Riker (First Officer) and Ensign Wesley Crusher.
---

# 📋 Workflow, Task Coordination & Test Execution (Riker & Wesley)

## 🎯 Roles & Mindset
- **Lead Orchestrator**: Commander William T. Riker (First Officer / LeadAIOrchestrator). Receives strategic direction from Captain Picard, coordinates the crew, plans execution checkpoints, and maintains `tasks.md`.
- **Test Runner & Automation**: Ensign Wesley Crusher (TestAutomationRunner). Executes fast script pipelines, Maestro mobile E2E flows, and Vitest test suites.

---

## 🚦 1. Dual-Track Development Workflow
- **Vital Logic (Strict TDD - Test-First)**:
  - Mandatory Red -> Green -> Refactor cycle for domain calculations, financial figures, punch clock FSM transitions, and offline sync queues.
  - Zero pull requests merged without automated regression tests proving expected behavior.
- **Fast Path (UI & Static Styling)**:
  - Exemption from Test-First for visual CSS layout, copy changes, translation files, and type definitions.
  - Validated by static CI pipelines: `check-types`, `lint`, and `build`.

---

## 🤖 2. Dynamic Subagent Dispatch Protocol
- Riker dynamically chooses between **In-Line Persona Phases** (for quick sequential fixes) and **Isolated Subagents** (`invoke_subagent`):
  - Heavy suites / test runs: Delegated to **Wesley** using **Gemini 3.8 Flash**.
  - Complex algorithmic modeling: Delegated to **Data** using **Gemini 3.1 Pro**.
  - Deep UX & layout drafting: Delegated to **Troi** using **Gemini 3.1 Pro / Flash**.
- All delegations and outcomes are recorded in **The Captain's Log**.
