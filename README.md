# India Employment Public Voice 🇮🇳
> **An Independent, Citizen-Driven Employment Observatory & Public Awareness Movement**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Privacy Protected](https://img.shields.io/badge/Privacy-k_%E2%89%A5_5_Enforced-brightgreen)](#privacy--data-ethics)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 About the Project

**India Employment Public Voice** is an independent, nationwide youth movement and crowdsourced observatory. It surfaces the grassroots economic realities of India's educated youth: what happens after graduation, regional employment distributions, realities across engineering disciplines, and the daily perseverance of job seekers.

> *"Unemployment is a serious issue. My experience matters. I want to participate and make my voice count."*

### ⚠️ Crucial Demarcation (Voluntary Survey vs. Official National Statistics)
* This platform is an **independent, voluntary public research initiative** created for civic awareness.
* These statistics reflect self-reported, voluntary public survey responses submitted to India Employment Public Voice.
* They do **NOT** represent official government metrics published by the Ministry of Statistics and Programme Implementation (**MOSPI**), the Periodic Labour Force Survey (**PLFS**), or the Reserve Bank of India (**RBI**).

---

## ✨ Core Features

1. **Dual Entry Movement Arena:**
   - **`I AM EMPLOYED`** — Share employment experience, sector, compensation bands, and job alignment.
   - **`I AM UNEMPLOYED`** — Share education, degree branch, job-search duration, and career path.
2. **Fast 6-Question Survey Wizard:**
   - One question per screen with clear progress tracking.
   - Conditional branching for degrees (B.Tech CSE, IT, ECE, EEE, Mech, Civil, etc.), Plus Two, and SSLC.
   - Automatic 16-character alphanumeric DPDPA deletion key for respondent privacy.
3. **The 3-Second Comprehension Public Dashboard:**
   - **Human 100-Person Ratio:** *"Out of every 100 people who participated: 62 said they were employed and 38 said they were looking for work."*
   - **Education Groups:** Plain-language horizontal bars showing counts across college degrees, diplomas, +2, and SSLC.
   - **Ranked State-Wise Participation:** Clean ranked list with instant search across all 36 States & UTs.
   - **5 Understandable Age Groups:** 18–20, 21–25, 26–30, 31–35, and Above 35 years.
   - **Engineering Branches Comparison:** Transparent counts for CSE, Mechanical, ECE, Civil, EEE, IT, and Others with explicit explanatory context.
   - **Side-by-Side Bilateral State Comparison Tool:** Compare any two Indian states in plain numbers.
4. **Real-Time Reactive Filtering:**
   - Instant filtering by cohort status, state, education, and engineering branch with dynamic active tag pills and one-click reset.

---

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React Icons.
* **Backend:** Python 3.11+, FastAPI, Pydantic v2, SlowAPI (Rate Limiting), Uvicorn.
* **Database:** PostgreSQL / Supabase with Row Level Security (RLS) & Materialized Views.
* **Privacy:** Differential $k \ge 5$ anonymity floor, zero PII collection (no Aadhaar, phone, or exact address).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ or v20+)
- **Python** (3.10+)

### 2. Clone the Repository
```bash
git clone https://github.com/<your-username>/Employment-Observatory.git
cd Employment-Observatory
```

### 3. Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate on Windows:
.\venv\Scripts\activate
# Activate on Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start backend server
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API will be available at [http://localhost:8000](http://localhost:8000) (Interactive Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)).

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will be live at [http://localhost:5173](http://localhost:5173).

---

## 🔒 Privacy & Data Ethics

- **Zero PII:** Names are strictly optional and never displayed publicly. Phone numbers, Aadhaar, and physical addresses are never collected.
- **$k \ge 5$ Anonymity Floor:** Any category with fewer than 5 submissions is hidden to prevent deanonymization.
- **DPDPA Compliance:** Every respondent receives a personal 16-character deletion key allowing them to purge their submission at any time.

---

## 👨‍💻 Creator Attribution

Created and built by **Shafeek Latheef**:
- **Role:** Software Engineer • Full-Stack Developer • AI & Systems Builder
- **Bio:** Computer Science graduate from Kerala, India, passionate about building useful technology products and exploring how technology can solve real-world problems.
- **Portfolio:** [shafeektech.site](https://shafeektech.site)
- **GitHub:** [@shafeek32](https://github.com/shafeek32)
- **LinkedIn:** [Shafeek Latheef](https://www.linkedin.com/in/shafeek-latheef/)
- **Email:** [shafeekl2002@gmail.com](mailto:shafeekl2002@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
