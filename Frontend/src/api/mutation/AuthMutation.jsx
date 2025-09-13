import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

export const UseSignup = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/signup", userData);
      return response.data;
    }
  })
}

export const UseSignin = () => {
  return useMutation({
    mutationFn: async (userData) => {
      try {
        const res = await axiosInstance.post("/Authentication/login", userData);

        const token = res.data.token;
        setAuthToken(token);

        return res.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Login failed";
        throw new Error(errorMessage);
      }
    }
  });
};

export const UseStudentOnboard = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(
        "/Authentication/signup/Student",
        formData,
        {
          headers: {
            "Content-Type": undefined,
          },
        }
      );
      return response.data;
    },
  });
};

export const UseMentorOnboard = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(
        "/Authentication/signup/Mentor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};

export const UseChangePassword = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post("/Authentication/changePassword", userData);
      return response.data;
    }
  })
}
