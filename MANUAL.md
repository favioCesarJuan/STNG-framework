# 🛸 STNG-Framework: Manual Operativo Universal

> **Propósito:** Guía de referencia y configuración universal para desarrolladores y cualquier Agente o Modelo de Inteligencia Artificial (Claude, OpenAI GPT, DeepSeek, Qwen/Ollama, Gemini, Cursor, Copilot, Cline, Continue.dev, Roo Code, etc.).
> **Compatibilidad:** Agnóstico a herramientas y plataformas. Si la IA no lee nativamente `Agents.md`, este documento y los archivos generados puentean todas las directivas para cualquier entorno.

---

## 🧭 Índice Rápido
1. [¿Qué es STNG-Framework y cuál es su filosofía?](#1-qué-es-stng-framework)
2. [El Mapa de Archivos de Configuración por Entorno de IA](#2-mapa-de-archivos-de-configuración-por-entorno)
3. [La Tripulación y sus Roles Corporativos (Mapeo Dual)](#3-la-tripulación-y-sus-roles-corporativos)
4. [Las 5 Reglas Inviolables de la Flota (Directivas Prime)](#4-las-5-reglas-inviolables)
5. [Guía de Integración según tu Asistente o Modelo](#5-guía-de-integración-según-tu-asistente)
6. [Hooks Deterministas y Verificación de Salud](#6-hooks-deterministas)
7. [Economía de Tokens y Protocolo Cognitivo](#7-economía-de-tokens)
8. [Blindaje de Seguridad y GitHub Security Lab](#8-blindaje-de-seguridad-y-github-security-lab)

---

## 1. ¿Qué es STNG-Framework?

STNG-Framework es un **sistema de gobernanza determinista para proyectos de software y monorepos** asistidos por Inteligencia Artificial.

A diferencia de los enfoques convencionales basados en "esperar que el LLM recuerde las reglas", STNG combina:
1. **Reglas explícitas e inmutables** estructuradas para el contexto de la IA.
2. **Hooks ejecutables en Node.js puro** que interceptan físicamente acciones destructivas antes de tocar el sistema operativo.
3. **Optimización de tokens** mediante enrutamiento asimétrico (modelos económicos para tareas mecánicas y modelos de razonamiento para arquitectura).

---

## 2. Mapa de Archivos de Configuración por Entorno

No todos los modelos o herramientas de IA leen el mismo archivo. STNG-Framework provee compatibilidad nativa con todo el ecosistema moderno:

| Archivo Generado | Destinatario / Herramienta | Función Principal |
| :--- | :--- | :--- |
| `Agents.md` | **Gemini CLI / Antigravity / Google Agent Toolkit** | Manifiesto principal de la tripulación y gobernanza. |
| `CLAUDE.md` | **Anthropic Claude Code / Claude Desktop / Projects** | Instrucciones directas de proyecto, comandos de test y estilo. |
| `.cursorrules` | **Cursor IDE / Composer** | Directivas persistentes en cada prompt de Cursor. |
| `.windsurfrules` | **Windsurf (Codeium)** | Reglas de contexto y flujos de trabajo de Windsurf Cascade. |
| `.copilot-instructions.md` | **GitHub Copilot (Chat & Edits)** | Guía de estándares de codificación y arquitectura para Copilot. |
| `rules.md` | **Modelos Locales / Ollama / Roo Code / Cline** | Reglas maestras de arquitectura, TDD y diseño sin dependencias. |
| `MANUAL.md` | **El Desarrollador Humano y Cualquier IA Universal** | Este manual explicativo integral. |

---

## 3. La Tripulación y sus Roles Corporativos

Cada oficial del Starship Enterprise se mapea a una responsabilidad formal de ingeniería de software:

| Oficial | Título Formal | Especialidad y Mandato |
| :--- | :--- | :--- |
| **Capitán Jean-Luc Picard** | `The Captain / Product Owner` | **El Usuario Humano.** Define requisitos, aprueba arquitectura y autoriza cambios a producción. |
| **Comandante William T. Riker** | `Lead AI Orchestrator` | Planificación de tareas, coordinación de subagentes y verificación de listas de tareas. |
| **Teniente Comandante Data** | `Systems Logic Analyst` | Algoritmos formales, modelos DDD, diagramas FSM y análisis de grafos. |
| **Teniente Comandante Geordi La Forge** | `Architecture Lead` | Monorepos, límites entre capas (Hexagonal/Clean), NestJS, Next.js, Expo, Astro, Drizzle. |
| **Teniente Comandante Worf** | `Security Guardrail` | Ciberseguridad, validación de inputs, Semgrep, Strix Red Teaming, bloqueo de comandos destructivos. |
| **Consejera Deanna Troi** | `Design System Enforcer` | Ergonomía UX/UI, Atomic Design, tokens CSS Modules, StyleSheet nativo, WCAG AAA. |
| **Dra. Beverly Crusher** | `Quality Health Auditor` | Salud médica del código, Protocolo Ponytail (YAGNI, diffs mínimos), eliminación de polling continuo. |
| **Alférez Wesley Crusher** | `Test Automation Runner` | Ejecución ágil de tests (Vitest, pnpm test, Jest, Playwright) y scripts repetitivos. |
| **Q (El Continuo Q)** | `Meta-Critic Evaluator` | Juicios de caos, eliminación de sesgos y auditoría de deuda técnica a largo plazo. |

---

## 4. Las 5 Reglas Inviolables

Cualquier modelo de IA que opere en este repositorio **debe obedecer estrictamente las siguientes directivas**:

1. **Protocolo Ponytail (Minimalismo Radical y YAGNI)**:
   - *Nunca* instales dependencias innecesarias si se puede resolver con la biblioteca estándar de Node/Python/lenguaje nativo.
   - Mantén los diffs pequeños, quirúrgicos y modulares.
2. **Prohibición Absoluta de Sondeo Continuo (Zero Continuous Polling)**:
   - Está **estrictamente prohibido** usar `setInterval` para consultar APIs periódicamente.
   - Las sincronizaciones deben ser guiadas por eventos (**WebSockets/Push**) o por revalidación al retomar el foco (`AppState == 'active'`).
3. **Flujo de Trabajo Dual (TDD Estricto vs. Fast Path)**:
   - **TDD Obligatorio (Test-First)**: Para lógica de negocio, finanzas, máquinas de estado y cálculos de sincronización.
   - **Fast Path**: Vistas de interfaz, estilos cosméticos y copys quedan exentos de Test-First y se validan con linters y CI.
4. **Higiene de Estilos Adaptativa**:
   - Por defecto: CSS Modules puros (`*.module.css`) en Web y `StyleSheet.create` en React Native.
   - Prohibido introducir Tailwind o utilidades atómicas salvo que el proyecto declare explícitamente `ALLOW_TAILWIND=true`.
5. **Protocolo de Lenguaje Cognitivo (Ahorro del 30% al 50% de Tokens)**:
   - **Inbound:** Recibe las consultas en el idioma nativo del Capitán (ej. Español).
   - **Razonamiento Interno:** Razona, analiza árboles AST y redacta directivas internas en **Inglés** (aprovecha la compresión del tokenizador BPE).
   - **Outbound:** Devuelve las explicaciones y reportes en el idioma del Capitán.

---

## 5. Guía de Integración según tu Asistente

### Si utilizas Anthropic Claude Code / Claude Desktop:
- Claude leerá automáticamente el archivo [`CLAUDE.md`](./CLAUDE.md) generado en la raíz.
- Puedes recordarle: *"Sigue las directivas de CLAUDE.md y actúa bajo el rol de First Officer Riker."*

### Si utilizas Cursor IDE o Windsurf:
- Cursor consumirá [`.cursorrules`](./.cursorrules) y Windsurf consumirá [`.windsurfrules`](./.windsurfrules).
- Toda generación de código respetará automáticamente el Ponytail Protocol y la prohibición de sondeo continuo.

### Si utilizas Modelos Locales en Ollama / vLLM (Qwen, DeepSeek, Mistral):
- Configura el system prompt para apuntar a [`rules.md`](./rules.md).
- El modelo operará en **Modo Cuarentena**: respuestas concisas, fragmentos de menos de 50 líneas y cero alucinaciones de frameworks no autorizados.

### Si utilizas Gemini CLI / Google Antigravity:
- El entorno leerá [`Agents.md`](./Agents.md) y ejecutará los hooks registrados en [`.agents/hooks.json`](./.agents/hooks.json).

---

## 6. Hooks Deterministas

Los hooks residen en `.agents/hooks/` y pueden ejecutarse manualmente en cualquier momento:

```bash
# 1. Ejecutar toda la suite de pruebas unitarias automatizada (Zero Dependencies)
pnpm test
# O: node --test test/**/*.test.js

# 2. Verificar el Escudo Táctico de Worf
pnpm run shield:test

# 3. Ejecutar Diagnóstico Médico de la Dra. Crusher
pnpm run health:check --test

# 4. Ver la Bitácora del Capitán (Auditoría Forense)
pnpm run log:view
```

---

## 7. Economía de Tokens y Asignación de Modelos

En [`config/models.config.json`](./config/models.config.json) se encuentra la matriz de asignación de flota:
* **Tareas de Alto Razonamiento (80% de la tripulación)**: Claude 3.5/3.7 Sonnet, Gemini 3.1 Pro, o1, DeepSeek-R1 o Qwen 72B.
* **Tareas Mecánicas Rápidas (Wesley Crusher / Tests / Linters)**: Gemini 3.8 Flash, Claude 3.5 Haiku, GPT-4o-mini o Qwen 7B.

---

## 8. Blindaje de Seguridad y GitHub Security Lab

STNG-Framework implementa las recomendaciones y directivas de seguridad oficiales de **[GitHub Security Lab](https://github.com/GitHubSecurityLab/gh-secure)** y la división táctica de Starfleet:

1. **Canal Confidencial de Vulnerabilidades**:
   - Para reportar cualquier vulnerabilidad de forma segura y privada, utiliza el canal de [Security Advisories](https://github.com/favioCesarJuan/STNG-framework/security/advisories/new) en lugar de crear issues públicos.
2. **Push Protection & Secret Scanning**:
   - Los commits que contengan tokens, claves privadas o secretos de API son interceptados y rechazados automáticamente antes de incorporarse al historial de Git.
3. **Dependabot Automatizado**:
   - Monitoreo en tiempo real de vulnerabilidades en dependencias y generación automática de PRs correctivos.
4. **CodeQL Semantic Static Analysis**:
   - Cada commit y pull request es analizado mediante el motor CodeQL en GitHub Actions para detectar inyecciones, fallos lógicos y debilidades de seguridad.
5. **Worf Security Shield en Tiempo de Ejecución**:
   - Interceptor pre-ejecución (`worf-security-shield.js`) que bloquea comandos de terminal que puedan comprometer el sistema operativo o destruir datos.
6. **Política Formal de Seguridad**:
   - Consulta el archivo [`SECURITY.md`](./SECURITY.md) para conocer las versiones soportadas y el protocolo de triaje.

*Enterprise cleared for warp. Make it so!*

