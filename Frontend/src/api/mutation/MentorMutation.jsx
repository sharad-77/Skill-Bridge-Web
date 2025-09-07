import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetMentors = () => {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/Mentor-Match/");
      return res.data ?? [];
    },
  });
};

export const useDetailsMentor = (mentorId) => {
  return useQuery({
    queryKey: ["mentor", mentorId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/Mentor-Match/${mentorId}`);
      return res.data;
    }
  });
};
