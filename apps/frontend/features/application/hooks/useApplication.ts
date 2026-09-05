import { applyForJob, getApplicationsForJob, getMyApplications, getMyApplicationStatusCount, hasApplied, updateApplicationStatus, } from "../services/application.service";
import { ApplicationPageRequest, MyApplicationRequest, UpdateApplicationStatusRequest, } from "../types/application.types";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";

export const useApplyForJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: applyForJob,
        onSuccess: (_, jobPostId) => {
            queryClient.invalidateQueries({ queryKey: ["my-applications"], });
            queryClient.invalidateQueries({ queryKey: ["has-applied", jobPostId], });
        },


    });
};


export const useGetMyApplications = (params: MyApplicationRequest) => {
    return useQuery({
        queryKey: ["my-applications", params],
        queryFn: () => getMyApplications(params),
        staleTime: 1000 * 60 * 5,
    });
};


export const useGetApplicationsForJob = (jobPostId?: string, params?: ApplicationPageRequest) => {
    return useQuery({
        queryKey: ["job-applications", jobPostId, params],
        queryFn: () => getApplicationsForJob(jobPostId!, params!),
        enabled: !!jobPostId,
        staleTime: 1000 * 60 * 5,
    });
};


export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data, }: { id: string; data: UpdateApplicationStatusRequest; }) => updateApplicationStatus(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["application", variables.id],
            });
            queryClient.invalidateQueries({
                queryKey: ["my-applications"],
            });
            queryClient.invalidateQueries({
                queryKey: ["job-applications"],
            });
        },
    });
};

export const useHasApplied = (jobPostId?: string) => {
    return useQuery({
        queryKey: ["has-applied", jobPostId],
        queryFn: () => hasApplied(jobPostId!),
        enabled: !!jobPostId,
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetMyApplicationStatusCount = () => {
    return useQuery({
        queryKey: ["my-application-status-count"],
        queryFn: getMyApplicationStatusCount,
        staleTime: 1000 * 60 * 5,
    });
};