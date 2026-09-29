# 🛸 STNG-Framework: Motor Jerárquico de Gobernanza Multiagente

[![License: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)
[![Framework: Antigravity](https://img.shields.io/badge/Runtime-Antigravity%20%7C%20Gemini%20CLI-purple.svg)](https://ai.google.dev)
[![Architecture: Hexagonal](https://img.shields.io/badge/Arquitectura-Monorepo%20Hexagonal-emerald.svg)](#arquitectura)
[![Crew: Star Trek TNG](https://img.shields.io/badge/Tripulaci%C3%B3n-Star%20Trek%3A%20TNG-gold.svg)](#-la-tripulaci%C3%B3n-con-mapeo-dual)

> **Model Hooks deterministas, evaluación en cascada mediante grafos de conocimiento, minimalismo con el Protocolo Ponytail y economía asimétrica de tokens para monorepos complejos (Turborepo, Next.js, Expo, NestJS, Astro).**

---

🌐 **Idiomas:** [English (Default)](README.md) | **Español**

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
                           [Q (The Q Continuum)]
                          (Meta-Crítico Omnisciente)
```

| Rol (TNG) | Cargo Corporativo | Modelo Asignado | Mandato Principal |
| :--- | :--- | :--- | :--- |
| **Capitán Jean-Luc Picard** | `The Captain / Product Owner` | **Humano (Vos)** | Requisitos supremos, visión de producto y aprobación ejecutiva final. |
| **Comandante William T. Riker** | `LeadAIOrchestrator` | Gemini 3.1 Pro | Coordina la tripulación, planifica el checklist, despacha subagentes y mantiene `tasks.md`. |
| **Tte. Cmdr. Data** | `SystemsLogicAnalyst` | Gemini 3.1 Pro | Modelado algorítmico formal, Lenguaje Ubicuo (DDD) y máquinas de estados (FSM). |
| **Tte. Cmdr. Geordi La Forge** | `ArchitectureLead` | Gemini 3.1 Pro | Monorepo, límites entre NestJS/Next/Expo/Astro y mentoría técnica para el Capitán. |
| **Tte. Cmdr. Worf** | `SecurityGuardrail` | Gemini 3.1 Pro / Flash | Escudos de ciberseguridad, validación de inputs, Semgrep y simulación Strix Red Team. |
| **Consejera Deanna Troi** | `DesignSystemEnforcer` | Gemini 3.1 Pro / Flash | Empatía UX/UI, accesibilidad WCAG AAA, CSS Modules, StyleSheet y físicas Apple HIG. |
| **Dra. Beverly Crusher** | `QualityHealthAuditor` | Gemini 3.1 Pro / Flash | Salud de código, Protocolo Ponytail (YAGNI/anti-bloat) y prohibición de polling. |
| **Alférez Wesley Crusher** | `TestAutomationRunner` | Gemini 3.8 Flash | Ejecución veloz de scripts, suites de tests unitarios y flujos Maestro E2E en mobile. |
| **Computadora de la Enterprise** | `RuntimeEnvironment` | Runtime Bash | Salidas deterministas de consola, telemetría del compilador y códigos de salida. |
| **Q (The Q Continuum)** | `MetaCriticEvaluator` | Gemini 3.1 Pro | Meta-evaluador omnisciente externo, auditoría de líneas temporales y pruebas de caos. |

---

## 🪝 Model Hooks Deterministas

Ubicados en `.agents/hooks/` y declarados en `.agents/hooks.json`:

1. **🛡️ Escudo de Seguridad de Worf (`worf-security-shield.js`) - `preToolUse`**:
   - Intercepta comandos de terminal antes de su ejecución.
   - Bloquea acciones destructivas (`rm -rf /`, piping a sh, `chmod 777`, escrituras directas a disco).
2. **🩺 Diagnóstico Médico de Crusher (`crusher-health-check.js`) - `postInvocation`**:
   - Diagnósticos posteriores a la generación de código.
   - Aplica el minimalismo Ponytail, bloquea el polling continuo (`setInterval`) y prohíbe Tailwind/NativeWind.
3. **📜 Registro del Captain's Log (`captains-log-writer.js`) - `postInvocation`**:
   - Escribe automáticamente la bitácora estructurada en `.agents/captains_log.json` y `.agents/captains_log.md`.
4. **🔄 Auditor de Ciclo de Vida de Skills (`skill-lifecycle-auditor.js`) - `preSkillInvocation`**:
   - Audita skills de terceros contra inyecciones de prompt y fugas de credenciales antes de instalarlas.
5. **🌌 Evaluador en Cascada (`cascade-evaluator.js`)**:
   - Identifica paquetes downstream afectados cuando se modifica código compartido.

---

## 💰 Control y Optimización de Tokens (6 Niveles)

1. **Enrutamiento Asimétrico 80/20**: Gemini 3.8 Flash ejecuta el 80% de la mecánica rutinaria; Gemini 3.1 Pro razona a nivel estratégico.
2. **Carga Perezosa (Lazy Loading)**: Solo se inyecta en el prompt la skill del oficial que está operando en esa fase.
3. **Cuarentena en Subagentes**: Las iteraciones largas de linters o tests corren en subagentes efímeros (`invoke_subagent`), devolviendo solo un reporte limpio de 5 líneas al chat del Capitán.
4. **Scoping por Grafo**: Se inyectan únicamente los fragmentos de código afectados en lugar de archivos completos.
5. **Circuit Breakers**: Corta bucles de autocorrección que fallen 3 veces consecutivas, escalando limpiamente al Capitán.
6. **Protocolo de Lenguaje Cognitivo (Ahorro del 30% al 50% de Tokens)**: Comprende y responde en el idioma nativo del Capitán (ej. español), pero ejecuta todo el Chain of Thought, análisis AST y prompts de subagentes en **inglés** para aprovechar al máximo la eficiencia del tokenizador BPE.

---

## 📥 Instalación y Configuración

Elegí el método de instalación que mejor se adapte a tu flujo de trabajo:

### Opción A: Instalador de una sola línea (Recomendado para proyectos o monorepos existentes)
Para integrar STNG-Framework en un proyecto o monorepo existente, ejecutá este comando en la raíz de tu repositorio:
```bash
curl -fsSL https://raw.githubusercontent.com/favioCesarJuan/STNG-framework/main/install.sh | bash
```
*Este comando instala automáticamente `.agents/hooks/`, `.agents/rules/`, las 7 skills canónicas en `.agents/skills/` y los scripts operativos.*

### Opción B: Clonar como Plantilla de Inicio (Proyecto Nuevo)
Para iniciar un nuevo proyecto con el framework preconfigurado:
```bash
# Clonar el repositorio
git clone https://github.com/favioCesarJuan/STNG-framework.git mi-proyecto-enterprise
cd mi-proyecto-enterprise

# Inicializar scripts y permisos
bash scripts/setup-environment.sh
```

### Opción C: Integración Manual
Si preferís control manual explícito:
```bash
git clone --depth 1 https://github.com/favioCesarJuan/STNG-framework.git /tmp/stng
cp -r /tmp/stng/.agents ./
cp -r /tmp/stng/scripts ./
cp /tmp/stng/templates/Agents.es.md ./Agents.md
cp /tmp/stng/templates/rules.es.md ./rules.md
rm -rf /tmp/stng
chmod +x scripts/*.sh .agents/hooks/*.js
```

---

## 🚀 Inicio Rápido y Verificación

### 1. Comprobar los Hooks
```bash
# Probar el escudo táctico de Worf
pnpm run shield:test

# Probar el diagnóstico médico de Crusher
pnpm run health:check --test

# Ver la bitácora del Captain's Log
pnpm run log:view
```

### 2. Validación de Pre-Commit
```bash
pnpm run pre-commit
```

---

## 🗺️ Hoja de Ruta (Fase 2)

- [x] **Fase 1 (Actual)**: Motor base adaptado para monorepos empresariales (paridad total con ExtraTime sin degradación).
- [ ] **Fase 2 (Próxima)**: Asistente CLI Universal (`npx @stng/cli init`) que interroga al desarrollador sobre su stack y genera automáticamente la tripulación y los hooks a medida.

---

## 📜 Licencia
Distribuido bajo la **Licencia MIT**. Consulte [LICENSE](LICENSE) para más detalles.

Desarrollado con honor por **Favio Cesar Juan** & La Tripulación de la Enterprise.
