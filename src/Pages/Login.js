import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Prepare login data
        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost/myapp/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(loginData),
            });

            const result = await response.json();

            if (result.message === 'Login successful') {
                setMessage('Login successful!');
                // Optionally redirect after success
                // navigate('/home'); // Redirect to home or another page after login
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred during login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-[#b7e5f5] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
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

export default Login;
