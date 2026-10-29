# 🛸 STNG-Framework: Manual Operativo Universal

> **Propósito:** Guía de referencia y configuración universal para desarrolladores y cualquier Agente o Modelo de Inteligencia Artificial (Claude, OpenAI GPT, DeepSeek, Qwen/Ollama, Gemini, Cursor, Copilot, Cline, Continue.dev, Roo Code, etc.).
> **Compatibilidad:** Agnóstico a herramientas y plataformas. Si la IA no lee nativamente `Agents.md`, este documento y los archivos generados puentean todas las directivas para cualquier entorno.
> **Idioma:** **Español** | [English (Default)](MANUAL.md)

---

## 🧭 Índice Rápido
1. [¿Qué es STNG-Framework y cuál es su filosofía?](#1-qué-es-stng-framework)
2. [El Mapa de Archivos de Configuración por Entorno de IA](#2-el-mapa-de-archivos-de-configuración-por-entorno)
3. [La Tripulación y sus Roles Corporativos (Mapeo Dual)](#3-la-tripulación-y-sus-roles-corporativos)
4. [Las 5 Reglas Inviolables de la Flota (Directivas Prime)](#4-las-5-reglas-inviolables-de-la-flota)
5. [Guía de Integración según tu Asistente o Modelo](#5-guía-de-integración-según-tu-asistente-o-modelo)
6. [CLI Unificada de Starfleet (`stng`)](#6-cli-unificada-de-starfleet-stng)
7. [Asesor Táctico de Ciclo de Vida (`stng advise`)](#7-asesor-táctico-de-ciclo-de-vida-stng-advise)
8. [Actualizador Consultado con Cuádruple Barrera de Seguridad (`stng update`)](#8-actualizador-consultado-con-cuádruple-barrera-de-seguridad-stng-update)
9. [Hooks Deterministas y Verificación de Salud](#9-hooks-deterministas-y-verificación-de-salud)
10. [Economía de Tokens y Protocolo Cognitivo](#10-economía-de-tokens-y-protocolo-cognitivo)
11. [Blindaje de Seguridad y GitHub Security Lab](#11-blindaje-de-seguridad-y-github-security-lab)
12. [Manifiestos Físicos de la Tripulación (`.agents/crew/`)](#12-manifiestos-físicos-de-la-tripulación-agentscrew)

---

## 1. ¿Qué es STNG-Framework?

STNG-Framework es un **sistema de gobernanza determinista para proyectos de software y monorepos** asistidos por Inteligencia Artificial.

A diferencia de los enfoques convencionales basados en "esperar que el LLM recuerde las reglas", STNG combina:
1. **Reglas explícitas e inmutables** estructuradas para el contexto de la IA.
2. **Hooks ejecutables en Node.js puro** que interceptan físicamente acciones destructivas antes de tocar el sistema operativo.
3. **Optimización de tokens** mediante enrutamiento asimétrico (modelos económicos para tareas mecánicas y modelos de razonamiento para arquitectura).
4. **Asesoramiento consciente del ciclo de vida del proyecto** (Greenfield, En Construcción, Mantenimiento).
5. **Actualizaciones consultadas y no automáticas** con cuádruple compuerta de seguridad en cuarentena.

---

## 2. El Mapa de Archivos de Configuración por Entorno

No todos los modelos o herramientas de IA leen el mismo archivo. STNG-Framework provee compatibilidad nativa con todo el ecosistema moderno:

| Archivo Generado | Destinatario / Herramienta | Función Principal |
| :--- | :--- | :--- |
| `Agents.md` | **Gemini CLI / Antigravity / Google Agent Toolkit** | Manifiesto principal de la tripulación y gobernanza. |
| `CLAUDE.md` | **Anthropic Claude Code / Claude Desktop / Projects** | Instrucciones directas de proyecto, comandos de test y estilo. |
| `.cursorrules` | **Cursor IDE / Composer** | Directivas persistentes en cada prompt de Cursor. |
| `.windsurfrules` | **Windsurf (Codeium Cascade)** | Reglas de contexto y flujos de trabajo de Windsurf. |
| `.copilot-instructions.md` | **GitHub Copilot Chat & Completion** | Lineamientos en línea para generación de código y testing. |
| `rules.md` | **Ollama / Roo Code / Cline / Modelos Locales** | Reglas generales en Markdown puro sin dependencias. |
| `MANUAL.md` | **Humano / Universal para cualquier LLM** | Guía maestra de operaciones y arquitectura en Inglés. |
| `MANUAL.es.md` | **Humano / Universal para cualquier LLM** | Guía maestra de operaciones y arquitectura en Español. |

---

## 3. La Tripulación y sus Roles Corporativos

STNG-Framework implementa una **Arquitectura de Personas de Doble Capa**. La narrativa de Starfleet TNG aporta claridad contextual e inmersión, mientras que cada rol mapea de forma exacta a un perfil corporativo formal:

| Tripulante (Starfleet) | Rol Corporativo | Modelo Recomendado | Responsabilidad Clave |
| :--- | :--- | :--- | :--- |
| **Capitán Jean-Luc Picard** | `The Captain / Product Owner` | **Humano (Tú)** | Aprobación ejecutiva, visión de producto y directivas supremas. |
| **Cmdr. William T. Riker** | `LeadAIOrchestrator` | Gemini 3.1 Pro / Claude Sonnet | Planificación en fases, coordinación de tripulantes y `tasks.md`. |
| **Tte. Cmdr. Data** | `SystemsLogicAnalyst` | Gemini 3.1 Pro / Claude Sonnet | Modelado algorítmico, DDD, máquinas de estado y rigor matemático. |
| **Tte. Cmdr. Geordi La Forge**| `ArchitectureLead` | Gemini 3.1 Pro / Claude Sonnet | Monorepos, pipelines CI/CD, límites de paquetes y mentoría. |
| **Tte. Cmdr. Worf** | `SecurityGuardrail` | Gemini 3.1 Pro / Flash | Escudo táctico contra comandos peligrosos, Semgrep AST y auditorías CVE. |
| **Consejera Deanna Troi** | `DesignSystemEnforcer` | Gemini 3.1 Pro / Flash | Empatía UX/UI, accesibilidad WCAG AAA, física de interacción y estilos limpios. |
| **Dra. Beverly Crusher** | `QualityHealthAuditor` | Gemini 3.1 Pro / Flash | Salud de código, Protocolo Ponytail (anti-bloat) y prohibición de polling continuo. |
| **Alférez Wesley Crusher** | `TestAutomationRunner` | Gemini 3.8 Flash / Claude Haiku | Ejecución de scripts, tests unitarios, linters y suites de validación. |
| **Computadora** | `RuntimeEnvironment` | Bash / OS Runtime | Telemetría, ejecución determinista y ciclo de vida de procesos. |
| **Q (El Continuo Q)** | `MetaCriticEvaluator` | Gemini 3.1 Pro / o1 / R1 | Crítica externa omnisciente, juicios de sesgo y pruebas de caos. |

---

## 4. Las 5 Reglas Inviolables de la Flota

1. **Protocolo Cola de Caballo (Ponytail Minimalism)**:
   - Prohibido agregar dependencias sin autorización explícita del Capitán.
   - Usar módulos nativos de Node (`node:fs`, `node:path`, `node:child_process`) siempre que sea posible.
2. **Prohibición Estricta de Sondeo Continuo (Zero Continuous Polling)**:
   - Terminantemente prohibido el uso de `setInterval` o loops infinitos para consultar endpoints o archivos. Usar eventos reactivos o invocaciones explícitas.
3. **Flujo de Trabajo Dual (TDD Estricto vs. Fast Path)**:
   - **TDD Obligatorio (Test-First)**: Para lógica de negocio, finanzas, máquinas de estado y cálculos de sincronización.
   - **Fast Path**: Vistas cosméticas y copys quedan exentos de Test-First y se validan con linters y CI.
4. **Higiene de Estilos Adaptativa**:
   - Por defecto: CSS Modules puros (`*.module.css`) en Web y `StyleSheet.create` en React Native.
   - Prohibido introducir Tailwind salvo que el proyecto declare explícitamente `ALLOW_TAILWIND=true`.
5. **Protocolo de Lenguaje Cognitivo (Ahorro 30%-50% Tokens)**:
   - **Inbound:** Recibe las consultas en el idioma del Capitán (ej. Español).
   - **Razonamiento Interno:** CoT, análisis AST y delegaciones en **Inglés** (aprovecha compresión BPE).
   - **Outbound:** Devuelve respuestas y reportes en el idioma del Capitán.

---

## 5. Guía de Integración según tu Asistente o Modelo

### Si utilizas Anthropic Claude Code / Claude Desktop:
- Claude leerá automáticamente el archivo [`CLAUDE.md`](./CLAUDE.md) generado en la raíz.
- Puedes recordarle: *"Sigue las directivas de CLAUDE.md y actúa bajo el rol de First Officer Riker."*

### Si utilizas Cursor IDE o Windsurf:
- Cursor consumirá [`.cursorrules`](./.cursorrules) y Windsurf consumirá [`.windsurfrules`](./.windsurfrules).
- Toda generación de código respetará automáticamente el Ponytail Protocol y la prohibición de sondeo continuo.

### Si utilizas Modelos Locales en Ollama / vLLM (Qwen, DeepSeek, Mistral):
- Configura el system prompt para apuntar a [`rules.md`](./rules.md).
- El modelo operará en **Modo Cuarentena**: respuestas concisas, fragmentos de menos de 50 líneas y cero alucinaciones.

### Si utilizas Gemini CLI / Google Antigravity:
- El entorno leerá [`Agents.md`](./Agents.md) y ejecutará los hooks registrados en [`.agents/hooks.json`](./.agents/hooks.json).

---

## 6. CLI Unificada de Starfleet (`stng`)

El comando `stng` provee control táctico completo:

```bash
# Inicializar gobernanza en el proyecto actual
stng init

# Asesoramiento interactivo según la etapa del proyecto
stng advise
stng advise --yes

# Verificar y aplicar actualizaciones con cuádruple filtro de seguridad
stng update --check
stng update

# Ejecutar suite de pruebas de gobernanza (Zero Dependencies)
stng test

# Validar escudos tácticos de Worf
stng shield

# Ejecutar diagnóstico de salud de la Dra. Crusher
stng health

# Restablecer disyuntor de edición (Circuit Breaker)
stng circuit:reset

# Ver estadísticas forenses de la Bitácora del Capitán
stng log:stats
```

---

## 7. Asesor Táctico de Ciclo de Vida (`stng advise`)

El comando `stng advise` analiza el proyecto y formula preguntas adaptadas según el estado de madurez:

* **Greenfield (Proyecto Nuevo / Desde Cero)**:
  - Sugiere arquitectura limpia, separación modular en `src/`, Biome o ESLint con TypeScript estricto y suite de tests nativa desde el primer día.
* **In-Construction (En Construcción / Desarrollo Activo)**:
  - Detecta brechas en tiempo real (ausencia de tests, falta de Tríada MCP, ausencia de pre-commit hooks).
  - Sugiere activación de `scripts/pre-commit.sh` y MCPs indispensables (Context7, Codebase Memory, GitHub).
* **Maintenance (Mantenimiento / Estable / Legacy)**:
  - Enfoque en prevención de regresiones, reglas Semgrep AST para evitar polling, escaneo de vulnerabilidades CVE en Node.js y congelamiento de dependencias.

El resultado se persiste automáticamente en `.agents/project-profile.json`.

---

## 8. Actualizador Consultado con Cuádruple Barrera de Seguridad (`stng update`)

La actualización del framework **NUNCA es silenciosa ni automática**. Requiere consentimiento interactivo y debe superar la Cuádruple Barrera Táctica:

```
                      [stng update]
                            │
                            ▼
               [¿Confirmar descarga? (s/N)]
                            │ (Sí)
                            ▼
               [Descarga a Directorio Aislado]
                            │
      ┌─────────────────────┴─────────────────────┐
      ▼                     ▼                     ▼
[Worf Shield]        [Semgrep SAST]        [SkillSpector]
(Sin rm -rf ni       (Sin polling ni       (Vulnerabilidades
 inyecciones)         fugas de tokens)      y Jailbreaks)
      │                     │                     │
      └─────────────────────┬─────────────────────┘
                            ▼
                 [Node.js CVE Baseline]
                            │
                            ▼
              [¿Aplicar actualización? (s/N)]
                            │ (Sí)
                            ▼
             [Backup atómico + Actualización]
```

1. **Worf Security Shield**: Verifica que los archivos entrantes no contengan comandos destructivos ni escrituras a rutas restringidas.
2. **Semgrep SAST**: Valida contra `.agents/rules/semgrep-starfleet.yml` buscando antipatrones de polling, inyección de comandos o fugas de tokens.
3. **SkillSpector**: Evalúa la seguridad de habilidades y previene jailbreaks.
4. **Node.js CVE Baseline**: Audita las versiones y dependencias contra la base de datos de vulnerabilidades conocidas.

Si alguna comprobación falla, la actualización es abortada y el proyecto permanece intacto.

---

## 9. Hooks Deterministas y Verificación de Salud

Los hooks residen en `.agents/hooks/` y son interceptores ejecutables en Node.js:
- `worf-security-shield.js`: Intercepta `run_command` y `write_to_file` antes de su ejecución.
- `crusher-health-check.js`: Audita código tras cada invocación buscando violaciones de estilo o polling.
- `captains-log-writer.js`: Registra telemetría inmutable en `.agents/captains_log.json`.
- `skill-lifecycle-auditor.js`: Audita skills antes de cargarlas.
- `cascade-evaluator.js`: Calcula el grafo de dependencias afectado en monorepos.
- `circuit-breaker.js`: Corta bucles de edición repetitiva tras 5 intentos fallidos.

---

## 10. Economía de Tokens y Protocolo Cognitivo

En [`config/models.config.json`](./config/models.config.json) se encuentra la matriz de asignación de flota:
* **Tareas de Alto Razonamiento (80% de la tripulación)**: Claude 3.5/3.7 Sonnet, Gemini 3.1 Pro, o1, DeepSeek-R1 o Qwen 72B.
* **Tareas Mecánicas Rápidas (Wesley Crusher / Tests / Linters)**: Gemini 3.8 Flash, Claude 3.5 Haiku, GPT-4o-mini o Qwen 7B.

---

## 11. Blindaje de Seguridad y GitHub Security Lab

STNG-Framework implementa las directivas oficiales de **[GitHub Security Lab](https://github.com/GitHubSecurityLab/gh-secure)**:
1. **Canal Privado de Vulnerabilidades**: Reportes vía [Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new).
2. **Push Protection & Secret Scanning**: Bloqueo automático de commits con secretos.
3. **Dependabot Automatizado**: Alertas y PRs de seguridad automáticos.
4. **CodeQL Semantic Static Analysis**: Análisis estático en GitHub Actions.
5. **Worf Security Shield**: Protección en tiempo de ejecución.
6. **Política Formal de Seguridad**: Documentada en [`SECURITY.md`](./SECURITY.md).

---

## 12. Manifiestos Físicos de la Tripulación (`.agents/crew/`)

Cada oficial de Starfleet cuenta con su propio dossier operativo en Markdown estructurado dentro de `.agents/crew/`:
- `riker-orchestrator.md`: Primer Oficial y Coordinador General.
- `data-systems-logic.md`: Oficial de Lógica y Arquitectura DDD.
- `geordi-architect.md`: Ingeniero Jefe y Gobernanza Monorepo.
- `worf-security.md`: Jefe de Seguridad Táctica y Escudos.
- `troi-ux-docs.md`: Consejera de Diseño, Accesibilidad y UX.
- `crusher-health.md`: Oficial Médico Jefe y Protocolo Ponytail.
- `wesley-runner.md`: Alférez y Ejecutor Rápido de Scripts/Tests.
- `q-meta-critic.md`: Crítico Meta y Juez del Continuo Q.

*Enterprise cleared for warp. Make it so!*
