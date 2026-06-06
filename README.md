# 🧠 SkillGapAI

AI-powered skill gap analyzer that compares a candidate's resume with a job description and generates a personalized learning roadmap.

---

## 🌐 Live Demo

 - Visit [Skill-Gap-AI](https://skill-gap-ai-rho.vercel.app/)


## 🚀 Features

- Upload Resume PDF and Job Description PDF
- Extract skills using AI
- Identify missing technical, tool, and soft skills
- Visualize skill match percentages with charts
- Generate a personalized learning roadmap
- Interactive and responsive dashboard UI

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Axios
- React Markdown
- Lucide React

## Backend
- FastAPI
- LangChain
- Groq (Llama 3.1)
- pdfplumber
- Pydantic
- Python

---

# 📁 Project Structure

```bash
skillgap-ai/
│
├── backend/
│   ├── src/
│   │   ├── analyzer.py
│   │   ├── roadmap.py
│   │   ├── processor.py
│   │   └── utils.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── RadarChart.jsx
│   │   │   ├── BarChart.jsx
│   │   │   ├── SkillGaps.jsx
│   │   │   └── Roadmap.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/skillgap-ai.git
cd skillgap-ai
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `.env`

```env
GROQ_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```txt
http://localhost:8000
```

---

## 3. Frontend Setup

```bash
cd ../frontend

npm install

npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---


# 🧠 How It Works

1. Upload Resume and Job Description PDFs
2. AI extracts skills and experience information
3. System compares candidate skills with job requirements
4. Match percentages are calculated
5. Missing skills are identified
6. AI generates a personalized learning roadmap

---

# 📊 Dashboard Features

- Skill Match Bar Chart
- Radar Chart Visualization
- Skill Gap Badges
- Experience Comparison
- Learning Roadmap with Weekly Plans

---

# 💼 Resume Description

> Built an AI-powered skill gap analyzer using React, FastAPI, LangChain, and Groq Llama 3.1 that compares resumes with job descriptions, visualizes skill match scores, and generates personalized learning roadmaps.

---

# 📄 License

MIT License