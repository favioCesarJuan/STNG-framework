# 🛑 Architectural Directive: Prohibition of Continuous Polling (No Continuous Polling)

**TARGET:** All AI agents (Antigravity / Gemini CLI), subagents, and developers.  
**AUTHORITY:** Captain Jean-Luc Picard & Dr. Beverly Crusher (Ponytail Protocol / Health & Efficiency).  
**STATUS:** PERMANENT, DETERMINISTIC, NON-NEGOTIABLE.  
**ENFORCED BY:** `.agents/hooks/crusher-health-check.js` (`postInvocation`).

---

## 1. Mandatory Rule
It is **STRICTLY FORBIDDEN** to implement, suggest, or scaffold continuous periodic polling (`setInterval`, loops of polling every N seconds, `useInterval`, background polling in lambdas or clients) to synchronize business states or lower-frequency events (such as employee status changes, role updates, approvals, configurations, or staff check-ins).

---

## 2. Technical Justification
1. **Battery and CPU Drain on Mobile Devices:** Continuous network timers keep mobile radios (LTE/5G/Wi-Fi) powered on and repeatedly wake the CPU, severely degrading battery lifespan and consuming cellular data allowances.
2. **Useless Saturation of Serverless Infrastructure:** Thousands of periodic requests looping to query an intermittently changing state flood serverless handlers (Vercel/NestJS), driving up compute costs, latency, and rate limits.
3. **Destruction of the Observer Pattern:** Modern reactive architectures rely on event-driven mechanics (WebSockets / Push / DeviceEventEmitter). Continuous polling breaks reactive architecture purity.

---

## 3. Official & Mandatory Architecture (The Synchronization Standard)

For any synchronization between Web, Mobile, and Personal views, agents MUST apply **ONLY** the following model:

```
                                  [Server / API]
                                         │
           ┌─────────────────────────────┴─────────────────────────────┐
           ▼                                                           ▼
[Reactive Channel: WebSockets / Push]                        [On-Demand Focus Revalidation]
• Instant broadcast upon mutation                            • 1 single request on screen mount
• Clients receive events in milliseconds                     • 1 single request on return from background
• Zero HTTP requests at idle rest                            • 1 single request on Pull-to-refresh
```

### Implementation Directives:
1. **Event Reactivity (Push / WebSockets / EventBus):**
   - The server emits granular business events (`corporate_staff_updated`, `employee_status_updated`).
   - The client subscribes to these channels and reacts immediately.
   - On mobile, complement with `DeviceEventEmitter` for instant inter-screen local notifications.

2. **On-Demand Focus Revalidation (Focus / Visibility Revalidation):**
   - **In Mobile (React Native / Expo):** Use `useFocusEffect` or `AppState.addEventListener('change', ...)` to trigger **a single request** when the user opens the screen or returns to foreground.
   - **In Web (Next.js / React):** Use `window.addEventListener('focus', ...)` and `document.addEventListener('visibilitychange', ...)`.
   - **User gestures:** Support explicit `RefreshControl` (Pull-to-refresh).

3. **Zero Polling Timers:**
   - Never declare `setInterval` to query the API in a repetitive loop.
