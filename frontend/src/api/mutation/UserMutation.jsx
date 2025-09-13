import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profileData) => {
      const response = await axiosInstance.put("/User/Profile", profileData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useUpdateAccountSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settingsData) => {
      const response = await axiosInstance.put("/User/Account-Settings", settingsData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};