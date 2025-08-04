import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/Collaboration/");
      return data;
    },
  });
};

export const useGetProjectById = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/Collaboration/${projectId}`);
      return data.project; // ✅ only return the project
    },
    enabled: !!projectId,
  });
};

