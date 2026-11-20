# Contributing to STNG-Framework (*Structured Tactical Node Governance*)

Welcome! We appreciate contributions from engineers and researchers improving **deterministic AI governance**, code hygiene, and token economics for monorepos.

---

## 1. Core Directives

1. **KISS & YAGNI Minimalism**:
   - Always climb the simplicity ladder:
     1. Clarify requirements and keep flows direct (`KISS`).
     2. `YAGNI` (Do not build what is not strictly needed).
     3. Re-use existing patterns or helpers.
     4. Prefer Node.js standard libraries (`node:fs`, `node:path`, `node:child_process`).
     5. Keep diffs minimal, modular, with explicit failure handling.
2. **Deterministic Governance over Prompt Promises**:
   - Critical invariants (blocking destructive commands, polling detection, KISS heuristics, path checks) belong in executable hooks (`.agents/hooks/*.js`).
3. **Multi-Model Neutrality & Public-Domain Themes**:
   - Keep model allocations vendor-agnostic (Google Gemini, Anthropic Claude, OpenAI, DeepSeek, Ollama) and ensure all committed files remain free of third-party trademarks.
4. **Package Manager Recommendation**:
   - Use **pnpm** (`pnpm test`, `pnpm run guard:shell`) for local development and monorepo hardlink efficiency.

---

## 2. Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/favioCesarJuan/STNG-framework.git
   cd STNG-framework
   ```

2. **Initialize Environment & Permissions**:
   ```bash
   bash scripts/setup-environment.sh
   ```

3. **Run Type Safety & Automated Test Suite (Simulation Sandbox)**:
   ```bash
   pnpm test
   # Optional strict TypeScript check (requires devDependencies via pnpm install):
   pnpm run typecheck
   # Or run tests directly with Node.js (zero dependencies):
   node --test
   ```
   > **Invariant:** Keep `"dependencies"` empty (`0` external runtime dependencies). `typescript` and `@types/node` belong strictly in `devDependencies`.

---

## 3. Adding or Modifying Deterministic Hooks

Hooks reside in `.agents/hooks/` and must:
- Use ES Modules (`import ... from 'node:...'`).
- Have **zero runtime dependencies** outside the Node.js standard library.
- Resolve labels via `.agents/hooks/theme-loader.js`.
- Provide a `--test` CLI self-check flag.
- Export functional primitives tested in `test/hooks.test.js`.
- Stay byte-for-byte synchronized with `ISS-Enterprise/.agents/hooks/`.

---

## 4. Testing & Pull Request Guidelines

1. **Add Unit Tests**: Cover every new hook or heuristic in `test/hooks.test.js`.
2. **Execute Pre-Commit Verification**:
   ```bash
   pnpm run pre-commit
   # Or: bash scripts/pre-commit.sh
   ```
3. **Commit Messages**: Follow semantic commits:
   - `feat(security): add path traversal normalization to pre-tool shell guard`
   - `fix(policy): strip string literals before polling heuristic scan`
   - `docs(readme): document Bridge / Lower Deck / Sim Deck theme model`

---

## 5. Community Standard
Every contributor is treated with professionalism and respect. Let automated Cold Reviews (`Lower-Deck Evaluator`), deterministic hooks, and Simulation Sandbox tests keep every PR clean and verifiable.
