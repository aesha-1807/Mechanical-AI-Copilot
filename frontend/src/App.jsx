
import { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import './App.css'
import ChatMessage from "./components/ChatMessage";
import Sidebar from "./components/Sidebar";

function App() {

  const [question, setQuestion] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [currentChat, setCurrentChat] = useState("default")
  const [chatList, setChatList] = useState(["default"])
  const [messages, setMessages] = useState(() => {

  const savedMessages = localStorage.getItem(currentChat)

  return savedMessages ? JSON.parse(savedMessages) : []
  
})
  const chatEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(
    currentChat,
    JSON.stringify(messages)
    )
  }, [messages])

  useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth"
   })

  }, [messages])

  useEffect(() => {

    const savedMessages = localStorage.getItem(currentChat)

    if (savedMessages) {
    setMessages(JSON.parse(savedMessages))
    } else {
    setMessages([])
    }

  }, [currentChat])

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

  const chatName = `Chat ${chatList.length + 1}`

  setChatList([...chatList, chatName])

  setCurrentChat(chatName)

  setMessages([])

}

 return (

<div className="layout">

  <Sidebar
  chatList={chatList}
  currentChat={currentChat}
  setCurrentChat={setCurrentChat}
  newChat={newChat}
  />

  <div className="app">

    <h1>🤖 Mechanical AI Copilot</h1>

    <p className="subtitle">
    Powered by Gemini AI • Developed by Aesha Shah
    </p>
    

    <div className="chat-window">

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {loading && (
        <p>⏳ Mechanical AI is thinking...</p>
      )}

      <div ref={chatEndRef}></div>

    </div>

    <div className="input-area">

      <input
        type="text"
        placeholder="Ask anything about Mechanical Engineering..."
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
        Ask
      </button>

    </div>

  </div>
</div>
  )

}

export default App