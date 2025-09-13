import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get("/User/Profile");
  return data.profile;
};

export const useGetUserProfile = (userId) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: fetchUserProfile,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const fetchMentorshipRequests = async () => {
  const { data } = await axiosInstance.get("/Mentor-Match");
  return data.requests || [];
};

export const useGetMentorshipRequests = () => {
  return useQuery({
    queryKey: ["mentorshipRequests"],
    queryFn: fetchMentorshipRequests,
    staleTime: 1000 * 60 * 5,
  });
};
