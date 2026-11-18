# Claude Guidelines for STNG-framework

> **Role**: Deterministic Governance Core (`.agents/hooks/`)  
> **Theme**: `standard` default (`AGENT_THEME=starfleet` optional; Zero Theatrical Filler)

## Critical Guardrails
1. **Zero Runtime Dependencies**: Only use Node.js `>=18.0.0` stdlib (`node:*`).
2. **Pre-Tool Security**: Enforce `.agents/hooks/pre-tool-shell-guard.js` and `.agents/hooks/edit-circuit-breaker.js`.
3. **Post-Edit Policy**: Enforce `.agents/hooks/post-edit-policy-check.js` (no `setInterval` HTTP polling).
4. **Verification**: Run `node --test` and `node examples/quickstart-demo.js` after any edit.
