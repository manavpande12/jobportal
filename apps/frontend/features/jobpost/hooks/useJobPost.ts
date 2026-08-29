import { activeJobPost, closeJobPost, createJobPost, deleteJobPost, draftJobPost, getJobPostById, getJobPosts, updateJobPostById } from "../services/jobpost.service";
import { JobPostFilterRequest, UpdateJobPostRequest } from "../types/jobpost.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateJobPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createJobPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["job-posts"] })
        }
    });
}
export const useUpdateJobPostById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id?: string, data: UpdateJobPostRequest }) => updateJobPostById(id!, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["job-post", variables.id] })
            queryClient.invalidateQueries({ queryKey: ["job-posts"] })
        }
    });
}


export const useDeleteJobPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteJobPost(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["job-post", id], });
            queryClient.invalidateQueries({ queryKey: ["job-posts"], });
        },
    });
};

export const useCloseJobPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => closeJobPost(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["job-post", id], });
            queryClient.invalidateQueries({ queryKey: ["job-posts"], });
        },
    });
};

export const useDraftJobPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => draftJobPost(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["job-post", id], });
            queryClient.invalidateQueries({ queryKey: ["job-posts"], });
        },
    });
};

export const useActiveJobPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => activeJobPost(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["job-post", id], });
            queryClient.invalidateQueries({ queryKey: ["job-posts"], });
        },
    });
};


export const useGetJobPostById = (id?: string) => {
    return useQuery({
        queryKey: ["job-post", id],
        queryFn: async () => {
            const res = await getJobPostById(id!);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};


export const useGetJobPosts = (filter: JobPostFilterRequest) => {
    return useQuery({
        queryKey: ["job-posts", filter],
        queryFn: () => getJobPosts(filter),
        staleTime: 1000 * 60 * 5,
    });
};