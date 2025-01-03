import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';



const AdminLogin = () => {
    const adminClick = () => {
        navigate('/ladmin'); // Navigate to the ChatBots component when the button is clicked
      };
    const [username, setUsername] = useState(''); // Update state to store username
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        

        // Prepare login data
        const loginData = {
            username, // Use username here
            password,
        };

        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Navbar />
            <div className="bg-[#b7e5f5] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username" // Changed from email to username
                            placeholder="Enter admin username"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                            value={username} // Bind state to username
                            onChange={(e) => setUsername(e.target.value)} // Update username state
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                        onClick={adminClick}
                            type="submit"
                            className="bg-[#EC733B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#EC733B] focus:outline-none focus:ring focus:ring-purple-300"
                        >
                            Sign In
                        </button>

                        <a href="#" className="text-sm text-[#EC733B] hover:text-[#EC733B]">
                            Forgot Password?
                        </a>
                    </div>
                </form>

                {/* Display the message after login attempt */}
                {message && (
                    <div className="mt-4 text-center text-lg font-bold">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
