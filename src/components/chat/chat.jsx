import "./chat.css"
import React, { useState, useEffect, useRef } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  // Scroll to the latest message when new messages are added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Optimistically add the user's message
    const userMessage = {
      id: Date.now(),
      user: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate an API request (replace with actual API fetch)
      const response = await new Promise((resolve, reject) =>
        setTimeout(() => resolve({ success: true, aiResponse: "This is AI's response." }), 2000)
      );

      if (response.success) {
        const aiMessage = {
          id: Date.now() + 1,
          user: "ai",
          text: response.aiResponse,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("AI failed to respond.");
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        user: "ai",
        text: "An error occurred. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Messages */}
      <div className="chat-messages" ref={chatRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.user === "user" ? "user-message" : "ai-message"}`}
          >
            <p className="chat-text">{message.text}</p>
            <span className="chat-timestamp">{message.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSendMessage();
            }}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      
    </div>
  );
};

export default ChatComponent;
