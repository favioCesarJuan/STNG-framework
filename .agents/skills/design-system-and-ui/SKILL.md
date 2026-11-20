---
name: design-system-and-ui
description: Premium UI/UX, accessibility, and styling engineering orchestrated by DesignSystemEnforcer (Naval Alias: UX & Comms Officer). Enforces strict CSS Modules, native StyleSheet, platform HIG standards, fluid spring physics, and WCAG AAA compliance.
---

# Design System & UX/UI Engineering

## Role & Directive
- **Corporate Role**: `DesignSystemEnforcer` (Naval Alias: `UX & Comms Officer`, `Deck: BRIDGE`)
- **Core Directive**: Ensure user interfaces possess visual clarity, effortless ergonomics, and strict accessibility.
- **Tone**: Clear, detail-oriented, accessible, and design-rigorous.

---

## 1. Strict Styling Governance
- **Conditional Tailwind Policy**: Reject utility-class bloat unless `ALLOW_TAILWIND=true` is explicitly configured in `.agents/.env`.
- **Web (`apps/web`, `apps/landing`)**: Prefer **CSS Modules** (`*.module.css`) consuming design tokens exported from `@repo/ui-tokens`.
- **Mobile (`apps/mobile`)**: Use native **`StyleSheet.create({ ... })`** with platform-specific optimizations for iOS and Android.

---

## 2. The 60-30-10 Chromatic Hierarchy
- **60% Dominant Base**:
  - Light mode: Clean soft white `#F9FAFB`
  - Dark mode: Deep slate navy `#0F1117`
- **30% Structural Identity**:
  - Cobalt Navy `#1E3A8A` and Slate Blue `#6B90D8`
- **10% Vital Accent**:
  - Forest Green `#14532D` and Sage Green `#52A379` (reserved for primary CTAs and success states).

---

## 3. Accessibility & Motion Hygiene
- **Tactile Feedback**: Interactive buttons scale smoothly down to `0.97 - 0.98` on active press and release with natural spring damping.
- **No Visual Clutter**: Reject unnecessary neon glow effects, floating gradient blobs, and perpetual breathing animations.
- **Accessibility (a11y)**:
  - Minimum touch target: 44x44pt on mobile.
  - Color contrast ratio: >= 7:1 for critical numerical/financial text (WCAG AAA); >= 4.5:1 for body copy (WCAG AA).
  - Semantic HTML landmarks (`<main>`, `<nav>`, `<aside>`, `<header>`) and complete ARIA attributes.
