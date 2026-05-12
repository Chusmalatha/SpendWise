// src/utils/auditEngine.ts
// Pure deterministic rules — NO AI, NO randomness.
// Every recommendation traces to an official pricing URL.

export interface ToolInput {
  toolName: string;
  planType: string;
  monthlySpend: number; // per seat
  seats: number;
  useCase: string;
}

export interface Recommendation {
  id: number;
  currentTool: string;
  currentPlanLabel: string;
  currentCost: number; // total (spend * seats)
  recommendedTool: string;
  recommendedPlanLabel: string;
  recommendedCost: number; // total
  savings: number; // positive = saves money
  savingsPercent: number;
  reason: string;
  quality: 'save' | 'upgrade' | 'optimal';
  tags: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface AuditResult {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  projectedMonthlySavings: number;
  projectedAnnualSavings: number;
  savingsPercent: number;
  toolsAnalyzed: number;
  overpaymentsFound: number;
  recommendations: Recommendation[];
  spendBreakdown: { name: string; spend: number; recommended: number; category?: string }[];
  suggestedActions: { priority: string; action: string; saving: number; effort: string }[];
  aiSummary: string; // filled in later by LLM call
}

// ─── Rule helpers ────────────────────────────────────────────────────────────

function isCodingUseCase(useCase: string) {
  return useCase === 'coding' || useCase === 'mixed';
}

function isWritingOrResearch(useCase: string) {
  return useCase === 'writing' || useCase === 'research' || useCase === 'data-analysis';
}

// ─── Per-tool audit rules ─────────────────────────────────────────────────────

function auditCursor(tool: ToolInput, id: number): Recommendation | null {
  const total = tool.monthlySpend * tool.seats;

  // Rule: Solo dev on Teams ($40/seat) → should be on Pro ($20/seat)
  if (tool.planType === 'team' && tool.seats <= 2) {
    const recommended = 20 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: `Cursor Teams`,
      currentPlanLabel: 'Teams ($40/seat/mo)',
      currentCost: total,
      recommendedTool: 'Cursor Pro',
      recommendedPlanLabel: 'Pro ($20/seat/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `Teams plan adds shared billing and SSO — unnecessary for ≤2 developers. Pro gives identical AI access at half the seat price. Source: cursor.com/pricing`,
      quality: 'save',
      tags: ['50% cheaper', 'Same AI access'],
      priority: 'high',
    };
  }

