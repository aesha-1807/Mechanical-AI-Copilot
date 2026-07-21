from typing import List
import os
import time
import traceback

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
from groq import Groq

# -------------------------------
# Load Environment Variables
# -------------------------------

load_dotenv()

app = FastAPI()

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
).. cd
# -------------------------------
# CORS
# -------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://mechanical-ai-copilot.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Request Models
# -------------------------------

class Message(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    messages: List[Message]

# -------------------------------
# Routes
# -------------------------------

@app.get("/")
def home():
    return {"message": "Welcome to Mechanical AI Copilot"}

@app.get("/about")
def about():
    return {
        "project": "Mechanical AI Copilot",
        "developer": "Aesha Shah"
    }

@app.get("/material")
def material():
    return {
        "material": "Aluminium 6061",
        "density": "2.70 g/cm³",
        "strength": "310 MPa"
    }

# -------------------------------
# Chat Endpoint
# -------------------------------

@app.post("/chat")
def chat(request: ChatRequest):

    system_prompt = """
You are Mechanical AI Copilot developed by Aesha Shah.

You are an expert Mechanical Engineering assistant.

Rules:
- Answer Mechanical Engineering questions accurately.
- Explain concepts in simple language.
- Use practical examples whenever possible.
- Explain every formula clearly.
- Stay focused on Mechanical Engineering.
"""

    latest_message = request.messages[-1].text

    try:

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": latest_message
                }
            ],
            temperature=0.4,
        )

        return {
            "reply": completion.choices[0].message.content
        }

    except Exception as e:
        print(e)

        return {
            "reply": "⚠️ AI service temporarily unavailable."
        }