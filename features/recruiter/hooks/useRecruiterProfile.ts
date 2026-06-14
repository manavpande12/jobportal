import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { getRecruiterProfile, updateRecruiterProfile } from "../services/recruiter.service";

export const useUpdateRecruiterProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecruiterProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recruiter-profile"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user-me"],
            });
        }
    });
}



export const useGetRecruiterProfile = () => {
    return useQuery({
        queryKey: ["recruiter-profile"],
        queryFn: async () => {
            const res = await getRecruiterProfile();
            return res.data;
        }
    });
}