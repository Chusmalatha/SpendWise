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

## Day 4 — 2026-05-09 (Planned)
- Implement email sending service
- Integrate AI/LLM for dynamic executive summaries
- Prepare project for production deployment
