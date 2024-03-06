import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

const token = JSON.parse(localStorage.getItem("token")) || null;

if(token){
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token.access}`;
}

export default axiosInstance;