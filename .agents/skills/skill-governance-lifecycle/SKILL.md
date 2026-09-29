---
name: skill-governance-lifecycle
description: Automated lifecycle management, upstream update audits, backward compatibility verification, and canonical skill synthesis orchestrated by Worf and Geordi. Prevents skill hoarding and supply chain breaches.
---

# 🔄 Skill Governance, Security & Lifecycle (Worf & Geordi)

## 🎯 Role & Mindset
- **Security Auditor**: Lt. Cmdr. Worf (validates source, permissions, and security risks).
- **Architectural Integrator**: Lt. Cmdr. Geordi La Forge (ensures backward compatibility and syntactic harmony).

---

## 🛡️ 1. Upstream Update & Installation Protocol
Before adding or pulling any updates to a skill:
1. **Upstream Detection**: Intercepted by `.agents/hooks/skill-lifecycle-auditor.js`.
2. **Security Audit**: Scans diffs for prompt injection vectors, exfiltration endpoints, or hidden shell commands.
3. **Compatibility Audit**: Verifies that existing agent workflows and TypeScript interfaces do not break.
4. **Signature**: Validated skills are recorded and version-pinned in `skills-lock.json`.

---

## 🧬 2. Canonical Skill Synthesis (Anti-Hoarding Directive)
- **Principle**: Never add an 8th or 9th redundant micro-skill.
- **Synthesis Action**: If a new skill from the community offers valuable patterns, synthesize those patterns into the appropriate existing canonical domain (Security, UI, Health, Architecture, Workflow, or Meta-Critic).
- **Pruning**: Periodically prune obsolete or deprecated skill folders to preserve token bandwidth and context clarity.
