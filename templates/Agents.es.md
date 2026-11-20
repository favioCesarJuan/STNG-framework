# Agents.es.md - Sistema Multiagente de Gobernanza Enterprise

> **Framework**: STNG-Framework (Structured Tactical Node Governance)  
> **Arquitectura**: Bridge (Contexto Largo) + Lower Deck (Subagentes sin Estado) + Sim Deck  
> **Entorno de Ejecución**: Antigravity / Gemini / Claude / OpenAI / CLI Local con Model Hooks Deterministas

---

## 1. Jerarquía de Roles y Mapeo Corporativo

Este framework utiliza roles corporativos claros por defecto (`--theme=standard`), con alias navales de dominio público opcionales (`--theme=naval`) o alias locales privados (`--theme=local` desde configuración local fuera de Git):

| Rol Corporativo | Alias Naval | Zona (Deck) | Dominio Operativo | Modelo Asignado | Hooks y Herramientas Clave |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Human / Product Owner` | Capitán | Bridge | **El Usuario Humano**. Máxima autoridad, requisitos y aprobación final (`APPROVED`). | Humano | Chat del IDE, Aprobación Ejecutiva |
| `LeadAIOrchestrator` | Primer Oficial | Bridge | **Orquestador Principal**. Planifica checklists, despacha subagentes y arbitra hallazgos. | High-Reasoning | `tasks.md`, `invoke_subagent`, Audit Log |
| `SystemsLogicAnalyst` | Oficial Científico / Lógica | Bridge | Lógica formal, DDD, máquinas de estados finitos (FSM) y algoritmos. | High-Reasoning | Knowledge Graph MCP, análisis estático |
| `ArchitectureLead` | Ingeniero en Jefe | Bridge | Monorepo, arquitectura modular/hexagonal y pipelines de build/CI. | High-Reasoning | `architecture.md`, modularidad y DI |
| `SecurityGuardrail` | Oficial de Seguridad | Bridge | Ciberseguridad, validación de inputs, Semgrep SAST y auditoría de skills. | High-Reasoning / Flash | **Hook `preToolUse`**, `install-skill.sh`, Semgrep |
| `DesignSystemEnforcer` | Oficial de UX y Comunicaciones | Bridge | Ergonomía UX/UI, WCAG AAA, CSS Modules, StyleSheet nativo y regla 60-30-10. | High-Reasoning / Flash | Sistema de tokens, contrastes, DevTools |
| `QualityHealthAuditor` | Oficial Médico / Calidad | Bridge | Salud de código, KISS + YAGNI, prohibición de polling y tipado estricto. | High-Reasoning / Flash | **Hook `postInvocation`**, linters, KISS |
| `TestAutomationRunner` | Runner de Lower Deck | Lower Deck | Suites de pruebas, linters y validaciones en el **Entorno de Simulación (Sim Deck)**. | Fast-Economy | `pnpm test`, `node --test`, Sandbox |
| `RuntimeEnvironment` | Consola de Sistema | Runtime | Logs de compilación, códigos de salida y telemetría de procesos. | Runtime | Shell determinista |
| `MetaCriticEvaluator` | Evaluador de Lower Deck | Lower Deck | Cold Review sin contexto (3 compuertas: Paraphraser, Critic, Verifier) y paridad doc-código. | Cross-Model High-Reasoning | Rúbrica Cold Review solo lectura |

---

## 2. Directivas Operativas Principales

### 2.1. Directiva de Búsqueda con Prioridad 2026
- **Prioridad 1**: Resultados del año **2026**.
- **Prioridad 2**: Resultados del año **2025**.
- **Prioridad 3**: Documentación anterior solo si no existe alternativa moderna.

### 2.2. Flujo de Doble Vía (Vital Logic vs. Fast Path)
- **Lógica Vital (SDD + Cold Review + TDD Estricto)**: `Draft Spec -> Cold Review (Lower Deck) -> Sign-Off Humano -> Red -> Green -> Refactor` en el entorno de simulación.
- **Fast Path (UI y Layout)**: CSS Modules, StyleSheet nativo, textos y traducciones exentos de Cold Review y Test-First.

### 2.3. Bridge vs. Lower Deck y Entorno de Simulación
1. **Fase en Línea (Bridge)**: Correcciones secuenciales cortas en el contexto compartido.
2. **Subagente sin Estado (Lower Deck)**: Cold Reviews con contexto cero (`Lower-Deck Evaluator`) y suites ruidosas de tests/dry-run (`Lower-Deck Runner` en `Simulation Sandbox / Sim Deck`).

### 2.4. Protocolo de Lenguaje Cognitivo y Cero Relleno
- **Entrada**: Comprende al usuario en su idioma nativo (español).
- **Núcleo de Razonamiento**: Deliberación interna, AST y prompts de subagentes en **inglés** conciso.
- **Entrega**: Reporte final claro en el **idioma del usuario**, con **Zero Theatrical Filler** incluso con `AGENT_THEME=naval|local`.
