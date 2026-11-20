# Manual Operativo de STNG-framework

> **Structured Tactical Node Governance (`stng-governance-core` v2.1.0)** — Motor determinista de gobernanza sin dependencias externas para `Node.js >= 18.0.0`.

---

## 1. Frontera con ISS-Enterprise
- **STNG-framework** contiene el núcleo determinista de runtime: `.agents/hooks/`, `.agents/rules/`, `.agents/skills/`, `.semgrep.yml`, `scripts/node-runtime-cve-check.js` y la API ESM exportada en `index.js`.
- **ISS-Enterprise** (*Intelligent Stack Scaffolding for Enterprise*) es el CLI flexible de scaffolding y ciclo de vida que entrevista al usuario sobre contexto/dominio, detecta stacks, asigna flotas multi-modelo y despliega estos hooks canónicos en proyectos destino.

---

## 2. API Programática ESM (`index.js`)
```js
import {
  evaluateSecurity,
  evaluateCircuit,
  resetCircuit,
  checkFilePolicy,
  diagnoseFileContent,
  evaluateKissHeuristics,
  POLICY_RULES,
  HEALTH_RULES,
  KISS_DEFAULTS,
  KISS_RULES,
  appendAuditLog,
  appendLogEntry,
  formatAuditTimestamp,
  formatMissionClock,
  computeMissionDateCode,
  SPEC_AUDIT_EVENTS,
  scanSkillSecurity,
  verifySkillIntegrity,
  auditSkillPath,
  auditWithSkillSpector,
  SUSPICIOUS_PATTERNS,
  calculateAffectedNodes,
  discoverWorkspaceTopology,
  TOPOLOGY_RULES,
  auditNodeRuntime,
  SECURE_BASELINE,
  runFrameworkUpdate,
  getInstalledVersion,
  runLifecycleAdvisor,
  detectProjectLifecycle,
  PROJECT_LIFECYCLE,
  resolveThemeMode,
  loadThemeConfig,
  getHookLabel,
  getZoneName,
  getRoleAlias,
  ROLES_CATALOG,
  displayLogStats,
  runInit,
  printCrewThemeNotice,
  printThemeNotice
} from 'stng-framework';
```

---

## 3. Referencia de Comandos CLI (`bin/stng.js`)
- `stng init [--provider=auto|gemini|claude|openai|deepseek|ollama] [--theme=standard|naval|local] [--allow-tailwind] [--force]` — Despliega `.agents/`, `scripts/`, `config/models.config.json`, `config/providers.json`, `.mcp/mcp-servers.config.json`, contratos multi-IA y configura `git config core.hooksPath .agents/git-hooks`.
- `stng theme` — Muestra el tema activo, origen del archivo de tema, zonas (`Bridge`, `Lower Deck`, `Sim`) y tabla de roles.
- `stng guard` (alias: `shield`) — Ejecuta `.agents/hooks/pre-tool-shell-guard.js --test`.
- `stng policy` (alias: `health`) — Ejecuta `.agents/hooks/post-edit-policy-check.js --test`.
- `stng scan-skill <ruta>` — Audita un directorio o `SKILL.md` contra prompt injection, robo de credenciales y exfiltración C2.
- `stng cve-check` — Verifica la versión local de Node.js contra baselines CVE embebidos (incluyendo Node 24 LTS y aviso EOL de v18).
- `stng circuit:reset` — Limpia `.agents/.circuit_state.json`.
- `stng audit-stats` (alias: `log`, `log --stats`) — Muestra resumen de `.agents/audit_log.json` incluyendo Cold Reviews (`PASS` / `ABORT`).
- `stng advise [--yes]` — Evalúa la etapa del proyecto (`greenfield`, `construction`, `maintenance`) y guarda `.agents/project-profile.json`.
- `stng update [--check] [--yes]` — Evalúa actualizaciones en cuarentena tras 4 compuertas de seguridad antes de aplicar cambios.
- `stng demo` — Ejecuta `examples/quickstart-demo.js`.
- `stng test` — Ejecuta `node --test` en el entorno de simulación (`Simulation Sandbox` / `Sim Deck`).

---

## 4. Variables de Entorno y Rigidez (`.agents/.env`)
- `AGENT_THEME=standard|naval|local` — Controla prefijos de hooks (`[SECURITY GUARD]` / `[SECURITY OFFICER]` / override local), zona de simulación (`Simulation Sandbox` / `Sim Deck` / override local) y reloj de auditoría (`ISO-8601` vs `Mission YYYY.DDD`).
- `AGENT_THEME_FILE=/ruta/al/archivo.json` — Ruta explícita opcional a un archivo de tema privado (activa modo `local`).
- `SHIELD_RIGIDITY=standard|strict|fast-track` — Ajusta la severidad de los guardrails:
  - `standard`: Bloquea comandos destructivos y escrituras en rutas protegidas; marca polling `setInterval` y Tailwind prohibido como `ERROR`.
  - `strict`: Bloquea además `git push --force` / `--force-with-lease` y `git reset --hard`.
  - `fast-track`: Convierte bloqueos y errores de política en advertencias informativas (`WARNING`).
- `ALLOW_TAILWIND=true|false` — Permite o bloquea imports de `tailwindcss` / `nativewind` en `post-edit-policy-check.js`.

---

