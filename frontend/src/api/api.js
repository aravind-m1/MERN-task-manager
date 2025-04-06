import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-task-manager-73nz.onrender.com/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
