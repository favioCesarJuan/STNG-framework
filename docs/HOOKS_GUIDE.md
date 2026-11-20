# Deterministic Model Hooks Guide

## 1. Overview
In modern AI agent runtimes, **Model Hooks** are executable zero-dependency scripts triggered at critical lifecycle boundaries. Rather than relying solely on markdown suggestions, hooks enforce security, auditability, KISS simplicity, and policy compliance programmatically.

---

## 2. Configured Hooks & Utilities (`.agents/hooks/`)

### `theme-loader.js` (Shared Theme & Zone Resolver)
- Resolves `standard` (`[SECURITY GUARD]`, `Simulation Sandbox`), public-domain `naval` (`[SECURITY OFFICER]`, `Bridge`, `Lower Deck`, `Sim Deck`, `Mission YYYY.DDD`), or untracked `local` theme overrides (`AGENT_THEME=local` / `AGENT_THEME_FILE`).
- Local lookup chain:
  1. `AGENT_THEME_FILE` (env or `.agents/.env`)
  2. `<projectRoot>/.agents/theme.local.json`
  3. `<projectRoot>/.agent-theme.local.json` (plus up to 3 ancestor workspace directories)
  4. `~/.config/agent-governance/theme.local.json`

### `pre-tool-shell-guard.js` (`preToolUse`)
- **When**: Fires before shell commands (`run_command`, `bash`, `execute_command`) or file edits (`write_to_file`, `write_file`, `edit_file`, `patch_file`, `replace_file_content`, `multi_replace_file_content`).
- **Input**: `{ tool: string, args: object }` (malformed JSON fails closed with exit code 1).
- **Output**: `{ continue: boolean, reason?: string, warning?: string }`.
- **Behavior**: Normalizes paths against traversal (`/tmp/../etc/shadow`) and evaluates commands across `SHIELD_RIGIDITY` modes:
  - `standard`: Blocks destructive commands (`rm -rf /`, `rm -fr /`, `curl | bash`, `chmod 777`, `DROP DATABASE`, protected system paths).
  - `strict`: Adds blocks on `git push --force` / `--force-with-lease` and `git reset --hard`.
  - `fast-track`: Downgrades blocks to advisory `warning` responses.

### `edit-circuit-breaker.js` (`preToolUse`)
- **When**: Fires before file edit tools.
- **Behavior**: Tracks per-file modification frequency within a 10-minute sliding window in `.agents/.circuit_state.json` and halts runaway edit loops (>5 edits).

### `post-edit-policy-check.js` (`postInvocation`)
- **When**: Fires after an agent generates or edits code.
- **Behavior**:
  - Strips comments and string/template literals before code-pattern analysis; exempts CLI/script directories from `NO_RAW_CONSOLE_LOG_PRODUCTION`.
  - Flags `NO_CONTINUOUS_POLLING` (`setInterval` HTTP loops, `ERROR`), `NO_TAILWIND_IMPORT` (`ERROR` unless `ALLOW_TAILWIND=true`), and `NO_RAW_CONSOLE_LOG_PRODUCTION` (`WARNING`). Under `SHIELD_RIGIDITY=fast-track`, `ERROR` severity downgrades to `WARNING`.
  - Runs `evaluateKissHeuristics` (`WARNING`s): `KISS_EXCESSIVE_FILE_LENGTH` (`>400` non-empty lines), `KISS_DEEP_NESTING` (`>4`), `KISS_EXCESSIVE_PARAMS` (`>5`), `KISS_LONG_FUNCTION` (`>80` lines), and `KISS_SWALLOWED_ERROR` (undocumented empty `catch {}`).

### `audit-log-writer.js` (`postInvocation`)
- **When**: Fires upon completing milestones or SDD Cold Review checkpoints (`SPEC_AUDIT_EVENTS`: `spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`).
- **Behavior**: Appends structured JSON (`specMeta`, `missionClock`) to `.agents/audit_log.json` and Markdown transcripts to `.agents/audit_log.md`.

### `skill-security-scanner.js` (`preSkillInvocation`)
- **When**: Fires when auditing, installing, or invoking skills.
- **Behavior**: Inspects skill files for prompt injection overrides, credential harvesting, guardrail bypasses, and C2 exfiltration (`SUSPICIOUS_PATTERNS`), delegating to optional `skillspector` CLI when available (`>= 85` score threshold).

### `monorepo-cascade-scope.js`
- **Behavior**: Discovers workspace package dependencies from `package.json` DAG to calculate downstream impacted apps cleanly.
