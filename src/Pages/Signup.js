import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Prepare data for submission
        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost/myapp/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(userData),
            });

            const result = await response.json();
            
            if (result.success) { // Ensure success response
                alert('Registration successful!');
                // Use `navigate` to redirect the user to the login page
                navigate(result.redirect_url || 'login'); // Fallback to '/login' if redirect_url is missing
            } else {
                alert(result.message || 'Registration failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Navbar/>
            <div className="bg-[#b7e5f5] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
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

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-purple-300"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-[#EC733B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#EC733B] focus:outline-none focus:ring focus:ring-purple-300"
                        >
                            Sign Up
                        </button>

                        <a href="/login" className="text-sm text-[#EC733B] hover:text-[#EC733B]">
                            Already have an account?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
