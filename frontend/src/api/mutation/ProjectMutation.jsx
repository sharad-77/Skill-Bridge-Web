import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
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

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData) => {
      const { data } = await axiosInstance.post('/Collaboration/', projectData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  });
};

export const useJoinProject = () => {
  return useMutation({
    mutationFn: async (projectId) => {
      const { data } = await axiosInstance.post(`/Collaboration/${projectId}/join`);
      return data;
    },
    onSuccess: () => {
      toast.success('Project Joined successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to Join project');
    }
  })
}
