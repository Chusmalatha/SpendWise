import os
import httpx

async def generate_summary(audit_data: dict) -> str:
    """Uses Hugging Face free API to generate a personalized summary"""
    
    hf_key = os.getenv("HUGGINGFACE_API_KEY")
    if not hf_key or hf_key == "your_huggingface_key_here":
        # Fallback if no key is provided
        spend = audit_data.get("totalMonthlySpend", 0)
        savings = audit_data.get("projectedMonthlySavings", 0)
        tools = audit_data.get("toolsAnalyzed", 0)
        
        
        if savings > 0:
            return (
                f"We conducted a comprehensive audit of your {tools} active AI subscriptions, which currently account for ${spend} in monthly recurring revenue.\n\n"
                f"Our proprietary engine identified immediate optimization opportunities totaling ${savings}/month, representing a {audit_data.get('savingsPercent')}% reduction in your overall AI spend. "
                f"The primary driver of these savings is the consolidation of redundant chat interfaces and transitioning heavy usage to pay-per-use APIs.\n\n"
                f"By executing the suggested actions below, your team can maintain full technical capabilities and throughput while entirely eliminating wasted seat licenses and overlapping subscriptions."
            )
        else:
            return (
                f"We conducted a comprehensive audit of your {tools} active AI subscriptions, which currently account for ${spend} in monthly recurring revenue.\n\n"
                f"Your current stack is already highly optimized. We did not detect any major redundancies or overlapping subscriptions among the tools analyzed. "
                f"Your team is effectively utilizing its current AI budget without unnecessary waste.\n\n"
                f"We recommend continuing to monitor seat utilization as your team scales to maintain this high level of operational efficiency."
            )

    # Using a fast, free inference model from Hugging Face
    API_URL = "https://api-inference.huggingface.co/models/google/gemma-2b-it"
    headers = {"Authorization": f"Bearer {hf_key}"}
    
    prompt = f"""
    Act as a senior financial analyst and AI consultant. Write a professional, detailed Executive Summary for an AI tool spend audit.
    
    Data points to include:
    - Current monthly spend: ${audit_data.get('totalMonthlySpend')}
    - Projected monthly savings: ${audit_data.get('projectedMonthlySavings')}
    - Tools analyzed: {audit_data.get('toolsAnalyzed')}
    - Overpayments found: {audit_data.get('overpaymentsFound')}
    
    Format requirements:
    - Write exactly 2 or 3 short paragraphs.
    - Keep it professional, encouraging, and highly analytical.
    - Directly address the user (e.g., "Your team...").
    - Do NOT use markdown formatting like asterisks or bold text.
    """
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_URL, 
                headers=headers, 
                json={"inputs": prompt, "parameters": {"max_new_tokens": 250, "temperature": 0.7}},
                timeout=10.0
            )
            
            if response.status_code == 200:
                result = response.json()
                generated_text = result[0].get("generated_text", "")
                # Clean up prompt from response
                summary = generated_text.replace(prompt, "").strip()
                return summary
            else:
                print(f"HF API Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Failed to connect to Hugging Face: {e}")
        
    spend = audit_data.get("totalMonthlySpend", 0)
    savings = audit_data.get("projectedMonthlySavings", 0)
    tools = audit_data.get("toolsAnalyzed", 0)
    
    if savings > 0:
        return (
            f"We conducted a comprehensive audit of your {tools} active AI subscriptions, which currently account for ${spend} in monthly recurring revenue.\n\n"
            f"Our proprietary engine identified immediate optimization opportunities totaling ${savings}/month, representing a {audit_data.get('savingsPercent')}% reduction in your overall AI spend. "
            f"The primary driver of these savings is the consolidation of redundant chat interfaces and transitioning heavy usage to pay-per-use APIs.\n\n"
            f"By executing the suggested actions below, your team can maintain full technical capabilities and throughput while entirely eliminating wasted seat licenses and overlapping subscriptions."
        )
    else:
        return (
            f"We conducted a comprehensive audit of your {tools} active AI subscriptions, which currently account for ${spend} in monthly recurring revenue.\n\n"
            f"Your current stack is already highly optimized. We did not detect any major redundancies or overlapping subscriptions among the tools analyzed. "
            f"Your team is effectively utilizing its current AI budget without unnecessary waste.\n\n"
            f"We recommend continuing to monitor seat utilization as your team scales to maintain this high level of operational efficiency."
        )
