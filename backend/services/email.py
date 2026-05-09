import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

async def send_report_email(to_email: str, company: str, audit_data: dict):
    """Sends the audit report via SendGrid"""
    
    sg_key = os.getenv("SENDGRID_API_KEY")
    from_email = os.getenv("SENDGRID_FROM_EMAIL", "reports@spendwise.ai")
    
    
    if not sg_key or sg_key == "your_sendgrid_key_here":
        print(f"\n--- DUMMY EMAIL ---")
        print(f"To: {to_email}")
        print(f"Subject: Your SpendWise AI Report for {company}")
        print(f"Savings found: ${audit_data.get('projectedMonthlySavings')}/mo")
        print(f"\nAI Executive Summary:\n{audit_data.get('aiSummary', 'No summary available.')}")
        print(f"\nActions to Take:")
        for action in audit_data.get('suggestedActions', []):
            print(f"- {action['action']} (Saves ${action['saving']}/mo)")
        print(f"-------------------\n")
        return True

    savings = audit_data.get('projectedMonthlySavings', 0)
    ai_summary_html = audit_data.get('aiSummary', '').replace('\n', '<br>')
    
    html_content = f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">Hello {company} team,</h2>
        <p>Your AI spend audit is complete. Here is your executive summary and action plan.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Executive Summary</h3>
            <p>{ai_summary_html}</p>
        </div>

        <p><strong>Total Monthly Spend:</strong> ${audit_data.get('totalMonthlySpend')}</p>
        <p><strong>Potential Savings:</strong> <span style="color: #16a34a; font-weight: bold;">${savings}/month</span></p>
        
        <h3>Recommended Actions to Reduce Spend:</h3>
        <ul style="line-height: 1.6;">
    """
    
    for action in audit_data.get('suggestedActions', []):
        html_content += f"<li><strong>{action['action']}</strong> — Saves ${action['saving']}/mo</li>"
        
    html_content += """
        </ul>
        <br>
        <p>Best,<br><strong>SpendWise AI Team</strong></p>
    </div>
    """

    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=f"Your SpendWise AI Savings Report - ${savings}/mo found",
        html_content=html_content
    )
    
    try:
        sg = SendGridAPIClient(sg_key)
        response = sg.send(message)
        print(f"Email sent with status {response.status_code}")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
