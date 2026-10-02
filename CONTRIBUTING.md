# 🛸 Contributing to STNG-Framework (Starfleet Engineering Protocol)

First of all, welcome aboard the Starship Enterprise! We are thrilled to welcome new officers, engineers, and researchers to the STNG-Framework crew.

STNG-Framework enforces **deterministic AI governance**, strict code hygiene, and token economics for enterprise monorepos. To ensure harmony between organic developers and artificial agents, all contributions must adhere to the directives below.

---

## 📜 1. The Prime Directives

1. **The Ponytail Protocol (Zero Bloat / YAGNI)**:
   - Always climb the simplicity ladder:
     1. YAGNI (Do not build what is not strictly needed).
     2. Re-use existing patterns or helpers.
     3. Prefer Node.js standard libraries (`node:fs`, `node:path`, `node:child_process`).
     4. Leverage native runtime capabilities before introducing external dependencies.
     5. Keep diffs minimal, clean, and reviewable.
2. **Deterministic Governance over Prompt Illusions**:
   - Never replace code with natural language promises. If a behavior is critical (e.g. blocking destructive commands, checking type integrity), it must be enforced by an executable hook (`.agents/hooks/*.js`).
3. **Multi-Model Neutrality**:
   - Ensure all governance scripts and model allocations remain vendor-agnostic (Google Gemini, Anthropic Claude, OpenAI, DeepSeek, and Local Ollama).
4. **Package Manager Recommendation**:
   - We strongly recommend **pnpm** for local development and monorepos (`pnpm test`, `pnpm run shield:test`) to preserve disk space and guarantee immutable hardlinked dependencies.

---

## 🛠️ 2. Development Setup

1. **Clone the Flagship Repository**:
   ```bash
   git clone https://github.com/favioCesarJuan/STNG-framework.git
   cd STNG-framework
   ```

2. **Initialize Environment & Permissions**:
   ```bash
   bash scripts/setup-environment.sh
   ```

3. **Run the Automated Test Suite**:
   ```bash
   # Using pnpm (recommended)
   pnpm test

   # Or using Node.js native test runner directly (Zero dependencies)
   node --test test/**/*.test.js
   ```

---

## 🪝 3. Adding or Modifying Deterministic Hooks

Hooks reside in `.agents/hooks/` and must:
- Use ES Modules (`import ... from 'node:...'`).
- Have **zero runtime dependencies** outside the Node.js standard library.
- Provide a `--test` CLI self-check flag.
- Export functional primitives so they can be unit-tested in `test/hooks.test.js`.
- Be registered with timeout and event type in `.agents/hooks.json`.

---

## 🧪 4. Testing & Pull Request Guidelines

1. **Add Unit Tests**: Any new hook or utility must be covered by `test/hooks.test.js`.
2. **Execute Pre-Commit Verification**:
   ```bash
   pnpm run pre-commit
   # Or: bash scripts/pre-commit.sh
   ```
3. **Commit Messages**: Follow standard semantic commits:
   - `feat(security): add kernel buffer protection to Worf shield`
   - `fix(crusher): allow selective tailwind imports when flag is set`
   - `docs(readme): expand multi-model provider allocation table`

---

## ⚖️ 5. Code of Honor

Every contributor is treated with dignity, honor, and respect, in accordance with the traditions of Starfleet. Q may challenge your PR with timeline chaos tests, but Dr. Crusher and First Officer Riker will ensure safe passage to production.

*Qapla'! Make it so.*
