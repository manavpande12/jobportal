import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getRecruiterProfile, getRecruiterPublicProfile, updateRecruiterProfile } from "../services/recruiter.service";

export const useUpdateRecruiterProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecruiterProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "me"],
      });
    },
  });
};

export const useGetRecruiterProfile = () => {
  return useQuery({
    queryKey: ["recruiter-profile"],
    queryFn: async () => {
      const res = await getRecruiterProfile();
      return res.data;
    },
  });
};

export const useGetRecruiterPublicProfile = (id: string) => {
  return useQuery({
    queryKey: ["recruiter-profile", "public", id],
    queryFn: async () => {
      const res = await getRecruiterPublicProfile(id);
      return res.data;
    },
    enabled: !!id,
  });
};
