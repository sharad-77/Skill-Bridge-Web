
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const fetchSkills = async () => {
  const { data } = await axiosInstance.get("/Skill-Exchange/");
  return data;
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
};

const fetchSkillById = async (skillId) => {
  const { data } = await axiosInstance.get(`/Skill-Exchange/${skillId}`);
  return data;
};

export const useGetSkillById = (skillId) => {
  return useQuery({
    queryKey: ["skill", skillId],
    queryFn: () => fetchSkillById(skillId),
    enabled: !!skillId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
