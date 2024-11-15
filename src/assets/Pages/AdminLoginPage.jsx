// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { axiosInstance } from '../../../Config/AxiosInstance';
// import { useNavigate } from 'react-router-dom'; // Correct import for navigation

// const AdminLoginPage = () => {
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     // Initialize useNavigate hook
//     const navigate = useNavigate();

//     // Function to handle admin login
//     const adminLogin = async (data) => {
//         try {
//             const response = await axiosInstance.post("/admin/login", data, {
//                 withCredentials: true,
//             });
//             console.log(response);
//             // Navigate to the home page on successful login
//             navigate('/'); // Use navigate instead of Navigate component
//             return response?.data;
//         } catch (error) {
//             toast.error("Log-in Failed"); // Changed to 'Failed' for better clarity
//             console.log(error);
//         }
//     };

//     // Function to handle form submission
//     const handleLogin = async (event) => {
//         event.preventDefault(); // Prevent default form submission
//         const data = { email, password }; // Collect form data
//         await adminLogin(data);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-2xl mb-4">Admin Login Page</h1>
//             <form onSubmit={handleLogin} className="flex flex-col w-1/4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} // Update email state
//                     required
//                     className="border p-2 mb-4"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update password state
//                     required
//                     className="border p-2 mb-4"
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white p-2 rounded"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AdminLoginPage;





import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../Config/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for better UX
  const navigate = useNavigate();

  // Function to handle admin login
  const adminLogin = async (data) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axiosInstance.post("/admin/login", data, {
        withCredentials: true,
      });

      // Save token to localStorage (if needed)
      if (response?.data?.token) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login Successful!");
      }

      // Navigate to the admin dashboard or homepage
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login Failed!";
      toast.error(errorMessage);
      console.error("Login Error:", errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    const data = { email, password };
    await adminLogin(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-6 font-bold">Admin Login Page</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-white shadow-md rounded p-6 w-80"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 rounded hover:bg-blue-600 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
