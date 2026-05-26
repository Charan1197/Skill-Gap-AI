from src.utils import Grok_API
from pydantic import BaseModel
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from src.procesor import extract_text, clean_text



resume = "/SKill gap/backend/data/resumes/resume_1.pdf"
job_desc = "/SKill gap/backend/data/job_descriptions/Job_Description.pdf"


model = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=Grok_API
)



class SkillProfile(BaseModel):
    technical_skills: list[str]
    tools: list[str]
    soft_skills: list[str]
    experience_level: str


parser = PydanticOutputParser(pydantic_object=SkillProfile)
# base_parser = PydanticOutputParser(pydantic_object=SkillProfile)
# parser = OutputFixingParser.from_llm(parser=base_parser, llm=model)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are an expert HR analyst. Extract all skills from the following text. Return technical skills, tools, soft skills, and experience level. \n{format_instructions} Return ONLY the JSON object. No comments, no explanations, no extra text."
    ),
    ("human", "{text}"),
])

chain = prompt | model | parser

def extract_skills(text):
   result = chain.invoke({
       "text":text,
       "format_instructions":parser.get_format_instructions()
   })
   return result


def analyze_gap(resume_skills: SkillProfile, jd_skills: SkillProfile)->dict:
    gap = {
        "technical_skills": [],
        "tools":[],
        "soft_skills": [],
        "candidate_experience":"",
        "required_experience":"",
    }

    gap["technical_skills"] = list(
        (set(s.lower() for s in jd_skills.technical_skills) - 
         set(s.lower() for s in resume_skills.technical_skills))
        )
    
    gap["tools"] = list(
        (set(s.lower() for s in jd_skills.tools) - 
         set(s.lower() for s in resume_skills.tools))
        )
    
    gap["soft_skills"] = list(
        (set(s.lower() for s in jd_skills.soft_skills) - 
         set(s.lower() for s in resume_skills.soft_skills))
        )
    
    gap["candidate_experience"] = resume_skills.experience_level
    gap["required_experience"] = jd_skills.experience_level


    return gap


def calculate_scores(jd_skills, gaps):
    # technical score
    total_technical = len(jd_skills.technical_skills)
    missing_technical = len(gaps["technical_skills"])
    technical_score = round(((total_technical - missing_technical) / total_technical) * 100)

    # tools score
    total_tools = len(jd_skills.tools)
    missing_tools = len(gaps["tools"])
    tools_score = round(((total_tools - missing_tools) / total_tools) * 100)

    total_soft = len(jd_skills.soft_skills)
    missing_soft = len(gaps["soft_skills"])
    soft_score = round(((total_soft - missing_soft) / total_soft) * 100)

    # do the same for tools and soft_skills

    return {
        "technical": technical_score,
        "tools": tools_score,
        "soft_skills": soft_score
    }

if __name__ == "__main__":

    # resume
    resume_raw = extract_text(resume)
    cleaned_resume = clean_text(resume_raw)
    resume_result = extract_skills(cleaned_resume)
    print(resume_result)

    print("\n\n\n Job Description:")
    #job description
    job_desc_raw = extract_text(job_desc)
    cleaned_job_desc = clean_text(job_desc_raw)
    Job_desc_result = extract_skills(cleaned_job_desc)
    print(Job_desc_result)

    gaps  = analyze_gap(resume_result, Job_desc_result)
    print("\n\n\n")
    print(gaps["candidate_experience"])
    print(gaps["required_experience"])