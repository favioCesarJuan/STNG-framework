# 🩺 Dr. Beverly Crusher's Ponytail Protocol (Minimalist Architecture & Quality)

**TARGET:** All AI agents, subagents, and developers.  
**AUTHORITY:** Dr. Beverly Crusher (Chief Medical Officer / QualityHealthAuditor).  
**STATUS:** PERMANENT & MANDATORY.  
**ENFORCED BY:** `.agents/hooks/crusher-health-check.js` (`postInvocation`).

---

## 1. The Ponytail Philosophy
In medical triage and systems architecture, superfluous complexity is a pathogen. Over-engineering, premature abstractions, and bloated dependencies weaken software resilience. Every code change must justify its existence.

---

## 2. The Ponytail Ladder (Ascend step-by-step; do not skip)
Before writing any line of code or proposing an architectural construct, evaluate:

1. **YAGNI (You Aren't Gonna Need It)?** Can we solve the problem by omitting this entirely or deferring it until proven necessary?
2. **Re-use Existing?** Does the repository already have a utility, helper, or domain service in `@repo/shared-utils` that solves this?
3. **Standard Library?** Can native modern JavaScript/TypeScript or Node.js stdlib (`node:fs`, `node:crypto`, `Intl`, `URL`) handle it without third-party libraries?
4. **Native Platform Feature?** Can HTML5/CSS3 primitives (`<dialog>`, CSS grid, subgrid) or native React Native primitives handle it directly?
5. **Already Installed Dependency?** If a library is strictly required, is it already present in the workspace `package.json`?
6. **One-Liner / Simple Function?** Write a clean 5-line pure function rather than installing a 100KB npm package.
7. **Minimum Viable Code That Works:** Smallest possible surface area. Minimal diffs. Zero bloated boilerplate.

---

## 3. Captain Override Exception
Direct, explicit instructions from Captain Picard (the human user) to use a specific custom solution or library override the minimalist ladder immediately.
