# 📐 rules.es.md - Reglas Canónicas de Programación y Calidad

> **Framework**: STNG-Framework  
> **Estado**: Aprobado por el Capitán Picard  
> **Alcance**: Todo el Monorepo (`apps/*`, `packages/*`)  
> **Cumplimiento**: Pipelines de CI y Model Hooks de Antigravity  

---

## 1. Flujo de Desarrollo Obligatorio: TDD Estricto y Fast Path

### 1.1. TDD Estricto para Lógica Vital de Dominio (Test-First)
El ciclo Test-First (*Red -> Green -> Refactor*) es **obligatorio** antes de escribir código de producción en:
- Cálculos financieros y horarios, snapshots de tarifas y fórmulas de horas extras.
- Máquinas de estados finitos (FSM), transiciones de inicio/fin de jornada.
- Sincronización offline, cola outbox, claves de idempotencia y resolución de conflictos con UUIDv7.
- Validaciones de seguridad, cadenas de custodia con hash criptográfico y geocercas.

> **Regla de Oro**: Ningún PR que modifique código de dominio vital será aprobado sin un test unitario automatizado previo demostrando el comportamiento esperado.

### 1.2. Fast Path (Exención de Test-First)
Exentos de la obligación de Test-First:
- Maquetado visual, estilos CSS Modules y StyleSheet nativo.
- Copys de interfaz, etiquetas y diccionarios de traducción (i18n).
- Tipados estáticos de TypeScript en `@repo/shared-types` sin código ejecutable.
- Documentación y scripts de infraestructura no críticos.

*Validación*: Verificado mediante checks estáticos en CI: `check-types` + `lint` + `build`.

---

## 2. Directiva Permanente de Sincronización: Cero Sondeo Continuo
En estricto cumplimiento de `.agents/rules/prohibit-continuous-polling.md`:
1. **El sondeo continuo está terminantemente prohibido**: Cero bucles `setInterval` consultando el servidor cada N segundos.
2. **Arquitectura Reactiva por Eventos**:
   - La sincronización en tiempo real se basa en **WebSockets / Push**.
   - El tráfico en reposo es exactamente cero.
3. **Revalidación Puntual por Foco**:
   - En clientes móviles, las peticiones HTTP se disparan únicamente al abrir la pantalla o regresar de segundo plano (`AppState == 'active'`).

---

## 3. Gobernanza de Estilos: Estricto CSS3 y Native StyleSheet

### 3.1. Prohibición Total de TailwindCSS y NativeWind
- Queda prohibido instalar o importar `tailwindcss` o `nativewind` en cualquier parte del monorepo.
- **Web (`apps/web`, `apps/landing`)**: Usar **CSS Modules** (`*.module.css`) con variables CSS importadas desde `@repo/ui-tokens`.
- **Mobile (`apps/mobile`)**: Usar **`StyleSheet.create({ ... })`** nativo consumiendo los tokens de diseño centralizados.

### 3.2. Regla Cromática Canónica (60-30-10)
- **60% Superficie / Base**: Claro `#F9FAFB` / Oscuro Obsidian `#0F1117`.
- **30% Identidad Primaria**: Space Navy `#1E3A8A` / Porcelain Blue `#6B90D8`.
- **10% Acento Vital**: Malachite Green `#14532D` / Sage Green `#52A379`.

### 3.3. Estética Sobria "Anti-AI Slop"
- Prohibidos los brillos de neón exagerados, gradientes genéricos púrpura/cian y animaciones continuas de respiración.
- Transiciones fluidas con resortes físicos naturales (Apple HIG) y escala táctil `0.97 - 0.98`.
