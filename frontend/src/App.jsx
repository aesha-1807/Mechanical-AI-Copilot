
import { useState, useEffect } from 'react'



import axios from 'axios'
import './App.css'

function App() {

  const [question, setQuestion] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(() => {

  const savedMessages = localStorage.getItem("chatMessages")

  return savedMessages ? JSON.parse(savedMessages) : []

})
  useEffect(() => {
    localStorage.setItem(
      "chatMessages",
      JSON.stringify(messages)
    )
  }, [messages])

  async function askAI() {
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

  return (
    
    <div className="app">
      <h1>🤖 Mechanical AI Copilot</h1>
      <h3>by Aesha Shah</h3>

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
        {loading ? "Thinking..." : "Ask"}
       </button>
      
      
      {loading && <p>⏳ AI is thinking...</p>}

      
    
    </div>
  )

}

export default App