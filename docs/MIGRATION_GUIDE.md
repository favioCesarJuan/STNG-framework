# 🔄 Zero-Degradation Migration Guide: ExtraTime to STNG-Framework

This document guides the seamless transition of the multi-agent governance system in `/home/favio/Mis-proyectos/extra-time` to the clean, deterministic architecture of `STNG-framework`.

---

## 🛡️ Step 1: Create an Immutable Backup
Before modifying any files in `extra-time`, archive the existing `.agents` directory:
```bash
cd /home/favio/Mis-proyectos/extra-time
cp -r .agents .agents.backup
```

---

## 📦 Step 2: Deploy Deterministic Model Hooks
Copy the tested hooks and configuration:
```bash
cp /home/favio/Mis-proyectos/STNG-framework/.agents/hooks.json .agents/
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/hooks .agents/
```

---

## 🧹 Step 3: Replace Fragmented Skills with the 7 Canonical Domains
Replace the 58 scattered subfolders with the consolidated suite:
```bash
rm -rf .agents/skills/*
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/skills/* .agents/skills/
```

---

## 📐 Step 4: Synchronize Canonical Rules & Agents.md
Update the operational protocol:
```bash
cp /home/favio/Mis-proyectos/STNG-framework/templates/Agents.md ./Agents.md
cp -r /home/favio/Mis-proyectos/STNG-framework/.agents/rules/* .agents/rules/
```
*(Note: Keep your existing `memory.md`, `tasks.md`, and `architecture.md` intact; they hold your domain invariants).*

---

## ✅ Step 5: Verification & Diagnostics
Run Worf's pre-commit validation and doctor check:
```bash
bash scripts/pre-commit.sh
node .agents/hooks/crusher-health-check.js
```
The Enterprise is now fully operational with deterministic guardrails and zero context degradation.