  // Rule: Ultra ($200) for writing/research use case → Pro ($20) is sufficient
  if (tool.planType === 'ultra' && isWritingOrResearch(tool.useCase)) {
    const recommended = 20 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: `Cursor Ultra`,
      currentPlanLabel: 'Ultra ($200/mo)',
      currentCost: total,
      recommendedTool: 'Cursor Pro',
      recommendedPlanLabel: 'Pro ($20/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `Ultra's 20x usage pool is designed for developers running intensive agentic coding sessions all day. For ${tool.useCase} tasks, Cursor Pro's $20 credit pool is more than sufficient. Source: cursor.com/pricing`,
      quality: 'save',
      tags: [`${Math.round((savings / total) * 100)}% cheaper`, 'Right-sized plan'],
      priority: 'high',
    };
  }

  // Rule: Pro+ ($60) for light/writing use → consider Pro ($20)
  if (tool.planType === 'pro-plus' && !isCodingUseCase(tool.useCase)) {
    const recommended = 20 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: `Cursor Pro+`,
      currentPlanLabel: 'Pro+ ($60/mo)',
      currentCost: total,
      recommendedTool: 'Cursor Pro',
      recommendedPlanLabel: 'Pro ($20/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `Pro+ gives 3x the credit pool for heavy model usage — justified only if you exhaust Pro's $20 credits monthly. For ${tool.useCase} workflows, Pro at $20/mo covers typical usage. Source: cursor.com/pricing`,
      quality: 'save',
      tags: ['67% cheaper', 'Downgrade if credits unused'],
      priority: 'medium',
    };
  }

  return null; // already optimal
}

function auditGithubCopilot(tool: ToolInput, id: number): Recommendation | null {
  const total = tool.monthlySpend * tool.seats;

  // Rule: Business ($19) for 1-2 devs who don't need org controls → Pro ($10)
  if (tool.planType === 'business' && tool.seats <= 2) {
    const recommended = 10 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: 'GitHub Copilot Business',
      currentPlanLabel: 'Business ($19/seat/mo)',
      currentCost: total,
      recommendedTool: 'GitHub Copilot Pro',
      recommendedPlanLabel: 'Pro ($10/seat/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `Business adds org-wide policy controls, audit logs, and IP indemnity — value that starts to matter at 5+ developers. With ${tool.seats} dev(s), Pro gives identical AI completions and chat at $10/mo. Source: docs.github.com/copilot`,
      quality: 'save',
      tags: ['47% cheaper', 'Same completions'],
      priority: 'high',
    };
  }

  // Rule: Enterprise ($39/seat) for teams under 50 → Business ($19) usually sufficient
  if (tool.planType === 'enterprise' && tool.seats < 50) {
    const recommended = 19 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: 'GitHub Copilot Enterprise',
      currentPlanLabel: 'Enterprise ($39/seat/mo)',
      currentCost: total,
      recommendedTool: 'GitHub Copilot Business',
      recommendedPlanLabel: 'Business ($19/seat/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `Enterprise adds fine-tuning on private codebases and Knowledge Bases — typically justified at 50+ developers with large proprietary repos. Business provides organization-level controls, SSO, and IP indemnity at half the price. Source: docs.github.com/copilot/get-started/plans`,
      quality: 'save',
      tags: ['51% cheaper', 'Audit controls still included'],
      priority: 'medium',
    };
  }

  return null;
}

function auditClaude(tool: ToolInput, id: number): Recommendation | null {
  const total = tool.monthlySpend * tool.seats;

  // Rule: Max 20x ($200) for coding → consider Claude Pro ($20) + Cursor for coding
  if (tool.planType === 'max20x' && isCodingUseCase(tool.useCase)) {
    return {
      id,
      currentTool: 'Claude Max 20x',
      currentPlanLabel: 'Max 20x ($200/mo)',
      currentCost: total,
      recommendedTool: 'Claude Pro + Cursor Pro',
      recommendedPlanLabel: 'Pro ($20/mo) + Cursor Pro ($20/mo)',
      recommendedCost: 40 * tool.seats,
      savings: total - 40 * tool.seats,
      savingsPercent: Math.round(((total - 40 * tool.seats) / total) * 100),
      reason: `Max 20x is for users hitting daily message limits on long sessions. For coding workflows, Cursor Pro gives a purpose-built agentic IDE with Claude access at $20/mo. Pairing Claude Pro ($20) + Cursor Pro ($20) covers both chat and coding at $160/mo less. Source: claude.com/pricing`,
      quality: 'save',
      tags: ['80% cheaper', 'Better coding experience'],
      priority: 'high',
    };
  }

  // Rule: Team ($25/seat) with only 1 seat → Pro ($20) is cheaper and equivalent
  if ((tool.planType === 'team' || tool.planType === 'team-premium') && tool.seats < 5) {
    const singlePrice = tool.planType === 'team' ? 25 : 125;
    const proPrice = tool.planType === 'team' ? 20 : 100;
    const recommended = proPrice * tool.seats;
    const savings = total - recommended;
    if (savings > 0) {
      return {
        id,
        currentTool: `Claude ${tool.planType === 'team' ? 'Team' : 'Team Premium'}`,
        currentPlanLabel: `${tool.planType === 'team' ? 'Team ($25/seat/mo)' : 'Team Premium ($125/seat/mo)'}`,
        currentCost: total,
        recommendedTool: `Claude ${tool.planType === 'team' ? 'Pro' : 'Max 5x'}`,
        recommendedPlanLabel: `${tool.planType === 'team' ? 'Pro ($20/mo)' : 'Max 5x ($100/mo)'}`,
        recommendedCost: recommended,
        savings,
        savingsPercent: Math.round((savings / total) * 100),
        reason: `Claude Team requires a minimum of 5 seats and adds workspace admin controls and centralized billing. Under 5 users, individual Pro/Max plans provide the same model access without the seat-count overhead. Source: claude.com/pricing`,
        quality: 'save',
        tags: ['20% cheaper', 'Same model access'],
        priority: 'medium',
      };
    }
  }

  return null;
}

function auditChatGPT(tool: ToolInput, id: number): Recommendation | null {
  const total = tool.monthlySpend * tool.seats;

  // Rule: Pro $200 for small team doing writing → Plus ($20) is sufficient
  if (tool.planType === 'pro200' && isWritingOrResearch(tool.useCase)) {
    const recommended = 20 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: 'ChatGPT Pro $200',
      currentPlanLabel: 'Pro ($200/mo)',
      currentCost: total,
      recommendedTool: 'ChatGPT Plus',
      recommendedPlanLabel: 'Plus ($20/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `ChatGPT Pro $200 unlocks 20x usage and exclusive o1 Pro mode — intended for researchers and developers running unlimited reasoning chains daily. For ${tool.useCase} tasks, ChatGPT Plus at $20 provides full GPT-5.5 access within generous daily limits. Source: chatgpt.com/pricing`,
      quality: 'save',
      tags: ['90% cheaper', 'Sufficient for writing/research'],
      priority: 'high',
    };
  }

  // Rule: Business ($30/seat/mo) for 1-2 users → Plus ($20) has same model access
  if (tool.planType === 'business' && tool.seats <= 2) {
    const recommended = 20 * tool.seats;
    const savings = total - recommended;
    return {
      id,
      currentTool: 'ChatGPT Business',
      currentPlanLabel: 'Business ($30/seat/mo)',
      currentCost: total,
      recommendedTool: 'ChatGPT Plus',
      recommendedPlanLabel: 'Plus ($20/seat/mo)',
      recommendedCost: recommended,
      savings,
      savingsPercent: Math.round((savings / total) * 100),
      reason: `ChatGPT Business adds shared workspaces, SSO, and training-data exclusion — organizational features that matter at 5+ members. With ${tool.seats} user(s), Plus provides identical GPT-5.5 access and Deep Research at $10/seat less. Source: openai.com/business/chatgpt-pricing`,
      quality: 'save',
      tags: ['33% cheaper', 'Same model access'],
      priority: 'high',
    };
  }

  return null;
}

// ─── Redundancy rules (cross-tool) ───────────────────────────────────────────

function detectRedundancies(tools: ToolInput[], startId: number): Recommendation[] {
  const recs: Recommendation[] = [];
  let id = startId;

  const hasCursor = tools.find(t => t.toolName === 'cursor' && t.planType !== 'free');
  const hasCopilot = tools.find(t => t.toolName === 'github-copilot' && t.planType !== 'free');
  const hasChatGPT = tools.find(t => t.toolName === 'chatgpt' && t.planType !== 'free');
  const hasClaude = tools.find(t => t.toolName === 'claude' && t.planType !== 'free');
  const hasWindsurf = tools.find(t => t.toolName === 'windsurf' && t.planType !== 'free');

  // Cursor + Copilot overlap (both are coding AI editors)
  if (hasCursor && hasCopilot) {
    const copilotTotal = hasCopilot.monthlySpend * hasCopilot.seats;
    recs.push({
      id: id++,
      currentTool: 'GitHub Copilot',
      currentPlanLabel: `${hasCopilot.planType} ($${hasCopilot.monthlySpend}/seat/mo)`,
      currentCost: copilotTotal,
      recommendedTool: 'Remove Copilot — keep Cursor',
      recommendedPlanLabel: 'N/A',
      recommendedCost: 0,
      savings: copilotTotal,
      savingsPercent: 100,
      reason: `You're paying for both Cursor and GitHub Copilot — they are direct substitutes. Both provide AI autocomplete and chat in your IDE. Cursor's agentic Composer and multi-file editing outperform Copilot's chat for most developers. Consolidating saves $${copilotTotal}/mo with no capability loss for coding workflows.`,
      quality: 'save',
      tags: ['Redundant tools', `$${copilotTotal}/mo eliminated`],
      priority: 'high',
    });
  }

  // Cursor + Windsurf overlap
  if (hasCursor && hasWindsurf) {
    const windsurfTotal = hasWindsurf.monthlySpend * hasWindsurf.seats;
    recs.push({
      id: id++,
      currentTool: 'Windsurf',
      currentPlanLabel: `${hasWindsurf.planType} ($${hasWindsurf.monthlySpend}/seat/mo)`,
      currentCost: windsurfTotal,
      recommendedTool: 'Remove Windsurf — keep Cursor',
      recommendedPlanLabel: 'N/A',
      recommendedCost: 0,
      savings: windsurfTotal,
      savingsPercent: 100,
      reason: `Cursor and Windsurf are overlapping AI code editors built on VS Code. You only need one IDE. Cursor has a larger model selection and more mature agent capabilities (Composer, cloud agents). Remove the lower-used tool — for most teams that's Windsurf.`,
      quality: 'save',
      tags: ['Duplicate IDE', `$${windsurfTotal}/mo eliminated`],
      priority: 'high',
    });
  }

  // ChatGPT + Claude overlap for non-coding (pick one)
  if (hasChatGPT && hasClaude && !isCodingUseCase(hasClaude.useCase)) {
    const cheaperTool = hasChatGPT.monthlySpend * hasChatGPT.seats < hasClaude.monthlySpend * hasClaude.seats
      ? hasChatGPT : hasClaude;
    const expensiveTool = cheaperTool === hasChatGPT ? hasClaude : hasChatGPT;
    const expensiveTotal = expensiveTool.monthlySpend * expensiveTool.seats;
    recs.push({
      id: id++,
      currentTool: expensiveTool.toolName === 'chatgpt' ? 'ChatGPT' : 'Claude',
      currentPlanLabel: `${expensiveTool.planType} ($${expensiveTool.monthlySpend}/seat/mo)`,
      currentCost: expensiveTotal,
      recommendedTool: cheaperTool.toolName === 'chatgpt' ? 'ChatGPT (keep)' : 'Claude (keep)',
      recommendedPlanLabel: `${cheaperTool.planType} ($${cheaperTool.monthlySpend}/seat/mo)`,
      recommendedCost: 0,
      savings: expensiveTotal,
      savingsPercent: 100,
      reason: `ChatGPT and Claude serve overlapping use cases for ${expensiveTool.useCase} tasks. Running both is rarely justified — teams typically standardize on one for consistency and collaboration. Keep the one your team uses most; cancel the other.`,
      quality: 'save',
      tags: ['Overlapping chat tools', 'Consolidate to one'],
      priority: 'medium',
    });
  }

  return recs;
}

