
import { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import './App.css'
import ChatMessage from "./components/ChatMessage";
import Sidebar from "./components/Sidebar";


function App() {

  const [question, setQuestion] = useState("")
  
  const [loading, setLoading] = useState(false)
  


  const [messages, setMessages] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null)

  

  useEffect(() => {

  localStorage.setItem(
    "chatMessages",
    JSON.stringify(messages)
  )

  }, [messages])
  useEffect(() => {

  const savedMessages = localStorage.getItem("chatMessages")

  if (savedMessages) {

    setMessages(JSON.parse(savedMessages))

  }

  }, [])







  useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth"
   })

  }, [messages])

  

  async function askAI()
   
  {
    if (question.trim() === "") {
    return
   }
  const updatedMessages = [
  ...messages,
  {
    sender: "user",
    text: question
   }
   ]





  try {
    
    setLoading(true)

    setMessages(updatedMessages)


    const response = await axios.post(
    
    "http://127.0.0.1:8000/chat",
    {
        messages: updatedMessages
    }
   )

    setMessages([
  ...updatedMessages,
  {
    sender: "ai",
    text: response.data.reply
    }
   ])

    setQuestion("")      // Clear the textbox

  } 
  catch (error) {
  console.log(error)

  setMessages([
    ...updatedMessages,
    {
      sender: "ai",
      text: "❌ Sorry, something went wrong."
    }
  ])
}
  
finally {
    setLoading(false)
  }
}

function newChat() {

  if (window.confirm("Start a new chat?")) {

    setMessages([])

    localStorage.removeItem("chatMessages")

  }

}

 return (

<div className="layout">

  <Sidebar
  newChat={newChat}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
  <div className="app">
  

  

  
    
  <div className="topbar">

  <button
    className="hamburger"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    ☰
  </button>

  <div className="header">

    <h1>🤖 MechBot</h1>

    <p className="subtitle">
      Mechanical AI Copilot
    </p>

  </div>

  </div>
    

      <div className="chat-window">

       {messages.length === 0 && (

       <div className="welcome">

       <h2>
      👋 Welcome to Mechanical AI Copilot
       </h2>



       </div>

       )}



      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {loading && (

      <div className="thinking">

      🤖 Thinking...

      </div>

)}

      <div ref={chatEndRef}></div>

    </div>

    <div className="input-area">

      <input
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askAI()
          }
        }}
      />

      <button
       onClick={askAI}
       disabled={loading}
      >
       {loading ? "..." : "Send"}
      </button>

    </div>

    <footer className="footer">
     <p>Mechanical AI Copilot v1.0</p>
     <p>Powered by Gemini AI • Developed by Aesha Shah</p>
    </footer>


  </div>
</div>
  )

}

export default App