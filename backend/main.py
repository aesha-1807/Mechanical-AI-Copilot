
from typing import List


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
from google import genai
from google.genai import types
import os

app = FastAPI()
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

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

class Message(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    messages: List[Message]




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


@app.post("/chat")
def chat(request: ChatRequest):

    system_prompt = """
You are Mechanical AI Copilot developed by Aesha Shah.

You are an expert Mechanical Engineering assistant.

Rules:
- Answer Mechanical Engineering questions accurately.
- Explain concepts in simple language.
- Use practical examples whenever possible.
- If the user asks for formulas, explain each variable.
- If the user asks unrelated questions, politely guide them back to Mechanical Engineering.
- Be concise but educational.
"""

    chat = client.chats.create(
        model="gemini-3.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_prompt
        )
    )

    reply = ""

    for message in request.messages:

        if message.sender == "user":
            response = chat.send_message(message.text)
            reply = response.text

    return {
        "reply": reply
    }