import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import axiosInstance from "../axiosInstance";

// ✅ Correct Zod schema (matches backend validation)
export const skillSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  level: z.string().min(2, "Level must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  duration: z.string().min(2, "Duration must be at least 2 characters"),
  auther: z.string().min(2, "Author must be at least 2 characters"),
  introduction: z.string().min(2, "Introduction must be at least 2 characters"),
  highlights: z.array(z.string()).min(1, "At least 1 highlight is required"),
  knowledgeRequirement: z.array(z.string()).min(1, "At least 1 knowledge requirement is required"),
  image: z.string().url().optional().or(z.literal('')),
  video: z.string().url().optional().or(z.literal('')),
});

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Skill-Exchange/");
      return response.data;
    },
  });
};

// ✅ Fetch single skill by ID
export const useGetSkillById = (id) => {
  return useQuery({
    queryKey: ["skill", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Skill-Exchange/${id}`);
      return response.data.Skill;
    },
    enabled: !!id,
  });
};

// ✅ Create a new skill
export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillData) => {
      const response = await axiosInstance.post("/Skill-Exchange/", skillData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Skill created successfully!");
      queryClient.invalidateQueries(["skills"]);
    },
    onError: (error) => {
      console.log(error.response?.data);
      const message = error.response?.data?.message || "Failed to create skill";
      toast.error(message);
    }
  });
};

// ✅ Join/Enroll in a skill
export const useJoinSkill = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/Skill-Exchange/${id}/join`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("You have joined this skill!");
      queryClient.invalidateQueries(["skill", id]); // refresh details
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to join skill";
      toast.error(message);
    },
  });
};
