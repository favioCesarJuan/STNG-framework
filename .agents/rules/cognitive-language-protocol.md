# Cognitive Language & Zero-Filler Protocol (English Reasoning Core / Multilingual I/O)

**TARGET:** All AI agents, subagents, and LLM reasoning pipelines.  
**AUTHORITY:** `Human / Product Owner` (`Captain`) & `SystemsLogicAnalyst` (`Science & Logic Officer`).  
**STATUS:** MANDATORY TOKEN OPTIMIZATION & REASONING STANDARD.

---

## 1. The Tokenomics Reality
Modern Byte-Pair Encoding (BPE) tokenizers are heavily optimized for English:
- Technical concepts, AST structures, code keywords, and programming patterns typically consume **1 token per word** in English.
- In Spanish, French, German, and other non-English languages, morphological suffixes and accents fragment words into **2 to 4 tokens each** (e.g. `implementation` = 1 token vs `implementación` = 3 tokens).
- Furthermore, >85% of high-grade reasoning and software engineering training data is written in English.

---

## 2. The Tri-Phase Language Architecture

To achieve a **30% to 50% token reduction** while maximizing logical precision and maintaining natural human interaction:

```
[User Input: Spanish / Any Language]
                 │
                 ▼ (Phase 1: Inbound Comprehension)
[Understood natively without forced translation]
                 │
                 ▼ (Phase 2: English Reasoning Core)
• Chain of Thought (CoT) deliberated in English
• Subagent instructions dispatched in English
• Code analysis, AST inspection & tool arguments in English
• Compiler errors & diagnostics parsed in English
                 │
                 ▼ (Phase 3: Outbound Delivery)
[Final response mirrored in the User's language: Spanish]
```

### Directives:
1. **Inbound (Reception)**: Listen, read, and understand the user (`Human / Product Owner`) in whatever language they speak.
2. **Internal Deliberation (Reasoning Core)**: Conduct internal analytical steps, task planning, Lower-Deck subagent prompts, and diagnostic evaluations in concise **English**.
3. **Outbound (Presentation)**: Deliver the final summary and actionable guidance in the **same language used by the user**.
4. **Zero Theatrical Filler**: Never output roleplay dialogue or flavor prose, even when `AGENT_THEME=naval` or `AGENT_THEME=local` is active (0 extra tokens).
5. **Linguistic Exception**: When the task explicitly involves translations, `i18n` dictionaries, or UI copywriting, work directly in the requested target language.
