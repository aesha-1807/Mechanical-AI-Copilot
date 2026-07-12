import ReactMarkdown from "react-markdown";

function ChatMessage({ message }) {

  function copyMessage() {
  navigator.clipboard.writeText(message.text);
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

        <div className="message-header">

          <span className="avatar">
            {message.sender === "user" ? "👤" : "🤖"}
          </span>

          <span className="sender-name">
            {message.sender === "user"
              ? "You"
              : "Mechanical AI Copilot"}
          </span>

        </div>

        <div className="message-content">
          <ReactMarkdown>
            {message.text}
          </ReactMarkdown>
        </div>

        {message.sender === "ai" && (
          <button
            className="copy-btn"
            onClick={copyMessage}
          >
            📋 Copy
          </button>
        )}

      </div>
    </div>
  );
}

export default ChatMessage;