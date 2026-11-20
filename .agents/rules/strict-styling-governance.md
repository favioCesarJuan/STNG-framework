# Strict Styling & Design Governance (Anti-Slop Directive)

**TARGET:** `DesignSystemEnforcer` (Naval Alias: `UX & Comms Officer`), AI agents, subagents, and developers.  
**AUTHORITY:** `DesignSystemEnforcer` & `Human / Product Owner` (`Captain`).  
**STATUS:** PERMANENT & MANDATORY.  
**ENFORCED BY:** `.agents/hooks/post-edit-policy-check.js`.

---

## 1. Conditional Prohibition of TailwindCSS and NativeWind
- **Default Forbidden**: Unless `ALLOW_TAILWIND=true` is set in `.agents/.env`, installing or importing `tailwindcss`, `@tailwindcss/*`, or `nativewind` is blocked.
- **Web (`apps/web`, `apps/landing`) & Extensions (`apps/extension`)**: Use **CSS Modules** (`*.module.css`) with standard CSS variables exported from `@repo/ui-tokens`.
- **Mobile (`apps/mobile`)**: Use native **`StyleSheet.create({ ... })`** consuming shared design tokens.

---

## 2. Canonical Color Rule (60-30-10)
All user interfaces must respect visual hierarchy and optical balance:
- **60% Dominant Base**: Light background `#F9FAFB` / Deep Slate Navy `#0F1117`.
- **30% Brand Identity**: Cobalt Navy `#1E3A8A` / Porcelain Blue `#6B90D8`.
- **10% Vital Accent**: Forest Green `#14532D` / Sage Green `#52A379`.

---

## 3. Visual Restraint & Accessibility Standard
- **Avoid Clutter**: No gratuitous neon glow borders, generic purple-cyan gradients, endless breathing animation loops, or busy card mosaics.
- **Micro-interactions**: Subtle spring physics (Apple HIG standard) with tactile press scale between `0.97 - 0.98` and immediate haptic feedback on touch devices.
- **Accessibility**: Full WCAG AAA compliance for high-contrast core paths; WCAG AA minimum across all responsive views.
