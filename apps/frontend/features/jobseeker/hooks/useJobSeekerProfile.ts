import { updateJobSeekerProfile, getJobSeekerProfile, getJobSeekerPublicProfile } from "@/features/jobseeker/services/jobseeker.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useUpdateJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJobSeekerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobseeker-profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "me"],
      });
    },
  });
};

export const useGetJobSeekerProfile = () => {
  return useQuery({
    queryKey: ["jobseeker-profile"],

    queryFn: async () => {
      const res = await getJobSeekerProfile();
      return res.data;
    },
  });
};
export const useGetJobSeekerPublicProfile = (id: string) => {
  return useQuery({
    queryKey: ["jobseeker-profile", "public", id],
    queryFn: async () => {
      const res = await getJobSeekerPublicProfile(id);
      return res.data;
    },
    enabled: !!id,
  });
};
