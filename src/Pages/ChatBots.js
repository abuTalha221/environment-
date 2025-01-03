import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCACLvaqRzaSTqVPXlRSNa5PFHPEZ3-W1g";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi there! I'm your AI health coach. Let's begin. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(0); // Tracks the current question stage
  const [userResponses, setUserResponses] = useState({}); // Tracks all user responses

  const mentalHealthQuestions = [
    "How would you describe your mood today?",
    "Have you been feeling anxious or worried lately? If yes, can you describe the triggers?",
    "How has your sleep been? Are you facing any challenges with falling or staying asleep?",
    "Have you noticed any changes in your appetite or eating habits?",
    "Do you feel overwhelmed or stressed? What might be causing this?",
    "Have you been experiencing any physical symptoms like fatigue, rapid heartbeat, or shaking?",
    "Are you able to enjoy activities that you usually like?",
    "Have you had thoughts of harming yourself or ending your life? If yes, please seek immediate help.",
  ];

  const healthSuggestions = {
    mood: "Engage in activities that bring joy, like hobbies, socializing, or physical exercise.",
    anxiety: "Practice relaxation techniques like deep breathing or mindfulness to reduce anxiety.",
    sleep: "Establish a consistent bedtime routine and reduce screen time before sleep.",
    appetite: "Focus on balanced meals and consider small, frequent meals if appetite is low.",
    stress: "Identify stressors and try relaxation activities like yoga, meditation, or nature walks.",
    physical: "Maintain a healthy lifestyle with regular exercise, hydration, and good nutrition.",
    enjoyment: "Rekindle joy by engaging in activities you once enjoyed or trying something new.",
    critical: "Please seek immediate professional help if you're feeling distressed.",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    // Handle assessment questions
    if (assessmentStage < mentalHealthQuestions.length) {
      const questionKey = Object.keys(healthSuggestions)[assessmentStage];
      setUserResponses((prev) => ({ ...prev, [questionKey]: input }));

      // Ask the next question
      setMessages((prev) => [
        ...prev,
        { role: "model", text: mentalHealthQuestions[assessmentStage] },
      ]);
      setAssessmentStage((prevStage) => prevStage + 1);
    } else {
      // Generate and display personalized suggestions
      const suggestions = generateSuggestions(userResponses);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Thanks for sharing your responses. Based on your answers, here are some tips for you:\n\n${suggestions}`,
        },
      ]);
    }

    setInput("");
    setIsLoading(false);
  };

  const generateSuggestions = (responses) => {
    const suggestions = [];
    for (const [key, response] of Object.entries(responses)) {
      if (key === "critical" && response.toLowerCase().includes("yes")) {
        suggestions.push(healthSuggestions[key]);
      } else if (healthSuggestions[key]) {
        suggestions.push(`${healthSuggestions[key]} (${key}: ${response})`);
      }
    }
    return suggestions.join("\n");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg flex flex-col flex-grow">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">AI Health Coach</h1>
        </div>

        {/* Chat Container */}
        <div className="flex-grow space-y-4 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
