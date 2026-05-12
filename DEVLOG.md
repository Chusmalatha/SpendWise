# SpendWise AI — Development Log

---

## Day 1 — 2026-05-06

**Hours worked:** 3

### What I did:
- Carefully read and understood the assignment requirements
- Finalized project idea and target users
- Broke down the application into core features (form, audit, results, email, sharing)
- Decided on tech stack:
  - Frontend: React.js
  - Backend: Python (FastAPI)
  - AI: Hugging Face (planned)
- Created GitHub repository and initialized project

### What I learned:
- This assignment focuses more on product thinking than just coding
- Importance of structuring features before development

---

## Day 2 — 2026-05-07

**Hours worked:** 4

### What I did:

#### 🚀 Frontend Development Progress
- Built SpendWise AI frontend using React, Vite, and Tailwind CSS
- Created a SaaS-style landing page with:
  - Hero section
  - Features section
  - How-it-works section
  - FAQ section
  - CTA section
- Developed a multi-step Audit Form UI with:
  - Input validation
  - LocalStorage persistence
- Built Results Dashboard UI with:
  - Spending comparison chart (mock data)
  - Recommendation cards (UI only)
- Designed Shareable Results page UI for future backend integration

#### 🎨 UI/UX Improvements
- Fixed Navbar overlap using proper z-index and spacing
- Adjusted layout spacing for fixed navbar compatibility
- Improved Hero section layout and removed overlapping elements
- Fixed modal visibility and responsiveness issues
- Cleaned UI flow and removed unnecessary demo elements

#### ⚙️ Dev Setup
- Organized frontend project structure
- Improved component reusability
- Configured proper `.gitignore` for frontend

---

### What I learned:
- Importance of layout management (z-index, spacing, positioning)
- Building scalable React component structure
- Designing SaaS-style UI flow before backend integration

---

## Day 3 — 2026-05-08

**Hours worked:** 4

### What I did:

#### ⚙️ Backend Development
- Successfully built and completed the entire FastAPI backend architecture
- Created database models and connection logic (`models.py`, `database.py`)
- Implemented core backend analyzer service (`analyzer.py`)
- Configured and tested all necessary REST endpoints in `main.py`

### What I learned:
- Structuring FastAPI projects into modular services
- End-to-end integration patterns between React and FastAPI

---

## Day 4 — 2026-05-09

**Hours worked:** 4

### What I did:

#### 📧 Email Service Integration
- Added email sending functionality for report distribution
- Configured email service modules and backend integration

#### 🧠 LLM Integration
- Integrated LLM services for advanced spending analysis and insights
- Developed AI-driven recommendation logic

#### 🗄️ MongoDB Integration
- Configured MongoDB as the primary data store for application data
- Implemented data persistence layers for user audits and results

### What I learned:
- Implementing AI-powered features in a production-style environment
- Working with NoSQL databases (MongoDB) for flexible data storage
- Setting up reliable background services for email notifications


  ---

## Day 5 — 2026-05-10

**Hours worked:** 5

### What I did:

#### 🚀 Frontend Deployment
- Successfully deployed the React frontend application on Vercel
- Configured production environment variables for API communication
- Tested responsive UI and verified production build behavior

#### ⚙️ Backend Deployment
- Deployed FastAPI backend on Render
- Configured production server settings and API endpoints
- Connected deployed frontend with backend APIs

#### 🐛 Deployment Debugging & Fixes
- Faced deployment issues caused by Python package and version incompatibilities
- Debugged dependency conflicts from `requirements.txt`
- Fixed backend build failures related to package versions and deployment environment
- Updated and stabilized backend dependency configuration for successful deployment

#### 🔗 Frontend-Backend Integration
- Added deployed backend API URL to frontend environment configuration
- Verified API communication between Vercel frontend and Render backend
- Tested audit request flow from frontend to backend

#### 📂 Git & Version Control
- Resolved Git merge and branch conflicts during deployment workflow
- Restored local project state using Git reflog after accidental reset
- Synced latest frontend and backend code with GitHub repository

---

### What I learned:
- Real-world deployment debugging and dependency management
- Importance of version compatibility during cloud deployment
- Managing production environment variables securely
- Handling Git recovery workflows using reflog and reset
- Connecting distributed frontend and backend services in production

---

## Day 6 — 2026-05-11

**Hours worked:** 4

### What I did:

#### 🧠 Intelligent Spending Analysis
- Completely overhauled the backend analyzer logic with real-world 2025/2026 pricing data.
- Implemented four core optimization engines:
  - **Redundancy Engine:** Identifies overlapping capabilities (e.g., paying for both Cursor and GitHub Copilot).
  - **Tier Optimizer:** Detects single users on expensive Enterprise/Pro plans that can be downgraded.
  - **Scale Optimizer:** Calculates savings from switching N individual seats to a unified Team plan.
  - **Billing Optimizer:** Real-time calculation of annual vs. monthly billing savings for specific vendors.

#### 🎨 Frontend Precision Enhancements
- Updated `mockData.ts` to include granular, tool-specific plan names (e.g., ChatGPT Plus vs. Team).
- Enhanced `ToolCard.tsx` to dynamically fetch valid plans for each tool and auto-fill real-world pricing.
- Added new tools to the database: Notion AI, Perplexity AI, and Grammarly.

### What I learned:
- Designing complex rule engines for financial data.
- Importance of "Small Data" (accurate pricing tables) in making AI results feel realistic and trustworthy.
- Creating dynamic form states that react to deep nested data changes.

---

## Day 7 — 2026-05-12

**Hours worked:** 5

### What I did:

#### 🎨 UI & UX Optimization
- Refined the Results Dashboard with smoother animations and better layout stability.
- Improved the mobile responsiveness of the audit form and charts.
- Optimized asset loading and component rendering for a "snappier" feel.

#### ⚙️ Backend & Logic Refinement
- Hardened the deterministic audit engine to handle complex multi-rule scenarios without double-counting.
- Improved error handling for the Hugging Face and SendGrid integrations.
- Optimized database queries for faster audit result retrieval.

#### 📄 Documentation Overhaul
- Updated all project `.md` files (README, ARCHITECTURE, ECONOMICS, GTM, etc.) to ensure complete accuracy and alignment with the current state of the project.
- Added detailed pricing data, system prompts, and project reflections.

#### 🚀 Final Deployment & Verification
- Finalized the deployment on Vercel: [https://spend-wise-seven-lovat.vercel.app/](https://spend-wise-seven-lovat.vercel.app/)
- Conducted end-to-end testing of the live environment (Audit -> Analysis -> Email).

### What I learned:
- The importance of consistent documentation for project maintainability.
- Techniques for optimizing React rendering performance in data-heavy dashboards.
- Final polishing steps that turn a "project" into a "product."

---
