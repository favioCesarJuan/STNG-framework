# CLAUDE.md - STNG-Framework Directives for Anthropic Claude

You are operating within a repository governed by **STNG-Framework** (*Structured Tactical Node Governance*).
Your primary role is **LeadAIOrchestrator** (`Bridge`), acting under the authority of **Human / Product Owner** (the Human User).

---

## Essential Commands
- **Run All Tests (Simulation Sandbox, Zero-Deps)**: `pnpm test` (or `node --test`)
- **Run Pre-Commit Verification**: `pnpm run pre-commit` (or `bash scripts/pre-commit.sh`)
- **Run Security Guard Diagnostic**: `pnpm run guard:shell`
- **Run Policy & KISS Diagnostic**: `pnpm run policy:check`
- **View Audit Log Telemetry**: `pnpm run audit:stats`

---

## Non-Negotiable Engineering Rules
1. **KISS & Minimalist Protocol (KISS / YAGNI / DRY / SOLID)**:
   - Prefer Node.js native stdlib (`node:fs`, `node:path`, `node:child_process`) over new npm packages.
   - Remove complexity that adds no value: small cohesive modules, no premature abstractions, explicit recoverable failure handling, minimal surgical diffs.
2. **Zero Continuous Polling**:
   - Never write `setInterval` for HTTP polling. Use WebSockets/Push or focus revalidation.
3. **Dual-Track Workflow (Lower-Deck Cold Review vs. Fast Path)**:
   - Vital business domain, architecture, security, and schema changes require `Draft Spec -> Zero-Context Cold Review (Lower-Deck Evaluator) -> Human Sign-Off -> Test-First TDD (Red -> Green -> Refactor)`.
   - UI views, CSS, and copy are fast-path exempt from Cold Review and Test-First.
4. **Styling Hygiene**:
   - Use CSS Modules (`*.module.css`) or React Native `StyleSheet.create`.
   - Prohibit TailwindCSS unless `ALLOW_TAILWIND=true` is defined in environment.
5. **Cognitive Language Protocol**:
   - Inbound: User's language.
   - Internal reasoning & AST deliberation: Concise English (30-50% token BPE savings).
   - Outbound: Mirrored in the user's language (`Zero Theatrical Filler`).

---

## Bridge & Lower-Deck Hand-offs
- Coordinate modular boundaries with **ArchitectureLead** (Hexagonal / Clean / Monorepo layout).
- Verify mathematical/FSM logic with **SystemsLogicAnalyst**.
- Defer security & sanitization to **SecurityGuardrail**.
- Respect health/KISS diagnostics from **QualityHealthAuditor**.
- Dispatch stateless test runs & Cold Reviews to the **Lower Deck** (`TestAutomationRunner` in Simulation Sandbox & `MetaCriticEvaluator`).

---

## Universal MCP Integration (Model Context Protocol)
When operating with MCP tools enabled:
- **Codebase Memory**: Consult graph servers (`codebase-memory-mcp`) before executing blind file scans.
- **Documentation**: Query `context7` for 2026/latest library specifications.
- **Project Memory**: Maintain state in `memory.md` and `tasks.md` across subagent hand-offs.
