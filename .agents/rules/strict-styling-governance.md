# 💄 Strict Styling & Design Governance (Anti-AI Slop Directive)

**TARGET:** Counselor Deanna Troi (DesignSystemEnforcer), AI agents, subagents, and developers.  
**AUTHORITY:** Counselor Deanna Troi & Captain Jean-Luc Picard.  
**STATUS:** PERMANENT & MANDATORY.  
**ENFORCED BY:** `.agents/hooks/crusher-health-check.js`.

---

## 1. Absolute Prohibition of TailwindCSS and NativeWind
- **Forbidden**: Installing or importing `tailwindcss`, `@tailwindcss/*`, or `nativewind` anywhere across the monorepo.
- **Web (`apps/web`, `apps/landing`) & Extensions (`apps/extension`)**: Use **CSS Modules** (`*.module.css`) with standard CSS variables exported from `@repo/ui-tokens`.
- **Mobile (`apps/mobile`)**: Use native **`StyleSheet.create({ ... })`** consuming the shared design tokens.

---

## 2. Canonical Color Rule (60-30-10)
All user interfaces must respect visual hierarchy and optical balance:
- **60% Dominant Base**: Light background `#F9FAFB` / Dark Obsidian `#0F1117`.
- **30% Brand Identity**: Space Navy `#1E3A8A` / Porcelain Blue `#6B90D8`.
- **10% Vital Accent**: Malachite Green `#14532D` / Sage Green `#52A379`.

---

## 3. Sobriety & "Anti-AI Slop" Visual Standard
- **Forbidden**: Neon glow borders, generic purple-cyan gradients, endless breathing animation loops, and hyper-busy card mosaics.
- **Micro-interactions**: Subtle spring physics (Apple HIG standard) with tactile press scale between `0.97 - 0.98` and immediate haptic feedback on touch devices.
- **Accessibility**: Full WCAG AAA compliance for high-contrast core paths; WCAG AA minimum across all responsive views.
