function Sidebar({ chatList, currentChat, setCurrentChat, newChat }) {

  return (
    <div className="sidebar">

      <h2>🤖 Mechanical AI</h2>

      <button onClick={newChat}>
        ➕ New Chat
      </button>

      <hr />

      <div className="history">

        {chatList.map((chat) => (

          <p
            key={chat}
            onClick={() => setCurrentChat(chat)}
            style={{
              background:
                currentChat === chat ? "#374151" : "transparent"
            }}
          >
            💬 {chat}
          </p>

        ))}

      </div>

    </div>
  )
}

export default Sidebar