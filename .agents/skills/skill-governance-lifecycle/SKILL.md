---
name: skill-governance-lifecycle
description: Automated lifecycle management, upstream update audits, backward compatibility verification, and canonical skill synthesis orchestrated by SecurityGuardrail and ArchitectureLead. Prevents skill hoarding and supply chain breaches.
---

# Skill Governance, Security & Lifecycle

## Role & Directive
- **Security Auditor**: `SecurityGuardrail` (Naval Alias: `Security Officer`) — validates source, permissions, and security risks.
- **Architectural Integrator**: `ArchitectureLead` (Naval Alias: `Chief Engineer`) — ensures backward compatibility and syntactic harmony.

---

## 1. Upstream Update & Installation Protocol
Before adding or pulling any updates to a skill:
1. **Upstream Detection**: Intercepted by `.agents/hooks/skill-security-scanner.js` and `scripts/install-skill.sh`.
2. **Security Audit**: Scans diffs for prompt injection vectors, exfiltration endpoints, or hidden shell commands.
3. **Compatibility Audit**: Verifies that existing agent workflows and public interfaces do not break.
4. **Signature**: Validated skills are recorded and version-pinned in `skills-lock.json`.

---

## 2. Canonical Skill Synthesis (Anti-Hoarding Directive)
- **Principle**: Never add redundant micro-skills outside the canonical domains.
- **Synthesis Action**: If a community skill offers valuable patterns, synthesize those patterns into the appropriate existing canonical domain (Security, UI, Health, Architecture, Workflow, or Adversarial Meta-Review).
- **Pruning**: Periodically prune obsolete or deprecated skill folders to preserve token bandwidth and context clarity.
