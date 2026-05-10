export interface Tool {
  toolName: string;
  planType: string;
  monthlySpend: string;
  seats: string;
  useCase: string;
}

export interface CompanyInfo {
  companyName: string;
  teamSize: string;
  role: string;
  email: string;
}

export interface Errors {
  companyName?: string;
  email?: string;
  teamSize?: string;
  tools?: string;
}

export interface AuditResult {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  projectedMonthlySavings: number;
  projectedAnnualSavings: number;
  savingsPercent: number;
  toolsAnalyzed: number;
  overpaymentsFound: number;
  aiSummary: string;
  recommendations: Array<{
    id: number;
    currentTool: string;
    currentCost: number;
    recommendedTool: string;
    recommendedCost: number;
    savings: number;
    reason: string;
    savingsPercent: number;
    quality: string;
    tags: string[];
  }>;
}
