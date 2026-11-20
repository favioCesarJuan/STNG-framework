# STNG-framework (*Structured Tactical Node Governance*)

> **Núcleo Determinista de Runtime para Agentes de Código IA** — Guardrails pre-tool de shell y rutas, circuit-breaker de ediciones, chequeos post-edit con heurísticas KISS, Zero-Context Cold Review (`Lower Deck`), ledger de auditoría inmutable, escáner de seguridad de skills y alcance en cascada para monorepos. Cero dependencias de runtime externas (solo `Node.js >= 18.0.0`).

Para descubrimiento interactivo de proyecto, scaffolding multi-stack, orquestación de flotas heterogéneas y auditoría de deriva (`iss doctor`), utilizá el CLI compañero: **ISS-Enterprise** (*Intelligent Stack Scaffolding for Enterprise*).

---

## Demo Reproducible en 30 Segundos (Simulation Sandbox)

Ejecutá la demo reproducible en menos de 1 segundo sin dependencias externas:

```bash
node examples/quickstart-demo.js
# Tema naval de dominio público (Bridge / Lower Deck / Sim Deck):
node examples/quickstart-demo.js --theme=naval
# Tema local privado resuelto dinámicamente desde JSON no trackeado fuera de Git:
node examples/quickstart-demo.js --theme=local
```

Ejecutá la suite completa de tests unitarios nativos (y verificación estática TypeScript opcional):

```bash
node --test
pnpm run typecheck   # Verificación estricta tsc --noEmit vía JSDoc + types/index.d.ts
```

---

## Arquitectura: Bridge vs. Lower Deck vs. Simulation Sandbox

- **Bridge (`BRIDGE`)**: Roles de gobernanza de contexto largo (`Human / Product Owner`, `Lead AI Orchestrator`, `Systems & Logic Analyst`, `Architecture Lead`, `Security Guardrail`, `UX & Comms`, `Quality & Health Auditor`).
- **Lower Deck (`LOWER_DECK`)**: Subagentes efímeros sin estado ni historial previo que previenen sesgos de confirmación y saturación del contexto principal:
  - **Lower-Deck Evaluator (`meta-critic-evaluator`)**: Pipeline Zero-Context Cold Review en 3 compuertas (`Paraphraser` -> `Critic` -> `Verifier`) sobre specs SDD (`templates/spec.md`).
  - **Lower-Deck Runner (`test-automation-runner`)**: Ejecutor rápido de pruebas unitarias, linters y simulaciones en seco.
- **Simulation Sandbox (`simBay`)**: Zona de ejecución aislada (`Simulation Sandbox` en `standard`, `Sim Deck` en `naval` o alias privado en `--theme=local`) para demos, `--dry-run` y self-tests de hooks (`--test`).

---

## Módulos y Capacidades Implementadas

