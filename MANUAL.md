# STNG-framework Operational Manual

## 1. Boundary with ISS-Enterprise
- **STNG-framework** is the deterministic runtime core: `.agents/hooks/`, `.semgrep.yml`, `scripts/node-runtime-cve-check.js`, and programmatic ESM exports in `index.js`.
- **ISS-Enterprise** is the scaffolding and lifecycle CLI that detects project stacks and installs these canonical hooks into target repositories.

## 2. Programmatic API (`index.js`)
```js
import {
  evaluateSecurity,
  evaluateCircuit,
  checkFilePolicy,
  appendAuditLog,
  scanSkillSecurity,
  verifySkillIntegrity,
  calculateAffectedNodes
} from 'stng-framework';
```

## 3. CLI Reference (`bin/stng.js`)
- `stng init [--theme=standard|starfleet]` — Initialize governance in the current directory.
- `stng guard [--test]` — Run pre-tool shell & path guard.
- `stng policy [--test] [files...]` — Run post-edit policy check.
- `stng scan-skill <path>` — Scan a skill directory or `SKILL.md` for prompt injection/exfiltration.
- `stng audit-stats` — Summarize `.agents/audit_log.json` (with fallback to legacy `captains_log.json`).
- `stng cve-check` — Check Node.js runtime against embedded security baselines.
- `stng demo` — Run the 30-second quickstart demo.

## 4. Environment Flags (`.agents/.env`)
- `AGENT_THEME=standard|starfleet` — Controls runtime log labels and timestamp formatting (`ISO-8601` vs `Stardate`).
- `ALLOW_TAILWIND=true|false` — Permits or blocks TailwindCSS/NativeWind imports in `post-edit-policy-check.js`.
