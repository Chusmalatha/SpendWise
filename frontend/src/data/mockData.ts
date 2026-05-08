// Mock AI tools data
export const AI_TOOLS = [
  { value: 'chatgpt', label: 'ChatGPT', icon: '🤖', company: 'OpenAI' },
  { value: 'claude', label: 'Claude', icon: '🧠', company: 'Anthropic' },
  { value: 'cursor', label: 'Cursor', icon: '⚡', company: 'Anysphere' },
  { value: 'github-copilot', label: 'GitHub Copilot', icon: '🐙', company: 'GitHub/Microsoft' },
  { value: 'gemini', label: 'Gemini', icon: '✨', company: 'Google' },
  { value: 'openai-api', label: 'OpenAI API', icon: '🔮', company: 'OpenAI' },
  { value: 'anthropic-api', label: 'Anthropic API', icon: '🌊', company: 'Anthropic' },
  { value: 'windsurf', label: 'Windsurf', icon: '🏄', company: 'Codeium' },
];

export const PLAN_TYPES = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
  { value: 'enterprise', label: 'Enterprise' },
];

export const USE_CASES = [
  { value: 'coding', label: 'Coding', icon: '💻' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'research', label: 'Research', icon: '🔍' },
  { value: 'data-analysis', label: 'Data Analysis', icon: '📊' },
  { value: 'mixed', label: 'Mixed', icon: '🎯' },
];

export const PRICING_DATA = {
  'chatgpt': { free: 0, pro: 20, team: 25, enterprise: 60 },
  'claude': { free: 0, pro: 20, team: 25, enterprise: 60 },
  'cursor': { free: 0, pro: 20, team: 40, enterprise: 100 },
  'github-copilot': { free: 0, pro: 10, team: 19, enterprise: 39 },
  'gemini': { free: 0, pro: 20, team: 24, enterprise: 50 },
  'openai-api': { free: 0, pro: 50, team: 150, enterprise: 500 },
  'anthropic-api': { free: 0, pro: 40, team: 120, enterprise: 400 },
  'windsurf': { free: 0, pro: 15, team: 35, enterprise: 80 },
};

// Mock recommendations data
export const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    currentTool: 'ChatGPT Pro',
    currentCost: 20,
    recommendedTool: 'Claude Pro',
    recommendedCost: 20,
    savings: 0,
    reason: 'Claude excels at long-context tasks and coding. Switch for better output quality at same price.',
    savingsPercent: 0,
    quality: 'upgrade',
    tags: ['Better Quality', 'Same Price'],
  },
  {
    id: 2,
    currentTool: 'GitHub Copilot Team',
    currentCost: 19,
    recommendedTool: 'Cursor Pro',
    recommendedCost: 20,
    savings: -1,
    reason: 'Cursor offers superior agentic coding with multi-file editing. Worth the $1/mo premium.',
    savingsPercent: -5,
    quality: 'upgrade',
    tags: ['Better UX', 'Agentic Coding'],
  },
  {
    id: 3,
    currentTool: 'OpenAI API (Team)',
    currentCost: 150,
    recommendedTool: 'Anthropic API (Pro)',
    recommendedCost: 40,
    savings: 110,
    reason: 'For most writing/research tasks, Claude API is 73% cheaper with comparable quality.',
    savingsPercent: 73,
    quality: 'save',
    tags: ['73% Cheaper', 'Similar Quality'],
  },
  {
    id: 4,
    currentTool: 'Gemini Team',
    currentCost: 24,
    recommendedTool: 'Gemini Free + API',
    recommendedCost: 8,
    savings: 16,
    reason: 'For light usage, switching to free tier + pay-per-use API saves significantly.',
    savingsPercent: 67,
    quality: 'save',
    tags: ['67% Cheaper', 'Pay-per-use'],
  },
];

