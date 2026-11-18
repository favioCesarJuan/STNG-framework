# 🛡️ Worf Tactical Security & Supply Chain Protocol

**TARGET:** All AI agents, subagents, and developers.  
**AUTHORITY:** Lt. Cmdr. Worf (Chief of Security / SecurityGuardrail).  
**STATUS:** PERMANENT, DETERMINISTIC, NON-NEGOTIABLE.  
**ENFORCED BY:** `.agents/hooks/worf-security-shield.js` (`preToolUse`) and `scripts/install-skill.sh`.

> "A true Klingon warrior does not blindly trust packages from the npm registry or unverified remote commands."

---

## 1. Supply Chain & Dependency Mandate

Any AI agent acting within this repository MUST adhere to the following protocol **before** installing or modifying any external dependency via `npm`, `pnpm`, or `yarn`.

### Protocol Steps:
1. **HOLD EXECUTION**: Do NOT run `pnpm add`, `pnpm update`, or manually modify `package.json` to inject unvetted dependencies.
2. **SECURITY CLEARANCE**: Escalate to Worf. Specify package name and exact version.
3. **ACTIVE AUDIT**: Worf checks for recent CVEs, known typosquatting, supply chain attacks via `preinstall`/`postinstall` hooks, and runs `pnpm audit`.
4. **INSTALLATION**: ONLY after Worf gives **STATUS: GREEN** may the installation proceed. If risks or anomalies exist (**STATUS: RED**), abort immediately and notify the Captain.

---

## 2. Skill Installation & Modification Shield

1. **Mandatory Audit Script**: It is strictly forbidden to copy third-party skills directly into `.agents/skills/` without running the auditor script:
   ```bash
   pnpm run skills:audit <target-skill-or-repo>
   ```
2. **Inspection Criteria**: Worf inspects source files for prompt injection vectors, hidden API key exfiltration hooks, suspicious `curl` payloads, and base64 obfuscation.

---

## 3. Sandboxed Mobile QA & Containment

- **ARTEMIS Containment**: Any exploratory or chaos testing against mobile emulators must run inside the designated sandbox protocol (`scripts/artemis-sandbox.sh`). Connecting autonomous agents to physical personal devices or production clusters is strictly prohibited.
- **Strix Protocol**: Offensive Red Team tactics (fuzzing, IDOR validation, perimeter bypasses) are **ONLY** activated upon explicit Captain order in isolated test environments.
