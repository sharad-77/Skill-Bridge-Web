import axios from "axios";
import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";

const getErrorMessage = (error) => {
  const { response, message } = error;

  if (!response) {
    return {
      title: "Connection Error",
      description: "Unable to connect to the server. Please check your internet connection.",
      type: "network"
    };
  }

  const status = response.status;
  const errorMessage = response.data?.message || message;

  switch (status) {
    case 400:
      return {
        title: "Bad Request",
        description: errorMessage || "The request was invalid. Please check your input.",
        type: "validation"
      };
    case 401:
      return {
        title: "Authentication Required",
        description: "Your session has expired. Please sign in again.",
        type: "auth"
      };
    case 403:
      return {
        title: "Access Denied",
        description: "You don't have permission to perform this action.",
        type: "permission"
      };
    case 404:
      return {
        title: "Not Found",
        description: "The requested resource could not be found.",
        type: "not_found"
      };
    case 409:
      return {
        title: "Conflict",
        description: "This action conflicts with existing data.",
        type: "conflict"
      };
    case 422:
      return {
        title: "Validation Error",
        description: errorMessage || "Please check your input and try again.",
        type: "validation"
      };
    case 429:
      return {
        title: "Too Many Requests",
        description: "Please wait a moment before trying again.",
        type: "rate_limit"
      };
    case 500:
      return {
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
        type: "server"
      };
    default:
      return {
        title: "Request Failed",
        description: errorMessage || "An unexpected error occurred.",
        type: "unknown"
      };
  }
};

// Simplified base URL logic
const getBaseURL = () => {
  // In development, use proxy
  if (import.meta.env.DEV) {
    return "/api";
  }
  // In production, use the API URL
  return import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // Increased timeout
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Add request logging for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["X-Client-Version"] = "1.0.0";
    config.headers["X-Requested-At"] = new Date().toISOString();

    config.metadata = {
      startTime: Date.now(),
      requestId: Math.random().toString(36).substring(7)
    };

    return config;
  },
  (error) => {
    console.error("Request setup error:", error);
    toast.error("Request failed", {
      description: "Failed to send request. Please try again.",
      duration: 4000,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorInfo = getErrorMessage(error);
    const { response } = error;

    if (errorInfo.type === "auth") {
      console.warn("Unauthorized request - clearing auth");
      useAuthStore.getState().logout();
      toast.error(errorInfo.title, {
        description: errorInfo.description,
        duration: 5000,
      });
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } else {
      const toastOptions = {
        description: errorInfo.description,
        duration: errorInfo.type === "server" ? 6000 : 4000,
      };

      if (errorInfo.type === "server") {
        toastOptions.action = {
          label: "Retry",
          onClick: () => window.location.reload(),
        };
      }

      if (errorInfo.type === "rate_limit") {
        toastOptions.action = {
          label: "Wait",
          onClick: () => toast.dismiss(),
        };
      }

      toast.error(errorInfo.title, toastOptions);
    }

    if (import.meta.env.DEV) {
      console.error("❌ API Error:", {
        type: errorInfo.type,
        status: response?.status,
        message: response?.data?.message || error.message,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        baseURL: error.config?.baseURL,
        fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'Unknown',
        duration: Date.now() - error.config?.metadata?.startTime,
        code: error.code,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
