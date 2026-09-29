# 🪝 Deterministic Model Hooks Guide

## 1. Overview
In Antigravity and the Gemini CLI ecosystem, Model Hooks are middleware scripts triggered at critical milestones in an agent's lifecycle. Rather than hoping an LLM reads a markdown rule, Hooks provide programmatic enforcement.

---

## 2. Configured Hooks (`.agents/hooks.json`)

### 🛡️ `worf-security-shield.js` (preToolUse)
- **When**: Fires before any shell command (`run_command`, `bash`) or file write (`write_to_file`, `replace_file_content`).
- **Input**: `{ tool: string, args: object }`.
- **Output**: `{ continue: boolean, reason?: string }`.
- **Behavior**: Evaluates commands against dangerous patterns (`rm -rf`, pipe to sh, system directory modifications, SQL drops). Blocks immediately with exit code 1 if violated.

### 🩺 `crusher-health-check.js` (postInvocation)
- **When**: Fires after an agent generates or edits code.
- **Behavior**: Scans touched files for syntax validity, anti-patterns (continuous polling `setInterval`, forbidden Tailwind imports), and runs incremental compiler checks. If fatal issues are found, feeds errors back to the model for automated self-correction before human handover.

### 📜 `captains-log-writer.js` (postInvocation)
- **When**: Fires upon completing agent milestones.
- **Behavior**: Appends structured JSON to `.agents/captains_log.json` and updates the human-readable Markdown view at `.agents/captains_log.md`. Calculates official Stardate timestamps.

### 🔄 `skill-lifecycle-auditor.js` (preSkillInvocation)
- **When**: Fires when updating, downloading, or running third-party skills.
- **Behavior**: Inspects code diffs for prompt injection vectors, credential leaks, and backward compatibility.
