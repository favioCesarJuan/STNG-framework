# Security Policy: STNG-Framework

**STNG-Framework** (*Structured Tactical Node Governance*) prioritizes deterministic security controls, supply chain hygiene, and rapid vulnerability remediation.

---

## Supported Versions

Only the latest release on the `main` branch receives active security updates and vulnerability patches.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0.0 | :x:                |

---

## Reporting a Vulnerability

We encourage responsible disclosure of any security flaws, prompt injection vectors in canonical skills, or command intercept bypasses.

### Preferred Reporting Channel: Private Vulnerability Reporting
Please **DO NOT** open a public GitHub issue for security vulnerabilities. Instead:
1. Navigate to the **[Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new)** tab in this repository.
2. Click **"Report a vulnerability"** to submit a confidential report directly to the maintainer.
3. Include:
   - Detailed description of the vulnerability.
   - Proof of Concept (PoC) or reproducible steps.
   - Affected component (e.g. `pre-tool-shell-guard.js`, `skill-security-scanner.js`, CLI, etc.).
   - Potential impact.

### Response Timeline
- **Initial Acknowledgment**: Within 48 hours.
- **Triage & Remediation Plan**: Within 5 business days.
- **Public Disclosure**: Coordinated following fix deployment.

---

## Active Security Controls
This repository operates with:
- **GitHub Secret Scanning & Push Protection**: Prevents accidental leakage of tokens and API keys.
- **Dependabot Security Alerts & Automated Updates**: Continuous supply chain monitoring.
- **Pre-Tool Shell & Path Guard (`preToolUse`)**: Deterministic interception of destructive commands (`rm -rf /`, piped `curl | bash`, `chmod 777`, protected path writes, path traversal).
- **Semgrep AST Guardrails (`scripts/pre-commit.sh`)**: Deterministic static analysis scanning for continuous polling violations, command injections, and credential leaks via `.semgrep.yml`.
- **Node.js Host Runtime CVE Auditor (`scripts/node-runtime-cve-check.js`)**: Automated platform hygiene inspecting active Node.js versions against LTS CVE baselines offline.
- **Skill Security & Integrity Scanner (`scripts/install-skill.sh`)**: Multi-stage skill auditing guarding against prompt injection overrides and secret exfiltration, with optional NVIDIA SkillSpector integration.
