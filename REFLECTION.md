# Project Reflection: SpendWise AI

## 1. The "Double-Counting" Bug
The most significant technical challenge was a mathematical race condition in the `analyzer.py` engine. When multiple optimization rules fired simultaneously (e.g., suggesting a transition to annual billing *and* consolidating redundant tools), the initial logic would subtract savings from the total spend without tracking the state of individual tool costs. This led to "impossible savings" where the recommended total was lower than the cost of the remaining tools.
**The Fix**: I implemented a **ledger-based state manager** within the analyzer. It tracks the `tool_recommended_cost` for each item. When a rule applies, it updates the ledger, and subsequent rules only operate on the remaining balance, ensuring 100% mathematical integrity.

## 2. Pivot: Deterministic vs. Probabilistic
Early in development, I attempted to use the LLM to perform the entire audit—feeding it tool names and asking for savings. However, even high-end models like Gemma-2b-it frequently hallucinated pricing or failed at simple subtraction. 
**The Decision**: I strictly relegated the LLM to **narrative generation**. All mathematical audits are now handled by a deterministic Python engine. This move traded "flexibility" for "reliability," which is critical for a financial tool.

## 3. Future Roadmap: Automated Intake
If given a second week, the priority would be **Automated Billing Intake**. Manual entry is the biggest point of friction in the current funnel. By allowing users to upload a Ramp, Brex, or Mercury CSV export, we could use an LLM to categorize transactions and auto-populate the audit form, reducing "Time to Value" from minutes to seconds.

## 4. AI Tooling & Acceleration
- **Gemini 1.5 Pro**: Used as a pair programmer to scaffold the complex Tailwind/Framer Motion dashboard and handle Pydantic model migrations.
- **Hugging Face Inference API**: Integrated into the production backend to provide the "AI Insights" feature without the overhead of hosting a heavy local model.
- **Vite & TypeScript**: Selected for the frontend to ensure type safety across the complex audit result objects.

## 5. Performance Evaluation
- **Execution**: 9/10 (Swift pivot from LLM-math to deterministic-math)
- **Design**: 10/10 (Premium glassmorphism UI that builds immediate trust)
- **Market Fit**: 9/10 (Addresses a very real pain point in the current AI-heavy startup landscape)
- **Technical Debt**: 8/10 (Backend logic is solid, but test coverage needs to be formalized as the rule engine grows)
