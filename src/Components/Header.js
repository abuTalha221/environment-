import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from './Navbar';

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate('/chatbots'); // Navigate to the ChatBots component when the button is clicked
  };

  return (
    <div
      className='relative min-h-screen w-full bg-cover bg-center'
      style={{
        backgroundImage: "url('/header.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      id='Header'
    >
      <Navbar />

      <div className='absolute inset-0 flex flex-col justify-center items-center text-center mx-auto py-20 px-6 md:px-20'>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0C4069] mb-4">
          Get Personalized Health Tips Instantly
        </h1>
        <p className="text-lg md:text-xl text-[#0C4069] mb-8">
          Discover health insights tailored to your symptoms. Our AI-powered system helps you maintain a healthy lifestyle by offering personalized advice, anytime.
        </p>
        <button
          className="border-2 border-[#EC733B] bg-[#f0f0f0] text-[#EC733B] px-6 py-3 rounded-lg text-lg hover:bg-[#EC733B] hover:text-white transition duration-300"
          onClick={handleClick} // Add the onClick event to navigate to ChatBots component
        >
          Take Personalized Health Tips <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
