import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCACLvaqRzaSTqVPXlRSNa5PFHPEZ3-W1g";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi there! I'm here to assess your mental health. Let's get started with some questions." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Store user's answers
  const [mentalHealthResult, setMentalHealthResult] = useState(null); // Store mental health result

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Define mental health questions
  const questions = [
    "On a scale of 1 to 10, how would you rate your overall mood in the last week?",
    "Have you been feeling anxious or stressed recently? If yes, how often?",
    "How have you been sleeping? Any trouble falling or staying asleep?",
    "Do you feel overwhelmed by your daily responsibilities or tasks?",
    "Have you lost interest in activities you used to enjoy?",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Store the user's answer
    const updatedAnswers = [...userAnswers, input];
    setUserAnswers(updatedAnswers);

    // If there are more questions to ask, proceed to the next question
    if (questionIndex < questions.length - 1) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: questions[questionIndex + 1] },
      ]);
      setQuestionIndex(questionIndex + 1);
    } else {
      // If all questions are answered, analyze the answers
      const analysis = await analyzeMentalHealth(updatedAnswers);
      setMentalHealthResult(analysis);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: `Based on your answers, here's an analysis of your mental health: ${analysis}` },
      ]);
    }

    setIsLoading(false);
  };

  // Analyze mental health based on user responses
  const analyzeMentalHealth = async (answers) => {
    // This is a simple mockup. Replace it with a real analysis based on patterns in the user's answers.
    let moodScore = 0;
    answers.forEach((answer, idx) => {
      if (questions[idx].includes("rate your overall mood") && parseInt(answer) < 5) {
        moodScore -= 1;
      }
      if (answer.toLowerCase().includes("anxious") || answer.toLowerCase().includes("stressed")) {
        moodScore -= 1;
      }
      if (answer.toLowerCase().includes("sleep trouble") || answer.toLowerCase().includes("overwhelmed")) {
        moodScore -= 1;
      }
      if (answer.toLowerCase().includes("lost interest")) {
        moodScore -= 1;
      }
    });

    if (moodScore < -3) {
      return "It seems like you're struggling with some mental health challenges. It might help to talk to a mental health professional.";
    } else if (moodScore >= -3 && moodScore < 0) {
      return "You're showing some signs of stress or low mood. It may help to take a break and practice self-care.";
    } else {
      return "You're doing well overall, but it's always good to keep checking in on your mental health.";
    }
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
          <h1 className="text-3xl font-semibold text-gray-900 bg-[#EC733B]">AI Mental Health Checker</h1>
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
            placeholder="Type your answer..."
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
