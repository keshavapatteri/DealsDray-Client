import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation

const AdminLoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialize useNavigate hook
    const navigate = useNavigate();

    // Function to handle admin login
    const adminLogin = async (data) => {
        try {
            const response = await axiosInstance.post("/admin/login", data, {
                withCredentials: true,
            });
            console.log(response);
            // Navigate to the home page on successful login
            navigate('/'); // Use navigate instead of Navigate component
            return response?.data;
        } catch (error) {
            toast.error("Log-in Failed"); // Changed to 'Failed' for better clarity
            console.log(error);
        }
    };

    // Function to handle form submission
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const data = { email, password }; // Collect form data
        await adminLogin(data);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Admin Login Page</h1>
            <form onSubmit={handleLogin} className="flex flex-col w-1/4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    required
                    className="border p-2 mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required
                    className="border p-2 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
