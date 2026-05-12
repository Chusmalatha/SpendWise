# SpendWise AI — System Prompts

SpendWise AI uses a strictly deterministic engine for calculations and relies on Large Language Models (LLMs) only for qualitative narrative generation. This ensures 100% financial accuracy while providing a premium, human-readable experience.

## Executive Summary Prompt
**Model**: `google/gemma-2b-it` (Hugging Face Inference API)

### Prompt Template
```text
Act as a senior financial analyst and AI consultant. Write a professional, detailed Executive Summary for an AI tool spend audit.

Data points to include:
- Current monthly spend: ${totalMonthlySpend}
- Projected monthly savings: ${projectedMonthlySavings}
- Tools analyzed: {toolsAnalyzed}
- Overpayments found: {overpaymentsFound}

Format requirements:
- Write exactly 2 or 3 short paragraphs.
- Keep it professional, encouraging, and highly analytical.
- Directly address the user (e.g., "Your team...").
- Do NOT use markdown formatting like asterisks or bold text.
```

## Strategy & Guardrails
1. **No Math in LLM**: We never ask the LLM to calculate savings. All variables (spend, savings, tool counts) are pre-calculated by the Python backend and injected into the prompt.
2. **Plain Text Response**: We explicitly disable markdown in the prompt to ensure the output renders consistently within our UI components without unexpected formatting breaks.
3. **Professional Persona**: The "Senior Financial Analyst" persona ensures the tone is appropriate for B2B stakeholders and CTOs.
4. **Fallback Mechanism**: If the LLM API is unavailable, the system utilizes a high-quality template-based generator to ensure the user always receives a summary.
