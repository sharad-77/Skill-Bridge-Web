import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/Skill-Exchange/");
      return data;
    },
  });
};
