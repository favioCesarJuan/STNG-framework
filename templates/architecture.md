# 🏛️ architecture.md - Hexagonal Monorepo Architecture Blueprint

> **Framework**: STNG-Framework  
> **Lead Architect**: Lt. Cmdr. Geordi La Forge & Lt. Cmdr. Data  

---

## 1. Monorepo Directory Topology

```
monorepo/
├── apps/
│   ├── api/            # NestJS Backend (Hexagonal Architecture)
│   ├── web/            # Next.js App Router (Supervisor / Corporate Web)
│   ├── mobile/         # Expo SDK / React Native (Worker Mobile App)
│   ├── landing/        # Astro (Marketing & Public Portal)
│   └── extension/      # Chrome/Brave Extension
│
├── packages/
│   ├── shared-types/   # Canonical TypeScript interfaces (Zero executable logic)
│   ├── shared-utils/   # Pure domain utility functions & financial calculators
│   └── ui-tokens/      # Design tokens (Colors, Typography, Spacing, Shadows)
│
└── .agents/            # STNG Multi-Agent Governance Engine
```

---

## 2. Hexagonal Architecture (Ports & Adapters)

### Backend Rules (`apps/api`):
1. **Core Domain**: Pure entities and value objects. Depends on nothing external.
2. **Ports**: Inbound and Outbound interfaces defined in the application layer.
3. **Adapters**:
   - Inbound: NestJS REST Controllers, WebSocket Gateways.
   - Outbound: Drizzle ORM database repositories, external notification clients.

---

## 3. Dependency Flow Rules
- `apps/*` may depend on `packages/*`.
- `packages/*` must **NEVER** depend on `apps/*`.
- `packages/shared-types` must have zero runtime dependencies.
- No circular dependencies permitted between sibling packages.