| Módulo | Ruta | Propósito |
| :--- | :--- | :--- |
| Theme Loader | `.agents/hooks/theme-loader.js` | Resuelve temas `standard`, `naval` o `local` (fuera de Git), zonas (`Bridge` / `Lower Deck` / `Sim Deck`), etiquetas de hooks y formato `Mission Clock`. |
| Pre-Tool Shell Guard | `.agents/hooks/pre-tool-shell-guard.js` | Normaliza rutas contra traversal y bloquea comandos destructivos (`rm -rf /`, `curl \| bash`, `chmod 777`, `DROP DATABASE`) y escrituras en `/etc`, `/root`, `.ssh/`, `.env.production`. Soporta `SHIELD_RIGIDITY=standard \| strict \| fast-track`. |
| Edit Circuit Breaker | `.agents/hooks/edit-circuit-breaker.js` | Detiene la ejecución si el mismo archivo se edita >5 veces en 10 minutos (`preToolUse`). |
| Post-Edit Policy & KISS Check | `.agents/hooks/post-edit-policy-check.js` | Excluye comentarios y strings, exime `console.log` en CLIs, marca polling HTTP con `setInterval` (`ERROR`), Tailwind prohibido (`ERROR` salvo `ALLOW_TAILWIND=true`) y heurísticas KISS (`KISS_DEEP_NESTING`, `KISS_EXCESSIVE_PARAMS`, `KISS_LONG_FUNCTION`, `KISS_EXCESSIVE_FILE_LENGTH`, `KISS_SWALLOWED_ERROR`). |
| Audit Log Writer | `.agents/hooks/audit-log-writer.js` | Registra trazas JSON y Markdown (incluyendo eventos SDD `SPEC_AUDIT_EVENTS`: `spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`) en `.agents/audit_log.json` y `.agents/audit_log.md`. |
| Zero-Context Cold Review | `.agents/skills/adversarial-meta-review/SKILL.md` | Rúbrica sin estado de 3 compuertas (`references/cold-review-rubric.md`) y plantilla SDD `templates/spec.md` para cambios Vital Logic. |
| Protocolo KISS | `.agents/rules/kiss-simplicity-protocol.md` | Reglas operativas de simplicidad alineadas con `.agents/skills/code-health-and-minimalism/SKILL.md`. |
| Skill Security Scanner | `.agents/hooks/skill-security-scanner.js` | Audita archivos `SKILL.md` contra prompt injection, robo de credenciales y exfiltración C2 (`preSkillInvocation`), con soporte opcional para `skillspector`. |
| Monorepo Cascade Scope | `.agents/hooks/monorepo-cascade-scope.js` | Calcula paquetes/apps afectados aguas abajo desde el grafo de dependencias de `package.json` (con fallback heurístico). |
| Node CVE Baseline Check | `scripts/node-runtime-cve-check.js` | Verifica offline la versión local de Node.js (incluyendo Node 24 LTS y aviso EOL de v18) contra baselines de CVEs embebidos. |
| Reglas Semgrep SAST | `.semgrep.yml` | Reglas estáticas (`gov-*`) contra polling continuo, prefijo `node:`, inyección en `exec`, `eval` y secretos embebidos. |

---

## Temas de Gobernanza: `standard`, `naval` y Privado `local`

1. **`standard` (por defecto)**: Nomenclatura técnica corporativa (`Simulation Sandbox`, `[SECURITY GUARD]`, timestamps ISO-8601).
2. **`naval` (`--theme=naval` / `AGENT_THEME=naval`)**: Jerarquía marítima de dominio público (`Bridge`, `Lower Deck`, `Sim Deck`, `[SECURITY OFFICER]`, reloj `Mission YYYY.DDD`, `0` tokens extra con `Zero Theatrical Filler`).
3. **`local` (`--theme=local` / `AGENT_THEME=local` / `AGENT_THEME_FILE=<ruta>`)**: Resuelve alias, zonas y etiquetas privadas en tiempo de ejecución sin escribir nombres privados en archivos trackeados por Git. Orden de búsqueda:
   1. `AGENT_THEME_FILE` (o `.agents/.env` `AGENT_THEME_FILE`)
   2. `<raízProyecto>/.agents/theme.local.json`
   3. `<raízProyecto>/.agent-theme.local.json` (y hasta 3 directorios padre de workspace)
   4. `~/.config/agent-governance/theme.local.json`

Ejemplo de `.agent-theme.local.json` no trackeado (ignorado por `.gitignore`):

```json
{
  "name": "Alpha Private Theme",
  "clockPrefix": "Cycle",
  "zones": { "bridge": "DeckAlpha", "lowerDeck": "SubDeck", "simBay": "SimArena" },
  "labels": { "guard": "[ALPHA GUARD]", "sim": "[SIM-ARENA]" },
  "roles": { "orchestrator": "AlphaLead" }
}
```

