from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from src.procesor import extract_text, clean_text
from src.analyzer import analyze_gap, extract_skills, calculate_scores
from src.roadmap import generate_roadmap
from io import BytesIO



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    # read
    resume_bytes = await resume.read()
    jd_bytes = await jd.read()

    # extract text
    resume_text = clean_text(extract_text(BytesIO(resume_bytes)))
    jd_text = clean_text(extract_text(BytesIO(jd_bytes)))

    # extract skills
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    # analyse gap
    gap = analyze_gap(resume_skills, jd_skills)

    # roadmap 
    roadmap = generate_roadmap(gap)

    return {"gaps":gap, "roadmap":roadmap, "scores":calculate_scores(jd_skills, gap)}
 


