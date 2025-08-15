import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

// Utility to set/remove auth token
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// ✅ Signup mutation
export const UseSignup = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/signup", userData);
      return response.data;
    },
  });
};

// ✅ Signin mutation — safer, no fake tokens, onboarding won't run if login fails
export const UseSignin = () =>
  useMutation({
    mutationFn: async (userData) => {
      try {
        
        const { data } = await axiosInstance.post("/Authentication/login", userData);

        // Check for valid token before saving
        const token = data?.data?.token;
        if (!token || typeof token !== "string") {
          throw new Error("Invalid login response: Missing token");
        }

        // ✅ We only set the token here if it's valid
        setAuthToken(token);

        return data; // Pass full response back to onSuccess
      } catch (err) {
        const msg =
          err.response?.status === 400
            ? err.response?.data?.message || "Invalid credentials"
            : err.message || "Login failed";
        return Promise.reject({ message: msg });
      }
    },
    onError: (err) => {
      console.warn("Login failed:", err.message);
      // Ensure token is cleared if login fails
      setAuthToken(null);
    },
  });

// ✅ Student onboarding
export const UseStudentOnboard = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/signup/Student", userData);
      return response.data;
    },
  });
};

// ✅ Mentor onboarding
export const UseMentorOnboard = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/signup/Mentor", userData);
      return response.data;
    },
  });
};

// ✅ Forget password
export const UseForgetPassword = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/changePassword", userData);
      return response.data;
    },
  });
};
