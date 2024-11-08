// import { useEffect, useState } from "react";
// import { axiosInstance } from "../../../Config/AxiosInstance";
// // import { useNavigate } from "react-router-dom";


// export const UserAuth = ({ children }) => {
//   const [user, setUser] = useState(null); 
// // const navigate=useNavigate();
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const response = await axiosInstance.get('admin/check-user', {
//           withCredentials: true,
//         });
//         setUser(response.data);
//         if(!response.data){
// // navigate('/user/login')
//         }      
//       } catch (error) {
//         console.error("Error checking user:", error);
//         setUser(null); // Ensure user is set to null on error
//       }
//     };

//     checkUser();
//   }, []);



//   return user ? children :
//    <div>User not authenticated</div>

//    ; 
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../Config/AxiosInstance";

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('admin/check-user', {
          withCredentials: true,
        });
        // Assuming response.data contains user information or null
        setUser(response.data); 

        if (!response.data) {
          navigate('/user/login');
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null); // Ensure user is set to null on error
        navigate('/user/login'); // Redirect to login page on error
      }
    };

    checkUser();
  }, [navigate]);

  return user ? children : <div>Loading...</div>;
};
