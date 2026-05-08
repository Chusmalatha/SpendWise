from typing import List

# Ported from frontend mockData
PRICING_DATA = {
  'chatgpt': {'free': 0, 'pro': 20, 'team': 25, 'enterprise': 60},
  'claude': {'free': 0, 'pro': 20, 'team': 25, 'enterprise': 60},
  'cursor': {'free': 0, 'pro': 20, 'team': 40, 'enterprise': 100},
  'github-copilot': {'free': 0, 'pro': 10, 'team': 19, 'enterprise': 39},
  'gemini': {'free': 0, 'pro': 20, 'team': 24, 'enterprise': 50},
  'openai-api': {'free': 0, 'pro': 50, 'team': 150, 'enterprise': 500},
  'anthropic-api': {'free': 0, 'pro': 40, 'team': 120, 'enterprise': 400},
  'windsurf': {'free': 0, 'pro': 15, 'team': 35, 'enterprise': 80},
}

def analyze_spend(tools: List) -> dict:
    """Analyze the user's tools and generate recommendations"""
    total_monthly = 0
    tools_analyzed = len(tools)
    
    # Calculate current spend
    for t in tools:
        if t.monthlySpend:
            total_monthly += int(t.monthlySpend) * int(t.seats or 1)
            
    total_annual = total_monthly * 12
    
    # Initialize recommended costs to current costs
    tool_recommended_cost = {}
    for t in tools:
        cost = int(t.monthlySpend) * int(t.seats or 1)
        tool_recommended_cost[t.toolName] = tool_recommended_cost.get(t.toolName, 0) + cost
    
    # Hardcoded logic/rules for demo purposes
    recommendations = []
    suggested_actions = []
    projected_savings = 0
    overpayments = 0
    
    tool_names = [t.toolName for t in tools]
    
    # Rule 1: ChatGPT Pro vs Claude Pro
    if 'chatgpt' in tool_names and 'claude' in tool_names:
        chatgpt_cost = tool_recommended_cost.get('chatgpt', 0)
        claude_cost = tool_recommended_cost.get('claude', 0)
        
        if chatgpt_cost > 0:
            overpayments += 1
            projected_savings += chatgpt_cost
            tool_recommended_cost['chatgpt'] = 0
            
            savings_pct = int((chatgpt_cost / (chatgpt_cost + claude_cost)) * 100) if (chatgpt_cost + claude_cost) > 0 else 50
            
            recommendations.append({
                "id": 1,
                "currentTool": "ChatGPT & Claude",
                "currentCost": chatgpt_cost + claude_cost,
                "recommendedTool": "Claude Pro Only",
                "recommendedCost": claude_cost,
                "savings": chatgpt_cost,
                "reason": f"You are paying for both ChatGPT and Claude. Pick one to save {savings_pct}%. Claude is recommended for coding.",
                "savingsPercent": savings_pct,
                "quality": "save",
                "tags": ["Redundant Tool"]
            })
            suggested_actions.append({
                "action": "Cancel ChatGPT Plus subscription",
                "priority": "High",
                "effort": "Low",
                "saving": chatgpt_cost
            })

    # Rule 2: API vs Subscription
    if 'openai-api' in tool_names and 'chatgpt' in tool_names:
        chatgpt_cost = tool_recommended_cost.get('chatgpt', 0)
        api_cost = tool_recommended_cost.get('openai-api', 0)
        
        if chatgpt_cost > 0:
            overpayments += 1
            projected_savings += chatgpt_cost
            tool_recommended_cost['chatgpt'] = 0
            
            savings_pct = int((chatgpt_cost / (chatgpt_cost + api_cost)) * 100) if (chatgpt_cost + api_cost) > 0 else 28

            recommendations.append({
                "id": 2,
                "currentTool": "ChatGPT Pro + API",
                "currentCost": chatgpt_cost + api_cost,
                "recommendedTool": "OpenAI API Only",
                "recommendedCost": api_cost,
                "savings": chatgpt_cost,
                "reason": "You use the API heavily. You can cancel the web interface and build a simple UI or use open-source clients.",
                "savingsPercent": savings_pct,
                "quality": "save",
                "tags": ["Optimization"]
            })
            suggested_actions.append({
                "action": "Cancel ChatGPT Plus, use API keys with LibreChat",
                "priority": "Medium",
                "effort": "Medium",
                "saving": chatgpt_cost
            })
        
    # If no specific rules match but they have tools, give a generic savings
    if overpayments == 0 and total_monthly > 0:
        savings = int(total_monthly * 0.15) # 15% generic saving
        projected_savings += savings
        
        # Proportionally reduce all tools
        for tool, cost in tool_recommended_cost.items():
            reduction = int((cost / total_monthly) * savings)
            tool_recommended_cost[tool] = max(0, cost - reduction)
            
        recommendations.append({
            "id": 3,
            "currentTool": "Current Stack",
            "currentCost": total_monthly,
            "recommendedTool": "Optimized Stack",
            "recommendedCost": total_monthly - savings,
            "savings": savings,
            "reason": "Consolidating inactive seats and switching to annual billing can save you ~15%.",
            "savingsPercent": 15,
            "quality": "save",
            "tags": ["Annual Billing", "Seat Audit"]
        })
        suggested_actions.append({
            "action": "Audit inactive seats and switch to annual billing",
            "priority": "Low",
            "effort": "Medium",
            "saving": savings
        })

    # Generate spend breakdown for chart
    aggregated_tools = {}
    for t in tools:
        cost = int(t.monthlySpend) * int(t.seats or 1)
        name = t.toolName
        if name in aggregated_tools:
            aggregated_tools[name]['spend'] += cost
        else:
            aggregated_tools[name] = {
                'title': name.replace('-', ' ').title(),
                'spend': cost
            }

    spend_breakdown = []
    for tool_id, data in aggregated_tools.items():
        spend_breakdown.append({
            "name": data['title'],
            "spend": data['spend'],
            "recommended": tool_recommended_cost.get(tool_id, data['spend'])
        })

    savings_percent = int((projected_savings / total_monthly) * 100) if total_monthly > 0 else 0

    return {
        "totalMonthlySpend": total_monthly,
        "totalAnnualSpend": total_annual,
        "projectedMonthlySavings": projected_savings,
        "projectedAnnualSavings": projected_savings * 12,
        "savingsPercent": savings_percent,
        "toolsAnalyzed": tools_analyzed,
        "overpaymentsFound": overpayments or 1,
        "recommendations": recommendations,
        "spendBreakdown": spend_breakdown,
        "suggestedActions": suggested_actions,
        "aiSummary": "" # LLM will fill this in
    }
