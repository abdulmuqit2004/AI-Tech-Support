import React, { useState } from "react";
import "./App.css"; // We'll create this file next

function App() {
  const [mode, setMode] = useState("Definition AI");
  const [tab, setTab] = useState("Chat");

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
            <input type="text" placeholder="Ask a question..." className="chat-input" />
            <button className="send-btn">Send</button>
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
