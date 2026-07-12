function Sidebar({ newChat }) {

  return (

    <div className="sidebar">

      <h2>🤖 Mechanical AI</h2>

      <button onClick={newChat}>
        ➕ New Chat
      </button>

      <hr />

      <div className="history">

        <p>💬 Current Chat</p>

      </div>

    </div>

  )

}

export default Sidebar