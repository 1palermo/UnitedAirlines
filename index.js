const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory message store
let messages = [];

// Get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Add a new message
app.post("/messages", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const message = {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString(),
  };
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
