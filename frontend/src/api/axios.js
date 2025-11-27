import axios from "axios";

// Create a central axios instance
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // 5s timeout
});

// Response interceptor for global error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error.response || error.message);
    // Return a uniform error object
    return Promise.reject({
      status: error.response?.status || 500,
      message: error.response?.data?.detail || error.message,
    });
  }
);

export default client;
