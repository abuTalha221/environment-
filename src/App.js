import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar'; 
import ChatBots from './Pages/ChatBots'; 
import Admin from './Pages/Admin';
import LoginAdmin from './Pages/LoginAdmin';
import PChatBots from './Pages/PChatBots'; 
import RChatBots from './Pages/RChatBots'; 

// Assuming Navbar is in the components folder

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbots" element={<ChatBots />} />
        <Route path="/pchatbots" element={<PChatBots />} />
        <Route path="/rchatbots" element={<RChatBots />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ladmin" element={<LoginAdmin />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
