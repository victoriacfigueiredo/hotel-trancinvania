import axios from "axios";

// Create an axios instance
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Colocar os endpoints que não precisam de login aqui
const skipAuthUrls = ["/auth/login"]; // URLs to skip the authorization check

// Add a request interceptor to include the JWT token in headers
apiService.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem("accessToken");
    if (token && config.url && !skipAuthUrls.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If we get a 401 Unauthorized error, we can handle it here
    if (error.response && error.response.status === 401) {
      // Optionally, you can add logic to redirect to login page or show a message
      console.error("Unauthorized access - possibly invalid token");
      // Redirect to home page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiService;
