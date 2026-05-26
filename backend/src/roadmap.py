from src.utils import Grok_API
# from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
# from analyzer import analyze_gap


# model = ChatGoogleGenerativeAI(
#     model="gemini-2.0-flash-lite",
#     google_api_key=Gemini_API
# )

model = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=Grok_API
)


prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        '''
            You are an expert Technical Career Coach.
            A candidate is missing the following skills: {gaps}
            Their current level is {candidate_experience}, 
            target role requires {required_experience}.

            Create a structured 4-week learning roadmap that:
            - Prioritizes the most important gaps first
            - Suggests specific free resources for each skill
            - Is realistic and achievable week by week
            - Returns output in clean Markdown format
        '''
    )
])

chain = prompt | model | StrOutputParser()


def generate_roadmap(gaps):
    result = chain.invoke({
       "gaps":gaps,
       "candidate_experience": gaps["candidate_experience"],
       "required_experience": gaps["required_experience"]
       
   })
    
    return result



if __name__ == "__main__":
    test_gaps = {
        "technical_skills": ["sql", "machine learning", "tableau"],
        "tools": ["docker", "spark"],
        "soft_skills": ["critical thinking"],
        "candidate_experience": "2 years",
        "required_experience": "2-4 years"
    }
    result = generate_roadmap(test_gaps)
    print(result)
