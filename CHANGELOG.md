# Changelog: STNG-Framework

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-11-20

### Added
- **Zero-Build TypeScript Verification (`tsconfig.json`, `types/index.d.ts`, JSDoc `strict: true`)**: Added strict `tsc --noEmit` static checking (`checkJs: true`, `allowJs: true`) across all 14 JS modules while keeping `.agents/hooks/*.js` JSDoc self-contained and maintaining `0` external runtime dependencies.
- **CI & Pre-Commit Integration**: Added a dedicated `typecheck` job in `.github/workflows/ci.yml` and conditional `tsc --noEmit` checking in `scripts/pre-commit.sh`.

### Fixed
- **Consulted Updater Hardening (`scripts/framework-updater.js`, `bin/stng.js`)**: Excluded `node_modules/`, `.git/`, and `.agents.backup.*` during local quarantine staging, stripped shell `#` comment lines in Gate 1 scans to prevent false positives on documentation comments, added `--source=` forwarding in `bin/stng.js`, and added optional target directory support for direct CLI runs.

---

## [2.0.0] - 2026-11-19

### Added
- **Public-Domain Dual Themes + Private Local Theme Loader (`.agents/hooks/theme-loader.js`)**: Standardized `standard` (corporate technical), `naval` (public-domain Bridge / Lower Deck / Sim Deck), and `local` (`AGENT_THEME=local` / `--theme=local` loading untracked local JSON overrides outside Git).
- **Zero-Context Cold Review & SDD Workflow**: Added stateless Lower-Deck 3-gate Cold Review (`Paraphraser`, `Critic`, `Verifier`), `templates/spec.md`, and `SPEC_AUDIT_EVENTS` in `.agents/hooks/audit-log-writer.js`.
- **KISS Simplicity Protocol & Heuristics**: Added `evaluateKissHeuristics` (`KISS_DEEP_NESTING`, `KISS_EXCESSIVE_PARAMS`, `KISS_LONG_FUNCTION`, `KISS_EXCESSIVE_FILE_LENGTH`, `KISS_SWALLOWED_ERROR`) to `.agents/hooks/post-edit-policy-check.js` and `.agents/rules/kiss-simplicity-protocol.md`.
- **Hardened CLI & Guards**: Added `scan-skill`, `cve-check`, and `theme` subcommands to `bin/stng.js`; replaced shell interpolations with `execFileSync`; added path traversal checks and `strict`/`fast-track` rigidity modes to `pre-tool-shell-guard.js`.

---

## [1.2.1] - 2026-10-29

### Added
- **Semgrep Static AST Guardrails**: Added `.semgrep.yml` enforcing clean architecture rules (banning continuous `setInterval` polling, enforcing `node:` imports, blocking unsafe `child_process.exec` and credential leaks).
- **Node.js Runtime CVE Auditor (`scripts/node-runtime-cve-check.js`)**: Deterministic host runtime vulnerability scanner checking Node.js LTS CVE baselines offline.
- **Skill Security Scanner**: Multi-stage skill security auditing in `scripts/install-skill.sh` and `.agents/hooks/skill-security-scanner.js` (with optional NVIDIA SkillSpector CLI integration).
- **Pre-Commit & CI Automation**: Integrated Semgrep AST analysis and Node.js runtime CVE validation into `scripts/pre-commit.sh` and `.github/workflows/ci.yml`.

---

## [1.2.0] - 2026-10-07

### Added
- **Repository Security Hardening**: Documented coordinated vulnerability disclosure in `SECURITY.md` and added static analysis workflows.
- **Universal Operating Manual (`MANUAL.md`)**: Master operational guide for human developers and supported AI tools.
- **Cross-Platform AI Bridges**: Generated instruction contracts for Anthropic Claude (`CLAUDE.md`), Cursor IDE (`.cursorrules`), Windsurf (`.windsurfrules`), GitHub Copilot (`.copilot-instructions.md`), and local models (`rules.md`).
- **Unified STNG CLI (`bin/stng.js`)**: Introduced `stng init` configuring hooks, models, and bridges in a single step with zero external dependencies.

---

## [1.1.0] - 2026-10-02

### Added
- **Native Automated Test Suite (`node:test`)**: Zero-dependency test suite in `test/hooks.test.js`.
- **Continuous Integration (CI)**: GitHub Actions workflow (`.github/workflows/ci.yml`) validating Node.js 18, 20, and 22.
- **Multi-Model Provider Matrix**: Expanded `config/models.config.json` and `config/providers.json` with profiles for Gemini, Claude, OpenAI, DeepSeek, and Local Ollama / vLLM.
- **Adaptive Style Governance**: Enhanced `post-edit-policy-check.js` to support `ALLOW_TAILWIND=true`.
- **Recommended Package Manager**: Recommended `pnpm` in `package.json` and `install.sh`.

---

## [1.0.0] - 2026-09-29

### Added
- **Initial Governance Engine**: Multi-agent role taxonomy with 9 specialized roles across orchestration, logic, architecture, security, UX, quality, test execution, and adversarial meta-review.
- **Deterministic Hooks**: `pre-tool-shell-guard.js`, `post-edit-policy-check.js`, `edit-circuit-breaker.js`, `audit-log-writer.js`, `skill-security-scanner.js`, and `monorepo-cascade-scope.js`.
- **Token Economics & Canonical Skills**: Consolidated skill domains in `.agents/skills/` and English reasoning core protocol.
