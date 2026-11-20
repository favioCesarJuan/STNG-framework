# Security Guardrail & Supply Chain Protocol

**TARGET:** All AI agents, subagents, and developers.  
**AUTHORITY:** `SecurityGuardrail` (Naval Alias: `Security Officer`).  
**STATUS:** PERMANENT, DETERMINISTIC, NON-NEGOTIABLE.  
**ENFORCED BY:** `.agents/hooks/pre-tool-shell-guard.js` (`preToolUse`) and `scripts/install-skill.sh`.

> Never blindly trust unvetted packages from external registries or piped remote shell commands.

---

## 1. Supply Chain & Dependency Mandate

Any AI agent acting within this repository MUST adhere to the following protocol **before** installing or modifying any external dependency via `npm`, `pnpm`, or `yarn`.

### Protocol Steps:
1. **HOLD EXECUTION**: Do NOT run `pnpm add`, `pnpm update`, or manually modify `package.json` to inject unvetted dependencies.
2. **SECURITY CLEARANCE**: Escalate to `SecurityGuardrail`. Specify package name and exact version.
3. **ACTIVE AUDIT**: Check for recent CVEs, known typosquatting, supply chain attacks via `preinstall`/`postinstall` hooks, and run `pnpm audit`.
4. **INSTALLATION**: ONLY after **STATUS: GREEN** may the installation proceed. If risks or anomalies exist (**STATUS: RED**), abort immediately and notify `Human / Product Owner` (`Captain`).

---

## 2. Skill Installation & Modification Shield

1. **Mandatory Audit Script**: It is strictly forbidden to copy third-party skills directly into `.agents/skills/` without running the security scanner:
   ```bash
   node .agents/hooks/skill-security-scanner.js <target-skill-dir>
   ```
2. **Inspection Criteria**: Scan source files for prompt injection vectors, hidden API key exfiltration hooks, suspicious `curl` payloads, and base64 obfuscation.

---

## 3. Sandboxed Mobile QA & Simulation Containment

- **Emulator Containment**: Any exploratory or chaos testing against mobile emulators must run inside an isolated Simulation Sandbox (`scripts/artemis-sandbox.sh` / ephemeral emulators). Connecting autonomous agents to physical personal devices or live production clusters is strictly prohibited.
- **Security Trials**: Penetration simulations (fuzzing, IDOR validation, boundary testing) are **ONLY** activated upon explicit `Human / Product Owner` authorization in isolated test environments.
