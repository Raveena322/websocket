import { useState } from "react";

function MessageInput({ sendMessage, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleSend();
    }
  };

  return (
    <div className="input-area">
      <input
        value={text}
        placeholder={disabled ? "Enter username first..." : "Type message..."}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled || !text.trim()}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;
