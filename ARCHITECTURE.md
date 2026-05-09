# SpendWise AI — System Architecture

## Overview
SpendWise AI is designed as a modern, decoupled web application. It uses a TypeScript/React frontend for a rich user interface, and a Python/FastAPI backend for high-performance API endpoints and data processing.

## High-Level Architecture

### 1. Frontend (Client Tier)
- **Framework:** React.js powered by Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Role:** Handles the user interface, manages the multi-step audit form state, and displays the dynamic results dashboard with charts.

### 2. Backend (API Tier)
- **Framework:** FastAPI (Python)
- **Role:** Provides RESTful API endpoints for the frontend, manages business logic, and orchestrates external services.
- **Service Modules:**
  - `analyzer.py`: Contains the core logic for calculating tool overlap, projected savings, and recommendations based on the user's input.
  - `email.py`: Handles the generation and sending of audit result emails to the user.
  - `llm.py`: Manages the communication with the Hugging Face API to generate dynamic executive summaries.

### 3. Data Tier
- **Database:** SQLite (via SQLAlchemy ORM)
- **Role:** Stores user leads, audit submissions, and analysis results for future retrieval or sharing.
- **Components:** `models.py` defines the schema, while `database.py` manages the connection pooling and sessions.

### 4. External Integrations
- **AI / LLM:** Hugging Face Inference API (`google/gemma-2b-it`). Used to inject personalized, analytical insights into the final report.

## Data Flow
1. **User Input:** The user fills out the audit form on the React frontend.
2. **Submission:** Data is sent via POST request to the FastAPI backend.
3. **Processing:**
   - The backend stores the raw data in the SQLite database.
   - The `analyzer` service processes the data to find savings.
   - The `llm` service generates an executive summary.
4. **Response:** The finalized audit result is returned to the frontend and displayed on the Results Dashboard.
5. **Follow-up:** An email containing the summary and a shareable link is dispatched via the `email` service.
