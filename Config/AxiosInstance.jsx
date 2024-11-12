import axios from "axios";
const baseUrl =import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    headers:{authorization:localStorage.getItem("Admin")?.accesToken},
    baseURL:`${baseUrl}/api/v1`
});

