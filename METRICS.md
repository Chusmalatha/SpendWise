# Key Metrics & Instrumentation

## North Star Metric
**Total Identified Annual Savings ($)**
This represents the aggregate value SpendWise AI has unlocked for the startup ecosystem.

## Primary KPIs
1. **Audit Completion Rate**: % of users who start the audit form and reach the Results Dashboard. (Target: >45%)
2. **Lead Capture Conversion**: % of users on the Results Dashboard who provide an email. (Target: >15%)
3. **Marketplace Click-through**: % of high-savings leads who click through to the Credex Marketplace. (Target: >10%)

## Engagement Metrics
- **Average Tools Analyzed**: Helps us understand if users are inputting their entire stack or just testing the tool.
- **Viral Shares**: Number of unique visitors hitting public result URLs.

## Instrumentation
- **Frontend**: Custom events tracked via PostHog to measure funnel drop-off points.
- **Backend**: MongoDB aggregation to track the cumulative "Total Savings Found" without storing PII unnecessarily.
- **Error Rates**: Monitoring FastAPI exceptions and LLM timeout rates to ensure a premium user experience.

## Pivot Triggers
- **Low Lead Capture (<5%)**: Indicates that the audit results are not perceived as valuable enough for an email exchange.
- **High Drop-off on Step 2**: Indicates the audit form is too complex or asking for too much data upfront.
