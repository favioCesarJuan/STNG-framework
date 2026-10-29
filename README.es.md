# 🛸 STNG-Framework: Motor Jerárquico de Gobernanza Multiagente

[![CI: Tests](https://github.com/favioCesarJuan/STNG-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/favioCesarJuan/STNG-framework/actions/workflows/ci.yml)
[![Node: >=18.0.0](https://img.shields.io/badge/Node-%3E%3D18.0.0-green.svg)](https://nodejs.org)
[![Gestor: pnpm](https://img.shields.io/badge/pnpm-recomendado-orange.svg)](https://pnpm.io)
[![GitHub Security Lab](https://img.shields.io/badge/Seguridad-GitHub%20Security%20Lab-blue.svg)](SECURITY.md)
[![License: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)
[![Framework: Antigravity](https://img.shields.io/badge/Runtime-Antigravity%20%7C%20Gemini%20CLI-purple.svg)](https://ai.google.dev)
[![Architecture: Hexagonal](https://img.shields.io/badge/Arquitectura-Monorepo%20Hexagonal-emerald.svg)](#arquitectura)
[![Crew: Star Trek TNG](https://img.shields.io/badge/Tripulaci%C3%B3n-Star%20Trek%3A%20TNG-gold.svg)](#-la-tripulación-con-mapeo-dual)

> **Model Hooks deterministas, evaluación en cascada mediante grafos de conocimiento, minimalismo con el Protocolo Ponytail y economía asimétrica de tokens para monorepos complejos (Turborepo, Next.js, Expo, NestJS, Astro).**

---

🌐 **Idiomas:** [English (Default)](README.md) | **Español** | 📖 **[MANUAL.md (English)](MANUAL.md)** | 📖 **[MANUAL.es.md (Español)](MANUAL.es.md)**

---

## ⚡ ¿Por qué STNG-Framework?

Los agentes autónomos de IA modernos (Gemini, Claude, GPT) sufren de **tres cuellos de botella críticos** al operar en monorepos empresariales:

1. **La "Ilusión de los Markdowns" (No determinismo)**: Las directivas en texto libre (`rules.md`, system prompts) confían en que el modelo decida obedecerlas. Bajo fatiga de contexto, los LLMs ignoran reglas (instalan paquetes no autorizados, reintroducen sondeo continuo `setInterval` o rompen directivas de CSS).
2. **Saturación de Tokens y Contaminación de Contexto**: Acumular decenas de skills dispersas inunda la memoria de trabajo del modelo con instrucciones contradictorias, quemando millones de tokens mientras degrada la precisión.
3. **Delegación de "Caja Negra"**: Cuando una cascada multiagente falla, no existe un registro forense estructurado para auditar qué agente introdujo una regresión.

### 🚀 La Solución: STNG-Framework
**STNG-Framework** (*Star Trek: The Next Generation Framework*) transforma el flujo de trabajo agéntico en **ingeniería de software determinista**:
- **Model Hooks Ejecutables**: Interceptores reales en Node.js y Bash (`preToolUse`, `postInvocation`) que bloquean físicamente comandos de consola peligrosos, violaciones de linter y errores de compilación.
- **The Captain's Log**: Un libro de bitácora inmutable con marcas de Fecha Estelar (Stardate) que registra cada delegación entre agentes y el veredicto de salud.
- **Bucle de Evaluación en Cascada**: Consulta la topología del grafo de dependencias para disparar diagnósticos médicos *únicamente* sobre los paquetes afectados.
- **7 Skills Canónicas**: Depura decenas de micro-skills dispersas en 7 dominios esenciales y blindados.
- **Asesor de Ciclo de Vida**: Diagnostica brechas y formula preguntas inteligentes tanto para proyectos nuevos (Greenfield), en desarrollo activo o en mantenimiento.
- **Actualizaciones Consultadas con Cuádruple Seguridad**: `stng update` valida cambios en cuarentena mediante Worf Shield, Semgrep SAST, SkillSpector y CVEs de Node antes de aplicar.
- **Economía Asimétrica 80/20 de Tokens**: Delega el 80% de las tareas mecánicas rutinarias a **Gemini 3.8 Flash**, reservando **Gemini 3.1 Pro** estrictamente para razonamiento arquitectónico de alto nivel.

---

## 👥 La Tripulación con Mapeo Dual

STNG-Framework utiliza una **Arquitectura Cognitiva Dual**. La narrativa de Star Trek: TNG proporciona máxima cohesión y memoria para la comunidad de código abierto, mientras se mapea 1 a 1 a cargos formales corporativos para entornos empresariales:

```
                       [Capitán Jean-Luc Picard]
                     (El Usuario Humano / Product Owner)
                                    │
                                    ▼
                     [William T. Riker (Número Uno)]
                        (Orquestador Principal IA)
                                    │
       ┌──────────────┬─────────────┼─────────────┬──────────────┐
       ▼              ▼             ▼             ▼              ▼
     [Data]       [Geordi]       [Worf]        [Troi]        [Crusher]
    (Lógica)     (Arq/Mentor)  (Seguridad)    (UX/UI)        (Salud)
       │              │             │             │              │
       └──────────────┴─────────────┼─────────────┴──────────────┘
                                    ▼
                         [Wesley Crusher (Flash)]
                           (Ejecutor de Tests)
                                    ▲
                                    │ (Auditoría Externa)
                           [Q (El Continuo Q)]
                         (Meta-Crítico Omnisciente)
```

| Personaje (TNG) | Cargo Corporativo | Modelo | Mandato Principal |
| :--- | :--- | :--- | :--- |
| **Capitán Jean-Luc Picard** | `The Captain / Product Owner` | **Humano (Tú)** | Requisitos supremos, roadmap estratégico y aprobación ejecutiva. |
| **Cmdr. William T. Riker** | `LeadAIOrchestrator` | Gemini 3.1 Pro | Coordina la tripulación, planifica en fases, despacha subagentes y mantiene `tasks.md`. |
| **Tte. Cmdr. Data** | `SystemsLogicAnalyst` | Gemini 3.1 Pro | Modelado algorítmico formal, lenguaje ubicuo DDD y máquinas de estado finito. |
| **Tte. Cmdr. Geordi La Forge**| `ArchitectureLead` | Gemini 3.1 Pro | Límites de paquetes, arquitectura de monorepos y mentoría técnica. |
| **Tte. Cmdr. Worf** | `SecurityGuardrail` | Gemini 3.1 Pro / Flash | Escudo táctico de terminal, Semgrep SAST y auditorías de runtime contra CVEs. |
| **Consejera Deanna Troi** | `DesignSystemEnforcer` | Gemini 3.1 Pro / Flash | Empatía UX/UI, accesibilidad WCAG AAA, CSS Modules puros y física Apple HIG. |
| **Dra. Beverly Crusher** | `QualityHealthAuditor` | Gemini 3.1 Pro / Flash | Salud de código, Protocolo Ponytail (anti-bloat) y cero sondeo continuo. |
| **Alférez Wesley Crusher** | `TestAutomationRunner` | Gemini 3.8 Flash | Ejecución de scripts repetitivos, suites de pruebas unitarias y flujos E2E. |
| **Computadora** | `RuntimeEnvironment` | Bash Runtime | Salidas deterministas de comandos, telemetría y ciclo de vida de procesos. |
| **Q (El Continuo Q)** | `MetaCriticEvaluator` | Gemini 3.1 Pro | Evaluación externa omnisciente, juicios de sesgo y pruebas de caos. |

Cada oficial cuenta además con su expediente individual físico en `.agents/crew/*.md`.

---

## 🪝 Model Hooks Deterministas

Ubicados en `.agents/hooks/` y registrados en `.agents/hooks.json`:

1. **🛡️ Escudo de Seguridad de Worf (`worf-security-shield.js`) - `preToolUse`**:
   - Intercepta llamadas a consola antes de su ejecución.
   - Bloquea acciones destructivas (`rm -rf /`, piping curl a bash, `chmod 777`, escrituras directas a disco).
2. **🩺 Diagnóstico de Salud de la Dra. Crusher (`crusher-health-check.js`) - `postInvocation`**:
   - Ejecuta análisis tras cada edición.
   - Aplica el Protocolo Ponytail, verifica la ausencia de sondeo continuo (`setInterval`) y audita imports.
3. **📜 Escritor de Bitácora del Capitán (`captains-log-writer.js`) - `postInvocation`**:
   - Escribe automáticamente registros JSON estructurados en `.agents/captains_log.json` y compila `.agents/captains_log.md`.
4. **🔄 Auditor del Ciclo de Vida de Skills (`skill-lifecycle-auditor.js`) - `preSkillInvocation`**:
   - Audita habilidades de terceros contra inyecciones de prompt y filtraciones mediante compatibilidad con SkillSpector.
5. **🌌 Evaluador en Cascada (`cascade-evaluator.js`)**:
   - Resuelve el DAG de dependencias para aislar el impacto de módulos compartidos modificados.
6. **⚡ Disyuntor Táctico (`circuit-breaker.js`)**:
   - Detiene bucles de corrección fallida tras 5 intentos repetidos sobre el mismo archivo.

---

## 💰 Optimización Económica de Tokens (6 Capas)

1. **Enrutamiento Asimétrico 80/20**: Gemini 3.8 Flash ejecuta el 80% de la carga mecánica (tests, linters); Gemini 3.1 Pro se enfoca en razonamiento.
2. **Carga Perezosa (Lazy Loading)**: Las skills se inyectan estrictamente bajo demanda por oficial.
3. **Cuarentena de Contexto**: Bucles intensivos de test/lint corren en subagentes efímeros (`invoke_subagent`), devolviendo resúmenes concisos al hilo principal.
4. **Acotamiento por Grafo de Conocimiento**: Inyecta únicamente los fragmentos afectados en vez de archivos completos.
5. **Disyuntores de Edición**: Intercepta fallos repetitivos antes de saturar la ventana de contexto.
6. **Protocolo de Lenguaje Cognitivo (30% a 50% de Ahorro)**: Entiende y responde en el idioma nativo del Capitán (ej. Español), mientras realiza el razonamiento interno y el análisis AST en **Inglés** para maximizar la compresión BPE.

---

## 🚀 Instalación y Uso Rápido

### Opción A: CLI Unificada `stng` (Recomendada)

```bash
# 1. Instalar la CLI globalmente mediante enlace local o npm
cd /ruta/hacia/STNG-framework && pnpm link --global

# 2. Inicializar gobernanza en cualquier proyecto
cd /ruta/hacia/tu-proyecto
stng init

# 3. Consultar al Asesor de Ciclo de Vida (Greenfield, Desarrollo Activo, Mantenimiento)
stng advise

# 4. Verificar y aplicar actualizaciones con cuádruple compuerta de seguridad
stng update --check
stng update

# 5. Ejecutar la suite completa de pruebas de gobernanza (Zero Dependencies)
stng test
```

### Opción B: Script Tradicional

```bash
cd /ruta/hacia/tu-proyecto
/ruta/hacia/STNG-framework/install.sh
```

---

## 🌉 Puentes Universales de IA (Más Allá de Gemini)

STNG-Framework genera puentes de instrucción automáticos para todos los asistentes y motores de IA:

| Archivo | Asistente de IA | Propósito |
| :--- | :--- | :--- |
| **[`MANUAL.md`](MANUAL.md)** | **Humano / Cualquier LLM** | Manual operativo universal en Inglés. |
| **[`MANUAL.es.md`](MANUAL.es.md)** | **Humano / Cualquier LLM** | Manual operativo universal en Español. |
| **[`CLAUDE.md`](CLAUDE.md)** | **Anthropic Claude Code / Desktop** | Directivas de proyecto, comandos TDD y rol de Primer Oficial. |
| **[`.cursorrules`](.cursorrules)** | **Cursor IDE & Composer** | Salud de código persistente, Ponytail y cero polling. |
| **[`.windsurfrules`](.windsurfrules)** | **Windsurf (Cascade)** | Límites de ingeniería y guardarraíles deterministas. |
| **[`.copilot-instructions.md`](.copilot-instructions.md)** | **GitHub Copilot** | Lineamientos en línea para generación y pruebas. |
| **[`rules.md`](rules.md)** | **Ollama / Roo Code / Cline** | Directivas estándar en Markdown puro sin dependencias. |
| **[`Agents.md`](Agents.md)** | **Gemini CLI / Antigravity** | Jerarquía de Starfleet y hooks deterministas. |

---

## 🤖 Arquitectura Multimodelo y Matriz de Flota

Configurable en `config/models.config.json`:

| Proveedor | Razonamiento Superior (80% tripulación) | Economía Rápida (Wesley / Tests / CI) | Ventana de Contexto |
| :--- | :--- | :--- | :--- |
| **Google Gemini** | Gemini 3.1 Pro | Gemini 3.8 Flash | 1,000,000 tokens |
| **Anthropic Claude** | Claude 3.5 / 3.7 Sonnet | Claude 3.5 Haiku | 200,000 tokens |
| **OpenAI** | o1 / o3-mini | GPT-4o-mini | 200,000 tokens |
| **DeepSeek** | DeepSeek-R1 | DeepSeek-V3 | 64,000 tokens |
| **Ollama Local / vLLM** | Qwen 2.5 Coder 72B / 32B | Qwen 2.5 Coder 7B | 32,768 tokens (Modo Cuarentena) |

---

## 🛡️ Blindaje de Seguridad Táctico (GitHub Security Lab)

STNG-Framework implementa los estándares de **[GitHub Security Lab](https://github.com/GitHubSecurityLab/gh-secure)**:
- **Reporte Privado de Vulnerabilidades**: Canal confidencial en [Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new).
- **Push Protection & Secret Scanning**: Bloqueo activo contra filtración de claves o tokens.
- **Dependabot Automatizado**: Monitoreo continuo de la cadena de suministro y PRs de parcheo.
- **CodeQL Semantic Static Analysis**: Análisis semántico estático en cada commit y pull request.
- **Worf Security Shield**: Interceptor determinista en tiempo de ejecución.
- **Semgrep AST Scan**: Reglas Starfleet personalizadas contra patrones de riesgo.
- **Política Formal de Seguridad**: Documentada en [`SECURITY.md`](SECURITY.md).

*Enterprise cleared for warp. Make it so!*
