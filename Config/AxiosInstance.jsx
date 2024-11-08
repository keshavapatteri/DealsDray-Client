import axios from "axios";


export const axiosInstance = axios.create({
    headers:{authorization:localStorage.getItem("Admin")?.accesToken},
    baseURL:'http://localhost:4300/api/v1'
});

