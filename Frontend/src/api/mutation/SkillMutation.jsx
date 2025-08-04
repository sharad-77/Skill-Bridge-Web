import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast } from "sonner";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/Skill-Exchange/");
      return data;
    },
  });
};

export const useGetSkillById = (skillId) => {
  return useQuery({
    queryKey: ["skill", skillId],
    queryFn: async () => {
      if (!skillId) {
        throw new Error('Skill ID is required');
      }

      try {
        const response = await axiosInstance.get(`/Skill-Exchange/${skillId}`);
        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          throw new Error(`Skill with ID "${skillId}" not found`);
        } else if (error.response?.status === 400) {
          throw new Error(`Invalid skill ID: "${skillId}"`);
        } else if (error.response?.status >= 500) {
          throw new Error('Server error occurred while fetching skill');
        }
        throw error;
      }
    },
    enabled: !!skillId && skillId !== 'undefined' && skillId !== 'null',
    retry: (failureCount, error) => {
      return error.response?.status !== 404 && failureCount < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/Skill-Exchange/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill created successfully!');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create skill';
      toast.error(errorMessage);
    },
  });
};
