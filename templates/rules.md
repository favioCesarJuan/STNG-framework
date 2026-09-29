# 📐 rules.md - Canonical Programming & Quality Rules

> **Framework**: STNG-Framework  
> **Status**: Approved by Captain Picard  
> **Scope**: Entire Monorepo (`apps/*`, `packages/*`)  
> **Enforcement**: Automated CI Pipelines & Antigravity Model Hooks  

---

## 1. Mandatory Development Workflow: Strict TDD & Fast Path

### 1.1. Strict TDD for Vital Domain Logic (Test-First)
The Test-First cycle (*Red -> Green -> Refactor*) is **mandatory** prior to writing production code for:
- Financial and worktime calculations, tariff snapshots, and overtime formulas.
- State machines (FSM), check-in/check-out lifecycle transitions.
- Offline synchronization, outbox queues, idempotency keys, and UUIDv7 conflict resolution.
- Security validations, cryptographic hashchains, and geofence perimeter checks.

> **Golden Rule**: No PR altering vital business domain code will be approved without an automated unit test proving expected behavior.

### 1.2. Fast Path (Exemption from Test-First)
Exempt from Test-First requirements:
- Visual UI layouts, CSS Modules, and native StyleSheet styling.
- Interface copy, labels, and i18n translation dictionaries.
- Pure static TypeScript types in `@repo/shared-types` without executable runtime code.
- Non-critical documentation and infrastructure helper scripts.

*Validation*: Verified by static CI checks: `check-types` + `lint` + `build`.

---

## 2. Permanent Synchronization Directive: Zero Continuous Polling
In strict accordance with `.agents/rules/prohibit-continuous-polling.md`:
1. **Continuous Polling is Strictly Forbidden**: No `setInterval` loops polling the server every N seconds.
2. **Event-Driven Reactive Architecture**:
   - Real-time client-server synchronization relies on **WebSockets / Push**.
   - Idle network traffic is exactly zero.
3. **On-Demand Focus Revalidation**:
   - On mobile clients, HTTP revalidations fire only on app foreground transitions (`AppState == 'active'`) or pull-to-refresh gestures.

---

## 3. Styling Governance: Strict CSS3 & Native StyleSheet

### 3.1. Absolute Prohibition of TailwindCSS & NativeWind
- Do not install or import `tailwindcss` or `nativewind` anywhere in the monorepo.
- **Web (`apps/web`, `apps/landing`)**: Use **CSS Modules** (`*.module.css`) with standard CSS variables exported from `@repo/ui-tokens`.
- **Mobile (`apps/mobile`)**: Use native **`StyleSheet.create({ ... })`** consuming central design tokens.

### 3.2. Canonical Chromatic Rule (60-30-10)
- **60% Base Surface**: Light `#F9FAFB` / Dark Obsidian `#0F1117`.
- **30% Primary Brand**: Space Navy `#1E3A8A` / Porcelain Blue `#6B90D8`.
- **10% Vital Accent**: Malachite Green `#14532D` / Sage Green `#52A379`.

### 3.3. Anti-AI Slop Aesthetic
- Reject tacky neon glows, generic purple-cyan gradients, and continuous breathing animation loops.
- Use natural spring physics (Apple HIG standards) with tactile press scale between `0.97 - 0.98`.
