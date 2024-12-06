import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCACLvaqRzaSTqVPXlRSNa5PFHPEZ3-W1g";

const PhysicalHealthChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi there! I'm your AI coach for physical health improvement. Let's start by understanding your habits." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(0); // Tracks the current question stage
  const [userResponses, setUserResponses] = useState({}); // Tracks all user responses

  const physicalHealthQuestions = [
    "How often do you exercise in a week?",
    "What types of exercises do you usually perform? (e.g., cardio, strength training, yoga)",
    "Do you follow a balanced diet? If yes, what does it usually include?",
    "How much water do you drink daily?",
    "How many hours of sleep do you get each night?",
    "Do you consume a lot of processed or sugary foods?",
    "What is your biggest challenge in maintaining physical health?",
  ];

  const healthSuggestions = {
    exercise: "Aim for at least 150 minutes of moderate exercise per week, including both cardio and strength training.",
    balancedDiet: "Include a variety of fruits, vegetables, lean proteins, whole grains, and healthy fats in your diet.",
    hydration: "Drink at least 8-10 glasses of water daily to stay hydrated and support bodily functions.",
    sleep: "Aim for 7-9 hours of quality sleep each night to allow your body to recover and rejuvenate.",
    processedFoods: "Reduce intake of processed and sugary foods. Opt for natural, whole foods instead.",
    challenges: "Identify barriers to maintaining health and develop strategies like planning meals, setting exercise goals, or managing time better.",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    // Handle assessment questions
    if (assessmentStage < physicalHealthQuestions.length) {
      const questionKey = Object.keys(healthSuggestions)[assessmentStage];
      setUserResponses((prev) => ({ ...prev, [questionKey]: input }));

      // Ask the next question
      setMessages((prev) => [
        ...prev,
        { role: "model", text: physicalHealthQuestions[assessmentStage] },
      ]);
      setAssessmentStage((prevStage) => prevStage + 1);
    } else {
      // Generate and display personalized suggestions
      const suggestions = generateSuggestions(userResponses);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Thank you for sharing your responses. Based on your answers, here are some tips to improve your physical health:

${suggestions}`,
        },
      ]);
    }

    setInput("");
    setIsLoading(false);
  };

  const generateSuggestions = (responses) => {
    const suggestions = [];
    for (const [key, response] of Object.entries(responses)) {
      if (healthSuggestions[key]) {
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
          <h1 className="text-2xl font-bold text-gray-800">AI Physical Health Coach</h1>
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

export default PhysicalHealthChatBot;
