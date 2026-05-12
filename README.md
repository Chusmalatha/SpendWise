# SpendWise AI — Optimize Your AI Infrastructure Spend

SpendWise AI is a full-stack AI spend auditing platform designed to help startups, engineering teams, and AI-first companies identify unnecessary AI expenses, optimize tool usage, and reduce monthly operational costs through intelligent recommendations.

The platform analyzes subscriptions across popular AI tools such as ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and API-based AI services, then generates a detailed optimization report with projected monthly and annual savings.

---

## 🔗 Live Demo

### Production Deployment
https://spend-wise-seven-lovat.vercel.app/

---

# 📸 Screenshots

## Landing Page
<img src="assets/home.png" width="1000"/>

## Audit Dashboard
<img src="assets/audit.png" width="1000"/>

## Results Page
<img src="assets/result.png" width="1000"/>

---

# 🚀 Features

## Core Features

- AI tool spend auditing and optimization
- Dynamic savings calculation engine
- Personalized AI-generated audit summaries
- Shareable audit result pages
- Email report delivery
- Interactive analytics dashboard
- Responsive mobile-first UI
- Persistent form state management
- Rate-limited API endpoints
- Real-time pricing-based recommendations

---

## Supported AI Platforms

The audit engine currently supports optimization recommendations for:

- ChatGPT
- Claude
- Cursor
- GitHub Copilot
- Gemini
- OpenAI API
- Anthropic API
- Windsurf

---

# 🧠 How It Works

1. Users enter their current AI stack information:
   - Tools used
   - Subscription plans
   - Monthly spend
   - Team size
   - Primary use case

2. The audit engine evaluates:
   - Redundant subscriptions
   - Overpriced plans
   - Seat inefficiencies
   - Better-fit alternatives
   - Potential savings opportunities

3. Users receive:
   - Monthly savings estimate
   - Annual savings projection
   - Optimization recommendations
   - AI-generated executive summary

4. Results can be:
   - Shared publicly
   - Downloaded
   - Sent via email

---

# 🛠️ Tech Stack

## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

---

## Backend

- FastAPI
- Python 3.10+
- MongoDB
- Motor Async Driver
- Pydantic v2

---

## AI & Integrations

- Hugging Face Inference API
- SendGrid Email Service

---

# 📦 Installation & Setup

## Prerequisites

Make sure the following are installed:

- Node.js v18+
- Python 3.10+
- MongoDB
- Git

---

# Clone Repository

```bash
git clone https://github.com/your-username/spendwise.git
cd spendwise
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env` file inside `backend/`

```env
MONGODB_URL=your_mongodb_connection_string
HUGGINGFACE_API_KEY=your_huggingface_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_email
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```txt
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create `.env` file inside `frontend/`

```env
VITE_API_URL=http://localhost:8000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 📊 Audit Engine Logic

The platform uses a deterministic rules-based audit engine instead of relying entirely on LLM outputs.

The engine evaluates:

- Plan-to-seat mismatch
- Duplicate AI capabilities
- Unnecessary enterprise subscriptions
- Better-value alternatives
- Cost-per-user optimization

This approach ensures:
- transparent calculations
- predictable outputs
- financially defensible recommendations

---

# 🧪 Testing

Run frontend tests:

```bash
npm test
```

Run backend tests:

```bash
pytest
```

---

# 📖 Project Documentation

Additional project documentation:

- ARCHITECTURE.md
- PRICING_DATA.md
- GTM.md
- ECONOMICS.md
- PROMPTS.md
- REFLECTION.md
- DEVLOG.md
- TESTS.md

---

# ⚖️ Key Engineering Decisions

## 1. FastAPI for Backend
Chosen for:
- async performance
- clean API development
- fast iteration speed
- strong validation support

---

## 2. Deterministic Audit Logic
The audit engine uses hardcoded business rules instead of AI-generated calculations to ensure reliable and explainable financial recommendations.

---

## 3. MongoDB for Flexibility
MongoDB enables flexible storage for:
- audit reports
- dynamic recommendation structures
- shareable public reports

---

## 4. Tailwind CSS for Rapid UI Development
Tailwind accelerated responsive UI implementation while maintaining design consistency.

---

## 5. Hugging Face for AI Summaries
Used lightweight inference APIs for generating executive-style summaries while keeping infrastructure costs low.

---

# 🔐 Security Considerations

- Environment variables for secret management
- Input validation using Pydantic
- Basic abuse protection and rate limiting
- Sanitized public share URLs
- CORS protection configured in backend

---

# 📈 Future Improvements

Potential future enhancements:

- PDF export support
- Multi-user organization dashboards
- AI spend benchmarking
- Stripe billing integration
- Slack/Discord notifications
- Advanced analytics and forecasting

---

# 👨‍💻 Author

Built as part of the Credex Web Development Internship Assignment.

---

# 📄 License

This project is licensed under the MIT License.
