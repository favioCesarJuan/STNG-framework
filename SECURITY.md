# 🛡️ Security Policy: STNG-Framework

The Starfleet Command and Tactical Security division (commanded by Lt. Cmdr. Worf) takes code health, integrity, and vulnerability management seriously.

---

## 🔒 Supported Versions

Only the latest release on the `main` branch receives active security updates and tactical vulnerability patches.

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | :white_check_mark: |
| < 1.2.0 | :x:                |

---

## 🚨 Reporting a Vulnerability

We encourage responsible disclosure of any security flaws, prompt injection vectors in canonical skills, or command intercept bypasses.

### Preferred Reporting Channel: Private Vulnerability Reporting
Please **DO NOT** open a public GitHub issue for security vulnerabilities. Instead:
1. Navigate to the **[Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new)** tab in this repository.
2. Click **"Report a vulnerability"** to submit an encrypted, confidential report directly to the maintainer.
3. Include:
   - Detailed description of the vulnerability.
   - Proof of Concept (PoC) or reproducible steps.
   - Affected component (e.g. `worf-security-shield.js`, `skill-lifecycle-auditor.js`, CLI, etc.).
   - Potential impact.

### Response Timeline
- **Initial Acknowledgment**: Within 48 hours.
- **Triage & Remediation Plan**: Within 5 business days.
- **Public Disclosure**: Coordinated following fix deployment.

---

## ⚔️ Starfleet Tactical Defenses Active
This repository operates with:
- **GitHub Secret Scanning & Push Protection**: Prevents accidental leakage of tokens and API keys.
- **Dependabot Security Alerts & Automated Updates**: Continuous supply chain monitoring.
- **CodeQL Static Analysis**: Automated AST semantic scanning on pull requests and commits.
- **Worf Tactical Security Shield (`preToolUse`)**: Deterministic protection against destructive command patterns.
