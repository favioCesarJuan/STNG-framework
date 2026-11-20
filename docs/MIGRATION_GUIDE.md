# Zero-Degradation Migration Guide

This document guides the transition of an existing repository to the clean, deterministic governance architecture of `STNG-framework` (*Structured Tactical Node Governance*).

---

## Step 1: Create an Immutable Backup
Before modifying `.agents` in the target repository, archive the existing directory:
```bash
cp -r .agents .agents.backup
```

---

## Step 2: Deploy Deterministic Model Hooks
Copy the tested hooks and configuration:
```bash
cp /home/favio/Mis-proyectos/STNG-framework/.agents/hooks.json .agents/
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/hooks .agents/
```

---

## Step 3: Replace Fragmented Skills with Canonical Domains
Consolidate scattered skills into canonical domains (`adversarial-meta-review`, `code-health-and-minimalism`, `design-system-and-ui`, `fullstack-architecture`, `security-guardrails`, `skill-governance-lifecycle`, `workflow-and-coordination`):
```bash
rm -rf .agents/skills/*
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/skills/* .agents/skills/
```

---

## Step 4: Synchronize Canonical Rules & `Agents.md`
Update the operational protocol:
```bash
cp /home/favio/Mis-proyectos/STNG-framework/templates/Agents.md ./Agents.md
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/rules/* .agents/rules/
```
*(Note: Preserve existing `memory.md`, `tasks.md`, and `architecture.md` if they hold domain invariants).*

---

## Step 5: Verification & Diagnostics (Simulation Sandbox)
Run the pre-commit validation and policy self-checks:
```bash
bash scripts/pre-commit.sh
node .agents/hooks/pre-tool-shell-guard.js --test
node .agents/hooks/post-edit-policy-check.js --test
```
The repository is now protected with deterministic guardrails, Lower-Deck Cold Review rubrics, and zero runtime dependencies.
