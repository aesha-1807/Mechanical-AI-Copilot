

import ReactMarkdown from "react-markdown";
function ChatMessage({ message }) {
function copyMessage() {

  navigator.clipboard.writeText(message.text)

  alert("Copied!")
}






  return (
    <div
      className={
        message.sender === "user"
          ? "message-row user-row"
          : "message-row ai-row"
      }
    >
      <div className="message">
        <strong>
          {message.sender === "user"
            ? "👤 You"
            : "🤖 Mechanical AI"}
        </strong>

        <ReactMarkdown>
         {message.text}
        </ReactMarkdown>

        {
        message.sender === "ai" && (

        <button onClick={copyMessage}>

        📋 Copy

        </button>

        )
        }
      </div>
    </div>
  );
}

export default ChatMessage;