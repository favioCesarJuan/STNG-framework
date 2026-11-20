# Minimalist Architecture & Quality Protocol (KISS + YAGNI)

**TARGET:** All AI agents, subagents, and developers.  
**AUTHORITY:** `QualityHealthAuditor` (Naval Alias: `Chief Medical Officer`).  
**STATUS:** PERMANENT & MANDATORY.  
**ENFORCED BY:** `.agents/hooks/post-edit-policy-check.js` (`postInvocation`) and `.agents/rules/kiss-simplicity-protocol.md`.

---

## 1. The Minimalist & KISS Philosophy
In production triage and systems architecture, superfluous complexity is a pathogen. Over-engineering, premature abstractions, silent failure paths, and bloated dependencies weaken software resilience and security. Every line and dependency must justify its value (KISS + YAGNI + DRY + SOLID).

---

## 2. The Minimalist & KISS Ladder (Ascend step-by-step; do not skip)
Before writing any line of code or proposing an architectural construct, evaluate:

0. **Clarify & KISS First?** Can the problem, happy path, and expected errors be explained in a few sentences without premature abstractions?
1. **YAGNI (You Aren't Gonna Need It)?** Can we solve the problem by omitting this entirely or deferring it until proven necessary?
2. **Re-use Existing?** Does the repository already have a utility, helper, or domain service in `@repo/shared-utils` that solves this?
3. **Standard Library?** Can native modern JavaScript/TypeScript or Node.js stdlib (`node:fs`, `node:crypto`, `Intl`, `URL`) handle it without third-party libraries?
4. **Native Platform Feature?** Can HTML5/CSS3 primitives (`<dialog>`, CSS grid, subgrid) or native React Native primitives handle it directly?
5. **Already Installed Dependency?** If a library is strictly required, is it already present in the workspace `package.json`?
6. **One-Liner / Simple Function?** Write a clean 5-line pure function rather than installing a 100KB npm package.
7. **Minimum Viable Code That Works:** Smallest possible surface area. Minimal diffs. Zero bloated boilerplate.

---

## 3. Product Owner Override Exception
Direct, explicit instructions from `Human / Product Owner` (`Captain`) to use a specific custom solution or library override the minimalist ladder immediately.
