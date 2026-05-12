from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

class ToolInput(BaseModel):
    toolName: str
    planType: str
    seats: str
    monthlySpend: str

class AuditRequest(BaseModel):
    tools: List[ToolInput]
    audit_result: Optional[dict] = None


class ActionItem(BaseModel):
    action: str
    priority: str
    effort: str
    saving: int

class Recommendation(BaseModel):
    id: int
    currentTool: str
    currentPlanLabel: Optional[str] = ""
    currentCost: int
    recommendedTool: str
    recommendedPlanLabel: Optional[str] = ""
    recommendedCost: int
    savings: int
    reason: str
    savingsPercent: int
    quality: str
    tags: List[str]
    priority: Optional[str] = "medium"

class SpendItem(BaseModel):
    name: str
    spend: int
    recommended: int
    category: Optional[str] = ""

class AuditResponse(BaseModel):
    totalMonthlySpend: int
    totalAnnualSpend: int
    projectedMonthlySavings: int
    projectedAnnualSavings: int
    savingsPercent: int
    toolsAnalyzed: int
    overpaymentsFound: int
    recommendations: List[Recommendation]
    spendBreakdown: List[SpendItem]
    suggestedActions: List[ActionItem]
    aiSummary: str

class LeadCaptureRequest(BaseModel):
    email: EmailStr
    company: str
    role: Optional[str] = ""
    teamSize: Optional[str] = ""
    auditData: Optional[AuditResponse] = None
    
class LeadCaptureResponse(BaseModel):
    status: str
    message: str