// ─── Main audit function ──────────────────────────────────────────────────────

export function runAudit(tools: ToolInput[]): AuditResult {
  const validTools = tools.filter(t => t.toolName && t.monthlySpend > 0);
  const recommendations: Recommendation[] = [];
  let id = 1;

  // Per-tool audit
  for (const tool of validTools) {
    let rec: Recommendation | null = null;

    switch (tool.toolName) {
      case 'cursor':        rec = auditCursor(tool, id); break;
      case 'github-copilot': rec = auditGithubCopilot(tool, id); break;
      case 'claude':        rec = auditClaude(tool, id); break;
      case 'chatgpt':       rec = auditChatGPT(tool, id); break;
    }

    if (rec) { recommendations.push(rec); id++; }
  }

  // Cross-tool redundancy detection
  const redundancyRecs = detectRedundancies(validTools, id);
  recommendations.push(...redundancyRecs);

  // Calculate totals
  const totalMonthlySpend = validTools.reduce((sum, t) => sum + t.monthlySpend * t.seats, 0);
  const projectedMonthlySavings = recommendations
    .filter(r => r.savings > 0)
    .reduce((sum, r) => sum + r.savings, 0);

  const spendBreakdown = validTools.map(t => {
    const rec = recommendations.find(r => r.currentTool.toLowerCase().includes(t.toolName));
    return {
      name: t.toolName.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      spend: t.monthlySpend * t.seats,
      recommended: rec ? Math.max(0, t.monthlySpend * t.seats - rec.savings) : t.monthlySpend * t.seats,
      category: isCodingUseCase(t.useCase) ? 'Coding' : 'Chat/Research',
    };
  });

  return {
    totalMonthlySpend,
    totalAnnualSpend: totalMonthlySpend * 12,
    projectedMonthlySavings,
    projectedAnnualSavings: projectedMonthlySavings * 12,
    savingsPercent: totalMonthlySpend > 0 ? Math.round((projectedMonthlySavings / totalMonthlySpend) * 100) : 0,
    toolsAnalyzed: validTools.length,
    overpaymentsFound: recommendations.filter(r => r.savings > 0).length,
    recommendations: recommendations.sort((a, b) => b.savings - a.savings),
    spendBreakdown,
    suggestedActions: recommendations
      .filter(r => r.savings > 0)
      .sort((a, b) => b.savings - a.savings)
      .map(r => ({
        priority: r.priority,
        action: `${r.currentTool} → ${r.recommendedTool}`,
        saving: r.savings,
        effort: r.savings > 100 ? 'Low' : 'Very Low',
      })),
    aiSummary: '', // filled by your LLM call after
  };
}
