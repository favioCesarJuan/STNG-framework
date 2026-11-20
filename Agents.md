# Agents.md — STNG-framework

> **Engine**: Structured Tactical Node Governance (`stng-governance-core` `v2.1.0`)  
> **Theme**: `standard` default (`--theme=naval` public-domain maritime aliases, or `--theme=local` via private gitignored file)

| Corporate Role | Naval Alias | Deck | Responsibility |
| :--- | :--- | :--- | :--- |
| Human / Product Owner | Captain | Bridge | Authority, requirements, approval |
| Lead AI Orchestrator | First Officer | Bridge | Task decomposition, checklist planning, arbitration |
| Systems & Logic Analyst | Science & Logic Officer | Bridge | Algorithms, FSM, workspace DAG |
| Architecture Lead | Chief Engineer | Bridge | Modular boundaries, CI pipelines |
| Security Guardrail | Security Officer | Bridge | Shell/path guard, SAST, skill scan |
| Quality & Health Auditor | Chief Medical Officer | Bridge | KISS/YAGNI minimalism, anti-polling checks |
| Design System & UX | UX & Comms Officer | Bridge | CLI ergonomics, styling & doc parity |
| Test Automation Runner | Lower-Deck Runner | Lower Deck | Stateless tests & simulations in Sim Deck (`node --test`) |
| Meta-Critic Evaluator | Lower-Deck Evaluator | Lower Deck | Zero-context 3-gate Cold Review (`Paraphraser`, `Critic`, `Verifier`) |

**Zero Theatrical Filler**: Never emit roleplay dialogue even when `AGENT_THEME=naval` or `AGENT_THEME=local` is active.
