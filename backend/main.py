from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from models import AuditRequest, AuditResponse, LeadCaptureRequest, LeadCaptureResponse
from database import save_lead
from services.analyzer import analyze_spend
from services.llm import generate_summary
from services.email import send_report_email

app = FastAPI(title="SpendWise AI API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174", 
        os.getenv("FRONTEND_URL", "https://spend-wise-seven-lovat.vercel.app/").rstrip("/")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "SpendWise AI API is running"}

@app.post("/api/audit", response_model=AuditResponse)
async def process_audit(request: AuditRequest):
    try:
        # 1. Use pre-calculated results if provided by frontend, else run local logic
        if request.audit_result:
            audit_result = request.audit_result
        else:
            audit_result = analyze_spend(request.tools)
        
        # 2. Generate LLM summary based on the results
        summary = await generate_summary(audit_result)
        audit_result["aiSummary"] = summary
        
        return audit_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/report/email", response_model=LeadCaptureResponse)
async def capture_lead_and_email(request: LeadCaptureRequest):
    try:
        # 1. Save to MongoDB (gracefully handle if DB is down or IP restricted)
        try:
            await save_lead(request.model_dump())
        except Exception as db_err:
            print(f"Warning: Failed to save lead to MongoDB: {db_err}")
        
        # Convert Pydantic model to dict for the email service
        audit_dict = request.auditData.model_dump() if request.auditData else {}
        
        # 2. Trigger SendGrid email
        email_success = await send_report_email(
            to_email=request.email,
            company=request.company,
            audit_data=audit_dict
        )
        
        if not email_success:
            # We don't necessarily want to throw a 500 if the dummy email works, 
            # but if real SendGrid fails we log it.
            print("Warning: Email service reported failure.")
            
        return {"status": "success", "message": "Report processed"}
    except Exception as e:
        print(f"Endpoint Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))




