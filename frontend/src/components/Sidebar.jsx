function Sidebar({ newChat }) {

  return (

    <div className="sidebar">

      <div className="sidebar-header">

        <h2>🤖 Mechanical AI</h2>

        <p>Copilot</p>

      </div>

      <button
        className="new-chat-btn"
        onClick={newChat}
      >
        ➕ New Chat
      </button>

      <hr className="divider" />

      <div className="history">

        <h4>Recent Chat</h4>

        <div className="history-card">

          💬 Current Chat

        </div>

      </div>

      <div className="sidebar-footer">

        <p>⚙️ Version 1.0</p>

      </div>

    </div>

  )

}

export default Sidebar