// Mock dashboard data
export const MOCK_DASHBOARD_DATA = {
  totalMonthlySpend: 389,
  totalAnnualSpend: 4668,
  projectedMonthlySavings: 127,
  projectedAnnualSavings: 1524,
  savingsPercent: 33,
  toolsAnalyzed: 6,
  overpaymentsFound: 4,
  recommendations: MOCK_RECOMMENDATIONS,
  aiSummary: `Your team is spending $389/month on AI tools with significant overlap detected. The biggest savings opportunity is your OpenAI API plan — switching to Anthropic's API for writing and research workloads could save you $110/month immediately. Your GitHub Copilot subscription also overlaps heavily with Cursor; consolidating to a single coding AI would reduce complexity and cost. Overall, we identified $127/month in actionable savings without sacrificing any capability.`,
  spendBreakdown: [
    { name: 'OpenAI API', spend: 150, recommended: 40, category: 'API' },
    { name: 'GitHub Copilot', spend: 76, recommended: 80, category: 'Coding' },
    { name: 'ChatGPT Pro', spend: 80, recommended: 80, category: 'Chat' },
    { name: 'Gemini Team', spend: 48, recommended: 32, category: 'Chat' },
    { name: 'Claude Pro', spend: 20, recommended: 20, category: 'Chat' },
    { name: 'Windsurf Pro', spend: 15, recommended: 10, category: 'Coding' },
  ],
  suggestedActions: [
    { priority: 'high', action: 'Switch OpenAI API → Anthropic API', saving: 110, effort: 'Low' },
    { priority: 'high', action: 'Consolidate Copilot + Cursor → Cursor only', saving: 19, effort: 'Low' },
    { priority: 'medium', action: 'Downgrade Gemini Team → Free + API', saving: 16, effort: 'Medium' },
    { priority: 'low', action: 'Negotiate annual billing for ChatGPT', saving: 24, effort: 'Very Low' },
    { priority: 'low', action: 'Audit seat usage for team tools', saving: 38, effort: 'Medium' },
  ],
};

// Testimonials
// export const TESTIMONIALS = [
//   {
//     id: 1,
//     name: 'Sarah Chen',
//     role: 'Co-founder & CTO',
//     company: 'DataFlow AI',
//     avatar: 'SC',
//     avatarColor: 'from-purple-500 to-pink-500',
//     text: 'SpendWise AI found $890/month in savings we were completely blind to. Our AI bill went from $1,800 to $910 in one afternoon. This should be mandatory for every startup.',
//     savings: '$890/mo',
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: 'Marcus Rodriguez',
//     role: 'Engineering Lead',
//     company: 'Nexus Labs',
//     avatar: 'MR',
//     avatarColor: 'from-blue-500 to-cyan-500',
//     text: 'We had 4 overlapping AI coding tools. SpendWise found the redundancy instantly and showed us exactly which one to cut. Saved us $340/month with zero productivity loss.',
//     savings: '$340/mo',
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: 'Priya Patel',
//     role: 'Indie Hacker',
//     company: 'BuildFast.io',
//     avatar: 'PP',
//     avatarColor: 'from-green-500 to-teal-500',
//     text: "As a solo founder, every dollar counts. SpendWise showed me I was paying for Enterprise tiers I didn't need. Cut my AI spend by 60% and actually improved my workflow.",
//     savings: '60% cut',
//     rating: 5,
//   },
//   {
//     id: 4,
//     name: 'Alex Thompson',
//     role: 'Startup Advisor',
//     company: '500 Startups Alumni',
//     avatar: 'AT',
//     avatarColor: 'from-orange-500 to-red-500',
//     text: 'I now recommend SpendWise AI to every portfolio company in the first 90 days. The ROI is immediate — most teams find savings in minutes, not months.',
//     savings: 'Instant ROI',
//     rating: 5,
//   },
// ];

