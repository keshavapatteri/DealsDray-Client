
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../Config/AxiosInstance";

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get("admin/check-user", {
          withCredentials: true,
        });

        setUser(response.data); // Save user info if token is valid
      } catch (error) {
        console.error("Error checking user:", error.response?.data?.message || error.message);
        setUser(null); // Set user to null on error
        navigate("/user/login");
        // Redirect to login
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return user ? (
    children
  ) : (
    <div className="bg-white flex items-center justify-center "style={{height:"100vh"}}>
 <div className="loading loading-spinner text-sky-500">Loading...</div>
    </div>
   
  );
};
