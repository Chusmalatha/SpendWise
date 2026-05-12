# Testing Strategy

## Overview
SpendWise AI prioritizes mathematical accuracy in its audit engine. While the core logic is deterministic, we utilize a multi-layered testing approach to ensure reliability.

## 1. Audit Engine Validation (Core Logic)
The `analyzer.py` service is tested against a variety of tool-stack scenarios:
- **Scenario A: Tool Overlap**: Ensures that having both ChatGPT and Claude triggers a "Consolidate" recommendation.
- **Scenario B: API Transition**: Validates that high-volume chat users are correctly recommended an API-based workflow.
- **Scenario C: Zero-Sum Protection**: Ensures that recommendations never double-count savings or result in negative costs.

## 2. Integration Testing
- **LLM Connectivity**: Mock tests for the Hugging Face Inference API to handle timeouts and fallback summary generation.
- **Email Delivery**: Validation of SendGrid payload formatting and error handling for invalid email addresses.
- **Database Operations**: Asynchronous unit tests for MongoDB CRUD operations using `motor`.

## 3. Frontend Quality Assurance
- **Responsive Design**: Visual regression testing for the Results Dashboard across mobile, tablet, and desktop viewports.
- **Form Validation**: Ensuring the multi-step audit form prevents invalid inputs (e.g., negative seat counts).

## Running Tests (Planned)
Future development will include a full `pytest` suite in the `backend/tests` directory:
```bash
pip install pytest
pytest backend/tests
```
