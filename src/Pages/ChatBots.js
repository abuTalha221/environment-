import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCACLvaqRzaSTqVPXlRSNa5PFHPEZ3-W1g";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi there! I'm your AI health coach. What's your health goal today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [goal, setGoal] = useState(null); // Track user's health goal
  const [userInfo, setUserInfo] = useState(null); // Track user's information

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Handle different conversation stages
    if (!goal) {
      setGoal(input.toLowerCase()); // Store health goal
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Great! To personalize a plan, tell me your age range (e.g., 20s, 30s), gender, activity level (sedentary, active, etc.), and a brief description of your diet." },
      ]);
    } else if (!userInfo) {
      // Gather user information
      setUserInfo(input);
      const response = await model.generateContent(getPersonalizedPlan(goal, userInfo));
      setMessages((prev) => [...prev, { role: "model", text: response.response.text() }]);
    } else {
      console.error("Conversation ended. User can start a new goal.");
    }

    setIsLoading(false);
  };

  const getPersonalizedPlan = (goal, userInfo) => {
    const plans = {
      "lose weight": `Let's focus on healthy habits to reach your weight loss goals! Based on your ${userInfo}, here are 2 steps to get you started:
      1. **Hydrate!** Aim to drink 8 glasses of water daily. This helps with feeling full and reduces cravings.
      2. **Swap sugary drinks.** Replace one sugary drink per day with water or unsweetened tea. Small changes add up!`,
      "improve sleep": `Sleep is crucial for overall health! Here are 2 tips to improve your sleep based on your ${userInfo}:
      1. **Relaxing routine.** Establish a relaxing bedtime routine (bath, reading) 30 minutes before sleep.
      2. **Consistent schedule.** Go to bed and wake up at similar times each day, even on weekends.`,
      "reduce stress": `Managing stress is key to well-being! Here are 2 tips based on your ${userInfo}:
      1. **Short breaks.** Take 5-minute breaks throughout the day for deep breathing exercises or meditation.
      2. **Identify stressors.** Reflect on what stresses you and find healthy ways to manage them (e.g., exercise, hobbies).`,
      "increase energy levels": `Feeling tired? Here are 2 tips to boost your energy based on your ${userInfo}:
      1. **Stay hydrated.** Dehydration can zap your energy. Aim for 8 glasses of water daily.
      2. **Move your body!** Aim for at least 30 minutes of moderate-intensity exercise most days of the week.`,
    };

    return plans[goal] || "Sorry, I can't provide a plan yet. This is a developing feature.";
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col justify-between">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl flex flex-col flex-grow">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">AI Health Coach</h1>
        </div>

        {/* Chat Container */}
        <div className="flex-grow space-y-4 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-6">
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

        {/* Input Section */}
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key press
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
    </div>
  );
};

export default ChatBot;
