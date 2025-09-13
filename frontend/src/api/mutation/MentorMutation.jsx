import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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


export const useCreateMentorshipRequest = () => {
  return useMutation({
    mutationFn: async (variables) => {
      const { mentorId, ...formData } = variables;
      try {
        const res = await axiosInstance.post(
          `/Mentor-Match/${mentorId}/Request-Mentorship`,
          formData
        );
        // console.log("API Response:", res.data);
        return res.data;
      } catch (e) {
        console.log("API Error:", e);
        throw e;
      }
    },
  });
}

export const useFetchMentorshipRequests = (userRole) => {
  return useQuery({
    queryKey: ["mentorshipRequests", userRole],
    queryFn: async () => {
      console.log(`Fetching mentorship requests for ${userRole}...`);
      const res = await axiosInstance.get("/Mentor-Match/All-Mentorship-Requests");
      console.log('Fetched data:', res.data);
      return res.data;
    }
  })
}

// Keep the old one for backward compatibility
export const useFetchRequestforStudent = () => {
  return useQuery({
    queryKey: ["studentReqs","mentorReqs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/Mentor-Match/All-Mentorship-Requests");
      return res.data;
    }
  })
}

export const useUpdateMentorshipRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }) => {
      const res = await axiosInstance.put("/Mentor-Match/Update-Mentorship-Request", {
        requestId,
        status
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      console.log(`Request ${variables.requestId} status updated to: ${variables.status}`);

      // Update the cache directly for both query keys
      const updateCache = (queryKey) => {
        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData || !oldData.requests) return oldData;

          const updatedRequests = oldData.requests.map(request => {
            if (request._id === variables.requestId) {
              return { ...request, status: variables.status };
            }
            return request;
          });

          return { ...oldData, requests: updatedRequests };
        });
      };

      // Update both possible query keys
      updateCache(["studentReqs", "mentorReqs"]);
      updateCache(["mentorshipRequests", "student"]);
      updateCache(["mentorshipRequests", "mentor"]);
    },
    onError: (error) => {
      console.error('Error updating request:', error);
    }
  });
}
