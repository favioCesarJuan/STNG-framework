# 🧠 memory.md - Persistent Contextual Memory & ADRs

> **Framework**: STNG-Framework  
> **Custodians**: Lt. Cmdr. Data, Lt. Cmdr. Geordi La Forge & Dr. Beverly Crusher  
> **Omniscient Meta-Critic**: Q (The Q Continuum)  

---

## 🏛️ 1. Project Identity & Fundamental Mission
- **Project Name**: [Project Name]
- **Core Mission**: [Mission statement describing the product's primary value proposition].
- **Vital Data Invariants**: [State the inviolable data types, e.g. financial accuracy, time preservation].

---

## 📖 2. Ubiquitous Language & Domain Glossary (DDD)

| Domain Term | Technical Definition | Associated Entity / Code Reference |
| :--- | :--- | :--- |
| **Vital Entity** | Core business unit whose integrity cannot be compromised. | `VitalEntity` |
| **Snapshot** | Immutable frozen state of a record at calculation time. | `RecordSnapshot` |
| **Outbox Queue** | Local queue storing offline events for idempotent synchronization. | `outbox_queue` |
| **Idempotency Key** | UUIDv7 time-sortable token preventing duplicate creations on network retries. | `client_uuid` |

---

## ⚖️ 3. Architecture Decision Records (Historical ADRs)

### ADR 001: Monorepo Topology with Turborepo and `pnpm`
- **Context**: Need to share types, utilities, and tokens across web, mobile, and backend without version drift.
- **Decision**: Centralize all apps and libraries in a single Turborepo.
- **Consequences**: Fast incremental builds, shared contracts, no package publishing overhead.

### ADR 002: Dual Persistence (Cloud Relational + Local Embedded SQLite)
- **Context**: Mobile clients must work offline in low-connectivity areas.
- **Decision**: PostgreSQL on backend, embedded SQLite on mobile client.
- **Consequences**: Offline-first capability with eventual consistency via outbox queue.

### ADR 003: Event-Driven Real-Time (Prohibition of Continuous Polling)
- **Context**: Continuous polling drains mobile battery and overloads serverless backends.
- **Decision**: Strictly prohibit `setInterval` loops; use WebSockets/Push and focus revalidation.
- **Consequences**: Zero idle network traffic, instant client updates.

### ADR 004: Pure CSS Modules & Native StyleSheet (Prohibition of Tailwind)
- **Context**: High performance, zero runtime overhead, native platform ergonomics.
- **Decision**: Use CSS Modules for Web and `StyleSheet.create` for React Native.
- **Consequences**: Cleaner bundle size, complete accessibility control.
