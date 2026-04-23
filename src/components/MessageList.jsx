function MessageList({ messages }) {
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages">
      {messages.length === 0 ? (
        <div className="messages-empty">
          <div className="messages-empty-icon">💬</div>
          <div>No messages yet</div>
          <div>Start the conversation!</div>
        </div>
      ) : (
        messages.map((msg, i) => (
          <div key={i} className="message">
            <strong>{msg.sender}</strong>
            {msg.content}
            {msg.timestamp && <span className="message-time">{formatTime(msg.timestamp)}</span>}
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
