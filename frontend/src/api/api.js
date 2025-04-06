import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-task-manager-73nz.onrender.com/api", // Your Render backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
