# 🛸 STNG-Framework: Hierarchical Multi-Agent Governance Engine

[![CI: Tests](https://github.com/favioCesarJuan/STNG-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/favioCesarJuan/STNG-framework/actions/workflows/ci.yml)
[![Node: >=18.0.0](https://img.shields.io/badge/Node-%3E%3D18.0.0-green.svg)](https://nodejs.org)
[![Package Manager: pnpm](https://img.shields.io/badge/pnpm-recommended-orange.svg)](https://pnpm.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Antigravity](https://img.shields.io/badge/Runtime-Antigravity%20%7C%20Gemini%20CLI-purple.svg)](https://ai.google.dev)
[![Architecture: Hexagonal](https://img.shields.io/badge/Architecture-Hexagonal%20Monorepo-emerald.svg)](#architecture)
[![Crew: Star Trek TNG](https://img.shields.io/badge/Crew-Star%20Trek%3A%20TNG-gold.svg)](#-the-dual-layer-crew)

> **Deterministic Model Hooks, Knowledge Graph Cascade Scoping, Ponytail Minimalism, and Asymmetric Token Economics for Complex Monorepos (Turborepo, Next.js, Expo, NestJS, Astro).**

---

🌐 **Languages:** **English (Default)** | [Español](README.es.md) | 📖 **[MANUAL.md (Universal Operational Guide)](MANUAL.md)**

---

## ⚡ Why STNG-Framework?

Modern autonomous AI agents (Gemini, Claude, GPT) suffer from **three critical architectural bottlenecks** when deployed in large monorepos:

1. **The "Markdown Illusion" (Non-Determinism)**: Standard agent prompts rely on text files (`rules.md`, system prompts) hoping the LLM will follow instructions. Under context fatigue, LLMs routinely ignore rules (installing unauthorized dependencies, re-introducing continuous polling, or breaking strict CSS guidelines).
2. **Token Bloat & Context Pollution**: Accumulating dozens of ad-hoc skills floods the model's working memory with conflicting instructions, burning millions of tokens while degrading accuracy.
3. **Black-Box Delegation**: When multi-agent cascades fail, there is zero forensically structured audit trail to trace which agent introduced a regression.

### 🚀 The Solution: STNG-Framework
**STNG-Framework** (*Star Trek: The Next Generation Framework*) transforms agentic workflows into **deterministic software engineering**:
- **Executable Model Hooks**: Real Node.js/Bash interceptors (`preToolUse`, `postInvocation`) that physically block dangerous shell commands, lint violations, and compiler errors.
- **The Captain's Log**: An immutable, Stardate-stamped audit ledger recording every inter-agent delegation and health check.
- **Cascade Evaluation Loop**: Queries the project dependency topology (via Knowledge Graph MCP) to trigger medical diagnostics *only* on affected downstream packages.
- **7 Canonical Skills**: Prunes fragmented micro-skills into 7 cohesive, audited domains.
- **Asymmetric 80/20 Token Economics**: Offloads 80% of routine mechanic tasks (tests, linters, log formatting) to **Gemini 3.8 Flash**, preserving **Gemini 3.1 Pro** strictly for high-order architectural reasoning.

---

## 👥 The Dual-Layer Crew

STNG-Framework employs a **Dual-Layer Persona Architecture**. The Star Trek: TNG narrative ensures rich contextual empathy and memorability for open-source collaboration, while mapping 1-to-1 to formal enterprise engineering roles for corporate environments:

```
                       [Captain Jean-Luc Picard]
                     (The Human User / Product Owner)
                                    │
                                    ▼
                     [William T. Riker (Number One)]
                         (Lead AI Orchestrator)
                                    │
       ┌──────────────┬─────────────┼─────────────┬──────────────┐
       ▼              ▼             ▼             ▼              ▼
     [Data]       [Geordi]       [Worf]        [Troi]        [Crusher]
    (Logic)      (Arch/Mentor)  (Security)    (UX/UI)        (Health)
       │              │             │             │              │
       └──────────────┴─────────────┼─────────────┴──────────────┘
                                    ▼
                         [Wesley Crusher (Flash)]
                              (Test Runner)
                                    ▲
                                    │ (External Audit)
                           [Q (The Q Continuum)]
                          (Omniscient Meta-Critic)
```

| Persona (TNG) | Corporate Title | Model | Core Mandate |
| :--- | :--- | :--- | :--- |
| **Captain Jean-Luc Picard** | `The Captain / Product Owner` | **Human (You)** | Supreme requirements, strategic roadmap, and executive approval. |
| **Commander William T. Riker** | `LeadAIOrchestrator` | Gemini 3.1 Pro | Coordinates the crew, plans execution, dispatches subagents, maintains `tasks.md`. |
| **Lt. Cmdr. Data** | `SystemsLogicAnalyst` | Gemini 3.1 Pro | Formal algorithmic modeling, DDD ubiquitous language, finite state machines. |
| **Lt. Cmdr. Geordi La Forge** | `ArchitectureLead` | Gemini 3.1 Pro | Monorepo pipelines, NestJS/Next/Expo/Astro boundaries, technical mentorship. |
| **Lt. Cmdr. Worf** | `SecurityGuardrail` | Gemini 3.1 Pro / Flash | Cybersecurity shields, input sanitization, Semgrep audits, Strix Red Teaming. |
| **Counselor Deanna Troi** | `DesignSystemEnforcer` | Gemini 3.1 Pro / Flash | UX/UI empathy, WCAG AAA accessibility, pure CSS Modules, Apple HIG physics. |
| **Dr. Beverly Crusher** | `QualityHealthAuditor` | Gemini 3.1 Pro / Flash | Code health, Ponytail Protocol (YAGNI/anti-bloat), zero continuous polling. |
| **Ensign Wesley Crusher** | `TestAutomationRunner` | Gemini 3.8 Flash | Repetitive script execution, unit test suites, Maestro mobile E2E flows. |
| **Computer** | `RuntimeEnvironment` | Bash Runtime | Deterministic command outputs, compiler telemetry, process lifecycle. |
| **Q (The Q Continuum)** | `MetaCriticEvaluator` | Gemini 3.1 Pro | Omniscient external evaluation, timeline audits, bias destruction, chaos trials. |

---

## 🪝 Deterministic Model Hooks

Located in `.agents/hooks/` and registered in `.agents/hooks.json`:

1. **🛡️ Worf Security Shield (`worf-security-shield.js`) - `preToolUse`**:
   - Intercepts shell commands before execution.
   - Blocks destructive actions (`rm -rf /`, piping curl to shell, `chmod 777`, direct block writes).
2. **🩺 Dr. Crusher Health Check (`crusher-health-check.js`) - `postInvocation`**:
   - Runs post-edit diagnostics.
   - Enforces Ponytail Minimalism, checks for prohibited continuous polling (`setInterval`), and validates that Tailwind/NativeWind are not imported.
3. **📜 The Captain's Log Writer (`captains-log-writer.js`) - `postInvocation`**:
   - Automatically writes structured JSON audit trails to `.agents/captains_log.json` and renders `.agents/captains_log.md`.
4. **🔄 Skill Lifecycle Auditor (`skill-lifecycle-auditor.js`) - `preSkillInvocation`**:
   - Audits third-party skills for prompt injection, key exfiltration, and backward compatibility before installation.
5. **🌌 Cascade Evaluator (`cascade-evaluator.js`)**:
   - Computes downstream affected packages when shared modules are modified.

---

## 💰 Token Economics & Optimization (The 6 Layers)

1. **Asymmetric 80/20 Routing**: Gemini 3.8 Flash executes 80% of routine mechanics (tests, linters, log parsers); Gemini 3.1 Pro handles high-order reasoning.
2. **Lazy Loading**: Skills are injected strictly on-demand per officer domain.
3. **Context Quarantine**: Heavy multi-turn test/lint loops execute in ephemeral subagents (`invoke_subagent`), returning a clean 5-line summary to the Captain's thread.
4. **Knowledge Graph Scoping**: Feeds only affected code snippets into prompts instead of loading entire files.
5. **Circuit Breakers**: Intercepts failing autocorrection loops after 3 attempts, escalating cleanly to the Captain.
6. **Cognitive Language Protocol (30% to 50% Token Savings)**: Understands and responds in the Captain's native language (e.g. Spanish), while conducting internal Chain-of-Thought, AST parsing, and subagent delegations in **English** to exploit BPE tokenizer compression.

---

---

---

## 🌉 Universal AI Tooling Bridges (Beyond Gemini)

If your environment or team uses an AI coding assistant other than Gemini (or one that doesn't natively read `Agents.md`), STNG-Framework automatically generates targeted instruction bridges:

| File | Target AI Engine / Tool | Purpose |
| :--- | :--- | :--- |
| **[`MANUAL.md`](MANUAL.md)** | **Universal / Human & Any LLM** | Comprehensive master operating manual and rules bridge. |
| **[`CLAUDE.md`](CLAUDE.md)** | **Anthropic Claude Code & Desktop** | Project directives, TDD commands, and First Officer persona. |
| **[`.cursorrules`](.cursorrules)** | **Cursor IDE & Composer** | Persistent code health, Ponytail minimalism, and no-polling rules. |
| **[`.windsurfrules`](.windsurfrules)** | **Windsurf (Cascade)** | Engineering boundaries and Starfleet deterministic guardrails. |
| **[`.copilot-instructions.md`](.copilot-instructions.md)** | **GitHub Copilot** | Inline code generation guidelines and test requirements. |
| **[`rules.md`](rules.md)** | **Local Models / Ollama / Roo Code / Cline** | Standard markdown directives without tooling dependencies. |
| **[`Agents.md`](Agents.md)** | **Gemini CLI / Antigravity** | Starfleet crew hierarchy and deterministic model hooks. |

## 💻 Deterministic Hooks in Action (Code Snippets)

Unlike standard natural language prompts that can be ignored by an LLM under heavy context load, STNG hooks are **executable Node.js gatekeepers**:

### 1. Worf Security Shield (`.agents/hooks/worf-security-shield.js`)
Intercepts shell executions before they reach the OS, blocking destructive actions and forbidden command patterns:
```javascript
export function evaluateSecurity(payload = {}) {
  const { tool = '', args = {} } = payload;
  if (tool === 'run_command' || tool === 'bash') {
    const cmd = args.CommandLine || args.command || '';
    for (const pattern of PROHIBITED_SHELL_PATTERNS) {
      if (pattern.test(cmd)) {
        return {
          allowed: false,
          reason: `🚨 [WORF SECURITY SHIELD ACTIVATED]: Prohibited command pattern detected: "${pattern.source}". Command aborted.`
        };
      }
    }
  }
  return { allowed: true };
}
```

### 2. Dr. Crusher Health Check (`.agents/hooks/crusher-health-check.js`)
Validates clean code, checks for forbidden continuous polling (`setInterval`), and enforces styling hygiene adaptively:
```javascript
export function diagnoseFileContent(filePath, content, options = {}) {
  const issues = [];
  const allowTailwind = options.allowTailwind ?? (process.env.ALLOW_TAILWIND === 'true');

  for (const rule of HEALTH_RULES) {
    if (rule.id === 'NO_TAILWIND_IMPORT' && allowTailwind) continue;
    if (rule.regex.test(content)) {
      issues.push({ ruleId: rule.id, message: rule.message, severity: rule.severity, file: filePath });
    }
  }
  return issues;
}
```

---

## 🤖 Multi-Model Provider Architecture

While tuned for the Gemini Flash/Pro asymmetric ratio by default, STNG-Framework seamlessly supports **any frontier or local model** via `config/models.config.json`:

| Provider | High-Order Reasoning (80% crew) | Fast Economy (Wesley / CI / Linters) | Default Context Budget |
| :--- | :--- | :--- | :--- |
| **Google Gemini** | Gemini 3.1 Pro | Gemini 3.8 Flash | 1,000,000 tokens |
| **Anthropic Claude** | Claude 3.5 / 3.7 Sonnet | Claude 3.5 Haiku | 200,000 tokens |
| **OpenAI** | o1 / o3-mini | GPT-4o-mini | 200,000 tokens |
| **DeepSeek** | DeepSeek-R1 | DeepSeek-V3 | 64,000 tokens |
| **Local Ollama / vLLM** | Qwen 2.5 Coder 72B / 32B | Qwen 2.5 Coder 7B | 32,768 tokens (Quarantine Mode) |

---

## 📂 Repository Layout

```
STNG-framework/
├── .agents/
│   ├── hooks.json                      # Antigravity / Gemini CLI hooks registry
│   ├── hooks/                          # Deterministic hook scripts (Node.js)
│   ├── rules/                          # Canonical engineering directives
│   └── skills/                         # 7 Consolidated canonical skills
│       ├── security-guardrails/        # Worf
│       ├── design-system-and-ui/       # Troi
│       ├── code-health-and-ponytail/   # Crusher
│       ├── fullstack-architecture/     # Geordi
│       ├── workflow-and-coordination/  # Riker & Wesley
│       ├── meta-critic-q/              # Q
│       └── skill-governance-lifecycle/ # Worf & Geordi
├── .mcp/
│   └── mcp-servers.config.json         # Recommended MCP server declarations
├── config/
│   └── models.config.json              # Flash vs. Pro model allocation matrix
├── docs/
│   ├── ARCHITECTURE.md                 # Deep technical architecture
│   ├── HOOKS_GUIDE.md                  # Comprehensive hook documentation
│   └── MIGRATION_GUIDE.md              # Zero-degradation guide for ExtraTime
├── scripts/                            # Operational automation scripts
├── templates/                          # Reusable project contracts (Agents.md, rules.md, etc.)
├── LICENSE                             # MIT License
├── package.json                        # Scripts and metadata
└── README.md                           # Main documentation
```

---

## 📥 Installation & Setup

Choose the installation method suited to your workflow:

### Option A: One-Line Installer (Recommended for Existing Repositories)
To adopt STNG-Framework into an existing project or monorepo, run this command in your repository root:
```bash
curl -fsSL https://raw.githubusercontent.com/favioCesarJuan/STNG-framework/main/install.sh | bash
```
*This installs `.agents/hooks/`, `.agents/rules/`, the 7 canonical skills in `.agents/skills/`, and operational scripts.*

### Option B: Clone as a Fresh Starter Kit
To bootstrap a new project with the framework pre-configured:
```bash
# Clone the repository
git clone https://github.com/favioCesarJuan/STNG-framework.git my-enterprise-project
cd my-enterprise-project

# Initialize scripts and permissions
bash scripts/setup-environment.sh
```

### Option C: Manual Drop-In
If you prefer explicit control:
```bash
git clone --depth 1 https://github.com/favioCesarJuan/STNG-framework.git /tmp/stng
cp -r /tmp/stng/.agents ./
cp -r /tmp/stng/scripts ./
cp /tmp/stng/templates/Agents.md ./
cp /tmp/stng/templates/rules.md ./
rm -rf /tmp/stng
chmod +x scripts/*.sh .agents/hooks/*.js
```

---

## 🚀 Quick Start & Verification

### 1. Run Automated Test Suite (Native node:test)
```bash
# Run the complete test suite (Zero dependencies required)
pnpm test
# Or: node --test test/**/*.test.js
```

### 2. Test Individual Hooks
```bash
# Verify Worf Tactical Security Shield
pnpm run shield:test

# Verify Dr. Crusher Health Diagnostic
pnpm run health:check --test

# Verify Captain's Log Ledger
pnpm run log:view
```

### 2. Run Pre-Commit Validation
```bash
pnpm run pre-commit
```

### 3. Audit a New Skill Before Installing
```bash
pnpm run skills:audit <path-or-repo-url>
```

---

## 🗺️ Roadmap & Phase 2

- [x] **Phase 1 (Current)**: Foundation engine tailored for enterprise monorepos (full zero-degradation parity with ExtraTime).
- [ ] **Phase 2 (Upcoming)**: Universal Scaffolding CLI (`npx @stng/cli init`) that interviews developers on their stack (Next, Remix, Go, FastAPI, Flutter) and generates a tailored Star Trek or Corporate crew with deterministic hooks.

---

## 📜 License
Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

Developed with honor by **Favio Cesar Juan** & The Enterprise Crew.