// FAQ data
export const FAQ_DATA = [
  {
    question: 'How does SpendWise AI analyze my tools?',
    answer: 'You input your current AI tools, plans, and team sizes. Our AI engine cross-references pricing data, usage patterns, and capability matrices to identify overlaps, overpayments, and cheaper alternatives.',
  },
  {
    question: 'Is my company data safe?',
    answer: "We don't store your tool configurations permanently. Audit data is processed in-memory and deleted after 24 hours. We never share your data with third parties or the tool vendors themselves.",
  },
  {
    question: 'How accurate are the savings estimates?',
    answer: 'Our estimates are based on publicly available pricing data, updated weekly. Actual savings may vary based on your usage patterns, negotiated rates, and specific feature needs.',
  },
  {
    question: 'Does SpendWise AI cover all AI tools?',
    answer: "We cover 40+ major AI tools and APIs including ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and all major LLM APIs. We're adding new tools every week.",
  },
  {
    question: 'Can I share the results with my team or investors?',
    answer: 'Yes! Every audit generates a unique shareable link. You can share the results page (which hides sensitive company info) with your co-founders, engineering team, or even investors.',
  },
  {
    question: 'Is SpendWise AI free to use?',
    answer: 'The core audit is completely free. We offer a Pro plan for teams that want continuous monitoring, alerts when prices change, and API access for automated audits.',
  },
];

// Features data
export const FEATURES_DATA = [
  {
    icon: 'MdAutoAwesome',
    title: 'AI-Powered Analysis',
    description: 'Our GPT-4 powered engine deeply analyzes your tool stack to find overlaps, redundancies, and smarter alternatives with surgical precision.',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    iconColor: '#a78bfa',
    borderColor: 'rgba(167, 139, 250, 0.2)',
  },
  {
    icon: 'MdSavings',
    title: 'Instant Savings Calculator',
    description: 'See your projected monthly and annual savings before switching. No guesswork — hard numbers based on real pricing data updated weekly.',
    gradient: 'from-green-500/20 to-teal-500/20',
    iconColor: '#00ffa3',
    borderColor: 'rgba(0, 255, 163, 0.2)',
  },
  {
    icon: 'MdCompare',
    title: 'Smart Recommendations',
    description: 'Get personalized tool recommendations ranked by ROI, implementation effort, and capability match for your specific use cases.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: '#00d4ff',
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  {
    icon: 'MdShare',
    title: 'Shareable Reports',
    description: 'Generate beautiful, investor-ready reports to share with your team or board. Each report gets a unique URL with privacy controls.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: '#f472b6',
    borderColor: 'rgba(244, 114, 182, 0.2)',
  },
  {
    icon: 'MdSpeed',
    title: 'Real-Time Pricing',
    description: 'Our database tracks pricing changes across 40+ AI tools weekly. Get alerts when a tool you use changes their pricing.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: '#fb923c',
    borderColor: 'rgba(251, 146, 60, 0.2)',
  },
  {
    icon: 'MdSecurity',
    title: 'Privacy First',
    description: 'Your data never leaves our encrypted pipeline. No data sold, no vendor sharing. Enterprise SSO and SOC 2 compliant.',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    iconColor: '#2dd4bf',
    borderColor: 'rgba(45, 212, 191, 0.2)',
  },
];

// How it works steps
export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Add Your AI Tools',
    description: "List all the AI tools your team uses — ChatGPT, Claude, Cursor, APIs, everything. Takes 2 minutes.",
    icon: 'MdAdd',
  },
  {
    step: '02',
    title: 'AI Analyzes Your Stack',
    description: 'Our AI engine maps your tools against 40+ alternatives, pricing tiers, and capability overlaps.',
    icon: 'MdAutoAwesome',
  },
  {
    step: '03',
    title: 'Get Your Savings Report',
    description: 'Receive a prioritized list of recommendations with exact dollar savings and implementation steps.',
    icon: 'MdInsights',
  },
  {
    step: '04',
    title: 'Share & Implement',
    description: 'Share the report with your team or investors. Implement changes at your own pace.',
    icon: 'MdRocketLaunch',
  },
];
