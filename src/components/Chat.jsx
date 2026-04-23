import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected ✅");
        setConnected(true);
        setError(null);

        client.subscribe("/topic/messages", (msg) => {
          const data = JSON.parse(msg.body);
          setMessages((prev) => [...prev, { ...data, timestamp: new Date() }]);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected ❌");
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
        setError("Connection error. Reconnecting...");
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        setError("Unable to connect to server");
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim() || !username.trim()) return;
    if (!clientRef.current || !clientRef.current.connected) return;

    clientRef.current.publish({
      destination: "/app/chat",
      body: JSON.stringify({
        sender: username,
        content: text,
      }),
    });
  };

  return (
    <div className="chat-box">
      {/* Connection Status */}
      <div className={`connection-status ${connected ? "connected" : "disconnected"}`}>
        <span className="status-dot"></span>
        {connected ? "Connected" : "Connecting..."}
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      <input
        className="username"
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MessageList messages={messages} />
      <div ref={messagesEndRef} />
      <MessageInput sendMessage={sendMessage} disabled={!connected || !username.trim()} />
    </div>
  );
}

export default Chat;
