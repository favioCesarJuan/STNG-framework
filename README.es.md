# STNG-framework (Núcleo Determinista de Gobernanza)

> **Motor Core para Agentes de Código IA** — Hooks deterministas pre-tool y post-edit, circuit-breaker de ediciones, escáner de seguridad de skills, registro de auditoría y alcance en cascada para monorepos. Cero dependencias de runtime externas (solo Node.js `>=18.0.0`).

Para scaffolding multi-stack, detección de arquetipos, asistente interactivo y auditoría de deriva (`doctor`), utilizá el repositorio CLI compañero: **ISS-Enterprise**.

---

## Demo Reproducible en 30 Segundos

Ejecutá la demo reproducible en menos de 1 segundo sin dependencias externas:

```bash
node examples/quickstart-demo.js
# O con alias opcionales de Starfleet (0 tokens extra de salida):
node examples/quickstart-demo.js --theme=starfleet
```

Ejecutá la suite de tests unitarios (27 tests):

```bash
node --test
```

---

## Tema Opcional Starfleet (`--theme=starfleet`)

Por defecto, todos los archivos, hooks, logs y salidas de CLI usan **nomenclatura funcional estándar** (`theme: "standard"`).
Si deseás activar los alias de Star Trek: TNG, usá `--theme=starfleet` o configurá `AGENT_THEME=starfleet` en `.agents/.env`.

**Impacto en Tokens:** `0` tokens extra de salida gracias a la regla `Zero Theatrical Filler`.

| Rol Estándar | Alias Starfleet (Opcional) | Tarea en el Proyecto |
| :--- | :--- | :--- |
| Human / Product Owner | Captain Jean-Luc Picard | Autoridad del proyecto, requisitos y aprobación |
| Lead AI Orchestrator | Cmdr. William T. Riker | Descomposición de tareas y coordinación |
| Systems & Logic Analyst | Lt. Cmdr. Data | Algoritmos, máquinas de estado, DAG de workspace |
| Architecture Lead | Lt. Cmdr. Geordi La Forge | Límites de monorepo, pipelines de build y CI |
| Security Guardrail | Lt. Cmdr. Worf / Lt. Tasha Yar | Escudo pre-tool, Semgrep SAST, escaneo de skills |
| Quality & Health Auditor | Dr. Beverly Crusher | Revisión post-edit, minimalismo YAGNI, anti-polling |
| Design System & UX | Counselor Deanna Troi | Ergonomía CLI, accesibilidad WCAG, estilos |
| Test Automation Runner | Ensign Wesley Crusher | Ejecución rápida de tests y linters |
| Meta-Critic Evaluator | Q | Revisión adversarial de bordes y paridad doc-código |
