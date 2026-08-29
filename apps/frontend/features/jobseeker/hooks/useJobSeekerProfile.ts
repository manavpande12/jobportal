import { updateJobSeekerProfile, getJobSeekerProfile } from "@/features/jobseeker/services/jobseeker.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query";

export const useUpdateJobSeekerProfile = () => {
    const queryClient = useQueryClient();
    return (
        useMutation({
            mutationFn: updateJobSeekerProfile,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["jobseeker-profile"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["user-me"],
                });
            }
        })
    );
}

export const useGetJobSeekerProfile = () => {
    return useQuery({
        queryKey: ["jobseeker-profile"],

        queryFn: async () => {
            const res = await getJobSeekerProfile();
            return res.data;
        },
    });
};