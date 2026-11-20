# Claude Guidelines for STNG-framework

> **Role**: Structured Tactical Node Governance (`.agents/hooks/`)  
> **Theme**: `standard` default (`AGENT_THEME=naval|local` optional; Zero Theatrical Filler)

## Critical Guardrails
1. **Zero Runtime Dependencies**: Only use Node.js `>=18.0.0` stdlib (`node:*`).
2. **Pre-Tool Security**: Enforce `.agents/hooks/pre-tool-shell-guard.js` and `.agents/hooks/edit-circuit-breaker.js`.
3. **Post-Edit Policy**: Enforce `.agents/hooks/post-edit-policy-check.js` (no `setInterval` HTTP polling + KISS complexity heuristics).
4. **Lower-Deck Cold Review & Sim Sandbox**: Run 3-gate Zero-Context Cold Review on Vital Logic specs (`Lower-Deck Evaluator`) and execute tests (`node --test`) + demos (`node examples/quickstart-demo.js`) cleanly.
