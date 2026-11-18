# Manual Operativo de STNG-framework

## 1. Frontera con ISS-Enterprise
- **STNG-framework** es el motor determinista de runtime: `.agents/hooks/`, `.semgrep.yml`, `scripts/node-runtime-cve-check.js` y la API ESM en `index.js`.
- **ISS-Enterprise** es el CLI de scaffolding y ciclo de vida que detecta stacks e instala estos hooks canónicos en proyectos destino.

## 2. Comandos CLI (`bin/stng.js`)
- `stng init [--theme=standard|starfleet]` — Inicializa gobernanza en el directorio actual.
- `stng guard [--test]` — Ejecuta el guardia de comandos shell y rutas protegidas.
- `stng policy [--test] [archivos...]` — Verifica políticas post-edición (polling, Tailwind, `console.log`).
- `stng scan-skill <ruta>` — Audita skills contra prompt injection y exfiltración.
- `stng audit-stats` — Muestra resumen de `.agents/audit_log.json`.
- `stng cve-check` — Verifica la versión de Node.js contra baselines de seguridad embebidos.
- `stng demo` — Ejecuta la demo rápida.

## 3. Variables de Entorno (`.agents/.env`)
- `AGENT_THEME=standard|starfleet` — Controla etiquetas de hooks y formato de fecha (`ISO-8601` vs `Stardate`).
- `ALLOW_TAILWIND=true|false` — Permite o prohíbe imports de TailwindCSS/NativeWind en `post-edit-policy-check.js`.