## 5. Zero-Context Cold Review (`Lower Deck`) y SDD (`templates/spec.md`)
Los cambios **Vital Logic** (features, arquitectura, auth/seguridad, esquemas, refactors multi-paquete) siguen `.agents/skills/adversarial-meta-review/SKILL.md`:
1. Redactar especificación desde `templates/spec.md` (`status: DRAFT`, `track: VITAL_LOGIC`, `target_files` exactos).
2. Despachar subagentes **Lower Deck** sin historial previo de conversación:
   - **Gate 1 — Lower-Deck Paraphraser (`FAST_ECONOMY`)**: Resume objetivo, alcance, non-goals y verificación leyendo solo el spec (`ABORT: AMBIGUOUS_SPEC` si hay ambigüedad).
   - **Gate 2 — Lower-Deck Critic (`HIGH_REASONING`, cross-model preferido)**: Evalúa los 6 puntos de Heilmeier, KISS/YAGNI/DRY, modos de fallo y coherencia con ADRs (`ABORT: DESIGN_GAP` ante bloqueantes).
   - **Gate 3 — Lower-Deck Verifier (`Read-Only`)**: Confirma en disco rutas existentes y marcas `NEW` (`ABORT: NOT_READY` o `PASS: READY_FOR_SIGN_OFF`).
3. Registrar eventos en `.agents/audit_log.json` mediante `SPEC_AUDIT_EVENTS` (`spec_drafted`, `cold_review_abort`, `cold_review_pass`, `spec_approved`).
4. Promover a `status: APPROVED` por `Human / Product Owner` antes de escribir código productivo.

---

## 6. Reglas de Simplicidad KISS y Umbrales (`post-edit-policy-check.js`)
Aplicadas por `evaluateKissHeuristics` junto con `.agents/rules/kiss-simplicity-protocol.md`:
- `KISS_EXCESSIVE_FILE_LENGTH` (`WARNING`): archivo supera `400` líneas no vacías (`KISS_DEFAULTS.maxFileLines`).
- `KISS_DEEP_NESTING` (`WARNING`): anidamiento de control supera `4` niveles (`KISS_DEFAULTS.maxControlNesting`).
- `KISS_EXCESSIVE_PARAMS` (`WARNING`): función con más de `5` parámetros posicionales (`KISS_DEFAULTS.maxParams`).
- `KISS_LONG_FUNCTION` (`WARNING`): función individual supera `80` líneas (`KISS_DEFAULTS.maxFunctionLines`).
- `KISS_SWALLOWED_ERROR` (`WARNING`): bloque `catch {}` vacío sin comentario ni manejo (un comentario explícito `catch { /* razón */ }` está permitido).

Los comentarios y literales de texto se limpian antes de evaluar `NO_CONTINUOUS_POLLING`, parámetros, anidamiento y longitud; `NO_RAW_CONSOLE_LOG_PRODUCTION` exime rutas CLI/scripts (`bin/`, `examples/`, `scripts/`, `cli.js`, `themes.js`, `auditor.js`).

---

## 7. Configuración de Tema Privado Local (Fuera de Git)
Mantené alias personales o de proyecto fuera del repositorio versionado creando un archivo JSON ignorado en cualquiera de estas ubicaciones (por prioridad):
1. Ruta indicada en `AGENT_THEME_FILE`
2. `<raízProyecto>/.agents/theme.local.json`
3. `<raízProyecto>/.agent-theme.local.json` (o hasta 3 niveles padre de workspace)
4. `~/.config/agent-governance/theme.local.json`

Plantilla genérica (solo definí las claves que quieras sobrescribir; el resto hereda de `naval`):
```json
{
  "name": "Custom Local Theme",
  "clockPrefix": "Cycle",
  "zones": {
    "bridge": "DeckAlpha",
    "lowerDeck": "SubDeck",
    "simBay": "SimArena"
  },
  "labels": {
    "guard": "[ALPHA GUARD]",
    "policy": "[ALPHA POLICY]",
    "scanner": "[ALPHA SCANNER]",
    "circuit": "[ALPHA CIRCUIT BREAKER]",
    "cascade": "[ALPHA CASCADE SCOPE]",
    "audit": "[ALPHA AUDIT]",
    "cve": "[ALPHA CVE CHECK]",
    "sim": "[SIM-ARENA]"
  },
  "defaults": { "from": "Lead", "to": "Orchestrator" },
  "roles": {
    "productOwner": "Owner",
    "orchestrator": "AlphaLead",
    "testRunner": "SubDeck Runner",
    "metaCritic": "SubDeck Evaluator"
  }
}
```
Activalo en tiempo de ejecución mediante `AGENT_THEME=local` o `--theme=local`. Tanto `.agents/theme.local.json` como `.agent-theme.local.json` están listados en `.gitignore`.

---

## 8. Runtime ESM Zero-Build y Tipado Estático (`tsc --noEmit`)
Los hooks y utilidades centrales corren en JavaScript ESM (`.js`) sobre `Node.js 18–24` con **0 dependencias externas en runtime** y sin paso de compilación, manteniendo verificación estática estricta mediante `tsconfig.json` (`strict: true`, `allowJs: true`, `checkJs: true`, `noEmit: true`), JSDoc y [types/index.d.ts](types/index.d.ts):
- Los hooks en `.agents/hooks/*.js` mantienen JSDoc autocontenido para funcionar de forma autónoma al copiarse a proyectos Python, Go o Rust.
- `typescript` y `@types/node` están únicamente en `devDependencies` (`pnpm run typecheck`); `node --test` e `install.sh` nunca requieren `pnpm install`.
