import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [mode, setMode] = useState("Definition AI");
  const [tab, setTab] = useState("Chat");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

 const handleSubmit = async () => {
  if (!input.trim()) return;

  try {
    const res = await axios.post("http://127.0.0.1:8000/ask-ai/", {
      question: input,
      mode: mode,
    });

    setResponse(res.data.response.replace(/\n/g, "<br>")); // Replace newlines with HTML line breaks
  } catch (error) {
    console.error("Error:", error);
    setResponse("❌ Error: Could not get a response from AI.");
  }
};


  return (
    <div className="container">
      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button className={tab === "Chat" ? "active" : ""} onClick={() => setTab("Chat")}>AI Chat</button>
        <button className={tab === "Videos" ? "active" : ""} onClick={() => setTab("Videos")}>Video Tutorials</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {tab === "Chat" ? (
          <div className="chat-container">
            {/* Mode Selector */}
            <div className="mode-switcher">
              <button className={mode === "Definition AI" ? "active" : ""} onClick={() => setMode("Definition AI")}>Definition AI</button>
              <button className={mode === "Tech Support AI" ? "active" : ""} onClick={() => setMode("Tech Support AI")}>Tech Support AI</button>
            </div>

            {/* Chat Area */}
            <p className="chat-title">Chatbot ({mode})</p>
            <input
              type="text"
              placeholder="Ask a question..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send-btn" onClick={handleSubmit}>Send</button>

            {/* AI Response */}
            {response && (
              <div className="chat-response" dangerouslySetInnerHTML={{ __html: response }} />
            )}
          </div>
        ) : (
          <div className="videos-container">
            <p className="video-title">Video Tutorials (Coming Soon!)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