| Rol Estándar | Alias Naval | Zona | Tarea en el Proyecto |
| :--- | :--- | :--- | :--- |
| Human / Product Owner | Captain | Bridge | Autoridad del proyecto, requisitos y aprobación `APPROVED` |
| Lead AI Orchestrator | First Officer | Bridge | Descomposición de tareas, subagentes y arbitraje |
| Systems & Logic Analyst | Science & Logic Officer | Bridge | Algoritmos, máquinas de estado, DAG de workspace |
| Architecture Lead | Chief Engineer | Bridge | Límites de monorepo, pipelines de build y CI |
| Security Guardrail | Security Officer | Bridge | Escudo pre-tool, Semgrep SAST, escaneo de skills |
| Quality & Health Auditor | Chief Medical Officer | Bridge | Revisión post-edit, KISS + YAGNI, anti-polling |
| Design System & UX | UX & Comms Officer | Bridge | Ergonomía CLI, accesibilidad WCAG, estilos |
| Test Automation Runner | Lower-Deck Runner | Lower Deck | Pruebas y simulaciones aisladas en Simulation Sandbox (`Sim Deck`) |
| Meta-Critic Evaluator | Lower-Deck Evaluator | Lower Deck | Cold Review sin contexto en 3 compuertas (`Paraphraser`, `Critic`, `Verifier`) |

---

## Uso de la CLI (`bin/stng.js`)

```bash
node ./bin/stng.js help
node ./bin/stng.js init [--provider=gemini] [--theme=standard|naval|local] [--allow-tailwind] [--force]
node ./bin/stng.js theme
node ./bin/stng.js guard                  # Self-test de guardia shell y rutas (alias: shield)
node ./bin/stng.js policy                 # Self-test de políticas y heurísticas KISS (alias: health)
node ./bin/stng.js scan-skill .agents/skills/security-guardrails
node ./bin/stng.js cve-check              # Auditoría offline de baseline CVE de Node.js
node ./bin/stng.js circuit:reset          # Reiniciar contadores de circuit-breaker
node ./bin/stng.js audit-stats            # Telemetría de auditoría y Cold Reviews (alias: log --stats)
node ./bin/stng.js advise                 # Asesor de ciclo de vida del repositorio
node ./bin/stng.js update [--check]       # Actualizador consultado con Aduana de Seguridad
node ./bin/stng.js demo                   # Demo reproducible en <1s
node ./bin/stng.js test                   # Ejecutar suite node --test en Simulation Sandbox
```

---

## Decisión de Arquitectura: Runtime ESM Zero-Build + Tipado Estricto JSDoc

`STNG-framework` se ejecuta de forma nativa como **ES Modules (`.js`)** sin dependencias en runtime y con verificación estática del **compilador TypeScript (`tsc --noEmit`)**:
- **Portabilidad inmediata (Zero-Build)**: Los hooks deterministas (`.agents/hooks/*.js`) llevan JSDoc autocontenido y corren directamente en `Node.js 18–24` y dentro de repositorios no-JS (Python, Go, Rust) sin requerir `tsc`, `node_modules` ni carpeta `dist/`.
- **Seguridad Estática Completa**: `tsconfig.json` (`strict: true`, `allowJs: true`, `checkJs: true`, `noEmit: true`) valida código fuente, hooks, scripts y tests, mientras `types/index.d.ts` (`"types"` en `package.json`) entrega autocompletado público real.
- **Tooling Exclusivo de Desarrollo**: `typescript` y `@types/node` viven únicamente en `devDependencies`; `dependencies` permanece vacío (`0`).

---

## Estado y Herramientas Externas
- **Implementado y verificado:** Cargador de temas (`standard` / `naval` / `local`), 6 hooks deterministas + heurísticas KISS, verificador CVE de Node, reglas `.semgrep.yml`, API ESM (`index.js`) y CLI `stng` (`node --test`).
- **Binarios externos opcionales:** `skillspector` y `semgrep` amplían los escaneos cuando están disponibles en `PATH`; los checks nativos de Node.js funcionan offline sin ellos.
