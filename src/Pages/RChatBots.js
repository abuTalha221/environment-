import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCACLvaqRzaSTqVPXlRSNa5PFHPEZ3-W1g";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi there! Type a prompt to get started." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const result = await model.generateContent(input);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error sending prompt:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, I encountered an error processing your request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">ChatBot</h1>
      </div>
      <div className="space-y-4 overflow-y-auto max-h-[400px] p-4 bg-gray-800 rounded-lg mb-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-lg shadow-md text-white ${
                msg.role === "user" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400"
          placeholder="Type your prompt..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
