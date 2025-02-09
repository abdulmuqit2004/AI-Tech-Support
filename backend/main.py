from fastapi import FastAPI
import google.generativeai as genai
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only frontend requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "FastAPI backend is running!"}

# Replace with your actual Google Gemini API key
GEMINI_API_KEY = "AIzaSyBqv5mQ5qX6D8AJDAUhpJdSCfLTALAkLEE"
genai.configure(api_key=GEMINI_API_KEY)

class UserQuery(BaseModel):
    question: str
    mode: str  # "Definition AI" or "Tech Support AI"

@app.post("/ask-ai/")
async def ask_ai(query: UserQuery):
    try:
        system_prompt = (
            "You are an expert teacher. Give a very clear and structured explanation of the following concept in an easy-to-understand way: "
            if query.mode == "Definition AI"
            else "You are a tech support assistant. The user is a beginner and does not know how to fix this problem. Give clear, step-by-step instructions in simple words, one step at a time: "
        )


        model = genai.GenerativeModel("gemini-1.5-flash")  # ✅ Using Gemini 1.5 Flash
        response = model.generate_content(system_prompt + query.question)

        return {"response": response.text}

    except Exception as e:
        return {"error": str(e)}