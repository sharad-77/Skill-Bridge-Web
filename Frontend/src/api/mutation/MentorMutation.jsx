import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetMentors = () => {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/Mentor-Match/");
      console.log(data)
      return data;
    },
  });
};
