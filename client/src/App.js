import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/messages";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages from backend
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, []);

  // Send new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchMessages();
  };

  // Copy message to clipboard
  const copyToClipboard = (msg) => {
    navigator.clipboard.writeText(msg);
  };

  return (
    <div
      style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Simple Chat/Clipboard</h2>
      <form
        onSubmit={sendMessage}
        style={{ display: "flex", marginBottom: 16 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: "8px 16px" }}>
          Send
        </button>
      </form>
      {loading ? <div>Loading...</div> : null}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          minHeight: 200,
        }}
      >
        {messages.length === 0 ? <div>No messages yet.</div> : null}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{ marginBottom: 12, display: "flex", alignItems: "center" }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: "bold" }}>
                {new Date(msg.timestamp).toLocaleTimeString()}:
              </span>{" "}
              {msg.text}
            </div>
            <button
              onClick={() => copyToClipboard(msg.text)}
              style={{ marginLeft: 8 }}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
