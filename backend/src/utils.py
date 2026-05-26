from dotenv import load_dotenv
import os

# Load into os.environ
load_dotenv()

# Or load into a dictionary
Grok_API = os.getenv("GROK_API_KEY")   

if not Grok_API:
    raise ValueError("GEMINI_API_KEY not found. Check your .env file.")