import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar'; 
import ChatBots from './Pages/ChatBots'; // Assuming Navbar is in the components folder

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbots" element={<ChatBots />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
