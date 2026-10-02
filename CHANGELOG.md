# 📜 Changelog: STNG-Framework

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-02

### Added
- **Native Automated Test Suite (`node:test`)**: Zero-dependency comprehensive test suite in `test/hooks.test.js` covering Worf Security Shield, Crusher Health Check, Captain's Log, Skill Lifecycle Auditor, and Cascade Evaluator.
- **Continuous Integration (CI)**: Added GitHub Actions workflow (`.github/workflows/ci.yml`) validating tests across Node.js 18.x, 20.x, and 22.x.
- **Multi-Model Provider Matrix**: Expanded `config/models.config.json` with ready-to-use profiles for Google Gemini, Anthropic Claude, OpenAI, DeepSeek, and Local Ollama / vLLM.
- **Adaptive Style Governance**: Enhanced `crusher-health-check.js` to support `ALLOW_TAILWIND=true` for projects with legitimate mixed or Tailwind styling.
- **Community Governance Documentation**: Added comprehensive `CONTRIBUTING.md` and `CHANGELOG.md`.
- **Recommended Package Manager**: Recommended `pnpm` in `package.json` (`packageManager: pnpm@9.15.0`) and added detection in `install.sh` for up to 70% disk savings.

### Changed
- **Hardened Installer (`install.sh`)**: Added automatic backup of existing `.agents` configurations, detection of `pnpm`, and flags (`--no-backup`, `--allow-tailwind`).
- **Resilient Operational Scripts**: Upgraded `scripts/*.sh` to resolve `FRAMEWORK_ROOT` dynamically, allowing execution from any subdirectory in monorepos.
- **Isolated Hook Execution**: Patched hook CLI runners to prevent background execution when imported as modules during unit testing.

---

## [1.0.0] - 2026-09-29

### Added
- **Initial Starfleet Engine**: Hierarchical multi-agent crew with dual corporate mapping (Picard, Riker, Data, Geordi, Worf, Troi, Crusher, Wesley, Q).
- **Deterministic Hooks**: `worf-security-shield.js`, `crusher-health-check.js`, `captains-log-writer.js`, `skill-lifecycle-auditor.js`, `cascade-evaluator.js`.
- **Token Economics (6 Layers)**: Asymmetric 80/20 routing, lazy loading, context quarantine, knowledge graph scoping, circuit breakers, and cognitive language protocol.
- **Consolidated Canonical Skills**: 7 specialized domains in `.agents/skills/`.
- **One-Line Installer**: `install.sh` for fast deployment.
- **Bilingual Documentation**: Complete `README.md` and `README.es.md`.
